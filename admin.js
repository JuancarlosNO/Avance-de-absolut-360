// ============================================
// ADMIN PAGE — Exclusive for admin role
// ============================================

const ADMIN_SECTION_META = {
  dashboard: { title: 'Dashboard', sub: 'Resumen general de tu tienda' },
  products: { title: 'Productos', sub: 'Gestiona el catálogo e inventario' },
  orders: { title: 'Pedidos', sub: 'Historial de compras de clientes' },
  clients: { title: 'Clientes', sub: 'Usuarios registrados en la tienda' },
  insights: { title: 'Insights IA', sub: 'Recomendaciones inteligentes automáticas' },
  quotes: { title: 'Cotizaciones', sub: 'Solicitudes de clientes' },
  finance: { title: 'Finanzas', sub: 'Ingresos, gastos y balance (local)' },
  receipts: { title: 'Comprobantes', sub: 'Facturas y boletas registradas' },
  team: { title: 'Equipo', sub: 'Roles admin y vendedor' },
  backup: { title: 'Respaldo', sub: 'Exportar / restaurar datos y EmailJS' },
  profile: { title: 'Mi Perfil', sub: 'Datos de tu cuenta de administrador' }
};

function guardAdminPage() {
  if (!isLoggedIn() || !isAdmin()) {
    window.location.href = 'app.html';
    return false;
  }
  return true;
}

function adminLogout() {
  logout();
  window.location.href = 'app.html';
}

function switchAdminSection(section) {
  // secciones nuevas se renderizan abajo

  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.section === section);
  });
  const el = document.getElementById('section-' + section);
  if (el) el.classList.add('active');

  const meta = ADMIN_SECTION_META[section] || { title: section, sub: '' };
  const titleEl = document.getElementById('adminSectionTitle');
  const subEl = document.getElementById('adminSectionSub');
  if (titleEl) titleEl.textContent = meta.title;
  if (subEl) subEl.textContent = meta.sub;

  if (section === 'dashboard') {
    renderAdminDashboard();
    renderActivityFeed();
  } else if (section === 'products') {
    renderAdminTable();
  } else if (section === 'orders') {
    renderAdminOrders();
    updateAdminBadges();
  } else if (section === 'clients') {
    renderAdminClients();
    updateAdminBadges();
  } else if (section === 'emails') { try { renderAdminEmails(); } catch (e) { console.warn(e); } }
  if (section === 'quotes') {
    renderAdminQuotes();
    updateAdminBadges();
  } else if (section === 'insights') {
    generateInsights();
  } else if (section === 'profile') {
    renderAdminProfile();
  }

  updateAdminNavBadges();
  // Close mobile sidebar
  document.getElementById('adminSidebar')?.classList.remove('open');

  if (section === 'finance') renderFinance();
  if (section === 'receipts') renderReceipts();
  if (section === 'team') renderTeam();
  if (section === 'backup') renderBackupStatus();

}

function renderActivityFeed() {
  const feed = document.getElementById('activityFeed');
  if (!feed) return;

  const items = [];

  const log = (typeof activityLog !== 'undefined' && Array.isArray(activityLog))
    ? activityLog
    : JSON.parse(localStorage.getItem('activityLog') || '[]');
  log.slice(0, 6).forEach(a => {
    items.push({
      time: a.date ? new Date(a.date).toLocaleString('es', { dateStyle: 'short', timeStyle: 'short' }) : '—',
      text: `👤 <strong>${a.user || 'Sistema'}</strong> (${a.role || '—'}): ${a.text}`
    });
  });

  // Recent orders
  orders.slice(0, 4).forEach(o => {
    const pay = o.paymentMethod ? ` · ${String(o.paymentMethod).toUpperCase()}` : '';
    items.push({
      time: new Date(o.date).toLocaleString('es', { dateStyle: 'short', timeStyle: 'short' }),
      text: `Pedido <strong>${o.id}</strong> por ${formatPrice(o.total)} · ${o.items.length} producto(s)${pay}`
    });
  });

  // Low stock
  products.filter(p => p.stock > 0 && p.stock <= 5).slice(0, 3).forEach(p => {
    items.push({
      time: 'Stock',
      text: `⚠️ <strong>${p.name}</strong> tiene solo ${p.stock} unidad(es)`
    });
  });

  // Out of stock
  products.filter(p => p.stock <= 0).slice(0, 2).forEach(p => {
    items.push({
      time: 'Agotado',
      text: `❌ <strong>${p.name}</strong> sin stock`
    });
  });

  // New clients
  users.filter(u => u.role === 'client').slice(-2).forEach(u => {
    items.push({
      time: u.createdAt || '—',
      text: `👤 Nuevo cliente: <strong>${u.name}</strong>`
    });
  });

  if (items.length === 0) {
    feed.innerHTML = '<div class="empty-admin"><div class="big">📭</div><p>Sin actividad reciente</p></div>';
    return;
  }

  feed.innerHTML = items.slice(0, 8).map(i => `
    <div class="activity-item">
      <div class="act-time">${i.time}</div>
      <div class="act-text">${i.text}</div>
    </div>
  `).join('');
}

