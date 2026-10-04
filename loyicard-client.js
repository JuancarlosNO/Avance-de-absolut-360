/**
 * Cliente frontend → backend TuTienda / LoyiCard (Nivel C)
 * Si el backend no responde, la tienda sigue con puntos locales.
 */
(function (global) {
  const DEFAULT_BASE = ''; // mismo origen cuando sirves con server/

  function apiBase() {
    if (global.LOYICARD_API_BASE != null) return String(global.LOYICARD_API_BASE).replace(/\/$/, '');
    try {
      const saved = localStorage.getItem('LOYICARD_API_BASE');
      if (saved != null) return saved.replace(/\/$/, '');
    } catch (_) {}
    return DEFAULT_BASE;
  }

  async function request(path, options = {}) {
    const url = apiBase() + path;
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });
    let data = null;
    try { data = await res.json(); } catch (_) { data = null; }
    if (!res.ok) {
      const err = new Error((data && (data.error || data.message)) || ('HTTP ' + res.status));
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  async function getStatus() {
    try {
      return await request('/api/loyicard/status');
    } catch {
      return { ok: false, mode: 'offline' };
    }
  }

  async function registerMember({ email, name, phone, externalId }) {
    return request('/api/loyicard/register', {
      method: 'POST',
      body: JSON.stringify({ email, name, phone, externalId })
    });
  }

  async function recordPurchase(payload) {
    return request('/api/loyicard/purchase', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async function getBalance({ memberId, email }) {
    const q = new URLSearchParams();
    if (memberId) q.set('memberId', memberId);
    if (email) q.set('email', email);
    return request('/api/loyicard/balance?' + q.toString());
  }

  async function redeemPoints(payload) {
    return request('/api/loyicard/redeem', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  /** Tras login/registro: asegura socio en LoyiCard y guarda memberId */
  async function ensureMemberForCurrentUser() {
    if (!global.currentUser || global.currentUser.role !== 'client') return null;
    if (global.currentUser.loyicardMemberId) return global.currentUser.loyicardMemberId;
    try {
      const res = await registerMember({
        email: global.currentUser.email,
        name: global.currentUser.name,
        phone: global.currentUser.phone || '',
        externalId: String(global.currentUser.id)
      });
      if (res && res.member && res.member.id) {
        global.currentUser.loyicardMemberId = res.member.id;
        if (typeof res.member.points === 'number' && !global.currentUser.points) {
          global.currentUser.points = res.member.points;
        }
        if (typeof global.saveCurrentUser === 'function') global.saveCurrentUser();
        // persist en users[]
        if (Array.isArray(global.users)) {
          const idx = global.users.findIndex(u => u.id === global.currentUser.id);
          if (idx !== -1) {
            global.users[idx].loyicardMemberId = res.member.id;
            if (typeof global.saveUsers === 'function') global.saveUsers();
          }
        }
        return res.member.id;
      }
    } catch (e) {
      console.warn('[LoyiCard] ensureMember:', e.message);
    }
    return null;
  }

  /** Llamar después de confirmar pago */
  async function onOrderCompleted(order) {
    if (!global.currentUser || global.currentUser.role !== 'client') return null;
    try {
      const memberId = await ensureMemberForCurrentUser();
      const res = await recordPurchase({
        memberId: memberId || global.currentUser.loyicardMemberId,
        email: global.currentUser.email,
        orderId: order.id,
        total: order.total,
        currency: 'USD',
        items: (order.items || []).map(it => ({
          name: it.name,
          qty: it.qty,
          price: it.price
        }))
      });
      if (res && res.ok) {
        if (typeof res.balance === 'number') {
          // Sincronizar saldo LoyiCard → usuario local (fuente de verdad cuando hay backend)
          global.currentUser.points = res.balance;
          if (typeof global.getUserLevel === 'function') {
            global.currentUser.level = global.getUserLevel(res.balance).name;
          }
          if (typeof global.syncUserPoints === 'function') global.syncUserPoints();
          else if (typeof global.saveCurrentUser === 'function') global.saveCurrentUser();
        }
        if (typeof global.showToast === 'function') {
          const extra = res.mock ? ' (demo LoyiCard)' : '';
          global.showToast(`⭐ +${res.pointsEarned || 0} pts fidelización${extra}`);
        }
      }
      return res;
    } catch (e) {
      console.warn('[LoyiCard] purchase:', e.message);
      if (typeof global.showToast === 'function') {
        global.showToast('Pedido OK. Fidelización: se sincronizará más tarde', 'warning');
      }
      return null;
    }
  }

  global.LoyiCardClient = {
    apiBase,
    getStatus,
    registerMember,
    recordPurchase,
    getBalance,
    redeemPoints,
    ensureMemberForCurrentUser,
    onOrderCompleted
  };
})(typeof window !== 'undefined' ? window : globalThis);