function renderAdminOrders() {
  const list = document.getElementById('adminOrdersList');
  if (!list) return;

  const q = (document.getElementById('adminOrdersSearch')?.value || '').toLowerCase().trim();
  const sort = document.getElementById('adminOrdersSort')?.value || 'recent';
  const statusFilter = document.getElementById('adminOrdersStatus')?.value || 'all';

  let rows = [...orders];
  if (q) {
    rows = rows.filter(o => {
      const user = users.find(u => u.id === o.userId);
      const hay = [
        o.id,
        user?.name,
        user?.email,
        o.userName,
        o.userEmail,
        o.paymentMethod,
        o.status,
        ...(o.items || []).map(it => it.name)
      ].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }
  if (statusFilter !== 'all') {
    rows = rows.filter(o => (o.status || 'pendiente').toLowerCase() === statusFilter);
  }

  if (sort === 'recent') rows.sort((a, b) => new Date(b.date) - new Date(a.date));
  else if (sort === 'oldest') rows.sort((a, b) => new Date(a.date) - new Date(b.date));
  else if (sort === 'amount-desc') rows.sort((a, b) => (b.total || 0) - (a.total || 0));
  else if (sort === 'amount-asc') rows.sort((a, b) => (a.total || 0) - (b.total || 0));
  else if (sort === 'unseen') rows.sort((a, b) => Number(!b.seenByAdmin) - Number(!a.seenByAdmin));

  const countEl = document.getElementById('adminOrdersCount');
  const unseen = orders.filter(o => o.seenByAdmin === false).length;
  if (countEl) {
    countEl.textContent = rows.length + ' de ' + orders.length + ' pedidos' +
      (unseen ? ' · ' + unseen + ' nuevo' + (unseen > 1 ? 's' : '') : '');
  }

  if (rows.length === 0) {
    list.innerHTML = '<div class="empty-admin"><div class="big">📭</div><p>' + (orders.length ? 'Sin resultados' : 'Aún no hay pedidos') + '</p></div>';
    updateAdminBadges();
    return;
  }

  const statuses = (typeof ORDER_STATUSES !== 'undefined') ? ORDER_STATUSES : [
    { id: 'pendiente', label: 'Pendiente' },
    { id: 'pagado', label: 'Pagado' },
    { id: 'preparando', label: 'Preparando' },
    { id: 'enviado', label: 'Enviado' },
    { id: 'entregado', label: 'Entregado' },
    { id: 'cancelado', label: 'Cancelado' }
  ];

  list.innerHTML = rows.map(o => {
    const user = users.find(u => u.id === o.userId);
    const st = (typeof orderStatusMeta === 'function')
      ? orderStatusMeta(o.status)
      : { id: o.status || 'pendiente', label: o.status || 'Pendiente', class: 'in' };
    const isNew = o.seenByAdmin === false;
    const opts = statuses.map(s =>
      `<option value="${s.id}" ${(o.status || 'pagado') === s.id ? 'selected' : ''}>${s.label}</option>`
    ).join('');
    return `
      <div class="order-row${isNew ? ' order-new' : ''}" data-order-id="${o.id}">
        <div class="order-row-main">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <strong class="order-id">${o.id}</strong>
            ${isNew ? '<span class="badge-new-order">NUEVO</span>' : ''}
          </div>
          <div class="order-meta">
            ${o.userName || user?.name || 'Usuario #' + o.userId} · ${o.userEmail || user?.email || ''} · ${new Date(o.date).toLocaleString('es')}
          </div>
          <div class="order-items">
            ${(o.items || []).map(it => `${it.name} ×${it.qty}`).join(' · ')}
          </div>
        </div>
        <div class="order-row-side">
          <div class="order-total">${formatPrice(o.total)}</div>
          ${o.discount > 0 ? `<small class="order-disc">Desc: -${formatPrice(o.discount)}</small>` : ''}
          <div class="order-pills">
            <span class="status-pill ${st.class}">${st.label}</span>
            ${o.paymentMethod ? `<span class="status-pill offer">${String(o.paymentMethod).toUpperCase()}</span>` : ''}
            <span class="status-pill ${(typeof paymentStatusMeta==='function'?paymentStatusMeta(o.paymentStatus).class:'in')}">${typeof paymentStatusMeta==='function'?paymentStatusMeta(o.paymentStatus).label:(o.paymentStatus||'cobro')}</span>
          </div>
          <label class="order-status-label">Envío
            <select class="admin-select order-status-select" data-order-id="${o.id}" onchange="adminUpdateOrderStatus('${o.id}', this.value)">
              ${opts}
            </select>
          </label>
          <label class="order-status-label">Cobro
            <select class="admin-select order-status-select" onchange="adminUpdatePaymentStatus('${o.id}', this.value)">
              ${(typeof PAYMENT_STATUSES !== 'undefined' ? PAYMENT_STATUSES : [{id:'pendiente',label:'Pendiente de pago'},{id:'prepagado',label:'Prepagado'},{id:'parcial',label:'Pago parcial'},{id:'pagado',label:'Pagado'},{id:'anulado',label:'Anulado'}]).map(s => `<option value="${s.id}" ${(o.paymentStatus || 'pagado') === s.id ? 'selected' : ''}>${s.label}</option>`).join('')}
            </select>
          </label>
          <div class="order-admin-actions">
            <button type="button" class="btn-ghost btn-sm" onclick="adminMarkOrderSeen('${o.id}')">✓ Visto</button>
            <button type="button" class="btn-ghost btn-sm" onclick="printOrder('${o.id}')">🖨️ Imprimir</button>
            <button type="button" class="btn-secondary btn-sm" onclick="openPaymentLogModal('${o.id}', ${Number(o.total)||0})">💵 Cobro</button>
            <a class="btn-secondary btn-sm" target="_blank" rel="noopener"
              href="${typeof getWhatsAppOrderUrl === 'function' ? getWhatsAppOrderUrl(o) : '#'}"
              style="text-decoration:none">💬 WA</a>
          </div>
          ${(o.paymentLogs && o.paymentLogs.length) ? `<div style="margin-top:8px;font-size:11px;color:#94a3b8;text-align:right">${o.paymentLogs.map(pl => `${pl.method}: S/ ${Number(pl.amount).toFixed(2)}`).join(' · ')}</div>` : ''}
        </div>
      </div>`;
  }).join('');
  updateAdminBadges();
}

function adminUpdateOrderStatus(orderId, status) {
  const o = orders.find(x => x.id === orderId);
  if (!o) return;
  o.status = status;
  o.seenByAdmin = true;
  saveOrders();
  showToast('Estado actualizado: ' + status, 'success');
  renderAdminOrders();
}

function adminMarkOrderSeen(orderId) {
  const o = orders.find(x => x.id === orderId);
  if (!o) return;
  o.seenByAdmin = true;
  saveOrders();
  renderAdminOrders();
}

function adminMarkAllOrdersSeen() {
  orders.forEach(o => { o.seenByAdmin = true; });
  saveOrders();
  renderAdminOrders();
  showToast('Todos los pedidos marcados como vistos', 'success');
}

function adminUpdatePaymentStatus(orderId, status) {
  const o = orders.find(x => x.id === orderId);
  if (!o) return;
  o.paymentStatus = status;
  o.seenByAdmin = true;
  saveOrders();
  showToast('Cobro actualizado: ' + status, 'success');
  renderAdminOrders();
}

function renderAdminQuotes() {
  const list = document.getElementById('adminQuotesList');
  if (!list) return;
  const qlist = (typeof quotes !== 'undefined' && Array.isArray(quotes))
    ? quotes
    : JSON.parse(localStorage.getItem('quotes') || '[]');
  const countEl = document.getElementById('adminQuotesCount');
  const unseen = qlist.filter(q => q.seenByAdmin === false).length;
  if (countEl) countEl.textContent = qlist.length + ' cotizaciones' + (unseen ? ' · ' + unseen + ' nuevas' : '');

  if (!qlist.length) {
    list.innerHTML = '<div class="empty-admin"><div class="big">📋</div><p>Aún no hay cotizaciones</p></div>';
    return;
  }

  list.innerHTML = qlist.map(q => {
    const isNew = q.seenByAdmin === false;
    return `
      <div class="order-row${isNew ? ' order-new' : ''}">
        <div class="order-row-main">
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <strong class="order-id">${q.id}</strong>
            ${isNew ? '<span class="badge-new-order">NUEVA</span>' : ''}
            <span class="status-pill ${q.status === 'atendida' ? 'in' : q.status === 'cerrada' ? 'out' : 'low'}">${q.status || 'nueva'}</span>
          </div>
          <div class="order-meta">${q.name} · ${q.email} · ${q.phone} · ${new Date(q.date).toLocaleString('es')}</div>
          <div class="order-items"><strong>${q.productName || 'General'}</strong> ×${q.qty || 1}${q.message ? ' — ' + q.message : ''}</div>
        </div>
        <div class="order-row-side">
          <label class="order-status-label">Estado
            <select class="admin-select order-status-select" onchange="adminUpdateQuoteStatus('${q.id}', this.value)">
              <option value="nueva" ${q.status==='nueva'?'selected':''}>Nueva</option>
              <option value="en_proceso" ${q.status==='en_proceso'?'selected':''}>En proceso</option>
              <option value="enviada" ${q.status==='enviada'?'selected':''}>Enviada</option>
              <option value="aceptada" ${q.status==='aceptada'?'selected':''}>Aceptada</option>
              <option value="atendida" ${q.status==='atendida'?'selected':''}>Atendida</option>
              <option value="cerrada" ${q.status==='cerrada'?'selected':''}>Cerrada</option>
            </select>
          </label>
          <div class="order-admin-actions">
            <button type="button" class="btn-primary btn-sm" onclick="adminOpenFormalizeQuote('${q.id}')">📤 Enviar cotización</button>
            <button type="button" class="btn-ghost btn-sm" onclick="adminCopyQuoteLink('${q.id}')">🔗 Link</button>
            <button type="button" class="btn-ghost btn-sm" onclick="downloadQuotePDF('${q.id}')">⬇️ Descargar PDF</button>
            <button type="button" class="btn-ghost btn-sm" onclick="printQuote('${q.id}', { autoPrint: true })">🖨️ Imprimir</button>
            <a class="btn-secondary btn-sm" target="_blank" rel="noopener"
              href="https://wa.me/${String(q.phone||'').replace(/\D/g,'')}?text=${encodeURIComponent('Hola '+q.name+', sobre tu cotización '+q.id+' de '+q.productName)}"
              style="text-decoration:none">💬 WA cliente</a>
            <button type="button" class="btn-ghost btn-sm" onclick="adminMarkQuoteSeen('${q.id}')">✓ Vista</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function adminUpdateQuoteStatus(id, status) {
  const qlist = (typeof quotes !== 'undefined') ? quotes : JSON.parse(localStorage.getItem('quotes') || '[]');
  const q = qlist.find(x => x.id === id);
  if (!q) return;
  q.status = status;
  q.seenByAdmin = true;
  if (typeof quotes !== 'undefined') { quotes = qlist; saveQuotes(); }
  else localStorage.setItem('quotes', JSON.stringify(qlist));
  renderAdminQuotes();
  updateAdminBadges();
}

function adminMarkQuoteSeen(id) {
  const qlist = (typeof quotes !== 'undefined') ? quotes : JSON.parse(localStorage.getItem('quotes') || '[]');
  const q = qlist.find(x => x.id === id);
  if (!q) return;
  q.seenByAdmin = true;
  if (typeof quotes !== 'undefined') { quotes = qlist; saveQuotes(); }
  else localStorage.setItem('quotes', JSON.stringify(qlist));
  renderAdminQuotes();
  updateAdminBadges();
}

function adminMarkAllQuotesSeen() {
  const qlist = (typeof quotes !== 'undefined') ? quotes : JSON.parse(localStorage.getItem('quotes') || '[]');
  qlist.forEach(q => { q.seenByAdmin = true; });
  if (typeof quotes !== 'undefined') { quotes = qlist; saveQuotes(); }
  else localStorage.setItem('quotes', JSON.stringify(qlist));
  renderAdminQuotes();
  updateAdminBadges();
  showToast('Cotizaciones marcadas como vistas', 'success');
}


function renderAdminClients() {
  const list = document.getElementById('adminClientsList');
  if (!list) return;

  const q = (document.getElementById('adminClientsSearch')?.value || '').toLowerCase().trim();
  let clients = users.filter(u => u.role === 'client');
  if (q) {
    clients = clients.filter(c =>
      (c.name || '').toLowerCase().includes(q) ||
      (c.email || '').toLowerCase().includes(q) ||
      (c.phone || '').toLowerCase().includes(q)
    );
  }

  const countEl = document.getElementById('adminClientsCount');
  const totalClients = users.filter(u => u.role === 'client').length;
  if (countEl) countEl.textContent = clients.length + ' de ' + totalClients + ' clientes';

  if (clients.length === 0) {
    list.innerHTML = '<div class="empty-admin"><div class="big">👥</div><p>' + (totalClients ? 'Sin resultados' : 'No hay clientes registrados') + '</p></div>';
    return;
  }

  list.innerHTML = clients.map(c => {
    const clientOrders = orders.filter(o => o.userId === c.id);
    const spent = clientOrders.reduce((s, o) => s + o.total, 0);
    const level = c.level || (typeof getUserLevel === 'function' ? getUserLevel(c.points || 0).name : 'Bronce');
    return `
      <div class="client-row">
        <div class="client-row-main">
          <div class="user-avatar client-avatar">${(c.name || 'C')[0].toUpperCase()}</div>
          <div>
            <strong>${c.name}</strong>
            <div class="client-email">${c.email}</div>
            <div class="client-sub">
              Desde ${c.createdAt || '—'}
              ${c.phone ? ' · ' + c.phone : ''}
              · ${level}
              ${c.points != null ? ' · ' + c.points + ' pts' : ''}
            </div>
          </div>
        </div>
        <div class="client-row-side">
          <div class="client-orders-n">${clientOrders.length} pedidos</div>
          <div class="client-spent">${formatPrice(spent)} gastados</div>
        </div>
      </div>`;
  }).join('');
}

function updateAdminNavBadges() {
  const bp = document.getElementById('badgeProducts');
  const bo = document.getElementById('badgeOrders');
  const bc = document.getElementById('badgeClients');
  if (bp) {
    bp.textContent = products.length || '';
    bp.style.display = products.length ? 'inline-flex' : 'none';
  }
  if (bo) {
    bo.textContent = orders.length || '';
    bo.style.display = orders.length ? 'inline-flex' : 'none';
  }
  if (bc) {
    const n = users.filter(u => u.role === 'client').length;
    bc.textContent = n || '';
    bc.style.display = n ? 'inline-flex' : 'none';
  }
}

function generateInsights() {
  const grid = document.getElementById('insightsGrid');
  if (!grid) return;

  const insights = [];
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5);
  const outStock = products.filter(p => p.stock <= 0);
  const topRated = [...products].filter(p => p.inStock).sort((a, b) => (b.rating || 0) - (a.rating || 0))[0];
  const offers = products.filter(p => p.offer);
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const avgOrder = orders.length ? totalRevenue / orders.length : 0;
  const cats = {};
  products.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
  const topCat = Object.entries(cats).sort((a, b) => b[1] - a[1])[0];
  const noDesc = products.filter(p => !p.description || p.description.length < 20);

  if (outStock.length > 0) {
    insights.push({
      icon: '🚨',
      title: `${outStock.length} producto(s) agotados`,
      text: outStock.slice(0, 3).map(p => p.name).join(', ') + (outStock.length > 3 ? '…' : '') + '. Reabastece para no perder ventas.',
      priority: 'high'
    });
  }
  if (lowStock.length > 0) {
    insights.push({
      icon: '⚡',
      title: 'Stock bajo detectado',
      text: `${lowStock.length} productos con ≤5 unidades. Prioriza reposición de: ${lowStock.slice(0, 2).map(p => p.name).join(', ')}.`,
      priority: 'med'
    });
  }
  if (topRated) {
    insights.push({
      icon: '⭐',
      title: 'Producto estrella',
      text: `"${topRated.name}" lidera con ⭐${topRated.rating} (${topRated.reviews} reseñas). Ideal para destacarlo en inicio.`,
      priority: 'low'
    });
  }
  if (offers.length === 0) {
    insights.push({
      icon: '🔥',
      title: 'Sin ofertas activas',
      text: 'No hay productos en oferta. Crear promociones puede aumentar la conversión hasta un 25%.',
      priority: 'med'
    });
  } else {
    insights.push({
      icon: '🔥',
      title: `${offers.length} ofertas activas`,
      text: 'Buen ritmo promocional. Revisa que tengan stock suficiente para no frustrar a los clientes.',
      priority: 'low'
    });
  }
  if (orders.length > 0) {
    insights.push({
      icon: '💵',
      title: 'Ticket promedio',
      text: `Ingresos totales ${formatPrice(totalRevenue)} en ${orders.length} pedidos. Ticket medio: ${formatPrice(avgOrder)}.`,
      priority: 'low'
    });
  } else {
    insights.push({
      icon: '🛒',
      title: 'Aún no hay ventas',
      text: 'Comparte la tienda o activa cupones (BIENVENIDO10) para atraer las primeras compras.',
      priority: 'med'
    });
  }
  if (topCat) {
    insights.push({
      icon: '📂',
      title: `Categoría dominante: ${topCat[0]}`,
      text: `${topCat[1]} productos. Considera equilibrar el catálogo o potenciar las otras categorías.`,
      priority: 'low'
    });
  }
  if (noDesc.length > 0) {
    insights.push({
      icon: '📝',
      title: 'Descripciones incompletas',
      text: `${noDesc.length} productos tienen descripción corta o vacía. Mejora el SEO y la conversión.`,
      priority: 'med'
    });
  }
  const clients = users.filter(u => u.role === 'client').length;
  insights.push({
    icon: '👥',
    title: `${clients} cliente(s) registrados`,
    text: clients < 3
      ? 'Base de clientes pequeña. Facilita el registro y ofrece beneficios exclusivos.'
      : 'Buena base de usuarios. Analiza pedidos para campañas de recompra.',
    priority: clients < 3 ? 'med' : 'low'
  });

  grid.innerHTML = insights.map(i => `
    <div class="insight-card priority-${i.priority}">
      <div class="insight-icon">${i.icon}</div>
      <h4>${i.title}</h4>
      <p>${i.text}</p>
    </div>
  `).join('');
}

function renderAdminProfile() {
  if (!currentUser) return;
  const avatar = document.getElementById('profileAvatarLg');
  const nameEl = document.getElementById('profileDisplayName');
  const meta = document.getElementById('profileMeta');

  if (avatar) avatar.textContent = (currentUser.name || 'A')[0].toUpperCase();
  if (nameEl) nameEl.textContent = currentUser.name || 'Administrador';

  const fullUser = users.find(u => u.id === currentUser.id) || currentUser;
  if (meta) {
    meta.innerHTML = `
      <div class="profile-meta-item"><span>Email</span><span>${fullUser.email || '—'}</span></div>
      <div class="profile-meta-item"><span>Teléfono</span><span>${fullUser.phone || '—'}</span></div>
      <div class="profile-meta-item"><span>Dirección</span><span>${fullUser.address || '—'}</span></div>
      <div class="profile-meta-item"><span>Miembro desde</span><span>${fullUser.createdAt || '—'}</span></div>
      <div class="profile-meta-item"><span>Rol</span><span>Administrador</span></div>
    `;
  }

  const n = document.getElementById('adminProfName');
  const e = document.getElementById('adminProfEmail');
  const p = document.getElementById('adminProfPhone');
  const a = document.getElementById('adminProfAddress');
  if (n) n.value = fullUser.name || '';
  if (e) e.value = fullUser.email || '';
  if (p) p.value = fullUser.phone || '';
  if (a) a.value = fullUser.address || '';
}

function initAdminPage() {
  if (!guardAdminPage()) return;

  // Theme
  initTheme();
  // Force dark-ish admin look but still respect toggle
  if (localStorage.getItem('theme') !== 'light') {
    document.body.classList.add('dark-mode');
    const t = document.getElementById('themeToggle');
    if (t) t.textContent = '☀️';
  }

  // User chip
  const chipName = document.getElementById('adminUserName');
  const chipAvatar = document.querySelector('#adminUserChip .user-avatar');
  if (chipName) chipName.textContent = (currentUser.name || 'Admin').split(' ')[0];
  if (chipAvatar) chipAvatar.textContent = (currentUser.name || 'A')[0].toUpperCase();

  // Sidebar toggle mobile
  const sidebarEl = document.getElementById('adminSidebar');
  document.getElementById('sidebarToggle')?.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebarEl?.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!sidebarEl || !sidebarEl.classList.contains('open')) return;
    if (window.innerWidth > 960) return;
    if (!sidebarEl.contains(e.target) && !e.target.closest('#sidebarToggle')) {
      sidebarEl.classList.remove('open');
    }
  });

  // Profile form
  const form = document.getElementById('adminProfileForm');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('adminProfName').value.trim();
      const phone = document.getElementById('adminProfPhone').value.trim();
      const address = document.getElementById('adminProfAddress').value.trim();
      const newPass = document.getElementById('adminProfPassword').value;
      const idx = users.findIndex(u => u.id === currentUser.id);
      if (idx === -1) return;
      users[idx].name = name;
      users[idx].phone = phone;
      users[idx].address = address;
      if (newPass && newPass.length >= 6) users[idx].password = newPass;
      saveUsers();
      currentUser.name = name;
      currentUser.phone = phone;
      currentUser.address = address;
      saveCurrentUser();
      showToast('✅ Perfil actualizado');
      renderAdminProfile();
      if (chipName) chipName.textContent = name.split(' ')[0];
      if (chipAvatar) chipAvatar.textContent = name[0].toUpperCase();
    };
  }

  // Product form & filters (reuse global setup)
  setupGlobalEvents();

  // Orders / clients filters
  document.getElementById('adminOrdersSearch')?.addEventListener('input', renderAdminOrders);
  document.getElementById('adminOrdersSort')?.addEventListener('change', renderAdminOrders);
  document.getElementById('adminOrdersStatus')?.addEventListener('change', renderAdminOrders);
  document.getElementById('adminMarkAllSeen')?.addEventListener('click', () => {
    if (typeof adminMarkAllOrdersSeen === 'function') adminMarkAllOrdersSeen();
  });
  document.getElementById('adminClientsSearch')?.addEventListener('input', renderAdminClients);

  if (typeof updateAdminBadges === 'function') updateAdminBadges();
  else if (typeof updateAdminNavBadges === 'function') updateAdminNavBadges();

  // Initial render
  switchAdminSection('dashboard');
}

function updateAdminBadges() {
  const bp = document.getElementById('badgeProducts');
  const bo = document.getElementById('badgeOrders');
  const bc = document.getElementById('badgeClients');
  if (bp) {
    bp.textContent = products.length || '';
    bp.style.display = products.length ? 'inline-flex' : 'none';
  }
  if (bo) {
    const unseen = orders.filter(o => o.seenByAdmin === false).length;
    bo.textContent = unseen ? String(unseen) : (orders.length || '');
    bo.style.display = (unseen || orders.length) ? 'inline-flex' : 'none';
    bo.classList.toggle('badge-alert', unseen > 0);
    if (unseen) bo.title = unseen + ' pedidos nuevos';
  }
  if (bc) {
    const clients = users.filter(u => u.role === 'client' || (!u.role && u.email !== 'admin@tienda.com'));
    bc.textContent = clients.length || '';
    bc.style.display = clients.length ? 'inline-flex' : 'none';
  }
  const bq = document.getElementById('badgeQuotes');
  if (bq) {
    const qlist = (typeof quotes !== 'undefined' && Array.isArray(quotes)) ? quotes : JSON.parse(localStorage.getItem('quotes') || '[]');
    const unseenQ = qlist.filter(q => q.seenByAdmin === false).length;
    bq.textContent = unseenQ ? String(unseenQ) : (qlist.length || '');
    bq.style.display = (unseenQ || qlist.length) ? 'inline-flex' : 'none';
    bq.classList.toggle('badge-alert', unseenQ > 0);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('admin') || document.body.classList.contains('admin-body')) {
    initAdminPage();
  }
});


/* ========== PRIORIDAD MEDIA / BAJA ========== */

function openPaymentLogModal(orderId, suggested) {
  const modal = document.getElementById('paymentLogModal');
  const idEl = document.getElementById('payLogOrderId');
  const amt = document.getElementById('payLogAmount');
  if (idEl) idEl.value = orderId;
  if (amt) amt.value = suggested ? Number(suggested).toFixed(2) : '';
  if (modal) modal.classList.add('show');
}

function savePaymentLog() {
  const orderId = document.getElementById('payLogOrderId')?.value;
  const amount = parseFloat(document.getElementById('payLogAmount')?.value || '0');
  const method = document.getElementById('payLogMethod')?.value || 'otro';
  const note = document.getElementById('payLogNote')?.value || '';
  if (!orderId || !(amount > 0)) {
    alert('Ingresa un monto válido');
    return;
  }
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const idx = orders.findIndex(o => String(o.id) === String(orderId));
  if (idx < 0) { alert('Pedido no encontrado'); return; }
  if (!orders[idx].paymentLogs) orders[idx].paymentLogs = [];
  orders[idx].paymentLogs.push({
    amount, method, note, date: new Date().toISOString()
  });
  const paid = orders[idx].paymentLogs.reduce((s, p) => s + Number(p.amount), 0);
  const total = Number(orders[idx].total) || 0;
  if (paid >= total - 0.01) orders[idx].paymentStatus = 'pagado';
  else if (paid > 0) orders[idx].paymentStatus = 'parcial';
  localStorage.setItem('orders', JSON.stringify(orders));
  // finanzas auto ingreso
  try {
    const fin = JSON.parse(localStorage.getItem('financeEntries') || '[]');
    fin.unshift({
      id: 'FIN-' + Date.now(),
      type: 'ingreso',
      concept: 'Cobro pedido ' + orderId,
      amount,
      date: new Date().toISOString().slice(0, 10),
      note: method + (note ? ' · ' + note : '')
    });
    localStorage.setItem('financeEntries', JSON.stringify(fin));
  } catch (_) {}
  document.getElementById('paymentLogModal')?.classList.remove('show');
  if (typeof renderAdminOrders === 'function') renderAdminOrders();
  alert('Cobro registrado');
}

function printOrder(orderId) {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const o = orders.find(x => String(x.id) === String(orderId));
  if (!o) return alert('Pedido no encontrado');
  const items = (o.items || []).map(it =>
    `<tr><td>${it.name}</td><td>${it.qty}</td><td>S/ ${Number(it.price||0).toFixed(2)}</td><td>S/ ${(Number(it.price||0)*Number(it.qty||0)).toFixed(2)}</td></tr>`
  ).join('');
  const w = window.open('', '_blank', 'width=800,height=900');
  if (!w) return alert('Permite ventanas emergentes para imprimir');
  w.document.write(`<!DOCTYPE html><html><head><title>Pedido ${o.id}</title>
    <style>
      body{font-family:system-ui,sans-serif;padding:32px;color:#111}
      h1{font-size:20px;margin:0 0 4px}
      .muted{color:#666;font-size:13px}
      table{width:100%;border-collapse:collapse;margin-top:20px}
      th,td{border-bottom:1px solid #ddd;padding:8px;text-align:left;font-size:13px}
      th{background:#f5f5f5}
      .total{font-size:18px;font-weight:800;margin-top:16px}
      @media print{button{display:none}}
    </style></head><body>
    <h1>Absolut 360 — Pedido ${o.id}</h1>
    <p class="muted">${new Date(o.date).toLocaleString('es')} · ${o.userName||''} · ${o.userEmail||''}</p>
    <p class="muted">Estado: ${o.status||'-'} · Cobro: ${o.paymentStatus||'-'} · Método: ${o.paymentMethod||'-'}</p>
    <table><thead><tr><th>Producto</th><th>Cant.</th><th>P. unit.</th><th>Subtotal</th></tr></thead>
    <tbody>${items}</tbody></table>
    <p class="total">Total: S/ ${Number(o.total||0).toFixed(2)}</p>
    ${(o.paymentLogs||[]).length ? '<p class="muted">Cobros: '+o.paymentLogs.map(p=>p.method+' S/ '+Number(p.amount).toFixed(2)).join(', ')+'</p>' : ''}
    <button onclick="window.print()">Imprimir / Guardar PDF</button>
    </body></html>`);
  w.document.close();
}

function printQuote(quoteId, opts) {
  opts = opts || {};
  const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
  const q = quotes.find(x => String(x.id) === String(quoteId));
  if (!q) return alert('Cotización no encontrada');
  const storeEmail = (typeof STORE_CONTACT !== 'undefined' && STORE_CONTACT.email)
    ? STORE_CONTACT.email
    : 'comercial@absolut-360.com';
  const qty = Number(q.qty) || 1;
  const total = Number(q.amount != null ? q.amount : (q.total || 0));
  const unit = q.unitPrice != null ? Number(q.unitPrice) : (qty ? total / qty : total);
  const lineName = q.productName || (q.items && q.items[0] && q.items[0].name) || 'Ítem cotizado';
  const fecha = q.date ? new Date(q.date).toLocaleString('es-PE') : new Date().toLocaleString('es-PE');
  const acceptUrl = (typeof getQuoteAcceptUrl === 'function') ? getQuoteAcceptUrl(q) : '';
  const w = window.open('', '_blank', 'width=820,height=960');
  if (!w) return alert('Permite ventanas emergentes para generar el PDF');
  w.document.write(`<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Cotización ${q.id} — Absolut 360</title>
    <style>
      *{box-sizing:border-box}
      body{font-family:Inter,system-ui,Segoe UI,sans-serif;padding:40px 48px;color:#0f172a;max-width:800px;margin:0 auto}
      .head{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #6d5ce7;padding-bottom:16px;margin-bottom:24px}
      .brand{font-size:22px;font-weight:800;letter-spacing:-0.02em}
      .brand span{display:block;font-size:12px;font-weight:600;color:#64748b;margin-top:4px}
      .doc-meta{text-align:right;font-size:13px;color:#475569}
      .doc-meta strong{display:block;font-size:16px;color:#6d5ce7;margin-bottom:4px}
      h2{font-size:14px;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;margin:0 0 10px}
      .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px}
      .card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;font-size:13px;line-height:1.55}
      .card strong{display:block;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#94a3b8;margin-bottom:6px}
      table{width:100%;border-collapse:collapse;margin:8px 0 20px}
      th,td{padding:10px 12px;text-align:left;font-size:13px;border-bottom:1px solid #e2e8f0}
      th{background:#f1f5f9;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b}
      td.num,th.num{text-align:right}
      .totals{margin-left:auto;width:260px;font-size:14px}
      .totals .row{display:flex;justify-content:space-between;padding:6px 0}
      .totals .grand{font-size:18px;font-weight:800;border-top:2px solid #0f172a;margin-top:8px;padding-top:10px;color:#6d5ce7}
      .notes{font-size:13px;color:#475569;background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:12px 14px;margin:16px 0}
      .footer{margin-top:32px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;line-height:1.5}
      .actions{margin-top:24px;display:flex;gap:10px;flex-wrap:wrap}
      .actions button{padding:10px 18px;border-radius:10px;border:none;font-weight:700;cursor:pointer;font-size:14px}
      .btn-print{background:linear-gradient(135deg,#6d5ce7,#c9a227);color:#fff}
      .btn-close{background:#e2e8f0;color:#334155}
      @media print{
        body{padding:0}
        .actions{display:none!important}
        .notes{break-inside:avoid}
      }
    </style></head><body>
    <div class="head">
      <div class="brand">Absolut 360<span>Agencia de publicidad · NFC & merchandising</span></div>
      <div class="doc-meta">
        <strong>COTIZACIÓN</strong>
        ${q.id}<br>
        ${fecha}<br>
        Estado: ${(q.status||'nueva').toUpperCase()}
      </div>
    </div>
    <div class="grid">
      <div class="card">
        <strong>Cliente</strong>
        ${(q.name||q.clientName||'—')}<br>
        ${(q.email||q.clientEmail||'')}<br>
        ${(q.phone||'')}
      </div>
      <div class="card">
        <strong>Emitido por / Enviar a</strong>
        Absolut 360<br>
        ${storeEmail}<br>
        WhatsApp comercial disponible
      </div>
    </div>
    <h2>Detalle</h2>
    <table>
      <thead><tr><th>Descripción</th><th class="num">Cant.</th><th class="num">P. unit. (S/)</th><th class="num">Subtotal (S/)</th></tr></thead>
      <tbody>
        <tr>
          <td>${lineName}${q.message ? '<br><span style="color:#64748b;font-size:12px">'+String(q.message).replace(/</g,'&lt;')+'</span>' : ''}</td>
          <td class="num">${qty}</td>
          <td class="num">${unit.toFixed(2)}</td>
          <td class="num">${(unit*qty).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
    <div class="totals">
      <div class="row"><span>Subtotal</span><span>S/ ${total.toFixed(2)}</span></div>
      <div class="row grand"><span>Total</span><span>S/ ${total.toFixed(2)}</span></div>
    </div>
    ${q.notes ? '<div class="notes"><strong>Notas:</strong> '+String(q.notes).replace(/</g,'&lt;')+'</div>' : ''}
    ${acceptUrl ? '<p style="font-size:12px;color:#64748b">Link de aceptación: <a href="'+acceptUrl+'">'+acceptUrl+'</a></p>' : ''}
    <div class="footer">
      Documento generado por Absolut 360 · Copia comercial: ${storeEmail}<br>
      Para guardar como PDF: usa el botón o Ctrl+P → “Guardar como PDF”.
    </div>
    <div class="actions">
      <button class="btn-print" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button>
      <button class="btn-close" onclick="window.close()">Cerrar</button>
    </div>
    <script>
      ${opts.autoPrint ? 'setTimeout(function(){ window.print(); }, 400);' : ''}
    <\/script>
    </body></html>`);
  w.document.close();
  return w;
}

/* Finanzas */

/** Carga jsPDF una sola vez desde CDN */
function loadJsPDF() {
  return new Promise((resolve, reject) => {
    if (window.jspdf && window.jspdf.jsPDF) return resolve(window.jspdf.jsPDF);
    if (window.jsPDF) return resolve(window.jsPDF);
    const existing = document.querySelector('script[data-jspdf]');
    if (existing) {
      existing.addEventListener('load', () => resolve((window.jspdf && window.jspdf.jsPDF) || window.jsPDF));
      existing.addEventListener('error', reject);
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js';
    s.async = true;
    s.dataset.jspdf = '1';
    s.onload = () => resolve((window.jspdf && window.jspdf.jsPDF) || window.jsPDF);
    s.onerror = () => reject(new Error('No se pudo cargar jsPDF'));
    document.head.appendChild(s);
  });
}

function getQuoteForPdf(quoteId) {
  const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
  return quotes.find(x => String(x.id) === String(quoteId));
}

/** Descarga un PDF real de la cotización (archivo .pdf) */
async function downloadQuotePDF(quoteId) {
  const q = getQuoteForPdf(quoteId);
  if (!q) {
    if (typeof showToast === 'function') showToast('Cotización no encontrada', 'error');
    else alert('Cotización no encontrada');
    return;
  }
  const storeEmail = (typeof STORE_CONTACT !== 'undefined' && STORE_CONTACT.email)
    ? STORE_CONTACT.email
    : 'comercial@absolut-360.com';
  const qty = Number(q.qty) || 1;
  const total = Number(q.amount != null ? q.amount : (q.total || 0));
  const unit = q.unitPrice != null ? Number(q.unitPrice) : (qty ? total / qty : total);
  const lineName = q.productName || 'Ítem cotizado';
  const fecha = q.date ? new Date(q.date).toLocaleString('es-PE') : new Date().toLocaleString('es-PE');

  try {
    if (typeof showToast === 'function') showToast('Generando PDF…', 'info');
    const JsPDF = await loadJsPDF();
    const doc = new JsPDF({ unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    let y = 18;

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(45, 40, 120);
    doc.text('Absolut 360', 14, y);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.text('Agencia de publicidad · NFC & merchandising', 14, y + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(109, 92, 231);
    doc.text('COTIZACIÓN', pageW - 14, y, { align: 'right' });
    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.setFont('helvetica', 'normal');
    doc.text(String(q.id), pageW - 14, y + 6, { align: 'right' });
    doc.text(fecha, pageW - 14, y + 11, { align: 'right' });
    doc.text('Estado: ' + String(q.status || 'nueva').toUpperCase(), pageW - 14, y + 16, { align: 'right' });

    y = 42;
    doc.setDrawColor(109, 92, 231);
    doc.setLineWidth(0.6);
    doc.line(14, y, pageW - 14, y);
    y += 10;

    // Client / company boxes
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text('CLIENTE', 14, y);
    doc.text('EMITIDO POR / ENVIAR A', pageW / 2 + 4, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(20);
    const clientLines = [
      q.name || q.clientName || '—',
      q.email || q.clientEmail || '',
      q.phone || ''
    ].filter(Boolean);
    const companyLines = [
      'Absolut 360',
      storeEmail,
      'WhatsApp comercial disponible'
    ];
    clientLines.forEach((line, i) => doc.text(String(line), 14, y + i * 5));
    companyLines.forEach((line, i) => doc.text(String(line), pageW / 2 + 4, y + i * 5));
    y += Math.max(clientLines.length, companyLines.length) * 5 + 10;

    // Table header
    doc.setFillColor(241, 245, 249);
    doc.rect(14, y - 4, pageW - 28, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text('Descripción', 16, y);
    doc.text('Cant.', 120, y);
    doc.text('P. unit.', 145, y);
    doc.text('Subtotal', 175, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(20);
    const desc = doc.splitTextToSize(lineName, 100);
    doc.text(desc, 16, y);
    doc.text(String(qty), 120, y);
    doc.text('S/ ' + unit.toFixed(2), 145, y);
    doc.text('S/ ' + (unit * qty).toFixed(2), 175, y);
    y += Math.max(desc.length * 5, 8) + 4;
    if (q.message) {
      doc.setFontSize(9);
      doc.setTextColor(100);
      const msg = doc.splitTextToSize(String(q.message), pageW - 32);
      doc.text(msg, 16, y);
      y += msg.length * 4.5 + 4;
    }

    y += 6;
    doc.setDrawColor(220);
    doc.line(120, y, pageW - 14, y);
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(109, 92, 231);
    doc.text('Total', 120, y);
    doc.text('S/ ' + total.toFixed(2), pageW - 14, y, { align: 'right' });

    if (q.notes) {
      y += 12;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text('Notas', 14, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40);
      const notes = doc.splitTextToSize(String(q.notes), pageW - 28);
      doc.text(notes, 14, y);
      y += notes.length * 4.5;
    }

    y = Math.max(y + 16, 250);
    doc.setFontSize(8);
    doc.setTextColor(140);
    doc.text('Documento generado por Absolut 360 · Copia comercial: ' + storeEmail, 14, y);
    doc.text('Adjunta este archivo al correo del cliente o a ' + storeEmail, 14, y + 4);

    const filename = 'Cotizacion-' + String(q.id).replace(/[^\w\-]+/g, '_') + '.pdf';
    doc.save(filename);
    if (typeof showToast === 'function') showToast('PDF descargado: ' + filename, 'success');
  } catch (err) {
    console.error(err);
    if (typeof showToast === 'function') showToast('Error al generar PDF. Usando vista de impresión…', 'error');
    else alert('Error al generar PDF');
    try { printQuote(quoteId, { autoPrint: true }); } catch (_) {}
  }
}

window.downloadQuotePDF = downloadQuotePDF;
window.printQuote = printQuote;


function getFinanceEntries() {
  return JSON.parse(localStorage.getItem('financeEntries') || '[]');
}
function saveFinanceEntries(list) {
  localStorage.setItem('financeEntries', JSON.stringify(list));
}
function openFinanceModal(type) {
  document.getElementById('financeType').value = type;
  document.getElementById('financeModalTitle').textContent = type === 'ingreso' ? '➕ Registrar ingreso' : '➖ Registrar gasto';
  document.getElementById('financeConcept').value = '';
  document.getElementById('financeAmount').value = '';
  document.getElementById('financeDate').value = new Date().toISOString().slice(0, 10);
  document.getElementById('financeNote').value = '';
  document.getElementById('financeModal')?.classList.add('show');
}
function saveFinanceEntry() {
  const type = document.getElementById('financeType').value;
  const concept = document.getElementById('financeConcept').value.trim();
  const amount = parseFloat(document.getElementById('financeAmount').value || '0');
  const date = document.getElementById('financeDate').value || new Date().toISOString().slice(0, 10);
  const note = document.getElementById('financeNote').value || '';
  if (!concept || !(amount > 0)) return alert('Completa concepto y monto');
  const list = getFinanceEntries();
  list.unshift({ id: 'FIN-' + Date.now(), type, concept, amount, date, note });
  saveFinanceEntries(list);
  document.getElementById('financeModal')?.classList.remove('show');
  renderFinance();
}
function renderFinance() {
  const list = getFinanceEntries();
  const ingresos = list.filter(x => x.type === 'ingreso').reduce((s, x) => s + Number(x.amount), 0);
  const gastos = list.filter(x => x.type === 'gasto').reduce((s, x) => s + Number(x.amount), 0);
  const stats = document.getElementById('financeStats');
  if (stats) {
    stats.innerHTML = `
      <div class="stat-card glass stat-success"><div class="stat-icon">📈</div><div class="stat-info"><div class="stat-value">S/ ${ingresos.toFixed(2)}</div><div class="stat-label">Ingresos</div></div></div>
      <div class="stat-card glass stat-danger"><div class="stat-icon">📉</div><div class="stat-info"><div class="stat-value">S/ ${gastos.toFixed(2)}</div><div class="stat-label">Gastos</div></div></div>
      <div class="stat-card glass stat-info"><div class="stat-icon">💵</div><div class="stat-info"><div class="stat-value">S/ ${(ingresos-gastos).toFixed(2)}</div><div class="stat-label">Balance</div></div></div>
      <div class="stat-card glass"><div class="stat-icon">📋</div><div class="stat-info"><div class="stat-value">${list.length}</div><div class="stat-label">Movimientos</div></div></div>`;
  }
  const meta = document.getElementById('financeMeta');
  if (meta) meta.textContent = list.length + ' movimientos · datos locales';
  const el = document.getElementById('financeList');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<div class="empty-admin"><div class="big">💰</div><p>Sin movimientos. Registra ingresos o gastos.</p></div>';
    return;
  }
  el.innerHTML = list.map(f => `
    <div class="order-row">
      <div class="order-row-main">
        <strong>${f.type === 'ingreso' ? '🟢' : '🔴'} ${f.concept}</strong>
        <div class="order-meta">${f.date}${f.note ? ' · ' + f.note : ''}</div>
      </div>
      <div class="order-row-side">
        <div class="order-total" style="color:${f.type==='ingreso'?'#34d399':'#f87171'}">${f.type==='ingreso'?'+':'-'} S/ ${Number(f.amount).toFixed(2)}</div>
        <button type="button" class="btn-ghost btn-sm" onclick="deleteFinanceEntry('${f.id}')">Eliminar</button>
      </div>
    </div>`).join('');
}
function deleteFinanceEntry(id) {
  if (!confirm('¿Eliminar movimiento?')) return;
  saveFinanceEntries(getFinanceEntries().filter(x => x.id !== id));
  renderFinance();
}

/* Comprobantes */
function getReceipts() {
  return JSON.parse(localStorage.getItem('receipts') || '[]');
}
function saveReceipt() {
  const fileInput = document.getElementById('receiptFileInput');
  const vendor = document.getElementById('receiptVendor')?.value.trim() || '';
  const amount = parseFloat(document.getElementById('receiptAmount')?.value || '0');
  const date = document.getElementById('receiptDate')?.value || new Date().toISOString().slice(0, 10);
  const note = document.getElementById('receiptNote')?.value || '';
  const file = fileInput?.files?.[0];
  const finish = (dataUrl) => {
    const list = getReceipts();
    list.unshift({
      id: 'RCP-' + Date.now(),
      vendor, amount, date, note,
      fileName: file?.name || '',
      preview: dataUrl || null,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('receipts', JSON.stringify(list));
    if (amount > 0) {
      const fin = getFinanceEntries();
      fin.unshift({ id: 'FIN-' + Date.now(), type: 'gasto', concept: 'Comprobante ' + (vendor || file?.name || ''), amount, date, note });
      saveFinanceEntries(fin);
    }
    if (fileInput) fileInput.value = '';
    document.getElementById('receiptVendor').value = '';
    document.getElementById('receiptAmount').value = '';
    document.getElementById('receiptNote').value = '';
    renderReceipts();
    alert('Comprobante guardado (local)');
  };
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = () => finish(reader.result);
    reader.readAsDataURL(file);
  } else {
    finish(null);
  }
}
function renderReceipts() {
  const el = document.getElementById('receiptsList');
  if (!el) return;
  const list = getReceipts();
  if (!list.length) {
    el.innerHTML = '<div class="empty-admin"><div class="big">🧾</div><p>Sin comprobantes aún</p></div>';
    return;
  }
  el.innerHTML = list.map(r => `
    <div class="order-row">
      <div class="order-row-main" style="display:flex;gap:12px;align-items:center">
        ${r.preview ? `<img src="${r.preview}" alt="" style="width:48px;height:48px;object-fit:cover;border-radius:8px">` : '<div style="width:48px;height:48px;background:#1e293b;border-radius:8px;display:flex;align-items:center;justify-content:center">📄</div>'}
        <div>
          <strong>${r.vendor || r.fileName || r.id}</strong>
          <div class="order-meta">${r.date}${r.note ? ' · ' + r.note : ''}</div>
        </div>
      </div>
      <div class="order-row-side">
        <div class="order-total">S/ ${Number(r.amount||0).toFixed(2)}</div>
        <button type="button" class="btn-ghost btn-sm" onclick="deleteReceipt('${r.id}')">Eliminar</button>
      </div>
    </div>`).join('');
}
function deleteReceipt(id) {
  if (!confirm('¿Eliminar comprobante?')) return;
  localStorage.setItem('receipts', JSON.stringify(getReceipts().filter(x => x.id !== id)));
  renderReceipts();
}

/* Equipo / roles */
function getStaff() {
  let staff = JSON.parse(localStorage.getItem('staffUsers') || '[]');
  if (!staff.length) {
    staff = [
      { id: 'staff-admin', name: 'Administrador', email: 'admin@tienda.com', role: 'admin', password: 'admin123' },
      { id: 'staff-vend', name: 'Vendedor Demo', email: 'vendedor@tienda.com', role: 'vendedor', password: 'vendedor123' }
    ];
    localStorage.setItem('staffUsers', JSON.stringify(staff));
  }
  return staff;
}
function renderTeam() {
  const el = document.getElementById('teamList');
  if (!el) return;
  const staff = getStaff();
  el.innerHTML = staff.map(s => `
    <div class="order-row">
      <div class="order-row-main">
        <strong>${s.name}</strong>
        <div class="order-meta">${s.email}</div>
      </div>
      <div class="order-row-side">
        <span class="status-pill ${s.role==='admin'?'in':'offer'}">${s.role === 'admin' ? 'Administrador' : 'Vendedor'}</span>
        ${s.id !== 'staff-admin' ? `<button type="button" class="btn-ghost btn-sm" onclick="deleteStaff('${s.id}')">Eliminar</button>` : ''}
      </div>
    </div>`).join('') +
    `<p style="padding:12px 16px;font-size:12px;color:#94a3b8">Demo: el rol “vendedor” puede limitarse a Pedidos y Cotizaciones. Login staff: vendedor@tienda.com / vendedor123</p>`;
}
function openTeamModal() {
  document.getElementById('teamName').value = '';
  document.getElementById('teamEmail').value = '';
  document.getElementById('teamRole').value = 'vendedor';
  document.getElementById('teamPassword').value = 'vendedor123';
  document.getElementById('teamModal')?.classList.add('show');
}
function saveTeamMember() {
  const name = document.getElementById('teamName').value.trim();
  const email = document.getElementById('teamEmail').value.trim().toLowerCase();
  const role = document.getElementById('teamRole').value;
  const password = document.getElementById('teamPassword').value || 'vendedor123';
  if (!name || !email) return alert('Nombre y email requeridos');
  const staff = getStaff();
  if (staff.some(s => s.email === email)) return alert('Ese email ya existe');
  staff.push({ id: 'staff-' + Date.now(), name, email, role, password });
  localStorage.setItem('staffUsers', JSON.stringify(staff));
  // also ensure in users store for login if used
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.some(u => (u.email||'').toLowerCase() === email)) {
      users.push({ id: Date.now(), name, email, password, role, points: 0 });
      localStorage.setItem('users', JSON.stringify(users));
    }
  } catch (_) {}
  document.getElementById('teamModal')?.classList.remove('show');
  renderTeam();
}
function deleteStaff(id) {
  if (!confirm('¿Eliminar usuario del equipo?')) return;
  localStorage.setItem('staffUsers', JSON.stringify(getStaff().filter(s => s.id !== id)));
  renderTeam();
}

/* Backup */
function downloadStoreBackup() {
  const data = {
    exportedAt: new Date().toISOString(),
    version: 'absolut360-demo-backup',
    products: JSON.parse(localStorage.getItem('products') || '[]'),
    orders: JSON.parse(localStorage.getItem('orders') || '[]'),
    quotes: JSON.parse(localStorage.getItem('quotes') || '[]'),
    users: JSON.parse(localStorage.getItem('users') || '[]'),
    productReviews: JSON.parse(localStorage.getItem('productReviews') || '[]'),
    financeEntries: getFinanceEntries(),
    receipts: getReceipts(),
    staffUsers: getStaff()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'absolut360-backup-' + new Date().toISOString().slice(0, 10) + '.json';
  a.click();
  URL.revokeObjectURL(a.href);
}
function downloadStoreBackupSQL() {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  let sql = '-- Absolut 360 demo export (no es MySQL real)\n';
  sql += '-- Generado: ' + new Date().toISOString() + '\n\n';
  sql += 'CREATE TABLE IF NOT EXISTS products (id INT, name TEXT, price DECIMAL(10,2), stock INT);\n';
  products.forEach(p => {
    sql += `INSERT INTO products VALUES (${Number(p.id)}, '${String(p.name||'').replace(/'/g,"''")}', ${Number(p.price)||0}, ${Number(p.stock)||0});\n`;
  });
  sql += '\nCREATE TABLE IF NOT EXISTS orders (id TEXT, total DECIMAL(10,2), status TEXT, date TEXT);\n';
  orders.forEach(o => {
    sql += `INSERT INTO orders VALUES ('${String(o.id).replace(/'/g,"''")}', ${Number(o.total)||0}, '${String(o.status||'').replace(/'/g,"''")}', '${String(o.date||'')}');\n`;
  });
  const blob = new Blob([sql], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'absolut360-backup-' + new Date().toISOString().slice(0, 10) + '.sql';
  a.click();
  URL.revokeObjectURL(a.href);
}
function restoreStoreBackup() {
  const input = document.getElementById('restoreBackupInput');
  const file = input?.files?.[0];
  if (!file) return alert('Selecciona un archivo JSON');
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!confirm('Esto reemplazará los datos locales. ¿Continuar?')) return;
      ['products','orders','quotes','users','productReviews','financeEntries','receipts','staffUsers'].forEach(k => {
        if (data[k]) localStorage.setItem(k === 'financeEntries' ? 'financeEntries' : k, JSON.stringify(data[k]));
      });
      alert('Respaldo restaurado. Recarga la página.');
      location.reload();
    } catch (e) {
      alert('JSON inválido');
    }
  };
  reader.readAsText(file);
}
function renderBackupStatus() {
  const el = document.getElementById('emailjsStatus');
  if (!el) return;
  const cfg = (typeof getEmailJSConfig === 'function') ? getEmailJSConfig() : (typeof EMAILJS_CONFIG !== 'undefined' ? EMAILJS_CONFIG : { enabled: false });
  if (cfg.ready) {
    el.innerHTML = '<span style="color:#34d399">● EmailJS listo (claves OK)</span>';
  } else if (cfg.enabled) {
    el.innerHTML = '<span style="color:#fbbf24">● EmailJS activado — falta pegar publicKey / serviceId / templateId en app.js o localStorage EMAILJS_KEYS</span>';
  } else {
    el.innerHTML = '<span style="color:#fbbf24">○ EmailJS desactivado (mailto + WhatsApp activos)</span>';
  }
}
function testEmailJSHint() {
  alert('Para activar EmailJS:\n1) Crea cuenta en https://www.emailjs.com\n2) Crea un Service y Template\n3) En app.js busca EMAILJS_CONFIG y pon:\n   enabled: true,\n   publicKey, serviceId, templateId\n4) Recarga la tienda.\n\nHasta entonces se usan mailto y WhatsApp.');
}
function runImageSeoDemo() {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const out = document.getElementById('seoDemoOut');
  if (!out) return;
  const sample = (products.length ? products : []).slice(0, 8);
  if (!sample.length) {
    out.textContent = 'No hay productos.';
    return;
  }
  out.innerHTML = sample.map(p => {
    const slug = String(p.name || 'producto')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60);
    return `<div style="padding:6px 0;border-bottom:1px solid rgba(148,163,184,0.12)"><strong>${p.name}</strong><br><code>${slug}-absolut360.jpg</code><br><span style="color:#94a3b8">Alt: ${String(p.name).slice(0, 80)} | Absolut 360</span></div>`;
  }).join('');
}

// Wire modal close buttons
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-close]')) {
    e.target.closest('.modal-overlay')?.classList.remove('show');
  }
});


/* ===== Cotización formal + link de aceptación (demo video) ===== */
function adminGetQuotes() {
  if (typeof quotes !== 'undefined' && Array.isArray(quotes)) return quotes;
  return JSON.parse(localStorage.getItem('quotes') || '[]');
}
function adminSaveQuotes(list) {
  if (typeof quotes !== 'undefined') { quotes = list; }
  localStorage.setItem('quotes', JSON.stringify(list));
  if (typeof saveQuotes === 'function') try { saveQuotes(); } catch (_) {}
}

function adminOpenFormalizeQuote(id) {
  const list = adminGetQuotes();
  const q = list.find(x => x.id === id);
  if (!q) return (typeof showToast === 'function' ? showToast('Cotización no encontrada', 'error') : alert('No encontrada'));
  let overlay = document.getElementById('formalizeQuoteModal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'formalizeQuoteModal';
    overlay.className = 'modal-overlay show';
    document.body.appendChild(overlay);
  }
  const suggested = q.amount != null ? Number(q.amount) : '';
  overlay.innerHTML = `
    <div class="modal" style="max-width:460px;padding:22px;background:#0f172a;color:#e2e8f0;border:1px solid rgba(148,163,184,0.2);border-radius:16px">
      <button class="modal-close" type="button" style="color:#e2e8f0" aria-label="Cerrar">&times;</button>
      <h3 style="margin:0 0 6px">📤 Enviar cotización formal (PDF)</h3>
      <p style="font-size:13px;color:#94a3b8;margin:0 0 10px">${q.id} · ${q.name} · ${q.productName || ''}</p>
      <div style="background:rgba(201,162,39,0.12);border:1px solid rgba(201,162,39,0.35);border-radius:10px;padding:10px 12px;margin-bottom:14px;font-size:12px;line-height:1.45">
        <strong style="color:#e8c547">📧 Correo comercial (como en el video)</strong><br>
        La copia del PDF se envía a:<br>
        <code style="color:#f1f5f9;font-size:13px">${(typeof STORE_CONTACT !== 'undefined' && STORE_CONTACT.email) ? STORE_CONTACT.email : 'comercial@absolut-360.com'}</code>
        <div style="margin-top:6px;color:#94a3b8">Cliente recibe: <strong style="color:#cbd5e1">${q.email || 'sin email'}</strong></div>
      </div>
      <div class="form-group" style="margin-bottom:10px"><label style="display:block;font-size:12px;margin-bottom:4px">Monto total (S/)</label>
        <input type="number" id="fqAmount" min="0" step="0.01" value="${suggested}" style="width:100%;padding:10px;border-radius:10px;border:1px solid #334155;background:#1e293b;color:#fff"></div>
      <div class="form-group" style="margin-bottom:10px"><label style="display:block;font-size:12px;margin-bottom:4px">Precio unitario (opcional)</label>
        <input type="number" id="fqUnit" min="0" step="0.01" value="${q.unitPrice != null ? q.unitPrice : ''}" style="width:100%;padding:10px;border-radius:10px;border:1px solid #334155;background:#1e293b;color:#fff"></div>
      <div class="form-group" style="margin-bottom:10px"><label style="display:block;font-size:12px;margin-bottom:4px">Notas / detalle</label>
        <textarea id="fqNotes" rows="3" style="width:100%;padding:10px;border-radius:10px;border:1px solid #334155;background:#1e293b;color:#fff">${(q.notes || '').replace(/</g,'&lt;')}</textarea></div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px">
        <button type="button" class="btn-primary" onclick="adminSendFormalQuote('${q.id}')">PDF + enviar correos</button>
        <button type="button" class="btn-ghost" onclick="document.getElementById('formalizeQuoteModal').classList.remove('show')">Cancelar</button>
      </div>
    </div>`;
  overlay.querySelector('.modal-close').onclick = () => overlay.classList.remove('show');
  overlay.classList.add('show');
}

function adminSendFormalQuote(id) {
  const amount = Number(document.getElementById('fqAmount')?.value || 0);
  const unit = document.getElementById('fqUnit')?.value;
  const notes = document.getElementById('fqNotes')?.value || '';
  if (!amount || amount <= 0) {
    return (typeof showToast === 'function' ? showToast('Ingresa un monto válido', 'error') : alert('Monto inválido'));
  }
  let q;
  if (typeof formalizeQuote === 'function') {
    q = formalizeQuote(id, amount, unit === '' ? null : Number(unit), notes);
  } else {
    const list = adminGetQuotes();
    q = list.find(x => x.id === id);
    if (!q) return;
    q.amount = amount;
    q.unitPrice = unit === '' ? null : Number(unit);
    q.notes = notes;
    q.status = 'enviada';
    q.seenByAdmin = true;
    if (!q.token) q.token = 'T' + Math.random().toString(36).slice(2, 10).toUpperCase();
    adminSaveQuotes(list);
  }
  document.getElementById('formalizeQuoteModal')?.classList.remove('show');

  // 1) PDF de cotización (imprimir / guardar como PDF) — como en el video
  // PDF descargable + vista imprimible
  try { downloadQuotePDF(q.id); } catch (e) { console.warn(e); }
  try { printQuote(q.id, { autoPrint: false }); } catch (e) { console.warn(e); }

  let link;
  if (typeof getQuoteAcceptUrl === 'function') link = getQuoteAcceptUrl(q);
  else link = 'app.html?acceptQuote=' + encodeURIComponent(q.token);

  const storeEmail = (typeof STORE_CONTACT !== 'undefined' && STORE_CONTACT.email)
    ? STORE_CONTACT.email
    : 'comercial@absolut-360.com';

  const subjectClient = 'Cotización ' + q.id + ' — Absolut 360 (PDF)';
  const bodyClient = [
    'Hola ' + q.name + ',',
    '',
    'Adjuntamos / generamos tu cotización formal de Absolut 360 en PDF.',
    '',
    'Nº cotización: ' + q.id,
    'Producto: ' + (q.productName || '-'),
    'Cantidad: ' + (q.qty || 1),
    'Total: S/ ' + Number(q.amount || 0).toFixed(2),
    q.notes ? ('Detalle: ' + q.notes) : '',
    '',
    'Se abrió una ventana para Imprimir → Guardar como PDF.',
    'Adjunta ese PDF a este correo si lo envías manualmente.',
    '',
    'Para ACEPTAR la cotización abre este enlace:',
    link,
    '',
    '— Absolut 360',
    storeEmail
  ].filter(Boolean).join('\n');

  // 2) Correo al CLIENTE
  const mailtoClient = 'mailto:' + encodeURIComponent(q.email || '') +
    '?subject=' + encodeURIComponent(subjectClient) +
    '&body=' + encodeURIComponent(bodyClient);
  window.open(mailtoClient, '_blank');

  // 3) Copia al correo comercial (como se ve en el video)
  const subjectAdmin = 'Cotización PDF ' + q.id + ' → ' + (q.name || '');
  const bodyAdmin = [
    'Copia comercial — cotización formal enviada',
    '',
    'Nº: ' + q.id,
    'Cliente: ' + q.name,
    'Email cliente: ' + q.email,
    'Teléfono: ' + q.phone,
    'Producto: ' + (q.productName || '-'),
    'Cantidad: ' + (q.qty || 1),
    'Monto: S/ ' + Number(q.amount || 0).toFixed(2),
    q.notes ? ('Notas: ' + q.notes) : '',
    '',
    'Link aceptación: ' + link,
    '',
    'El PDF se generó en la ventana de impresión (Guardar como PDF).',
    '',
    'Destinatario comercial: ' + storeEmail
  ].filter(Boolean).join('\n');

  setTimeout(() => {
    const mailtoAdmin = 'mailto:' + encodeURIComponent(storeEmail) +
      '?subject=' + encodeURIComponent(subjectAdmin) +
      '&body=' + encodeURIComponent(bodyAdmin);
    window.open(mailtoAdmin, '_blank');
  }, 600);

  // 4) EmailJS automático (si hay claves)
  try {
    if (typeof sendGenericEmailJS === 'function') {
      sendGenericEmailJS({
        subject: subjectAdmin,
        message: bodyAdmin,
        client_name: q.name,
        order_id: q.id
      });
    } else if (typeof sendOrderEmailJS === 'function') {
      sendOrderEmailJS({
        id: q.id,
        userName: q.name,
        userEmail: q.email,
        userPhone: q.phone,
        total: q.amount,
        items: [{ name: q.productName, qty: q.qty }],
        paymentMethod: 'cotizacion',
        extraSubject: subjectAdmin,
        extraMessage: bodyAdmin
      });
    }
  } catch (_) {}

  const phone = String(q.phone || '').replace(/\D/g, '');
  if (phone && confirm('¿Abrir WhatsApp al cliente con el link de aceptación?')) {
    window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(
      'Hola ' + q.name + ', tu cotización ' + q.id + ' por S/ ' + Number(q.amount).toFixed(2) +
      ' está lista (PDF). Acéptala aquí: ' + link
    ), '_blank');
  }
  if (typeof showToast === 'function') {
    showToast('PDF + correo a cliente y a ' + storeEmail, 'success');
  }
  if (typeof renderAdminQuotes === 'function') renderAdminQuotes();
  if (typeof updateAdminBadges === 'function') updateAdminBadges();
}

function adminCopyQuoteLink(id) {
  const list = adminGetQuotes();
  const q = list.find(x => x.id === id);
  if (!q) return;
  if (!q.token) {
    q.token = 'T' + Math.random().toString(36).slice(2, 10).toUpperCase();
    adminSaveQuotes(list);
  }
  const link = (typeof getQuoteAcceptUrl === 'function')
    ? getQuoteAcceptUrl(q)
    : ('app.html?acceptQuote=' + q.token);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(link).then(() => {
      if (typeof showToast === 'function') showToast('Link copiado', 'success');
    }).catch(() => prompt('Copia el link:', link));
  } else {
    prompt('Copia el link de aceptación:', link);
  }
}

window.adminOpenFormalizeQuote = adminOpenFormalizeQuote;
window.adminSendFormalQuote = adminSendFormalQuote;
window.adminCopyQuoteLink = adminCopyQuoteLink;


/* ===== Bandeja de correos (video Absolut 360) ===== */
function renderAdminEmails() {
  const list = document.getElementById('adminEmailsList');
  const countEl = document.getElementById('adminEmailsCount');
  if (!list) return;
  const emails = (typeof getSystemEmails === 'function')
    ? getSystemEmails()
    : JSON.parse(localStorage.getItem('systemEmails') || '[]');
  const unread = emails.filter(e => !e.read).length;
  if (countEl) countEl.textContent = emails.length + ' correos' + (unread ? ' · ' + unread + ' sin leer' : '');
  const badge = document.getElementById('badgeEmails');
  if (badge) {
    if (unread > 0) {
      badge.textContent = unread;
      badge.style.display = 'inline-flex';
      badge.classList.add('badge-alert');
    } else {
      badge.textContent = '';
      badge.style.display = 'none';
      badge.classList.remove('badge-alert');
    }
  }
  if (!emails.length) {
    list.innerHTML = '<div class="empty-admin"><div class="big">📧</div><p>Aún no hay correos del sistema.<br><small>Se generan al aceptar una cotización o confirmar un pedido.</small></p></div>';
    return;
  }
  list.innerHTML = emails.map(e => {
    const when = e.date ? new Date(e.date).toLocaleString('es') : '';
    const bodyPreview = String(e.body || '').slice(0, 180).replace(/</g, '&lt;') + (String(e.body||'').length > 180 ? '…' : '');
    return `<div class="order-row ${e.read ? '' : 'order-new'}">
      <div class="order-row-main">
        <div class="order-id">${e.read ? '' : '<span class="badge-new-order">NUEVO</span> '}📧 ${e.subject || '(sin asunto)'}</div>
        <div class="order-meta">Para: ${e.to || '—'} · ${when} · ${e.type || ''}</div>
        <div class="order-items">${bodyPreview}</div>
      </div>
      <div class="order-row-side">
        <div class="order-admin-actions">
          <button type="button" class="btn-primary btn-sm" onclick="adminOpenEmail('${e.id}')">Ver / Reenviar</button>
          <button type="button" class="btn-ghost btn-sm" onclick="adminMarkEmailRead('${e.id}')">Leído</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function adminOpenEmail(id) {
  const emails = (typeof getSystemEmails === 'function')
    ? getSystemEmails()
    : JSON.parse(localStorage.getItem('systemEmails') || '[]');
  const e = emails.find(x => x.id === id);
  if (!e) return;
  e.read = true;
  localStorage.setItem('systemEmails', JSON.stringify(emails));
  const mailto = 'mailto:' + encodeURIComponent(e.to || '') +
    '?subject=' + encodeURIComponent(e.subject || '') +
    '&body=' + encodeURIComponent(e.body || '');
  if (typeof showEmailSentModal === 'function') {
    showEmailSentModal({
      title: 'Correo del sistema',
      subject: e.subject,
      body: e.body,
      to: e.to,
      mailto
    });
  } else {
    window.open(mailto, '_blank');
  }
  renderAdminEmails();
}

function adminMarkEmailRead(id) {
  const emails = JSON.parse(localStorage.getItem('systemEmails') || '[]');
  const e = emails.find(x => x.id === id);
  if (e) e.read = true;
  localStorage.setItem('systemEmails', JSON.stringify(emails));
  renderAdminEmails();
}

function adminMarkAllEmailsRead() {
  const emails = JSON.parse(localStorage.getItem('systemEmails') || '[]');
  emails.forEach(e => e.read = true);
  localStorage.setItem('systemEmails', JSON.stringify(emails));
  renderAdminEmails();
  if (typeof showToast === 'function') showToast('Correos marcados como leídos', 'success');
}

function adminClearEmails() {
  if (!confirm('¿Vaciar la bandeja de correos del sistema?')) return;
  localStorage.setItem('systemEmails', '[]');
  renderAdminEmails();
}

window.renderAdminEmails = renderAdminEmails;
window.adminOpenEmail = adminOpenEmail;
window.adminMarkEmailRead = adminMarkEmailRead;
window.adminMarkAllEmailsRead = adminMarkAllEmailsRead;
window.adminClearEmails = adminClearEmails;
