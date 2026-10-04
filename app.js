// ============================================
// Absolut 360 Store v3.1 - Roles + Dashboard Cliente
// ============================================

const DEFAULT_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23667eea'/%3E%3Cstop offset='100%25' stop-color='%23764ba2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='400' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='18' fill='white' font-weight='bold'%3EProducto%3C/text%3E%3C/svg%3E";

const defaultProducts = [
  { id: 1, name: "PACK NETWORKING NFC", category: "Productos NFC", price: 109.00, oldPrice: null, stock: 40, rating: 4.8, reviews: 32, image: 'images/products/nfc-pack.jpg', inStock: true, offer: false, isNew: true, description: "Pack completo de networking con tarjetas NFC inteligentes para potenciar tu marca personal y profesional.", features: ["Tarjetas NFC", "Personalización", "App de gestión", "Diseño premium"], sku: "NFC-PACK-001", tag: "PACK" },
  { id: 2, name: "TARJETA DE PRESENTACIÓN DIGITAL NFC – INTELIGENTE Y PERSONALIZADA (ABSOLUT 360)", category: "Tecnología NFC", price: 90.00, oldPrice: null, stock: 99, rating: 4.9, reviews: 58, image: 'images/products/nfc-card.jpg', inStock: true, offer: false, isNew: true, description: "Conecta, comparte y destaca con la Tarjeta de Presentación Digital NFC de Absolut 360. Una solución innovadora, elegante y personalizada que te permite compartir tus datos de contacto, redes sociales y perfil profesional con solo acercar tu tarjeta a un celular compatible con NFC.\n\nIdeal para emprendedores, profesionales y empresas que buscan proyectar una imagen moderna, fortalecer su networking y generar nuevas oportunidades de negocio.\n\nAlternativa moderna y práctica a las tarjetas de presentación tradicionales. Ideal para reuniones, eventos, ferias y contactos comerciales.\n\nAbsolut 360: tu identidad profesional, siempre a un toque de distancia.", features: ["NFC inteligente", "Personalizable", "Perfil digital", "Redes sociales", "Diseño elegante"], sku: "NFC-TAR-002", tag: null },
  { id: 3, name: "WOWCARD NFC - TARJETA INTELIGENTE", category: "Productos NFC", price: 49.00, oldPrice: null, stock: 120, rating: 4.7, reviews: 41, image: 'images/products/wowcard.jpg', inStock: true, offer: true, isNew: false, description: "Tarjeta NFC inteligente Wowcard. Comparte tu información de contacto al instante.", features: ["Chip NFC", "Resistente", "Personalizable"], sku: "NFC-WOW-003", tag: null },
  { id: 4, name: "WOWRING NFC - ANILLO INTELIGENTE", category: "Productos NFC", price: 250.00, oldPrice: null, stock: 25, rating: 4.6, reviews: 18, image: 'images/products/wowring.jpg', inStock: true, offer: false, isNew: true, description: "Anillo inteligente con tecnología NFC. Discreto, moderno y siempre contigo.", features: ["Anillo NFC", "Acero premium", "Impermeable"], sku: "NFC-RING-004", tag: null },
  { id: 5, name: "CUADERNOS PUBLICITARIOS M1 PERSONALIZADOS X100", category: "Cuadernos", price: 1770.00, oldPrice: null, stock: 15, rating: 4.5, reviews: 12, image: 'images/products/notebook1.jpg', inStock: true, offer: false, isNew: false, description: "Cuadernos corporativos personalizados x100 unidades. Ideal para empresas y merchandising.", features: ["x100 und", "Logo personalizado", "Tapa dura"], sku: "CUA-M1-005", tag: null },
  { id: 6, name: "CUADERNOS PUBLICITARIOS M2 PERSONALIZADOS X100", category: "Cuadernos", price: 2950.00, oldPrice: null, stock: 10, rating: 4.5, reviews: 9, image: 'images/products/notebook2.jpg', inStock: true, offer: false, isNew: false, description: "Cuadernos publicitarios M2 personalizados x100. Acabado premium para tu marca.", features: ["x100 und", "Acabado premium", "Personalizable"], sku: "CUA-M2-006", tag: null },
  { id: 7, name: "CUADERNOS PUBLICITARIOS M3 PERSONALIZADOS X100", category: "Cuadernos", price: 3540.00, oldPrice: null, stock: 8, rating: 4.6, reviews: 7, image: 'images/products/notebook3.jpg', inStock: true, offer: false, isNew: false, description: "Línea M3 de cuadernos publicitarios x100. Máxima calidad corporativa.", features: ["x100 und", "Alta calidad", "Branding completo"], sku: "CUA-M3-007", tag: null },
  { id: 8, name: "CUADERNOS PUBLICITARIOS M4 PERSONALIZADOS X100", category: "Cuadernos", price: 1121.00, oldPrice: null, stock: 20, rating: 4.4, reviews: 14, image: 'images/products/notebook4.jpg', inStock: true, offer: false, isNew: false, description: "Cuadernos publicitarios M4 x100. Opción económica y profesional.", features: ["x100 und", "Económico", "Logo impresa"], sku: "CUA-M4-008", tag: null },
  { id: 9, name: "LANYARDS CORPORATIVOS PERSONALIZADOS", category: "Lanyards", price: 3.50, oldPrice: null, stock: 500, rating: 4.3, reviews: 22, image: 'images/products/lanyard.jpg', inStock: true, offer: false, isNew: false, description: "Lanyards personalizados con tu logo. Ideales para eventos y credenciales.", features: ["Full color", "Gancho metálico", "Pedido mínimo consultable"], sku: "LAN-001", tag: null },
  { id: 10, name: "TOMATODO PUBLICITARIO 750ML", category: "Tomatodos", price: 18.90, oldPrice: 22.00, stock: 80, rating: 4.5, reviews: 35, image: 'images/products/bottle.jpg', inStock: true, offer: true, isNew: false, description: "Tomatodo publicitario 750ml personalizable con logo de empresa.", features: ["750ml", "BPA free", "Impresión full color"], sku: "TOM-750", tag: null },
  { id: 11, name: "TAZA CERÁMICA PUBLICITARIA", category: "Tazas", price: 12.50, oldPrice: null, stock: 150, rating: 4.4, reviews: 28, image: 'images/products/mug.jpg', inStock: true, offer: false, isNew: false, description: "Taza de cerámica blanca para sublimación o impresión de logo.", features: ["Cerámica", "Sublimable", "Caja individual"], sku: "TAZ-001", tag: null },
  { id: 12, name: "KIT LAPICEROS CORPORATIVOS X50", category: "Lapiceros", price: 89.00, oldPrice: null, stock: 60, rating: 4.2, reviews: 19, image: 'images/products/pens.jpg', inStock: true, offer: false, isNew: false, description: "Kit de 50 lapiceros corporativos con grabado o impresión de marca.", features: ["x50 und", "Tinta azul", "Personalizable"], sku: "LAP-050", tag: null }
];

const COUPONS = {
  'BIENVENIDO10': { discount: 0.10, type: 'percent', min: 0 },
  'AHORRA20': { discount: 0.20, type: 'percent', min: 100 },
  'ENVIOGRATIS': { discount: 5, type: 'fixed', min: 30 }
};

// Sistema de fidelidad / lealtad
const LOYALTY = {
  pointsPerDollar: 1,
  redemptionRate: 100,
  levels: [
    { name: 'Bronce', min: 0, color: '#cd7f32', icon: '🥉', discount: 0 },
    { name: 'Plata', min: 500, color: '#c0c0c0', icon: '🥈', discount: 0.05 },
    { name: 'Oro', min: 2000, color: '#ffd700', icon: '🥇', discount: 0.10 },
    { name: 'Diamante', min: 5000, color: '#b9f2ff', icon: '💎', discount: 0.15 }
  ]
};

// ========== LOYICARD — Nivel A (link + QR de alta) ==========
// Tarjeta oficial Absolut 360 en LoyiCard
const LOYICARD = {
  enabled: true,
  registerUrl: 'https://app.loyicard.com/es/cm/ryaVAoK7',
  // QR oficial (archivo local). Si no carga, se genera uno con la URL.
  qrImage: 'loyicard-qr.png',
  brandName: 'Absolut 360 Club'
};

function getLoyiCardRegisterUrl() {
  return LOYICARD.registerUrl;
}

function getLoyiCardQrUrl(size = 160) {
  // Preferir el QR oficial subido; fallback generado
  if (LOYICARD.qrImage) return LOYICARD.qrImage;
  const data = encodeURIComponent(getLoyiCardRegisterUrl());
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=10&data=${data}`;
}

function openLoyiCardRegister() {
  const url = getLoyiCardRegisterUrl();
  localStorage.setItem('loyicard_register_clicked', '1');
  if (currentUser) {
    localStorage.setItem('loyicard_register_user_' + currentUser.id, new Date().toISOString());
  }
  window.open(url, '_blank', 'noopener,noreferrer');
  showToast('📱 Abriendo tu tarjeta LoyiCard…');
}

function hasClickedLoyiCardRegister() {
  if (!currentUser) return localStorage.getItem('loyicard_register_clicked') === '1';
  return !!localStorage.getItem('loyicard_register_user_' + currentUser.id);
}

function getUserLevel(points) {
  return LOYALTY.levels.slice().reverse().find(l => points >= l.min) || LOYALTY.levels[0];
}

function getUserPoints() {
  if (!currentUser) return 0;
  return currentUser.points || 0;
}

function syncUserPoints() {
  if (!currentUser) return;
  const idx = users.findIndex(u => u.id === currentUser.id);
  if (idx !== -1) {
    users[idx].points = currentUser.points || 0;
    users[idx].level = currentUser.level || getUserLevel(currentUser.points || 0).name;
    saveUsers();
  }
  saveCurrentUser();
}

function awardPoints(amount) {
  if (!isLoggedIn() || !isClient()) return 0;
  const pts = Math.floor(Number(amount) * LOYALTY.pointsPerDollar);
  if (pts <= 0) return 0;
  currentUser.points = (currentUser.points || 0) + pts;
  currentUser.level = getUserLevel(currentUser.points).name;
  syncUserPoints();
  showToast(`🎉 +${pts} puntos · Nivel ${currentUser.level}`);
  return pts;
}

function redeemPoints() {
  if (!isLoggedIn() || !isClient()) {
    showToast('Inicia sesión para canjear puntos', 'warning');
    return;
  }
  const pts = getUserPoints();
  const discount = Math.floor(pts / LOYALTY.redemptionRate);
  if (discount < 1) {
    showToast('Necesitas al menos 100 puntos para canjear', 'warning');
    return;
  }
  // Guardar cupón especial de puntos
  appliedCoupon = 'POINTS_REDEEM';
  window._pointsRedeemDiscount = discount;
  window._pointsRedeemCost = discount * LOYALTY.redemptionRate;
  renderCart();
  showToast(`💰 $${discount} de descuento con puntos aplicado`);
}

function cancelPointsRedeem() {
  if (appliedCoupon === 'POINTS_REDEEM') {
    appliedCoupon = null;
    window._pointsRedeemDiscount = 0;
    window._pointsRedeemCost = 0;
    renderCart();
  }
}

function getRecommendations(limit = 6) {
  if (!products.length) return [];
  const preferredCats = new Set();
  favorites.forEach(id => {
    const p = getProduct(id);
    if (p) preferredCats.add(p.category);
  });
  recentlyViewed.forEach(id => {
    const p = getProduct(id);
    if (p) preferredCats.add(p.category);
  });
  const exclude = new Set([...favorites, ...recentlyViewed, ...cart.map(c => c.id)]);
  let scored = products
    .filter(p => p.inStock && p.stock > 0 && !exclude.has(p.id))
    .map(p => {
      let score = (p.rating || 0) * 10 + Math.min(p.reviews || 0, 50) * 0.2;
      if (preferredCats.has(p.category)) score += 25;
      if (p.offer) score += 8;
      if (p.isNew) score += 5;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score);
  if (scored.length < limit) {
    const more = products
      .filter(p => p.inStock && !scored.some(s => s.p.id === p.id))
      .map(p => ({ p, score: p.rating || 0 }));
    scored = scored.concat(more);
  }
  return scored.slice(0, limit).map(s => s.p);
}


// Usuarios por defecto
const defaultUsers = [
  { id: 1, name: 'Administrador', email: 'admin@tutienda.com', password: 'admin123', role: 'admin', phone: '', address: '', createdAt: '2026-01-01' },
  { id: 2, name: 'Cliente Demo', email: 'cliente@demo.com', password: 'cliente123', role: 'client', phone: '555-0100', address: 'Calle Demo 45', createdAt: '2026-02-15', points: 350, level: 'Bronce' }
];

// ============================================
// ESTADO GLOBAL
// ============================================
let products = (() => {
  try {
    const ver = localStorage.getItem('productsVersion');
    const saved = JSON.parse(localStorage.getItem('products'));
    if (ver !== 'abs360-v3' || !Array.isArray(saved) || !saved.length) {
      localStorage.setItem('products', JSON.stringify(defaultProducts));
      localStorage.setItem('productsVersion', 'abs360-v3');
      return structuredClone(defaultProducts);
    }
    // Migrar si aún son categorías viejas
    const oldCats = ['Electrónica', 'Ropa', 'Hogar', 'Deportes'];
    if (saved.some(p => oldCats.includes(p.category))) {
      localStorage.setItem('products', JSON.stringify(defaultProducts));
      localStorage.setItem('productsVersion', 'abs360-v3');
      return structuredClone(defaultProducts);
    }
    // Si imagen es el SVG genérico "Producto", refrescar imágenes desde default
    const needsImg = saved.some(p => !p.image || (typeof p.image === 'string' && p.image.includes('Producto%3C')));
    if (needsImg) {
      const byId = Object.fromEntries(defaultProducts.map(d => [d.id, d.image]));
      saved.forEach(p => { if (byId[p.id]) p.image = byId[p.id]; });
      localStorage.setItem('products', JSON.stringify(saved));
    }
    return saved;
  } catch (_) {}
  localStorage.setItem('productsVersion', 'abs360-v3');
  return structuredClone(defaultProducts);
})();
let users = JSON.parse(localStorage.getItem('users')) || structuredClone(defaultUsers);
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
let compareList = JSON.parse(localStorage.getItem('compareList')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Contacto empresa (avisos pedido / WhatsApp / mailto)
/* Correo comercial donde llegan cotizaciones PDF y avisos (como en el video Absolut 360).
   Cambia este email por el real de la empresa. */
const STORE_CONTACT = {
  /* Correo comercial (como en el video de Absolut 360). Cámbialo por el real. */
  email: 'comercial@absolut-360.com',
  whatsapp: '51999999999', // código país + número real (sin +)
  name: 'Absolut 360'
};


/* ===== Bandeja de correos del sistema (demo como en el video) ===== */
function getSystemEmails() {
  try { return JSON.parse(localStorage.getItem('systemEmails') || '[]'); } catch (_) { return []; }
}
function saveSystemEmails(list) {
  localStorage.setItem('systemEmails', JSON.stringify(list.slice(0, 80)));
}
/** Registra un correo en la bandeja interna + intenta EmailJS + abre mailto */
function dispatchSystemEmail({ subject, body, to, type, meta }) {
  const entry = {
    id: 'MAIL-' + Date.now().toString(36).toUpperCase(),
    subject: subject || '(sin asunto)',
    body: body || '',
    to: to || STORE_CONTACT.email,
    from: 'sistema@absolut-360.com',
    type: type || 'aviso',
    meta: meta || {},
    date: new Date().toISOString(),
    read: false
  };
  const list = getSystemEmails();
  list.unshift(entry);
  saveSystemEmails(list);

  // EmailJS si está configurado (envío real sin abrir el cliente)
  try {
    if (typeof sendGenericEmailJS === 'function') {
      sendGenericEmailJS({
        subject: entry.subject,
        message: entry.body,
        client_name: (meta && meta.clientName) || '',
        order_id: (meta && (meta.orderId || meta.quoteId)) || ''
      });
    }
  } catch (_) {}

  const mailto = 'mailto:' + encodeURIComponent(entry.to) +
    '?subject=' + encodeURIComponent(entry.subject) +
    '&body=' + encodeURIComponent(entry.body);

  return { entry, mailto };
}

function openMailto(url) {
  try {
    const a = document.createElement('a');
    a.href = url;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => a.remove(), 500);
  } catch (_) {
    try { window.location.href = url; } catch (e) {}
  }
}

function showEmailSentModal({ subject, body, to, mailto, title }) {
  let overlay = document.getElementById('systemEmailModal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'systemEmailModal';
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
  }
  const preview = String(body || '').replace(/</g, '&lt;').replace(/\n/g, '<br>');
  overlay.innerHTML = `
    <div class="modal email-system-modal" style="max-width:520px;padding:0;overflow:hidden">
      <div class="email-sys-header">
        <div>
          <div class="email-sys-badge">📧 Correo del sistema</div>
          <h3 style="margin:6px 0 0;font-size:17px">${title || 'Correo generado'}</h3>
        </div>
        <button class="modal-close" type="button" aria-label="Cerrar">&times;</button>
      </div>
      <div class="email-sys-meta">
        <div><span>De</span> sistema@absolut-360.com</div>
        <div><span>Para</span> ${to || STORE_CONTACT.email}</div>
        <div><span>Asunto</span> <strong>${subject || ''}</strong></div>
      </div>
      <div class="email-sys-body">${preview}</div>
      <div class="email-sys-actions">
        <a class="btn-primary" href="${mailto}" style="text-align:center;text-decoration:none">✉️ Abrir en Gmail / Outlook</a>
        <button type="button" class="btn-secondary" id="emailSysCopy">Copiar contenido</button>
        <button type="button" class="btn-ghost" data-close-email>Cerrar</button>
      </div>
      <p class="email-sys-note">Como en el video: el sistema genera el correo al aceptar. Aquí se guarda en la bandeja del admin y puedes abrirlo con tu app de correo. Con EmailJS se envía solo.</p>
    </div>`;
  overlay.classList.add('show');
  overlay.querySelector('.modal-close').onclick = () => overlay.classList.remove('show');
  overlay.querySelector('[data-close-email]')?.addEventListener('click', () => overlay.classList.remove('show'));
  overlay.querySelector('#emailSysCopy')?.addEventListener('click', () => {
    const text = 'Asunto: ' + subject + '\n\n' + body;
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => showToast('Copiado', 'success'));
    else prompt('Copia:', text);
  });
  // Auto-abrir mailto (comportamiento del video: el correo “sale” al aceptar)
  setTimeout(() => openMailto(mailto), 600);
}

window.getSystemEmails = getSystemEmails;
window.dispatchSystemEmail = dispatchSystemEmail;
window.showEmailSentModal = showEmailSentModal;


// Opiniones por producto: { [productId]: [{ id, name, rating, comment, date, userId? }] }
let productReviews = JSON.parse(localStorage.getItem('productReviews') || '{}');
function saveReviews() {
  localStorage.setItem('productReviews', JSON.stringify(productReviews));
}
function getProductReviews(productId) {
  const key = String(productId);
  return Array.isArray(productReviews[key]) ? productReviews[key] : [];
}
function getReviewStats(productId) {
  const list = getProductReviews(productId);
  if (!list.length) return { count: 0, avg: 0 };
  const sum = list.reduce((s, r) => s + (Number(r.rating) || 0), 0);
  return { count: list.length, avg: Math.round((sum / list.length) * 10) / 10 };
}
function syncProductReviewMeta(productId) {
  const p = typeof getProduct === 'function' ? getProduct(productId) : products.find(x => x.id === productId);
  if (!p) return;
  const st = getReviewStats(productId);
  if (st.count > 0) {
    p.rating = st.avg;
    p.reviews = st.count;
    if (typeof saveProducts === 'function') saveProducts();
  }
}

function notifyNewReview(productId, review) {
  const product = (typeof products !== 'undefined' ? products : []).find(p => p.id === Number(productId));
  const subject = 'Nueva opinión - ' + (product?.name || productId);
  const message = 'Producto: ' + (product?.name || productId) + '\nCliente: ' + (review.name || '') + '\nRating: ' + review.rating + '/5\nComentario: ' + (review.comment || '-');
  try {
    if (typeof sendGenericEmailJS === 'function') {
      sendGenericEmailJS({ subject, message, client_name: review.name || 'Cliente', order_id: 'REV-' + productId });
    } else if (EMAILJS_CONFIG.enabled && typeof emailjs !== 'undefined') {
      const cfg = getEmailJSConfig();
      emailjs.send(cfg.serviceId, cfg.templateId, {
        to_email: (typeof STORE_CONTACT !== 'undefined' ? STORE_CONTACT.email : ''),
        subject, message, order_id: 'REV-' + productId, client_name: review.name || 'Cliente'
      }).catch(() => {});
    }
  } catch (_) {}
}


function addProductReview(productId, { name, rating, comment }) {
  const key = String(productId);
  if (!productReviews[key]) productReviews[key] = [];
  const entry = {
    id: 'REV-' + Date.now().toString(36),
    name: (name || 'Cliente').trim().slice(0, 60),
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    comment: (comment || '').trim().slice(0, 500),
    date: new Date().toISOString(),
    userId: (typeof currentUser !== 'undefined' && currentUser) ? currentUser.id : null
  };
  productReviews[key].unshift(entry);
  saveReviews();
  syncProductReviewMeta(productId);
  try { notifyNewReview(productId, entry); } catch (_) {}
  try { renderHomeTestimonials(); } catch (_) {}
  return entry;
}

const ORDER_STATUSES = [
  { id: 'pendiente', label: 'Pendiente', class: 'low' },
  { id: 'pagado', label: 'Pagado', class: 'in' },
  { id: 'preparando', label: 'Preparando', class: 'offer' },
  { id: 'enviado', label: 'Enviado', class: 'in' },
  { id: 'entregado', label: 'Entregado', class: 'in' },
  { id: 'cancelado', label: 'Cancelado', class: 'out' }
];
function orderStatusMeta(status) {
  const s = (status || 'pendiente').toLowerCase();
  return ORDER_STATUSES.find(x => x.id === s) || ORDER_STATUSES[0];
}

// Estados de cobro (como en el sistema real de Absolut 360)
const PAYMENT_STATUSES = [
  { id: 'pendiente', label: 'Pendiente de pago', class: 'low' },
  { id: 'prepagado', label: 'Prepagado', class: 'in' },
  { id: 'parcial', label: 'Pago parcial', class: 'offer' },
  { id: 'pagado', label: 'Pagado', class: 'in' },
  { id: 'anulado', label: 'Anulado', class: 'out' }
];
function paymentStatusMeta(status) {
  const s = (status || 'pendiente').toLowerCase();
  return PAYMENT_STATUSES.find(x => x.id === s) || PAYMENT_STATUSES[0];
}

// Cotizaciones (versión simple localStorage)
let quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
function saveQuotes() { localStorage.setItem('quotes', JSON.stringify(quotes)); }

// EmailJS (opcional). Completa tus IDs en https://www.emailjs.com — plan free ~200 mails/mes
/* EmailJS: pon enabled:true y tus IDs de https://www.emailjs.com (plan free ~200 mails/mes).
   Variables típicas del template: to_email, subject, message, order_id, client_name */
/* EmailJS activo. 
   1) Crea cuenta en https://www.emailjs.com (plan free ~200 mails/mes)
   2) Crea un Email Service (Gmail/Outlook)
   3) Crea un Template con variables: to_email, subject, message, order_id, client_name,
      customer_name, customer_email, customer_phone, total, items, payment_method
   4) Pega aquí publicKey, serviceId y templateId
   También puedes guardarlas en localStorage:
     localStorage.setItem('EMAILJS_KEYS', JSON.stringify({publicKey:'...', serviceId:'...', templateId:'...'}))
*/
const EMAILJS_CONFIG = {
  enabled: true,
  publicKey: 'TU_PUBLIC_KEY',
  serviceId: 'TU_SERVICE_ID',
  templateId: 'TU_TEMPLATE_ID'
};

function getEmailJSConfig() {
  const cfg = { ...EMAILJS_CONFIG };
  try {
    const saved = JSON.parse(localStorage.getItem('EMAILJS_KEYS') || 'null');
    if (saved && typeof saved === 'object') {
      if (saved.publicKey) cfg.publicKey = saved.publicKey;
      if (saved.serviceId) cfg.serviceId = saved.serviceId;
      if (saved.templateId) cfg.templateId = saved.templateId;
      if (saved.enabled != null) cfg.enabled = !!saved.enabled;
    }
  } catch (_) {}
  cfg.ready = !!(cfg.enabled && cfg.publicKey && cfg.publicKey !== 'TU_PUBLIC_KEY'
    && cfg.serviceId && cfg.serviceId !== 'TU_SERVICE_ID'
    && cfg.templateId && cfg.templateId !== 'TU_TEMPLATE_ID');
  return cfg;
}

function isEmailJSReady() {
  return getEmailJSConfig().ready && typeof emailjs !== 'undefined';
}

function ensureFloatingWhatsApp() {
  if (document.getElementById('floatingWhatsApp')) return;
  // No mostrar en panel admin
  if (document.body.classList.contains('admin-body')) return;
  const phone = (STORE_CONTACT.whatsapp || '').replace(/\D/g, '');
  if (!phone) return;
  const a = document.createElement('a');
  a.id = 'floatingWhatsApp';
  a.className = 'floating-whatsapp';
  a.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent('Hola Absolut 360, quiero consultar sobre productos.');
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.setAttribute('aria-label', 'Consultar por WhatsApp');
  a.title = 'Escríbenos por WhatsApp';
  a.innerHTML = `
    <span class="wa-pulse" aria-hidden="true"></span>
    <span class="wa-icon" aria-hidden="true">
      <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.004 3C9.383 3 4 8.383 4 15.004c0 2.3.66 4.445 1.805 6.268L4 29l7.95-1.78A11.94 11.94 0 0 0 16.004 27C22.625 27 28 21.617 28 15.004 28 8.383 22.625 3 16.004 3zm6.93 16.78c-.29.82-1.69 1.51-2.34 1.61-.6.09-1.36.13-2.2-.14-.51-.16-1.16-.37-2-.72-3.52-1.52-5.81-5.05-5.99-5.28-.18-.24-1.47-1.96-1.47-3.74s.93-2.65 1.26-3.01c.33-.36.72-.45.96-.45h.7c.22 0 .52-.08.81.62.29.72.99 2.49 1.08 2.67.09.18.15.39.03.62-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.36.37-.15.72.21.36.93 1.53 2 2.48 1.37 1.21 2.53 1.59 2.89 1.77.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.18.33.12 2.1.99 2.46 1.17.36.18.6.27.69.42.09.15.09.87-.21 1.69z"/>
      </svg>
    </span>
    <span class="wa-text">WhatsApp</span>`;
  document.body.appendChild(a);
}

function sendOrderEmailJS(order) {
  const cfg = getEmailJSConfig();
  if (!cfg.ready || typeof emailjs === 'undefined') return Promise.resolve(false);
  const user = (typeof users !== 'undefined' ? users.find(u => u.id === order.userId) : null) || {};
  const itemsText = (order.items || []).map(it => it.name + ' x' + it.qty).join(', ');
  const subject = (order.extraSubject) || ('Nuevo pedido ' + order.id + ' — Absolut 360');
  const message = (order.extraMessage) || (
    'Pedido: ' + order.id +
    '\nCliente: ' + (order.userName || user.name || '') +
    '\nEmail: ' + (order.userEmail || user.email || '') +
    '\nTel: ' + (order.userPhone || user.phone || '') +
    '\nTotal: ' + (typeof formatPrice === 'function' ? formatPrice(order.total) : order.total) +
    '\nItems: ' + itemsText +
    '\nPago: ' + (order.paymentMethod || '')
  );
  return emailjs.send(cfg.serviceId, cfg.templateId, {
    order_id: order.id,
    customer_name: order.userName || user.name || order.customerName || '',
    customer_email: order.userEmail || user.email || order.customerEmail || '',
    customer_phone: order.userPhone || user.phone || order.customerPhone || '',
    client_name: order.userName || user.name || order.customerName || '',
    total: (typeof formatPrice === 'function' ? formatPrice(order.total) : String(order.total)),
    items: itemsText,
    payment_method: order.paymentMethod || '',
    to_email: STORE_CONTACT.email,
    subject,
    message
  }).then(() => true).catch(err => { console.warn('EmailJS', err); return false; });
}

function sendGenericEmailJS({ subject, message, client_name, order_id }) {
  const cfg = getEmailJSConfig();
  if (!cfg.ready || typeof emailjs === 'undefined') return Promise.resolve(false);
  return emailjs.send(cfg.serviceId, cfg.templateId, {
    to_email: STORE_CONTACT.email,
    subject: subject || 'Aviso Absolut 360',
    message: message || '',
    client_name: client_name || '',
    order_id: order_id || '',
    customer_name: client_name || '',
    customer_email: '',
    customer_phone: '',
    total: '',
    items: '',
    payment_method: ''
  }).then(() => true).catch(err => { console.warn('EmailJS', err); return false; });
}

function createQuoteRequest(data) {
  const q = {
    id: 'COT-' + Date.now().toString(36).toUpperCase(),
    name: (data.name || '').trim(),
    email: (data.email || '').trim(),
    phone: (data.phone || '').trim(),
    productId: data.productId || null,
    productName: data.productName || '',
    qty: Number(data.qty) || 1,
    message: (data.message || '').trim(),
    status: 'nueva',
    seenByAdmin: false,
    date: new Date().toISOString(),
    token: 'T' + Math.random().toString(36).slice(2, 10).toUpperCase() + Date.now().toString(36).toUpperCase(),
    amount: null,
    unitPrice: null,
    notes: '',
    acceptedAt: null,
    orderId: null
  };
  quotes.unshift(q);
  saveQuotes();
  return q;
}

/** Link público para que el cliente acepte la cotización (como en el video) */
function getQuoteAcceptUrl(q) {
  const base = (location.origin && location.origin !== 'null')
    ? location.href.split('?')[0].replace(/admin\.html.*/i, 'app.html')
    : 'app.html';
  const clean = base.includes('app.html') ? base : base.replace(/[^/]*$/, 'app.html');
  return clean + '?acceptQuote=' + encodeURIComponent(q.token || q.id);
}

/** Formalizar cotización desde admin: monto + enviar link al cliente (email/WA) */
function formalizeQuote(id, amount, unitPrice, notes) {
  const q = quotes.find(x => x.id === id);
  if (!q) return null;
  q.amount = Number(amount) || 0;
  q.unitPrice = unitPrice != null ? Number(unitPrice) : (q.qty ? q.amount / q.qty : q.amount);
  q.notes = notes || q.notes || '';
  q.status = 'enviada';
  q.seenByAdmin = true;
  if (!q.token) q.token = 'T' + Math.random().toString(36).slice(2, 10).toUpperCase();
  saveQuotes();
  return q;
}

function buildQuoteAcceptedEmail(q, order) {
  const subject = 'Cotización ACEPTADA ' + q.id;
  const lines = [
    'Cotización ACEPTADA — Absolut 360',
    '',
    'Nº cotización: ' + q.id,
    'Cliente: ' + q.name,
    'Email: ' + q.email,
    'Teléfono: ' + q.phone,
    'Producto: ' + (q.productName || '-'),
    'Cantidad: ' + (q.qty || 1),
    'Monto total: S/ ' + Number(q.amount || 0).toFixed(2),
    order ? ('Pedido generado: ' + order.id) : '',
    q.notes ? ('Notas: ' + q.notes) : '',
    '',
    'Ver pedido en el panel admin o en el dashboard del cliente.',
    '',
    '— Sistema Absolut 360'
  ].filter(Boolean);
  return {
    subject,
    body: lines.join('\n'),
    mailto: 'mailto:' + (STORE_CONTACT.email || '') +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(lines.join('\n'))
  };
}

function buildQuoteSentEmail(q) {
  const link = getQuoteAcceptUrl(q);
  const subject = 'Cotización ' + q.id + ' — Absolut 360';
  const lines = [
    'Hola ' + q.name + ',',
    '',
    'Te enviamos tu cotización formal de Absolut 360:',
    '',
    'Nº: ' + q.id,
    'Producto: ' + (q.productName || '-'),
    'Cantidad: ' + (q.qty || 1),
    'Total: S/ ' + Number(q.amount || 0).toFixed(2),
    q.notes ? ('Detalle: ' + q.notes) : '',
    '',
    'Para ACEPTAR la cotización abre este enlace:',
    link,
    '',
    'También puedes responder a este correo o escribirnos por WhatsApp.',
    '',
    '— ' + (STORE_CONTACT.name || 'Absolut 360'),
    STORE_CONTACT.email || ''
  ].filter(Boolean);
  return {
    subject,
    body: lines.join('\n'),
    mailtoClient: 'mailto:' + encodeURIComponent(q.email) +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(lines.join('\n')),
    mailtoAdmin: 'mailto:' + encodeURIComponent(STORE_CONTACT.email || '') +
      '?subject=' + encodeURIComponent('Enviada ' + subject) +
      '&body=' + encodeURIComponent('Se generó link de aceptación para ' + q.name + '\n' + link),
    waClient: 'https://wa.me/' + String(q.phone || '').replace(/\D/g, '') +
      '?text=' + encodeURIComponent('Hola ' + q.name + ', tu cotización ' + q.id +
        ' por S/ ' + Number(q.amount || 0).toFixed(2) + ' está lista. Acéptala aquí: ' + link),
    link
  };
}

function acceptQuoteByToken(token) {
  if (!token) return { ok: false, msg: 'Token inválido' };
  const q = quotes.find(x => x.token === token || x.id === token);
  if (!q) return { ok: false, msg: 'Cotización no encontrada' };
  if (q.status === 'aceptada' && q.orderId) {
    return { ok: true, already: true, quote: q, order: (orders || []).find(o => o.id === q.orderId) };
  }
  if (q.status === 'cerrada' || q.status === 'rechazada') {
    return { ok: false, msg: 'Esta cotización ya no está disponible' };
  }
  if (q.amount == null || Number(q.amount) <= 0) {
    return { ok: false, msg: 'La cotización aún no tiene monto formal. Espera la respuesta del equipo.' };
  }

  const product = q.productId ? getProduct(q.productId) : null;
  const unit = q.unitPrice != null ? Number(q.unitPrice) : (product ? product.price : Number(q.amount) / (q.qty || 1));
  const qty = Number(q.qty) || 1;
  const order = {
    id: 'ORD-' + Date.now().toString(36).toUpperCase(),
    userId: currentUser ? currentUser.id : null,
    customerName: q.name,
    customerEmail: q.email,
    customerPhone: q.phone,
    items: [{
      id: product ? product.id : ('quote-' + q.id),
      name: q.productName || (product && product.name) || 'Ítem cotizado',
      price: unit,
      qty: qty,
      image: product ? product.image : ''
    }],
    subtotal: Number(q.amount),
    total: Number(q.amount),
    discount: 0,
    status: 'pagado',
    paymentStatus: 'prepagado',
    paymentMethod: 'cotizacion',
    seenByAdmin: false,
    date: new Date().toISOString(),
    fromQuoteId: q.id,
    notes: q.notes || ''
  };
  if (typeof orders === 'undefined') window.orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.unshift(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  q.status = 'aceptada';
  q.acceptedAt = new Date().toISOString();
  q.orderId = order.id;
  q.seenByAdmin = false;
  saveQuotes();

  // Correo tipo video: "Cotización ACEPTADA ABS-..."
  const mail = buildQuoteAcceptedEmail(q, order);
  try {
    if (typeof sendOrderEmailJS === 'function') {
      sendOrderEmailJS({
        id: order.id,
        customerName: q.name,
        total: order.total,
        extraSubject: mail.subject,
        extraMessage: mail.body
      });
    }
  } catch (_) {}

  return { ok: true, quote: q, order, mail };
}

function openAcceptQuoteModal(token) {
  const res = acceptQuoteByToken(token);
  let overlay = document.getElementById('acceptQuoteModal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'acceptQuoteModal';
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
  }
  if (!res.ok) {
    overlay.innerHTML = `
      <div class="modal" style="max-width:420px;padding:24px">
        <button class="modal-close" type="button" aria-label="Cerrar">&times;</button>
        <h3>📋 Cotización</h3>
        <p style="color:var(--color-danger)">${res.msg}</p>
        <button type="button" class="btn-secondary" onclick="document.getElementById('acceptQuoteModal').classList.remove('show')">Cerrar</button>
      </div>`;
    overlay.querySelector('.modal-close').onclick = () => overlay.classList.remove('show');
    overlay.classList.add('show');
    return res;
  }
  const q = res.quote;
  const o = res.order;
  const mail = res.mail || buildQuoteAcceptedEmail(q, o);

  // Como en el video: correo automático "Cotización ACEPTADA …"
  if (!res.already && typeof dispatchSystemEmail === 'function') {
    const dispatched = dispatchSystemEmail({
      subject: mail.subject,
      body: mail.body,
      to: STORE_CONTACT.email,
      type: 'cotizacion_aceptada',
      meta: { quoteId: q.id, orderId: o && o.id, clientName: q.name }
    });
    // Vista del correo (Gmail-style demo) + abre mailto
    setTimeout(() => {
      showEmailSentModal({
        title: 'Cotización ACEPTADA — correo enviado',
        subject: mail.subject,
        body: mail.body,
        to: STORE_CONTACT.email,
        mailto: dispatched.mailto || mail.mailto
      });
    }, 350);
  }

  overlay.innerHTML = `
    <div class="modal" style="max-width:480px;padding:24px">
      <button class="modal-close" type="button" aria-label="Cerrar">&times;</button>
      <h3 style="margin:0 0 8px">${res.already ? '✅ Cotización ya aceptada' : '✅ Cotización ACEPTADA'}</h3>
      <p style="font-size:14px;margin:0 0 12px">Nº <strong>${q.id}</strong> · Pedido <strong>${o ? o.id : q.orderId}</strong></p>
      <div style="background:var(--color-bg-secondary);border-radius:12px;padding:14px;margin-bottom:14px;font-size:13px;line-height:1.5">
        <div><strong>Cliente:</strong> ${q.name}</div>
        <div><strong>Producto:</strong> ${q.productName || '-'}</div>
        <div><strong>Cantidad:</strong> ${q.qty || 1}</div>
        <div><strong>Total:</strong> S/ ${Number(q.amount || 0).toFixed(2)}</div>
      </div>
      <div class="email-inline-preview">
        <div class="email-inline-label">📧 Correo generado (como en el video)</div>
        <div class="email-inline-subject">Asunto: <strong>${mail.subject}</strong></div>
        <div class="email-inline-to">Para: ${STORE_CONTACT.email}</div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px">
        <a class="btn-primary" href="${mail.mailto}" style="text-decoration:none;text-align:center">✉️ Abrir correo</a>
        <a class="btn-secondary" target="_blank" rel="noopener"
          href="https://wa.me/${String(STORE_CONTACT.whatsapp||'').replace(/\D/g,'')}?text=${encodeURIComponent('Cotización ACEPTADA '+q.id+' · Pedido '+(o&&o.id)+' · '+q.name+' · S/ '+Number(q.amount||0).toFixed(2))}"
          style="text-decoration:none;text-align:center">💬 WhatsApp</a>
        <button type="button" class="btn-ghost" onclick="document.getElementById('acceptQuoteModal').classList.remove('show')">Cerrar</button>
      </div>
    </div>`;
  overlay.querySelector('.modal-close').onclick = () => overlay.classList.remove('show');
  overlay.onclick = (e) => { if (e.target === overlay) overlay.classList.remove('show'); };
  overlay.classList.add('show');
  if (!res.already) showToast('Cotización aceptada · correo: ' + mail.subject, 'success');
  // Clean URL
  try {
    const u = new URL(location.href);
    if (u.searchParams.has('acceptQuote')) {
      u.searchParams.delete('acceptQuote');
      history.replaceState({}, '', u.pathname + u.search + u.hash);
    }
  } catch (_) {}
  return res;
}

function checkAcceptQuoteFromUrl() {
  try {
    const params = new URLSearchParams(location.search);
    const token = params.get('acceptQuote');
    if (token) {
      setTimeout(() => openAcceptQuoteModal(token), 400);
    }
  } catch (_) {}
}

window.formalizeQuote = formalizeQuote;
window.acceptQuoteByToken = acceptQuoteByToken;
window.openAcceptQuoteModal = openAcceptQuoteModal;
window.getQuoteAcceptUrl = getQuoteAcceptUrl;
window.buildQuoteSentEmail = buildQuoteSentEmail;



function consultProductWA(productId) {
  const p = getProduct(productId);
  const phone = (typeof STORE_CONTACT !== 'undefined' ? STORE_CONTACT.whatsapp : '').replace(/\D/g, '');
  if (!phone) { showToast('WhatsApp no configurado', 'error'); return; }
  const msg = p
    ? 'Hola Absolut 360, quiero consultar por: ' + p.name + (p.sku ? ' (' + p.sku + ')' : '') + ' — S/ ' + Number(p.price).toFixed(2)
    : 'Hola Absolut 360, quiero consultar por un producto.';
  window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(msg), '_blank');
}
window.consultProductWA = consultProductWA;

function openQuoteModal(productId) {
  const p = productId ? getProduct(productId) : null;
  let overlay = document.getElementById('quoteRequestModal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'quoteRequestModal';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal" style="max-width:440px;padding:24px">
        <button class="modal-close" type="button" aria-label="Cerrar">&times;</button>
        <h3 style="margin:0 0 6px">📋 Solicitar cotización</h3>
        <p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 14px">Te respondemos por WhatsApp o correo.</p>
        <form id="quoteRequestForm" class="quote-form">
          <input type="hidden" id="quoteProductId">
          <div class="form-group"><label>Producto</label><input type="text" id="quoteProductName" readonly></div>
          <div class="form-group"><label>Cantidad</label><input type="number" id="quoteQty" min="1" value="1"></div>
          <div class="form-group"><label>Nombre *</label><input type="text" id="quoteName" required maxlength="80"></div>
          <div class="form-group"><label>Email *</label><input type="email" id="quoteEmail" required></div>
          <div class="form-group"><label>Teléfono / WhatsApp *</label><input type="tel" id="quotePhone" required></div>
          <div class="form-group"><label>Mensaje</label><textarea id="quoteMessage" rows="3" placeholder="Detalles, personalización, plazo..."></textarea></div>
          <button type="submit" class="btn-primary" style="width:100%">Enviar solicitud</button>
        </form>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('.modal-close').onclick = () => overlay.classList.remove('show');
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('show'); });
    document.getElementById('quoteRequestForm').onsubmit = (e) => {
      e.preventDefault();
      const q = createQuoteRequest({
        name: document.getElementById('quoteName').value,
        email: document.getElementById('quoteEmail').value,
        phone: document.getElementById('quotePhone').value,
        productId: document.getElementById('quoteProductId').value || null,
        productName: document.getElementById('quoteProductName').value,
        qty: document.getElementById('quoteQty').value,
        message: document.getElementById('quoteMessage').value
      });
      overlay.classList.remove('show');
      showToast('Cotización ' + q.id + ' enviada', 'success');
      // Aviso por WA / mail
      const text = encodeURIComponent(
        'Nueva cotización ' + q.id + '\\nCliente: ' + q.name +
        '\\nTel: ' + q.phone + '\\nEmail: ' + q.email +
        '\\nProducto: ' + q.productName + ' x' + q.qty +
        '\\n' + (q.message || '')
      );
      const phone = (STORE_CONTACT.whatsapp || '').replace(/\D/g, '');
      window.open('https://wa.me/' + phone + '?text=' + text, '_blank');
    };
  }
  document.getElementById('quoteProductId').value = p ? p.id : '';
  document.getElementById('quoteProductName').value = p ? p.name : 'Consulta general';
  document.getElementById('quoteQty').value = 1;
  if (typeof currentUser !== 'undefined' && currentUser) {
    document.getElementById('quoteName').value = currentUser.name || '';
    document.getElementById('quoteEmail').value = currentUser.email || '';
    document.getElementById('quotePhone').value = currentUser.phone || '';
  }
  overlay.classList.add('show');
}

function exportOrdersCSV() {
  const rows = [['ID', 'Fecha', 'Cliente', 'Email', 'Teléfono', 'Total', 'Estado envío', 'Estado cobro', 'Pago', 'Items']];
  (orders || []).forEach(o => {
    const user = (users || []).find(u => u.id === o.userId) || {};
    rows.push([
      o.id,
      o.date,
      o.userName || user.name || '',
      o.userEmail || user.email || '',
      o.userPhone || user.phone || '',
      o.total,
      o.status || '',
      o.paymentStatus || '',
      o.paymentMethod || '',
      (o.items || []).map(it => it.name + ' x' + it.qty).join('; ')
    ]);
  });
  const csv = rows.map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pedidos-absolut360.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function exportQuotesCSV() {
  const rows = [['ID', 'Fecha', 'Nombre', 'Email', 'Teléfono', 'Producto', 'Cantidad', 'Estado', 'Mensaje']];
  (quotes || []).forEach(q => {
    rows.push([q.id, q.date, q.name, q.email, q.phone, q.productName, q.qty, q.status, q.message || '']);
  });
  const csv = rows.map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cotizaciones-absolut360.csv';
  a.click();
  URL.revokeObjectURL(url);
}


let currentProduct = null;
let appliedCoupon = null;
let clientDashTab = 'overview';

// ============================================
// PERSISTENCIA
// ============================================
function saveProducts() { localStorage.setItem('products', JSON.stringify(products)); }
function saveUsers() { localStorage.setItem('users', JSON.stringify(users)); }
function saveCurrentUser() { localStorage.setItem('currentUser', JSON.stringify(currentUser)); }
function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); updateCartUI(); }
function saveFavorites() { localStorage.setItem('favorites', JSON.stringify(favorites)); try { updateHeaderFavCount(); } catch (_) {} }
function saveRecentlyViewed() { localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed)); }
function saveCompare() { localStorage.setItem('compareList', JSON.stringify(compareList)); }
function saveOrders() { localStorage.setItem('orders', JSON.stringify(orders)); }

// ============================================
// AUTH / ROLES
// ============================================
function isLoggedIn() { return !!currentUser; }
function isAdmin() { return currentUser && currentUser.role === 'admin'; }
function isClient() { return currentUser && currentUser.role === 'client'; }

function login(email, password) {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) return { ok: false, msg: 'Email o contraseña incorrectos' };
  currentUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone || '',
    address: user.address || '',
    points: user.points || 0,
    level: user.level || getUserLevel(user.points || 0).name
  };
  saveCurrentUser();
  updateAuthUI();
  if (typeof logActivity === 'function') logActivity('login', `Inicio de sesión: ${currentUser.name} (${currentUser.role})`);
  return { ok: true, user: currentUser };
}

function register(name, email, password, extra = {}) {
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, msg: 'Ese email ya está registrado' };
  }
  if (password.length < 6) return { ok: false, msg: 'La contraseña debe tener al menos 6 caracteres' };
  if (extra.requireTerms && !extra.terms) {
    return { ok: false, msg: 'Debes aceptar los Términos y la Política de Privacidad' };
  }
  let phone = String(extra.phone || '').replace(/\D/g, '');
  if (phone && !phone.startsWith('51') && phone.length <= 9) phone = '51' + phone;
  const birth = extra.birth || '';
  const newUser = {
    id: Math.max(...users.map(u => u.id), 0) + 1,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    role: 'client',
    phone: phone,
    address: '',
    birthDate: birth,
    newsletter: !!extra.newsletter,
    createdAt: new Date().toISOString().slice(0, 10),
    points: 50,
    level: 'Bronce'
  };
  users.push(newUser);
  saveUsers();
  currentUser = {
    id: newUser.id, name: newUser.name, email: newUser.email, role: 'client',
    phone: newUser.phone, address: '', points: 50, level: 'Bronce'
  };
  saveCurrentUser();
  updateAuthUI();
  return { ok: true, user: currentUser };
}

function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateAuthUI();
  closeModal(document.getElementById('clientDashboard'));
  if (window.location.pathname.includes('admin')) {
    window.location.href = 'app.html';
    return;
  }
  showToast('Sesión cerrada');
}

function updateAuthUI() {
  const authArea = document.getElementById('authArea');
  if (!authArea) return;
  // Página admin tiene su propio UI
  if (document.body.classList.contains('admin-body')) return;

  if (isLoggedIn()) {
    // Admin en páginas de tienda → ir al panel exclusivo
    if (isAdmin() && !window.location.pathname.includes('admin')) {
      window.location.href = 'admin.html';
      return;
    }
    const roleBadge = isAdmin()
      ? '<span class="role-badge admin">Admin</span>'
      : '<span class="role-badge client">Cliente</span>';
    authArea.innerHTML = `
      <div class="user-menu">
        <button class="user-btn" id="userMenuBtn">
          <span class="user-avatar">${(currentUser.name || 'U')[0].toUpperCase()}</span>
          <span class="user-name">${currentUser.name.split(' ')[0]}</span>
          ${roleBadge}
        </button>
        <div class="user-dropdown" id="userDropdown">
          ${isAdmin()
            ? '<button onclick="openAdminPanel()">📊 Panel Admin</button>'
            : '<button onclick="openClientDashboard()">👤 Mi Dashboard</button>'}
          <button onclick="logout()">🚪 Cerrar sesión</button>
        </div>
      </div>`;
    const menuBtn = document.getElementById('userMenuBtn');
    const dropdown = document.getElementById('userDropdown');
    if (menuBtn && dropdown) {
      menuBtn.onclick = (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
      };
      document.addEventListener('click', () => dropdown.classList.remove('show'));
    }
  } else {
    authArea.innerHTML = `
      <button class="btn-auth" id="openLoginBtn">Iniciar sesión</button>
      <button class="btn-auth btn-auth-outline" id="openRegisterBtn">Registrarse</button>`;
    document.getElementById('openLoginBtn')?.addEventListener('click', () => openModal(document.getElementById('authModal')));
    document.getElementById('openRegisterBtn')?.addEventListener('click', () => {
      switchAuthTab('register');
      openModal(document.getElementById('authModal'));
    });
  }
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('loginFormBox').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('registerFormBox').style.display = tab === 'register' ? 'block' : 'none';
}

// ============================================
// UTILIDADES
// ============================================
function showToast(message, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove('show'), 3200);
}

const USD_RATE = 3.75; // 1 USD ≈ 3.75 PEN
function formatPrice(n) {
  const pen = Number(n) || 0;
  const usd = pen / USD_RATE;
  return `S/ ${pen.toFixed(2)} · $${usd.toFixed(2)}`;
}
function formatPricePen(n) { return `S/ ${Number(n).toFixed(2)}`; }
function formatPriceUsd(n) { return `$${(Number(n) / USD_RATE).toFixed(2)}`; }
function formatPriceHTML(n) {
  const pen = Number(n) || 0;
  const usd = pen / USD_RATE;
  return `<span class="price-pen">S/ ${pen.toFixed(2)}</span><span class="price-usd">$${usd.toFixed(2)}</span>`;
}
const IGV_RATE = 0.18;
function priceWithIgv(n) { return Number(n) * (1 + IGV_RATE); }
function igvAmount(n) { return Number(n) * IGV_RATE; }

const STORE_CATEGORIES = [
  'Todos',
  'Página Web y Tienda',
  'Marketing Digital IA',
  'Branding Corporativo',
  'Eventos y BTL',
  'Consultoría Estratégica',
  'Tecnología NFC',
  'Productos NFC',
  'Actualización y Mantenimiento Web',
  'Antiestrés',
  'Artículos de Escritorio',
  'Calendarios',
  'Cuadernos',
  'Cuadros Publicitarios',
  'Lanyards',
  'Lapiceros',
  'Libretas Ecológicas',
  'Módulos Publicitarios',
  'Pagina web informativa',
  'Porta Taco',
  'Productos Publicitarios',
  'Resaltadores',
  'Tazas',
  'Tomatodos'
];

const SHIPPING = { lima: 15, provincia: 25 };
const FREE_SHIPPING_MIN = 50; // S/ — como en el ticker del video

function getProduct(id) { return products.find(p => p.id === Number(id)); }
function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = getProduct(item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}
function getCartCount() { return cart.reduce((sum, item) => sum + item.qty, 0); }

function openModal(modal) { if (modal) { modal.classList.add('show'); document.body.style.overflow = 'hidden'; } }
function closeModal(modal) {
  if (modal) {
    modal.classList.remove('show');
    if (!document.querySelector('.modal-overlay.show')) document.body.style.overflow = '';
  }
}

// ============================================
// CARRITO
// ============================================
function addToCart(productId, quantity = 1) {
  const product = getProduct(productId);
  if (!product || !product.inStock || product.stock <= 0) {
    showToast('❌ Producto no disponible', 'error');
    return false;
  }
  const existing = cart.find(i => i.id === productId);
  const currentQty = existing ? existing.qty : 0;
  const newQty = currentQty + quantity;
  if (newQty > product.stock) {
    showToast(`⚠️ Solo hay ${product.stock} unidades disponibles`, 'warning');
    return false;
  }
  if (existing) existing.qty = newQty;
  else cart.push({ id: productId, qty: quantity });
  saveCart();
  showToast(`✅ "${product.name}" agregado (${quantity})`);
  return true;
}

function updateCartQty(productId, newQty) {
  const product = getProduct(productId);
  if (!product) return;
  if (newQty <= 0) cart = cart.filter(i => i.id !== productId);
  else if (newQty > product.stock) {
    showToast(`⚠️ Solo hay ${product.stock} unidades`, 'warning');
    return;
  } else {
    const item = cart.find(i => i.id === productId);
    if (item) item.qty = newQty;
  }
  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  renderCart();
  showToast('Producto eliminado del carrito');
}

function clearCart() {
  cart = [];
  appliedCoupon = null;
  saveCart();
}


function updateCartUI() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count, #cartCount, #cartCountFloat').forEach(el => {
    if (el) el.textContent = count;
  });
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  if (!cartItems) return;

  const modal = document.getElementById('cartModal');
  if (modal) modal.querySelector('.modal-cart')?.classList.add('cart-abs');

  if (cart.length === 0) {
    cartItems.innerHTML = `<div class="empty-cart"><p style="font-size:48px;margin-bottom:12px">🛒</p><p>Tu carrito está vacío</p>
      <button type="button" class="btn-secondary" onclick="closeModal(document.getElementById('cartModal'))">Seguir comprando</button></div>`;
    if (cartTotalEl) cartTotalEl.textContent = '0.00';
    const extra = document.getElementById('cartAbsExtra');
    if (extra) extra.innerHTML = '';
    return;
  }

  let subtotal = 0;
  const itemsHtml = cart.map(item => {
    const p = getProduct(item.id);
    if (!p) return '';
    const lineTotal = p.price * item.qty;
    subtotal += lineTotal;
    return `
      <div class="cart-item cart-abs-item">
        <div class="cart-abs-item-main">
          <div>
            <h4>${p.name}</h4>
            <p class="cart-abs-unit">${formatPrice(p.price)} c/u</p>
          </div>
          <div class="cart-abs-item-actions">
            <input type="number" min="1" max="${p.stock}" value="${item.qty}" class="cart-abs-qty"
              onchange="updateCartQty(${p.id}, parseInt(this.value)||1)">
            <span class="cart-abs-line">${formatPrice(lineTotal)}</span>
            <button type="button" class="cart-abs-remove" onclick="removeFromCart(${p.id})">QUITAR</button>
          </div>
        </div>
      </div>`;
  }).join('');

  cartItems.innerHTML = `
    <div class="cart-abs-head"><span class="cart-abs-kicker">VOL. 360 — TIENDA</span><h2>TU CARRITO</h2></div>
    ${itemsHtml}
    <button type="button" class="cart-abs-clear" onclick="clearCart();renderCart();">VACIAR CARRITO</button>
  `;

  let discount = 0;
  if (appliedCoupon === 'POINTS_REDEEM') {
    discount = Math.min(window._pointsRedeemDiscount || 0, subtotal);
  } else if (appliedCoupon && COUPONS[appliedCoupon]) {
    const c = COUPONS[appliedCoupon];
    discount = c.type === 'percent' ? subtotal * c.discount : c.discount;
  }
  let levelExtra = 0;
  if (isClient()) {
    const lvl = getUserLevel(getUserPoints());
    if (lvl.discount > 0) levelExtra = (subtotal - discount) * lvl.discount;
  }
  const productsTotal = Math.max(0, subtotal - discount - levelExtra);

  let extra = document.getElementById('cartAbsExtra');
  if (!extra && modal) {
    extra = document.createElement('div');
    extra.id = 'cartAbsExtra';
    const totalDiv = modal.querySelector('.cart-total');
    if (totalDiv) {
      totalDiv.style.display = 'none';
      totalDiv.parentNode.insertBefore(extra, totalDiv);
    } else {
      modal.querySelector('.modal-cart')?.appendChild(extra);
    }
  }
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.style.display = 'none';

  if (extra) {
    const leftShip = Math.max(0, FREE_SHIPPING_MIN - productsTotal);
    const pctShip = Math.min(100, Math.round((productsTotal / FREE_SHIPPING_MIN) * 100));
    const shipHtml = leftShip <= 0
      ? `<div class="free-ship ok">🚚 ¡Envío gratis desbloqueado!</div>`
      : `<div class="free-ship"><div class="free-ship-text">Te faltan <strong>S/ ${leftShip.toFixed(2)}</strong> para envío gratis</div>
          <div class="free-ship-track"><div class="free-ship-fill" style="width:${pctShip}%"></div></div></div>`;
    const pts = (typeof getUserPoints === 'function' && isClient()) ? getUserPoints() : 0;
    const canRedeem = isClient() && pts >= 100;
    const pointsHtml = isClient() ? `
      <div class="cart-points-box ${canRedeem ? 'can-redeem' : ''}">
        <div class="cart-points-head">
          <span>⭐ Tus puntos LoyiCard</span>
          <strong>${pts} pts</strong>
        </div>
        <p class="cart-points-hint">100 pts = S/ 10 de descuento · ${canRedeem ? 'Listo para canjear' : 'Sigue comprando para canjear'}</p>
        <button type="button" class="btn-block cart-points-btn" ${canRedeem && appliedCoupon !== 'POINTS_REDEEM' ? '' : 'disabled'}
          onclick="redeemPoints();renderCart();">${appliedCoupon === 'POINTS_REDEEM' ? '✓ Puntos aplicados' : 'Canjear puntos en carrito'}</button>
        ${appliedCoupon === 'POINTS_REDEEM' ? '<button type="button" class="btn-ghost btn-sm" onclick="cancelPointsRedeem();renderCart();">Quitar canje</button>' : ''}
      </div>` : `<div class="cart-points-box guest"><p>Inicia sesión para acumular y canjear puntos LoyiCard</p></div>`;

    extra.innerHTML = `
      <div class="cart-abs-layout">
        <div class="cart-abs-summary">
          <h3>RESUMEN</h3>
          <div class="cart-sum-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
          ${discount > 0 ? `<div class="cart-sum-row discount"><span>Descuento</span><span>−${formatPrice(discount)}</span></div>` : ''}
          <div class="cart-sum-row"><span>Envío Lima</span><span>${formatPrice(SHIPPING.lima)}</span></div>
          <div class="cart-sum-row"><span>Envío Provincia</span><span>${formatPrice(SHIPPING.provincia)}</span></div>
          <div class="cart-sum-row total"><span>Total productos</span><span id="cartTotal">${formatPrice(productsTotal)}</span></div>
          <div class="free-ship-box">${shipHtml}</div>
          <p class="cart-ship-note">🚚 Envío gratis desde <strong>S/ ${FREE_SHIPPING_MIN}</strong>. En checkout eliges Lima o Provincia.</p>
          ${pointsHtml}
          <button type="button" class="btn-block cart-abs-pay" onclick="checkout()">IR A PAGAR →</button>
          <button type="button" class="btn-block cart-abs-continue" onclick="closeModal(document.getElementById('cartModal'))">SEGUIR COMPRANDO</button>
          <p class="cart-pay-foot">Pago con Yape, Plin o transferencia · Confirmación por WhatsApp</p>
        </div>
      </div>
      <div class="coupon-box cart-coupon-v2" style="margin-top:12px">
        <input type="text" id="couponInput" placeholder="Cupón (ej. BIENVENIDO10)">
        <button type="button" class="btn-secondary" onclick="applyCoupon()">Aplicar</button>
        <div id="couponMsg" class="coupon-msg"></div>
      </div>
    `;
  }
  if (cartTotalEl) cartTotalEl.textContent = productsTotal.toFixed(2);
}

function applyCoupon() {
  const input = document.getElementById('couponInput');
  const msg = document.getElementById('couponMsg');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  const coupon = COUPONS[code];
  const subtotal = getCartTotal();
  if (!coupon) {
    if (msg) msg.textContent = 'Cupón inválido';
    appliedCoupon = null;
    renderCart();
    return;
  }
  if (subtotal < coupon.min) {
    if (msg) msg.textContent = `Mínimo de compra: ${formatPrice(coupon.min)}`;
    return;
  }
  appliedCoupon = code;
  if (msg) msg.textContent = `✓ Cupón aplicado: ${code}`;
  showToast(`🎉 Cupón ${code} aplicado`);
  renderCart();
}

// ============================================
// PAGO: YAPE / PLIN (QR) + TARJETA DE CRÉDITO
// + LOG DE ACTIVIDAD + IA IMÁGENES
// ============================================
const PAYMENT_CONFIG = {
  yape: { name: 'Yape', phone: '999 888 777', holder: 'Absolut 360 SAC', icon: '💜' },
  plin: { name: 'Plin', phone: '999 888 777', holder: 'Absolut 360 SAC', icon: '💙' },
  card: { name: 'Tarjeta', icon: '💳' }
};

let pendingPayment = null;
let activityLog = JSON.parse(localStorage.getItem('activityLog') || '[]');
let productImages = []; // imágenes organizadas del producto en edición

function saveActivityLog() {
  localStorage.setItem('activityLog', JSON.stringify(activityLog.slice(0, 100)));
}

function logActivity(type, msg, meta) {
  activityLog.unshift({
    id: Date.now(),
    type: type || 'info',
    text: msg,
    meta: meta || {},
    user: currentUser ? (currentUser.name || currentUser.email) : 'Sistema',
    role: currentUser ? currentUser.role : 'system',
    date: new Date().toISOString()
  });
  saveActivityLog();
}

function ensurePaymentModal() {
  if (document.getElementById('paymentModal')) return;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'paymentModal';
  overlay.innerHTML = `
    <div class="modal modal-payment">
      <button class="modal-close" data-close>&times;</button>
      <div class="payment-header">
        <h2>💳 Método de pago</h2>
        <p>Yape, Plin (QR) o Tarjeta de crédito</p>
      </div>
      <div class="payment-amount" id="paymentAmount">$0.00</div>
      <div class="payment-methods">
        <button type="button" class="payment-method-btn" data-method="yape" onclick="selectPaymentMethod('yape')">
          <span class="pm-icon">💜</span>
          <span class="pm-name">Yape</span>
          <span class="pm-sub">QR desde el celular</span>
        </button>
        <button type="button" class="payment-method-btn" data-method="plin" onclick="selectPaymentMethod('plin')">
          <span class="pm-icon">💙</span>
          <span class="pm-name">Plin</span>
          <span class="pm-sub">QR desde el celular</span>
        </button>
        <button type="button" class="payment-method-btn" data-method="card" onclick="selectPaymentMethod('card')">
          <span class="pm-icon">💳</span>
          <span class="pm-name">Tarjeta</span>
          <span class="pm-sub">Crédito / Débito</span>
        </button>
      </div>
      <div class="payment-qr-panel" id="paymentQrPanel">
        <img class="qr-code" id="paymentQrImg" src="" alt="Código QR">
        <div class="qr-brand" id="paymentQrBrand">Yape</div>
        <div class="qr-phone" id="paymentQrPhone">999 888 777</div>
        <p class="qr-hint" id="paymentQrHint">Abre la app y escanea el QR</p>
        <ul class="payment-steps">
          <li data-step="1">Abre Yape o Plin en tu celular</li>
          <li data-step="2">Toca escanear QR</li>
          <li data-step="3">Confirma el monto exacto</li>
          <li data-step="4">Pulsa «Ya pagué»</li>
        </ul>
      </div>
      <div class="payment-card-panel" id="paymentCardPanel">
        <div class="card-visual" id="cardVisual">
          <div class="card-chip"></div>
          <div class="card-number-display" id="cardNumberDisplay">•••• •••• •••• ••••</div>
          <div class="card-meta-row">
            <span id="cardNameDisplay">NOMBRE DEL TITULAR</span>
            <span id="cardExpDisplay">MM/AA</span>
          </div>
        </div>
        <div class="card-form">
          <div class="form-group">
            <label>Número de tarjeta</label>
            <input type="text" id="cardNumber" maxlength="19" placeholder="ACCT-000015" autocomplete="cc-number">
          </div>
          <div class="form-group">
            <label>Nombre en la tarjeta</label>
            <input type="text" id="cardName" placeholder="Como aparece en la tarjeta" autocomplete="cc-name">
          </div>
          <div class="form-grid" style="grid-template-columns:1fr 1fr;gap:12px">
            <div class="form-group">
              <label>Vencimiento</label>
              <input type="text" id="cardExp" maxlength="5" placeholder="MM/AA" autocomplete="cc-exp">
            </div>
            <div class="form-group">
              <label>CVV</label>
              <input type="password" id="cardCvv" maxlength="4" placeholder="***" autocomplete="cc-csc">
            </div>
          </div>
        </div>
        <p class="payment-note">🔒 Modo demo: no se procesa cobro real. Los datos no se envían a ningún servidor.</p>
      </div>
      <div class="payment-actions">
        <button type="button" class="btn-primary" id="confirmPaymentBtn" onclick="confirmPayment()" disabled>
          ✅ Confirmar pago
        </button>
        <button type="button" class="btn-secondary" onclick="closeModal(document.getElementById('paymentModal'))">
          Cancelar
        </button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('[data-close]')?.addEventListener('click', () => closeModal(overlay));
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay); });

  // Live card preview
  const num = document.getElementById('cardNumber');
  const name = document.getElementById('cardName');
  const exp = document.getElementById('cardExp');
  if (num) {
    num.addEventListener('input', () => {
      let v = num.value.replace(/\D/g, '').slice(0, 16);
      num.value = v.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
      const d = document.getElementById('cardNumberDisplay');
      if (d) d.textContent = num.value || '•••• •••• •••• ••••';
    });
  }
  if (name) {
    name.addEventListener('input', () => {
      const d = document.getElementById('cardNameDisplay');
      if (d) d.textContent = (name.value || 'NOMBRE DEL TITULAR').toUpperCase();
    });
  }
  if (exp) {
    exp.addEventListener('input', () => {
      let v = exp.value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
      exp.value = v;
      const d = document.getElementById('cardExpDisplay');
      if (d) d.textContent = v || 'MM/AA';
    });
  }
}

function buildPaymentQrData(method, amount) {
  const cfg = PAYMENT_CONFIG[method];
  return `Pago Absolut360|${cfg.name}|${cfg.phone}|Monto:${Number(amount).toFixed(2)}|Titular:${cfg.holder}`;
}

function selectPaymentMethod(method) {
  if (!PAYMENT_CONFIG[method] || !pendingPayment) return;
  document.querySelectorAll('.payment-method-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.method === method);
  });
  const qrPanel = document.getElementById('paymentQrPanel');
  const cardPanel = document.getElementById('paymentCardPanel');
  const confirmBtn = document.getElementById('confirmPaymentBtn');

  if (method === 'card') {
    if (qrPanel) qrPanel.classList.remove('show');
    if (cardPanel) cardPanel.classList.add('show');
    if (confirmBtn) {
      confirmBtn.disabled = false;
      confirmBtn.dataset.method = 'card';
      confirmBtn.textContent = '✅ Pagar con tarjeta';
    }
    return;
  }

  if (cardPanel) cardPanel.classList.remove('show');
  const cfg = PAYMENT_CONFIG[method];
  const img = document.getElementById('paymentQrImg');
  const brand = document.getElementById('paymentQrBrand');
  const phone = document.getElementById('paymentQrPhone');
  const hint = document.getElementById('paymentQrHint');
  const data = encodeURIComponent(buildPaymentQrData(method, pendingPayment.total));
  if (img) {
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${data}`;
    img.alt = `QR ${cfg.name}`;
  }
  if (brand) brand.textContent = cfg.name;
  if (phone) phone.textContent = cfg.phone + ' · ' + cfg.holder;
  if (hint) {
    hint.textContent = method === 'yape'
      ? 'Abre Yape → Escanear QR y confirma el monto'
      : 'Abre Plin → Escanear QR y confirma el monto';
  }
  if (qrPanel) qrPanel.classList.add('show');
  if (confirmBtn) {
    confirmBtn.disabled = false;
    confirmBtn.dataset.method = method;
    confirmBtn.textContent = '✅ Ya pagué · Confirmar pedido';
  }
}

function openPaymentModal(totals) {
  ensurePaymentModal();
  pendingPayment = totals;
  const amountEl = document.getElementById('paymentAmount');
  if (amountEl) amountEl.textContent = formatPrice(totals.total);
  document.querySelectorAll('.payment-method-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('paymentQrPanel')?.classList.remove('show');
  document.getElementById('paymentCardPanel')?.classList.remove('show');
  const confirmBtn = document.getElementById('confirmPaymentBtn');
  if (confirmBtn) {
    confirmBtn.disabled = true;
    delete confirmBtn.dataset.method;
  }
  closeModal(document.getElementById('cartModal'));
  openModal(document.getElementById('paymentModal'));
  selectPaymentMethod('yape');
}

function validateCardDemo() {
  const num = (document.getElementById('cardNumber')?.value || '').replace(/\s/g, '');
  const name = (document.getElementById('cardName')?.value || '').trim();
  const exp = (document.getElementById('cardExp')?.value || '').trim();
  const cvv = (document.getElementById('cardCvv')?.value || '').trim();
  if (num.length < 13 || num.length > 16) return 'Número de tarjeta inválido';
  if (name.length < 3) return 'Ingresa el nombre del titular';
  if (!/^\d{2}\/\d{2}$/.test(exp)) return 'Vencimiento inválido (MM/AA)';
  if (cvv.length < 3) return 'CVV inválido';
  return null;
}

function confirmPayment() {
  if (!pendingPayment || !isLoggedIn()) {
    showToast('No hay un pago pendiente', 'warning');
    return;
  }
  const method = document.getElementById('confirmPaymentBtn')?.dataset.method || 'yape';
  if (method === 'card') {
    const err = validateCardDemo();
    if (err) { showToast(err, 'error'); return; }
  }

  const { subtotal, discount, total, pointsUsed, orderItems } = pendingPayment;
  const order = {
    id: 'ORD-' + Date.now().toString(36).toUpperCase(),
    userId: currentUser.id,
    userName: currentUser.name || '',
    userEmail: currentUser.email || '',
    userPhone: currentUser.phone || '',
    items: orderItems,
    subtotal,
    discount,
    total,
    coupon: appliedCoupon,
    paymentMethod: method,
    status: 'pagado',
    paymentStatus: 'pagado',
    seenByAdmin: false,
    date: new Date().toISOString()
  };
  orders.unshift(order);
  saveOrders();
  try { notifyNewOrder(order); } catch (e) { console.warn(e); }

  cart.forEach(item => {
    const p = getProduct(item.id);
    if (p) {
      p.stock = Math.max(0, p.stock - item.qty);
      if (p.stock === 0) p.inStock = false;
    }
  });
  saveProducts();

  if (pointsUsed > 0 && isClient()) {
    currentUser.points = Math.max(0, (currentUser.points || 0) - pointsUsed);
    currentUser.level = getUserLevel(currentUser.points).name;
    syncUserPoints();
  }
  window._pointsRedeemDiscount = 0;
  window._pointsRedeemCost = 0;

  const label = PAYMENT_CONFIG[method]?.name || method;
  logActivity('order', `Pedido ${order.id} pagado con ${label} · ${formatPrice(total)}`, { orderId: order.id, method, total });

  clearCart();
  pendingPayment = null;
  closeModal(document.getElementById('paymentModal'));
  showToast(`🎉 ¡Pago con ${label} confirmado! #${order.id}`);
  if (document.getElementById('productsGrid')) renderProducts(getFilteredProducts());
  if (typeof renderClientDashboard === 'function' && isClient()) {
    try { renderClientDashboard(); } catch (_) {}
  }

  // Nivel C: fidelización vía backend/LoyiCard; si no hay API, puntos locales
  if (isClient() && total > 0) {
    if (window.LoyiCardClient) {
      LoyiCardClient.getStatus().then(st => {
        if (st && st.ok && (st.mode === 'mock' || st.mode === 'live')) {
          return LoyiCardClient.onOrderCompleted(order);
        }
        awardPoints(total);
        return null;
      }).then(() => {
        try { if (typeof renderClientDashboard === 'function') renderClientDashboard(); } catch (_) {}
      }).catch(() => {
        awardPoints(total);
      });
    } else {
      awardPoints(total);
    }
  }
}


function buildOrderSummaryText(order) {
  const user = users.find(u => u.id === order.userId) || {};
  const lines = [
    'Pedido ' + order.id,
    'Cliente: ' + (order.userName || user.name || '—'),
    'Email: ' + (order.userEmail || user.email || '—'),
    'Tel: ' + (order.userPhone || user.phone || '—'),
    'Fecha: ' + new Date(order.date).toLocaleString('es'),
    'Pago: ' + String(order.paymentMethod || '').toUpperCase(),
    'Estado: ' + (orderStatusMeta(order.status).label),
    '',
    'Productos:'
  ];
  (order.items || []).forEach(it => {
    lines.push('- ' + it.name + ' x' + it.qty + ' = ' + formatPrice(it.price * it.qty));
  });
  if (order.discount > 0) lines.push('Descuento: -' + formatPrice(order.discount));
  lines.push('TOTAL: ' + formatPrice(order.total));
  return lines.join('\\n');
}

function getWhatsAppOrderUrl(order) {
  const text = encodeURIComponent(buildOrderSummaryText(order));
  const phone = (STORE_CONTACT.whatsapp || '').replace(/\D/g, '');
  return 'https://wa.me/' + phone + '?text=' + text;
}

function getMailtoOrderUrl(order) {
  const subject = encodeURIComponent('Nuevo pedido confirmado ' + order.id + ' — ' + STORE_CONTACT.name);
  const body = encodeURIComponent(buildOrderSummaryText(order));
  return 'mailto:' + STORE_CONTACT.email + '?subject=' + subject + '&body=' + body;
}

function notifyNewOrder(order) {
  showToast('✅ Pedido ' + order.id + ' registrado', 'success');
  try { sendOrderEmailJS(order); } catch (_) {}
  // Correo del sistema (bandeja + mailto), estilo video
  try {
    const subject = 'Nuevo pedido confirmado ' + order.id;
    const body = buildOrderSummaryText(order);
    const d = dispatchSystemEmail({
      subject,
      body,
      to: STORE_CONTACT.email,
      type: 'nuevo_pedido',
      meta: { orderId: order.id, clientName: order.userName || order.customerName }
    });
    setTimeout(() => {
      if (typeof showEmailSentModal === 'function') {
        showEmailSentModal({
          title: 'Nuevo pedido — correo al área comercial',
          subject,
          body,
          to: STORE_CONTACT.email,
          mailto: d.mailto
        });
      }
    }, 400);
  } catch (e) { console.warn(e); }
  // Modal rápido de aviso (WhatsApp + correo)
  let overlay = document.getElementById('orderNotifyModal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'orderNotifyModal';
    overlay.className = 'modal-overlay show';
    overlay.innerHTML = `
      <div class="modal" style="max-width:420px;padding:24px">
        <button class="modal-close" type="button" aria-label="Cerrar">&times;</button>
        <h3 style="margin:0 0 8px">📦 Pedido confirmado</h3>
        <p id="orderNotifyId" style="color:var(--color-text-secondary);font-size:14px;margin:0 0 16px"></p>
        <p style="font-size:13px;margin:0 0 14px">Avisa a la empresa por WhatsApp o correo (se abre tu app):</p>
        <div style="display:flex;flex-direction:column;gap:10px">
          <a id="orderNotifyWa" class="btn-primary" target="_blank" rel="noopener" style="text-align:center;text-decoration:none">💬 Enviar por WhatsApp</a>
          <a id="orderNotifyMail" class="btn-secondary" style="text-align:center;text-decoration:none">✉️ Abrir correo (mailto)</a>
          <button type="button" class="btn-ghost" id="orderNotifyClose">Seguir comprando</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('.modal-close').onclick = () => overlay.classList.remove('show');
    overlay.querySelector('#orderNotifyClose').onclick = () => overlay.classList.remove('show');
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('show'); });
  }
  overlay.classList.add('show');
  const idEl = document.getElementById('orderNotifyId');
  if (idEl) idEl.textContent = order.id + ' · ' + formatPrice(order.total);
  const wa = document.getElementById('orderNotifyWa');
  const mail = document.getElementById('orderNotifyMail');
  if (wa) wa.href = getWhatsAppOrderUrl(order);
  if (mail) mail.href = getMailtoOrderUrl(order);
}

function renderStarsInput(name, selected) {
  selected = selected || 5;
  return '<div class="review-stars-input" data-name="' + name + '">' +
    [1,2,3,4,5].map(n =>
      '<button type="button" class="star-btn' + (n <= selected ? ' on' : '') + '" data-v="' + n + '" aria-label="' + n + ' estrellas">★</button>'
    ).join('') +
    '<input type="hidden" name="' + name + '" value="' + selected + '">' +
    '</div>';
}

function renderProductReviews(productId) {
  const modal = document.getElementById('productDetailModal');
  if (!modal) return;
  let box = modal.querySelector('#productReviewsBox');
  if (!box) {
    const info = modal.querySelector('.product-detail-info') || modal.querySelector('.product-detail-content');
    if (!info) return;
    box = document.createElement('div');
    box.id = 'productReviewsBox';
    box.className = 'product-reviews-box';
    const tabs = info.querySelector('.product-tabs') || info.querySelector('.tabs-content');
    if (tabs) tabs.insertAdjacentElement('afterend', box);
    else info.appendChild(box);
  }
  const list = getProductReviews(productId);
  const st = getReviewStats(productId);
  const defaultName = (typeof currentUser !== 'undefined' && currentUser && currentUser.name) ? currentUser.name : '';

  box.innerHTML = `
    <div class="reviews-header">
      <h4>⭐ Opiniones de clientes</h4>
      <span class="reviews-summary">${st.count ? (st.avg + ' / 5 · ' + st.count + ' opiniones') : 'Sé el primero en opinar'}</span>
    </div>
    <form id="reviewForm" class="review-form">
      <div class="form-row-reviews">
        <input type="text" id="reviewName" placeholder="Tu nombre" value="${defaultName.replace(/"/g, '&quot;')}" required maxlength="60">
        ${renderStarsInput('reviewRating', 5)}
      </div>
      <textarea id="reviewComment" placeholder="¿Qué te pareció el producto?" rows="2" maxlength="500" required></textarea>
      <button type="submit" class="btn-primary btn-sm">Publicar opinión</button>
    </form>
    <div class="reviews-list">
      ${list.length === 0
        ? '<p class="reviews-empty">Aún no hay opiniones. ¡Comparte la tuya!</p>'
        : list.slice(0, 12).map(r => `
          <div class="review-item">
            <div class="review-item-top">
              <strong>${r.name}</strong>
              <span class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
            </div>
            <p>${(r.comment || '').replace(/</g, '&lt;')}</p>
            <small>${new Date(r.date).toLocaleDateString('es')}</small>
          </div>`).join('')}
    </div>`;

  // stars interaction
  box.querySelectorAll('.review-stars-input').forEach(wrap => {
    wrap.querySelectorAll('.star-btn').forEach(btn => {
      btn.onclick = () => {
        const v = Number(btn.dataset.v);
        wrap.querySelector('input').value = v;
        wrap.querySelectorAll('.star-btn').forEach(b => b.classList.toggle('on', Number(b.dataset.v) <= v));
      };
    });
  });

  const form = box.querySelector('#reviewForm');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('reviewName').value.trim();
      const rating = Number(box.querySelector('.review-stars-input input')?.value || 5);
      const comment = document.getElementById('reviewComment').value.trim();
      if (!name || !comment) {
        showToast('Completa nombre y comentario', 'warning');
        return;
      }
      addProductReview(productId, { name, rating, comment });
      showToast('¡Gracias por tu opinión!', 'success');
      renderProductReviews(productId);
      // refresh rating labels
      const p = getProduct(productId);
      if (p) {
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        set('detailStars', '★ ' + (Number(p.rating) || 0).toFixed(1));
        set('detailReviews', '(' + (p.reviews || 0) + ' reseñas)');
        if (typeof updateProducts === 'function') updateProducts();
        else if (typeof renderProducts === 'function') renderProducts();
      }
    };
  }
}


function checkout() {
  if (cart.length === 0) { showToast('El carrito está vacío', 'error'); return; }
  if (!isLoggedIn()) {
    showToast('Inicia sesión para completar la compra', 'warning');
    openModal(document.getElementById('authModal'));
    return;
  }

  let subtotal = getCartTotal();
  let discount = 0;
  let pointsUsed = 0;
  if (appliedCoupon === 'POINTS_REDEEM') {
    discount = Math.min(window._pointsRedeemDiscount || 0, subtotal);
    pointsUsed = window._pointsRedeemCost || (discount * LOYALTY.redemptionRate);
  } else if (appliedCoupon && COUPONS[appliedCoupon]) {
    const c = COUPONS[appliedCoupon];
    discount = c.type === 'percent' ? subtotal * c.discount : c.discount;
  }
  if (isClient()) {
    const lvl = getUserLevel(getUserPoints());
    if (lvl.discount > 0) discount += (subtotal - discount) * lvl.discount;
  }
  let shipping = (typeof SHIPPING !== 'undefined' ? SHIPPING.lima : 15);
  if (typeof FREE_SHIPPING_MIN !== 'undefined' && subtotal >= FREE_SHIPPING_MIN) shipping = 0;
  const total = Math.max(0, subtotal - discount + shipping);
  const orderItems = cart.map(item => {
    const p = getProduct(item.id);
    return { id: item.id, name: p?.name || 'Producto', price: p?.price || 0, qty: item.qty, image: p?.image };
  });
  openPaymentModal({ subtotal, discount, total, pointsUsed, orderItems, shipping });
}

// --- IA: reconocimiento / organización de imágenes ---
function analyzeImageColors(dataUrl) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const size = 40;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;
        let r = 0, g = 0, b = 0, n = 0;
        for (let i = 0; i < data.length; i += 16) {
          r += data[i]; g += data[i + 1]; b += data[i + 2]; n++;
        }
        r = Math.round(r / n); g = Math.round(g / n); b = Math.round(b / n);
        const brightness = (r + g + b) / 3;
        let tone = 'neutro';
        if (r > g + 30 && r > b + 20) tone = 'cálido/rojo';
        else if (g > r + 20 && g > b + 20) tone = 'verde/natural';
        else if (b > r + 20 && b > g + 10) tone = 'frío/azul';
        else if (brightness > 200) tone = 'claro';
        else if (brightness < 60) tone = 'oscuro';

        // Heurística simple de categoría por color/tono
        let suggestedCat = 'Productos NFC';
        if (tone.includes('verde') || tone.includes('natural')) suggestedCat = 'Productos Publicitarios';
        if (tone.includes('rojo') || tone.includes('cálido')) suggestedCat = 'Cuadernos';
        if (tone.includes('azul') || tone.includes('frío')) suggestedCat = 'Tecnología NFC';

        resolve({
          avgColor: `rgb(${r},${g},${b})`,
          tone,
          suggestedCategory: suggestedCat,
          width: img.naturalWidth,
          height: img.naturalHeight,
          aspect: (img.naturalWidth / img.naturalHeight).toFixed(2)
        });
      } catch (e) {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

function renderImageGallery() {
  const grid = document.getElementById('imageGalleryGrid');
  const aiBox = document.getElementById('imageAiInsights');
  if (!grid) return;
  if (!productImages.length) {
    grid.innerHTML = '<div class="img-gallery-empty">📷 Aún no hay imágenes. Sube una o varias para organizarlas.</div>';
    if (aiBox) aiBox.innerHTML = '';
    return;
  }
  grid.innerHTML = productImages.map((img, idx) => `
    <div class="img-gallery-item ${idx === 0 ? 'is-main' : ''}" data-idx="${idx}">
      <img src="${img.dataUrl}" alt="Imagen ${idx + 1}">
      <div class="img-gallery-badges">
        ${idx === 0 ? '<span class="badge-main">Principal</span>' : ''}
        ${img.analysis ? `<span class="badge-tone">${img.analysis.tone}</span>` : ''}
      </div>
      <div class="img-gallery-actions">
        ${idx !== 0 ? `<button type="button" title="Hacer principal" onclick="setMainProductImage(${idx})">⭐</button>` : ''}
        <button type="button" title="Eliminar" onclick="removeProductImage(${idx})">🗑️</button>
      </div>
    </div>
  `).join('');

  if (aiBox) {
    const main = productImages[0];
    if (main?.analysis) {
      aiBox.innerHTML = `
        <div class="ai-insight-card">
          <div class="ai-insight-title">✨ Análisis de imagen (IA local)</div>
          <div class="ai-insight-row"><span>Tono</span><strong>${main.analysis.tone}</strong></div>
          <div class="ai-insight-row"><span>Color medio</span>
            <span class="color-swatch" style="background:${main.analysis.avgColor}"></span>
          </div>
          <div class="ai-insight-row"><span>Tamaño</span><strong>${main.analysis.width}×${main.analysis.height}</strong></div>
          <div class="ai-insight-row"><span>Categoría sugerida</span>
            <button type="button" class="btn-ghost" style="padding:4px 10px;font-size:12px"
              onclick="applySuggestedCategory('${main.analysis.suggestedCategory}')">
              ${main.analysis.suggestedCategory}
            </button>
          </div>
        </div>`;
    } else {
      aiBox.innerHTML = '';
    }
  }
}

function setMainProductImage(idx) {
  if (idx <= 0 || idx >= productImages.length) return;
  const [item] = productImages.splice(idx, 1);
  productImages.unshift(item);
  syncMainPreview();
  renderImageGallery();
}

function removeProductImage(idx) {
  productImages.splice(idx, 1);
  syncMainPreview();
  renderImageGallery();
}

function applySuggestedCategory(cat) {
  const sel = document.getElementById('pCategory');
  if (sel && cat) {
    sel.value = cat;
    showToast(`Categoría aplicada: ${cat}`);
  }
}

function syncMainPreview() {
  const preview = document.getElementById('imagePreview');
  const placeholder = document.getElementById('previewPlaceholder');
  if (!preview) return;
  if (productImages[0]) {
    preview.src = productImages[0].dataUrl;
    preview.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
  } else {
    preview.src = '';
    preview.style.display = 'none';
    if (placeholder) placeholder.style.display = 'block';
  }
}

async function handleProductImagesSelected(fileList) {
  const files = Array.from(fileList || []).filter(f => f.type.startsWith('image/'));
  if (!files.length) return;
  for (const file of files.slice(0, 6)) {
    if (file.size > 2 * 1024 * 1024) {
      showToast(`"${file.name}" supera 2MB`, 'warning');
      continue;
    }
    const dataUrl = await new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = e => res(e.target.result);
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });
    const analysis = await analyzeImageColors(dataUrl);
    productImages.push({
      name: file.name,
      dataUrl,
      analysis,
      size: file.size
    });
  }
  // Orden: principal primero, luego por resolución
  productImages.sort((a, b) => {
    const ra = (a.analysis?.width || 0) * (a.analysis?.height || 0);
    const rb = (b.analysis?.width || 0) * (b.analysis?.height || 0);
    return rb - ra;
  });
  syncMainPreview();
  renderImageGallery();
  showToast(`📷 ${files.length} imagen(es) analizadas y organizadas`);
}

window.setMainProductImage = setMainProductImage;
window.removeProductImage = removeProductImage;
window.applySuggestedCategory = applySuggestedCategory;
window.selectPaymentMethod = selectPaymentMethod;
window.confirmPayment = confirmPayment;


// ============================================
// FAVORITOS
// ============================================
function toggleFavorite(productId) {
  if (!isLoggedIn()) {
    showToast('Inicia sesión para guardar favoritos', 'warning');
    openModal(document.getElementById('authModal'));
    return;
  }
  const idx = favorites.indexOf(productId);
  const product = getProduct(productId);
  if (!product) return;
  if (idx === -1) {
    favorites.push(productId);
    showToast(`❤️ "${product.name}" en favoritos`);
  } else {
    favorites.splice(idx, 1);
    showToast(`🤍 Eliminado de favoritos`);
  }
  saveFavorites();
  updateFavoriteButtons(productId);
  if (document.getElementById('productsGrid')) renderProducts(getFilteredProducts());
  if (document.getElementById('offersGrid')) initOffersPage();
  if (document.getElementById('clientDashboard')?.classList.contains('show')) renderClientDashboard();
}

function updateFavoriteButtons(productId) {
  const isFav = favorites.includes(productId);
  document.querySelectorAll(`[onclick*="toggleFavorite(${productId})"], #detailFavoriteBtn`).forEach(btn => {
    if (btn.id === 'detailFavoriteBtn' || btn.classList.contains('btn-favorite-float')) {
      btn.innerHTML = isFav ? '<span class="heart-icon">❤️</span>' : '<span class="heart-icon">🤍</span>';
      btn.classList.toggle('active', isFav);
    } else if (btn.classList.contains('btn-favorite')) {
      btn.innerHTML = isFav ? '❤️' : '🤍';
      btn.classList.toggle('active', isFav);
    }
  });
}

// ============================================
// RECIÉN VISTOS + COMPARAR
// ============================================
function addToRecentlyViewed(id) {
  recentlyViewed = [id, ...recentlyViewed.filter(x => x !== id)].slice(0, 8);
  saveRecentlyViewed();
}

function toggleCompare(productId) {
  const idx = compareList.indexOf(productId);
  if (idx === -1) {
    if (compareList.length >= 3) {
      showToast('Máximo 3 productos para comparar', 'warning');
      return;
    }
    compareList.push(productId);
    showToast('Añadido a comparación');
  } else {
    compareList.splice(idx, 1);
    showToast('Eliminado de comparación');
  }
  saveCompare();
  updateCompareBar();
}

function updateCompareBar() {
  let bar = document.getElementById('compareBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'compareBar';
    bar.className = 'compare-bar';
    document.body.appendChild(bar);
  }
  if (compareList.length === 0) {
    bar.classList.remove('show');
    return;
  }
  bar.innerHTML = `
    <div class="compare-items">
      ${compareList.map(id => {
        const p = getProduct(id);
        return p ? `<div class="compare-chip"><img src="${p.image}"><span>${p.name.slice(0,18)}...</span><button onclick="toggleCompare(${id})">×</button></div>` : '';
      }).join('')}
    </div>
    <button class="btn-primary" onclick="openCompareModal()">Comparar (${compareList.length})</button>
    <button class="btn-ghost" onclick="compareList=[];saveCompare();updateCompareBar()">Limpiar</button>
  `;
  bar.classList.add('show');
}

function openCompareModal() {
  if (compareList.length < 2) {
    showToast('Selecciona al menos 2 productos', 'warning');
    return;
  }
  let modal = document.getElementById('compareModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'compareModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal modal-compare">
        <button class="modal-close" data-close>&times;</button>
        <h2>⚖️ Comparar Productos</h2>
        <div id="compareContent" class="compare-table-wrap"></div>
      </div>`;
    document.body.appendChild(modal);
    modal.querySelector('[data-close]').onclick = () => closeModal(modal);
    modal.onclick = e => { if (e.target === modal) closeModal(modal); };
  }
  const items = compareList.map(id => getProduct(id)).filter(Boolean);
  const fields = [
    { key: 'image', label: '' },
    { key: 'name', label: 'Producto' },
    { key: 'price', label: 'Precio' },
    { key: 'rating', label: 'Valoración' },
    { key: 'stock', label: 'Stock' },
    { key: 'category', label: 'Categoría' },
    { key: 'features', label: 'Características' }
  ];
  document.getElementById('compareContent').innerHTML = `
    <table class="compare-table">
      <thead><tr><th></th>${items.map(p => `<th>${p.name}</th>`).join('')}</tr></thead>
      <tbody>
        ${fields.map(f => {
          if (f.key === 'image') return `<tr><td></td>${items.map(p => `<td><img src="${p.image}" class="compare-img"></td>`).join('')}</tr>`;
          if (f.key === 'price') return `<tr><td>${f.label}</td>${items.map(p => `<td><strong>${formatPrice(p.price)}</strong></td>`).join('')}</tr>`;
          if (f.key === 'features') return `<tr><td>${f.label}</td>${items.map(p => `<td><ul class="mini-features">${(p.features||[]).slice(0,4).map(x=>`<li>${x}</li>`).join('')}</ul></td>`).join('')}</tr>`;
          return `<tr><td>${f.label}</td>${items.map(p => `<td>${p[f.key] ?? '-'}</td>`).join('')}</tr>`;
        }).join('')}
        <tr><td></td>${items.map(p => `<td><button class="btn-primary btn-sm" onclick="addToCart(${p.id});closeModal(document.getElementById('compareModal'))">Agregar</button></td>`).join('')}</tr>
      </tbody>
    </table>`;
  openModal(modal);
}

// ============================================
// RENDER PRODUCTOS
// ============================================
function renderProducts(list, containerId = 'productsGrid') {
  const target = document.getElementById(containerId);
  if (!target) return;
  if (!list || list.length === 0) {
    target.innerHTML = `<div class="empty-state"><p style="font-size:64px">🔍</p><p>No encontramos productos</p></div>`;
    return;
  }
  target.innerHTML = list.map((p, i) => {
    const shortName = p.name.length > 48 ? p.name.slice(0, 46) + '…' : p.name;
    return `
    <article class="product-card abs-card ${!p.inStock || p.stock <= 0 ? 'out-of-stock' : ''}" style="animation-delay:${i * 0.04}s">
      <div class="product-image" onclick="openQuickView(${p.id})">
        <img src="${p.image || DEFAULT_IMAGE}" alt="${p.name}" loading="lazy" onerror="this.src='${DEFAULT_IMAGE}'">
        ${!p.inStock || p.stock <= 0 ? '<span class="badge-stock">AGOTADO</span>' : ''}
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3 class="product-name" onclick="openQuickView(${p.id})" title="${p.name}">${shortName}</h3>
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
        <div class="price-row dual-price">
          <span class="price">${formatPriceHTML(p.price)}</span>
          ${p.oldPrice ? `<span class="old-price">${formatPricePen(p.oldPrice)}</span>` : ''}
        </div>
        <div class="product-cta-row">
          <button class="btn-add-cart abs-add" ${!p.inStock || p.stock <= 0 ? 'disabled' : ''} onclick="addToCart(${p.id})">
            ${p.inStock && p.stock > 0 ? 'Comprar ahora' : 'AGOTADO'}
          </button>
          <button type="button" class="btn-wa-card" onclick="event.stopPropagation();consultProductWA(${p.id})" title="Consultar WhatsApp">💬</button>
        </div>
        <button type="button" class="btn-card-secondary" onclick="event.stopPropagation();openQuoteModal(${p.id})">Solicitar cotización</button>
      </div>
    </article>`;
  }).join('');
}

// ============================================
// MODAL DETALLE
// ============================================
function openQuickView(productId) {
  const product = getProduct(productId);
  const modal = document.getElementById('productDetailModal');
  if (!product || !modal) return;
  currentProduct = product;
  addToRecentlyViewed(productId);

  const content = modal.querySelector('.product-detail-content');
  if (content) content.classList.add('pdp-v2');

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const img = document.getElementById('detailImage');
  const mainSrc = product.image || DEFAULT_IMAGE;
  if (img) { img.src = mainSrc; img.alt = product.name; }

  const gallery = modal.querySelector('.product-gallery');
  if (gallery) {
    gallery.classList.add('pdp-gallery');
    gallery.querySelector('.pdp-share-btn')?.remove();

    let thumbs = gallery.querySelector('.pdp-thumbs');
    if (!thumbs) {
      thumbs = document.createElement('div');
      thumbs.className = 'pdp-thumbs';
      gallery.insertBefore(thumbs, gallery.firstChild);
    }
    const sources = Array.isArray(product.images) && product.images.length
      ? product.images.slice(0, 4)
      : [mainSrc, mainSrc, mainSrc];
    thumbs.innerHTML = sources.map((src, i) =>
      `<button type="button" class="pdp-thumb${i === 0 ? ' active' : ''}" data-src="${src}">
        <img src="${src}" alt="" onerror="this.src='${DEFAULT_IMAGE}'">
      </button>`
    ).join('');
    thumbs.querySelectorAll('.pdp-thumb').forEach(btn => {
      btn.onclick = () => {
        thumbs.querySelectorAll('.pdp-thumb').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (img) img.src = btn.dataset.src || mainSrc;
      };
    });

    let discFloat = gallery.querySelector('.pdp-discount-float');
    if (!discFloat) {
      discFloat = document.createElement('span');
      discFloat.className = 'pdp-discount-float';
      gallery.appendChild(discFloat);
    }
    if (product.oldPrice && product.oldPrice > product.price) {
      const d = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
      discFloat.textContent = `−${d}%`;
      discFloat.style.display = 'flex';
    } else {
      discFloat.style.display = 'none';
    }
  }

  set('detailCategory', product.category || '');
  set('detailName', product.name);
  set('detailPrice', '');
  const priceEl = document.getElementById('detailPrice');
  if (priceEl) {
    priceEl.innerHTML = formatPriceHTML(product.price) + ' <small style="opacity:.7">c/u</small>';
  }

  const oldPriceEl = document.getElementById('detailOldPrice');
  const discountEl = document.getElementById('detailDiscount');
  if (product.oldPrice && oldPriceEl) {
    oldPriceEl.textContent = formatPrice(product.oldPrice);
    oldPriceEl.style.display = 'inline';
    if (discountEl) discountEl.style.display = 'none';
  } else {
    if (oldPriceEl) oldPriceEl.style.display = 'none';
    if (discountEl) discountEl.style.display = 'none';
  }

  // Desglose IGV (estilo Absolut 360)
  let igvBox = document.getElementById('detailIgvBox');
  const priceBlock = document.querySelector('#productDetailModal .price-detail');
  if (!igvBox && priceBlock) {
    igvBox = document.createElement('div');
    igvBox.id = 'detailIgvBox';
    igvBox.className = 'detail-igv-box';
    priceBlock.insertAdjacentElement('afterend', igvBox);
  }
  if (igvBox) {
    const base = Number(product.price) || 0;
    const igv = igvAmount(base);
    const total = priceWithIgv(base);
    igvBox.innerHTML = `
      <div>Unitario + IGV: <strong>${formatPrice(total)}</strong></div>
      <div>Subtotal sin IGV: <strong>${formatPrice(base)}</strong></div>
      <div>IGV 18%: <strong>${formatPrice(igv)}</strong></div>
      <div class="igv-total">Total con IGV: <strong>${formatPrice(total)}</strong></div>
    `;
  }

  const rating = Number(product.rating) || 4;
  set('detailStars', '★ ' + rating.toFixed(1));
  set('detailReviews', `(${product.reviews || 0} reseñas)`);
  set('detailDescription', (product.description || 'Sin descripción disponible').replace(/\n/g, '<br>'));
  const descEl = document.getElementById('detailDescription');
  if (descEl) descEl.innerHTML = (product.description || 'Sin descripción disponible').replace(/\n/g, '<br>');

  const info = modal.querySelector('.product-detail-info');
  if (info) {
    info.classList.add('pdp-info');
    let chips = info.querySelector('.pdp-feature-chips');
    if (!chips) {
      chips = document.createElement('div');
      chips.className = 'pdp-feature-chips';
      const priceBlock = info.querySelector('.price-detail');
      if (priceBlock) priceBlock.insertAdjacentElement('afterend', chips);
      else info.appendChild(chips);
    }
    const feats = (product.features && product.features.length)
      ? product.features.slice(0, 3)
      : ['Calidad premium', 'Envío rápido', 'Garantía'];
    chips.innerHTML = feats.map(f => `<span class="pdp-chip">${f}</span>`).join('');

    let variants = info.querySelector('.pdp-variants');
    if (!variants) {
      variants = document.createElement('div');
      variants.className = 'pdp-variants';
      const qty = info.querySelector('.quantity-selector');
      if (qty) qty.insertAdjacentElement('beforebegin', variants);
      else info.appendChild(variants);
    }
    const showSizes = /ropa|deportes/i.test(product.category || '');
    const colors = [
      { c: '#3f6212', n: 'Oliva' },
      { c: '#111827', n: 'Negro' },
      { c: '#b91c1c', n: 'Rojo' },
      { c: '#f8fafc', n: 'Blanco', border: true },
      { c: '#2563eb', n: 'Azul' }
    ];
    variants.innerHTML = `
      <div class="pdp-variant-block">
        <div class="pdp-variant-label">Color</div>
        <div class="pdp-swatches" role="listbox" aria-label="Color">
          ${colors.map((col, i) => `
            <button type="button" class="pdp-swatch${i === 0 ? ' active' : ''}"
              style="background:${col.c}${col.border ? ';box-shadow:inset 0 0 0 1px #cbd5e1' : ''}"
              title="${col.n}" aria-label="${col.n}"></button>
          `).join('')}
        </div>
      </div>
      ${showSizes ? `
      <div class="pdp-variant-block">
        <div class="pdp-variant-label">Talla <button type="button" class="pdp-size-guide">Guía de tallas</button></div>
        <div class="pdp-sizes">
          ${['S', 'M', 'L', 'XL'].map((s, i) =>
            `<button type="button" class="pdp-size${i === 1 ? ' active' : ''}">${s}</button>`
          ).join('')}
        </div>
      </div>` : ''}
    `;
    variants.querySelectorAll('.pdp-swatch').forEach(btn => {
      btn.onclick = () => {
        variants.querySelectorAll('.pdp-swatch').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      };
    });
    variants.querySelectorAll('.pdp-size').forEach(btn => {
      btn.onclick = () => {
        variants.querySelectorAll('.pdp-size').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      };
    });
    variants.querySelector('.pdp-size-guide')?.addEventListener('click', () => {
      showToast('Guía de tallas: S · M · L · XL');
    });
  }

  const featuresList = document.getElementById('detailFeatures');
  if (featuresList) {
    featuresList.innerHTML = (product.features && product.features.length)
      ? product.features.map(f => `<li>✓ ${f}</li>`).join('')
      : '<li style="color:var(--color-text-secondary);font-style:italic">Sin características</li>';
  }

  const skuEl = document.getElementById('detailSku');
  if (skuEl) skuEl.textContent = product.sku || `SKU-${product.id}`;

  const stockEl = document.getElementById('detailStock');
  if (stockEl) {
    if (product.stock > 0) {
      stockEl.innerHTML = `<span class="stock-badge-status in-stock">● Disponible · ${product.stock} und.</span>
        <span class="ship-hint">Envíos Lima y provincia</span>`;
    } else {
      stockEl.innerHTML = `<span class="stock-badge-status out-stock">✗ Agotado</span>`;
    }
  }

  const qtyInput = document.getElementById('qtyInput');
  if (qtyInput) {
    qtyInput.value = 1;
    qtyInput.removeAttribute('readonly');
  }

  // Mostrar selector de cantidad (Absolut)
  const qtySel = document.querySelector('#productDetailModal .quantity-selector');
  if (qtySel) qtySel.style.display = '';

  const addBtn = document.getElementById('detailAddToCart');
  if (addBtn) {
    addBtn.classList.add('pdp-add-btn', 'abs-add-cart');
    addBtn.innerHTML = product.stock > 0 ? 'AGREGAR AL CARRITO' : 'AGOTADO';
    addBtn.disabled = !(product.stock > 0);
  }

  // Botones secundarios Absolut 360
  let absActions = document.getElementById('absDetailActions');
  const actionsDetail = document.querySelector('#productDetailModal .actions-detail');
  if (!absActions && actionsDetail) {
    absActions = document.createElement('div');
    absActions.id = 'absDetailActions';
    absActions.className = 'abs-detail-actions';
    actionsDetail.parentNode.insertBefore(absActions, actionsDetail);
  }
  if (absActions) {
    absActions.innerHTML = `
      <div class="abs-sec-btns">
        <button type="button" class="abs-sec" onclick="toggleFavorite(${product.id})">GUARDAR EN DESEOS</button>
        <button type="button" class="abs-sec" onclick="toggleCompare(${product.id})">COMPARAR</button>
        <button type="button" class="abs-sec" onclick="navigator.clipboard.writeText(location.href);showToast('Link copiado')">COPIAR LINK</button>
      </div>
    `;
  }
  let absBuy = document.getElementById('absBuyNowRow');
  if (!absBuy && actionsDetail) {
    absBuy = document.createElement('div');
    absBuy.id = 'absBuyNowRow';
    absBuy.className = 'abs-buy-now-row';
    actionsDetail.insertAdjacentElement('afterend', absBuy);
  }
  if (absBuy) {
    absBuy.innerHTML = `
      <button type="button" class="btn-block abs-buy-now" ${product.stock <= 0 ? 'disabled' : ''} onclick="(function(){const q=+document.getElementById('qtyInput')?.value||1;if(addToCart(${product.id},q)!==false){closeModal(document.getElementById('productDetailModal'));renderCart();openModal(document.getElementById('cartModal'));}})()">COMPRAR AHORA</button>
      <p class="abs-buy-hint">Comprar ahora · te lleva al carrito para pagar con Yape / Plin / tarjeta.</p>
      <div class="abs-extra-btns">
        <button type="button" class="abs-wa" onclick="consultProductWA(${product.id})">CONSULTAR POR WHATSAPP</button>
        <button type="button" class="abs-quote-btn" onclick="openQuoteModal(${product.id})">SOLICITAR COTIZACIÓN</button>
        <button type="button" class="abs-continue" onclick="closeModal(document.getElementById('productDetailModal'))">SEGUIR COMPRANDO</button>
      </div>
    `;
  }

  updateFavoriteButtons(product.id);
  const favBtn = document.getElementById('detailFavoriteBtn');
  if (favBtn) {
    favBtn.classList.add('pdp-fav-btn');
    favBtn.onclick = () => toggleFavorite(product.id);
  }

  const relatedGrid = document.getElementById('relatedProducts');
  if (relatedGrid) {
    const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    relatedGrid.innerHTML = related.length
      ? related.map(p => `
          <div class="related-card" onclick="openQuickView(${p.id})">
            <img src="${p.image || DEFAULT_IMAGE}" alt="${p.name}">
            <div class="related-info"><h5>${p.name}</h5><span class="related-price">${formatPrice(p.price)}</span></div>
          </div>`).join('')
      : '<p style="text-align:center;color:var(--color-text-secondary);padding:20px">No hay relacionados</p>';
  }

  if (typeof switchTab === 'function') switchTab('description');
  openModal(modal);
  try { renderProductReviews(productId); } catch (e) { console.warn(e); }
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabName));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === `tab-${tabName}`));
}

// ============================================
// FILTROS
// ============================================
function normalizeText(str) {
  return String(str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function getFilteredProducts() {
  const checkedCats = [...document.querySelectorAll('input[name="cat"]:checked')]
    .map(cb => normalizeText(cb.value));
  const minRaw = document.getElementById('minPrice')?.value;
  const maxRaw = document.getElementById('maxPrice')?.value;
  const minPrice = minRaw !== '' && minRaw != null ? parseFloat(minRaw) : 0;
  const maxPrice = maxRaw !== '' && maxRaw != null ? parseFloat(maxRaw) : Infinity;
  const checkedRatings = [...document.querySelectorAll('input[name="rating"]:checked')]
    .map(cb => parseFloat(cb.value))
    .filter(n => !isNaN(n));
  const minRating = checkedRatings.length ? Math.min(...checkedRatings) : 0;

  let filtered = products.filter(p => {
    const catNorm = normalizeText(p.category);
    const catMatch = checkedCats.length === 0 || checkedCats.includes(catNorm);
    const price = Number(p.price) || 0;
    const priceMatch = price >= (isNaN(minPrice) ? 0 : minPrice) &&
      price <= (isNaN(maxPrice) ? Infinity : maxPrice);
    const ratingMatch = (Number(p.rating) || 0) >= minRating;
    return catMatch && priceMatch && ratingMatch;
  });

  const sortValue = document.getElementById('sortSelect')?.value || '';
  if (sortValue === 'price-asc') filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
  else if (sortValue === 'price-desc') filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
  else if (sortValue === 'rating') filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  return filtered;
}

function updateProducts() {
  const list = getFilteredProducts();
  if (document.getElementById('productsGrid')) renderProducts(list);
  // Actualizar contador en el encabezado si existe
  const header = document.querySelector('.products-header h1');
  if (header) {
    const total = products.length;
    const n = list.length;
    header.textContent = n === total
      ? '✨ Productos Destacados'
      : `✨ ${n} producto${n !== 1 ? 's' : ''} encontrado${n !== 1 ? 's' : ''}`;
  }
  updateFilterBadge();
}

function clearAllFilters() {
  document.querySelectorAll('input[name="cat"]').forEach(cb => { cb.checked = false; });
  document.querySelectorAll('input[name="rating"]').forEach(cb => { cb.checked = false; });
  const minEl = document.getElementById('minPrice');
  const maxEl = document.getElementById('maxPrice');
  if (minEl) minEl.value = '';
  if (maxEl) maxEl.value = '';
  const sortEl = document.getElementById('sortSelect');
  if (sortEl) sortEl.value = '';
  updateProducts();
  showToast('Filtros limpiados');
}

function updateFilterBadge() {
  const btn = document.getElementById('filterToggleBtn');
  if (!btn) return;
  const active =
    document.querySelectorAll('input[name="cat"]:checked').length +
    document.querySelectorAll('input[name="rating"]:checked').length +
    (document.getElementById('minPrice')?.value ? 1 : 0) +
    (document.getElementById('maxPrice')?.value ? 1 : 0);
  const sidebar = document.querySelector('.sidebar');
  const collapsed = sidebar?.classList.contains('filters-collapsed');
  if (collapsed) {
    btn.innerHTML = active > 0
      ? `🔍 Mostrar filtros (${active})`
      : '🔍 Mostrar filtros';
  } else {
    btn.innerHTML = active > 0
      ? `🔼 Ocultar filtros (${active})`
      : '🔼 Ocultar filtros';
  }
}

// ============================================
// DASHBOARD CLIENTE
// ============================================
function openClientDashboard() {
  if (!isClient()) {
    if (isAdmin()) { openAdminPanel(); return; }
    showToast('Inicia sesión como cliente', 'warning');
    openModal(document.getElementById('authModal'));
    return;
  }
  clientDashTab = 'overview';
  renderClientDashboard();
  openModal(document.getElementById('clientDashboard'));
}

function switchClientTab(tab) {
  clientDashTab = tab;
  document.querySelectorAll('.cd-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  renderClientDashboard();
}

function renderClientDashboard() {
  const body = document.getElementById('clientDashBody');
  if (!body || !currentUser) return;

  const myOrders = orders.filter(o => o.userId === currentUser.id);
  const totalSpent = myOrders.reduce((s, o) => s + o.total, 0);
  const favProducts = favorites.map(id => getProduct(id)).filter(Boolean);
  const recentProducts = recentlyViewed.map(id => getProduct(id)).filter(Boolean).slice(0, 6);

  // Sidebar stats always visible in header
  const headerStats = document.getElementById('clientDashStats');
  const points = getUserPoints();
  const level = getUserLevel(points);
  if (headerStats) {
    headerStats.innerHTML = `
      <div class="cd-stat"><span class="cd-stat-val">${myOrders.length}</span><span class="cd-stat-lbl">Pedidos</span></div>
      <div class="cd-stat"><span class="cd-stat-val">${formatPrice(totalSpent)}</span><span class="cd-stat-lbl">Gastado</span></div>
      <div class="cd-stat"><span class="cd-stat-val">${points}</span><span class="cd-stat-lbl">Puntos</span></div>
      <div class="cd-stat"><span class="cd-stat-val">${level.icon} ${level.name}</span><span class="cd-stat-lbl">Nivel</span></div>
    `;
  }

  if (clientDashTab === 'overview') {
    const nextLevel = LOYALTY.levels.find(l => l.min > points) || null;
    const progress = nextLevel
      ? Math.min(100, Math.round((points / nextLevel.min) * 100))
      : 100;
    const recs = getRecommendations(6);
    body.innerHTML = `
      <div class="cd-welcome">
        <h3>¡Hola, ${currentUser.name}! 👋</h3>
        <p>Bienvenido a tu panel de cliente</p>
      </div>

      <div class="loyalty-card">
        <div class="loyalty-header">
          <div class="loyalty-badge" style="--lvl-color:${level.color}">
            <span class="loyalty-icon">${level.icon}</span>
            <div>
              <strong>Nivel ${level.name}</strong>
              <small>${points} puntos</small>
            </div>
          </div>
          <div class="loyalty-benefits">
            ${level.discount > 0
              ? `<span class="loyalty-perk">🎁 ${Math.round(level.discount * 100)}% dto. en compras</span>`
              : `<span class="loyalty-perk">Sigue comprando para subir de nivel</span>`}
            <span class="loyalty-perk">⭐ 1 punto por cada $1</span>
            <span class="loyalty-perk">💱 100 pts = $1 dto.</span>
          </div>
        </div>
        <div class="loyalty-progress-wrap">
          <div class="loyalty-progress-bar"><div class="loyalty-progress-fill" style="width:${progress}%;background:${level.color}"></div></div>
          <div class="loyalty-progress-labels">
            <span>${points} pts</span>
            <span>${nextLevel ? `Siguiente: ${nextLevel.icon} ${nextLevel.name} (${nextLevel.min} pts)` : 'Nivel máximo ✨'}</span>
          </div>
        </div>
        <div class="loyalty-actions">
          <button class="btn-secondary btn-sm" onclick="switchClientTab('loyalty')">📱 Tarjeta LoyiCard</button>
          <button class="btn-primary btn-sm" onclick="openLoyiCardRegister()">Obtener Wallet</button>
          <button class="btn-primary btn-sm" onclick="closeModal(document.getElementById('clientDashboard'));setTimeout(()=>{document.getElementById('cartFloating')?.click()||document.getElementById('cartBtn')?.click()},200)" ${points < 100 ? 'disabled' : ''}>Canjear puntos en carrito</button>
        </div>
      </div>

      <div class="cd-grid">
        <div class="cd-card">
          <h4>📦 Últimos pedidos</h4>
          ${myOrders.length === 0
            ? '<p class="cd-empty">Aún no has realizado compras</p>'
            : myOrders.slice(0, 3).map(o => `
              <div class="cd-order-mini">
                <div><strong>${o.id}</strong><br><small>${new Date(o.date).toLocaleDateString('es')}</small></div>
                <div class="cd-order-total">${formatPrice(o.total)}</div>
              </div>`).join('')}
          ${myOrders.length > 0 ? '<button class="btn-secondary btn-sm" onclick="switchClientTab(\'orders\')" style="margin-top:12px">Ver todos</button>' : ''}
        </div>
        <div class="cd-card">
          <h4>❤️ Favoritos</h4>
          ${favProducts.length === 0
            ? '<p class="cd-empty">No tienes favoritos aún</p>'
            : `<div class="cd-mini-grid">${favProducts.slice(0, 4).map(p => `
              <div class="cd-mini-product" onclick="openQuickView(${p.id});closeModal(document.getElementById('clientDashboard'))">
                <img src="${p.image}" alt="${p.name}">
                <span>${p.name.slice(0, 20)}</span>
              </div>`).join('')}</div>`}
        </div>
        <div class="cd-card">
          <h4>🎟️ Cupones disponibles</h4>
          <div class="cd-coupons">
            <div class="cd-coupon"><code>BIENVENIDO10</code> <span>10% desc.</span></div>
            <div class="cd-coupon"><code>AHORRA20</code> <span>20% (mín $100)</span></div>
            <div class="cd-coupon"><code>ENVIOGRATIS</code> <span>$5 desc.</span></div>
          </div>
        </div>
      </div>

      <section class="cd-recommendations">
        <h3>✨ Recomendado para ti</h3>
        <p class="cd-rec-sub">Basado en tus favoritos, vistas y productos mejor valorados</p>
        <div id="recommendationsGrid" class="products-grid cd-rec-grid">
          ${recs.length === 0
            ? '<p class="cd-empty">Explora la tienda para recibir recomendaciones personalizadas</p>'
            : recs.map(p => `
              <article class="product-card">
                <div class="product-image" onclick="openQuickView(${p.id});closeModal(document.getElementById('clientDashboard'))">
                  <img src="${p.image || DEFAULT_IMAGE}" alt="${p.name}">
                  ${p.offer ? '<span class="badge-offer">OFERTA</span>' : ''}
                </div>
                <div class="product-info">
                  <span class="product-category">${p.category}</span>
                  <h3 class="product-name" style="font-size:14px">${p.name}</h3>
                  <div class="rating"><span class="stars">${'★'.repeat(Math.round(p.rating || 0))}${'☆'.repeat(5 - Math.round(p.rating || 0))}</span></div>
                  <div class="price-row"><span class="price" style="font-size:18px">${formatPrice(p.price)}</span></div>
                  <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart(${p.id})" ${!p.inStock ? 'disabled' : ''}>🛒 Agregar</button>
                  </div>
                </div>
              </article>`).join('')}
        </div>
      </section>`;
  } else if (clientDashTab === 'loyalty') {
    const nextLevel = LOYALTY.levels.find(l => l.min > points) || null;
    const progress = nextLevel
      ? Math.min(100, Math.round((points / nextLevel.min) * 100))
      : 100;
    const cardId = 'TT-' + String(currentUser.id).padStart(6, '0');
    const memberSince = (users.find(u => u.id === currentUser.id) || {}).createdAt || '—';
    const loyiQr = getLoyiCardQrUrl(140);
    const alreadyJoined = hasClickedLoyiCardRegister();
    // Sellos visuales (estilo LoyiCard): 1 sello cada 100 pts, meta 10
    const stampsEarned = Math.min(10, Math.floor(points / 100));
    const stampsHtml = Array.from({ length: 10 }, (_, i) =>
      `<span class="stamp-slot ${i < stampsEarned ? 'filled' : ''}">${i < stampsEarned ? '★' : (i + 1)}</span>`
    ).join('');

    body.innerHTML = `
      <h3 style="margin-bottom:6px">📱 Tarjeta digital (LoyiCard)</h3>
      <p style="color:var(--color-text-secondary);margin-bottom:16px;font-size:13px">
        Guarda tu tarjeta en el <strong>Wallet del móvil</strong> (Apple / Google). Sin apps extra.
        ${alreadyJoined ? '<span style="color:var(--color-success);font-weight:600"> · Ya abriste el alta</span>' : ''}
      </p>

      <!-- CTA alta LoyiCard Nivel A -->
      <div class="loyicard-cta-banner">
        <div class="loyicard-cta-text">
          <strong>Obtén tu tarjeta digital oficial</strong>
          <span>Escanea el QR o pulsa el botón. Se abre el registro LoyiCard para guardar la tarjeta en tu móvil.</span>
        </div>
        <div class="loyicard-cta-actions">
          <a href="${getLoyiCardRegisterUrl()}" target="_blank" rel="noopener noreferrer" title="Escanear o tocar para abrir LoyiCard">
            <img class="loyicard-cta-qr" src="${loyiQr}" alt="QR alta LoyiCard" width="100" height="100" loading="lazy"
              onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=140x140&data='+encodeURIComponent('${getLoyiCardRegisterUrl()}')">
          </a>
          <div class="loyicard-cta-btns">
            <button type="button" class="btn-primary" onclick="openLoyiCardRegister()">📱 Obtener tarjeta / Wallet</button>
            <a class="btn-secondary" href="${getLoyiCardRegisterUrl()}" target="_blank" rel="noopener noreferrer" style="text-align:center;text-decoration:none;display:inline-block;padding:10px 14px;border-radius:10px">Abrir enlace LoyiCard</a>
          </div>
        </div>
      </div>

      <!-- Mockup visual: teléfono + tarjeta digital -->
      <div class="phone-mockup-wrap">
        <div class="phone-mockup" aria-label="Vista previa de tarjeta en el móvil">
          <div class="phone-notch"></div>
          <div class="phone-screen">
            <div class="phone-status">
              <span>12:32</span>
              <span class="phone-status-icons">●●● 📶 🔋</span>
            </div>
            <div class="phone-app-header">
              <span class="phone-app-title">Absolut 360 Club</span>
              <span class="phone-app-sub">Tarjeta digital</span>
            </div>
            <div class="loyicard-wallet phone-card" style="--lvl-color:${level.color}">
              <div class="loyicard-top">
                <div class="loyicard-brand">
                  <span class="loyicard-logo">🛒</span>
                  <div>
                    <strong>${LOYICARD.brandName}</strong>
                    <small>Powered by LoyiCard</small>
                  </div>
                </div>
                <span class="loyicard-tier">${level.icon} ${level.name}</span>
              </div>
              <div class="loyicard-body">
                <div class="loyicard-holder">
                  <span class="loyicard-label">Titular</span>
                  <strong>${currentUser.name || 'Cliente'}</strong>
                </div>
                <div class="loyicard-meta-row">
                  <div>
                    <span class="loyicard-label">Nº socio</span>
                    <strong class="loyicard-id">${cardId}</strong>
                  </div>
                  <div>
                    <span class="loyicard-label">Puntos</span>
                    <strong class="loyicard-points">${points}</strong>
                  </div>
                </div>
                <div class="loyicard-balance-row">
                  <div class="loyicard-balance-box">
                    <span class="loyicard-label">Canje disponible</span>
                    <strong>$${Math.floor(points / LOYALTY.redemptionRate)}</strong>
                  </div>
                  <div class="loyicard-balance-box">
                    <span class="loyicard-label">Nivel</span>
                    <strong>${level.name}</strong>
                  </div>
                </div>
                <div class="loyicard-stamps" title="1 sello cada 100 pts">
                  ${stampsHtml}
                </div>
                <p class="loyicard-stamps-hint">${stampsEarned}/10 sellos · 10 sellos = $10 dto.</p>
              </div>
              <div class="loyicard-foot">
                <div class="loyicard-qr-wrap">
                  <a href="${getLoyiCardRegisterUrl()}" target="_blank" rel="noopener noreferrer">
                    <img class="loyicard-qr" src="${loyiQr}" alt="QR LoyiCard" width="80" height="80" loading="lazy"
                      onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=120x120&data='+encodeURIComponent('${getLoyiCardRegisterUrl()}')">
                  </a>
                  <span>Escanear</span>
                </div>
                <div class="loyicard-foot-info">
                  <span>Desde ${memberSince}</span>
                  <span>${level.discount > 0 ? Math.round(level.discount * 100) + '% dto. nivel' : 'Suma puntos'}</span>
                  <button type="button" class="btn-secondary btn-sm loyicard-save-btn" onclick="openLoyiCardRegister()">
                    Añadir al Wallet
                  </button>
                </div>
              </div>
            </div>
            <p class="phone-hint">Así se ve tu tarjeta en el móvil</p>
          </div>
          <div class="phone-home-bar"></div>
        </div>
        <div class="phone-mockup-side">
          <h4>📱 Tu tarjeta digital</h4>
          <p>Igual que en el video: puntos, nivel y QR en el celular. Guárdala en Apple Wallet o Google Wallet con LoyiCard.</p>
          <ul class="phone-benefits">
            <li>⭐ 1 punto por cada $1</li>
            <li>💱 100 pts = $1 de descuento</li>
            <li>🏆 Niveles Bronce → Diamante</li>
            <li>📲 QR para activar en el móvil</li>
          </ul>
          <button type="button" class="btn-primary btn-block" onclick="openLoyiCardRegister()">
            ${alreadyJoined ? '✅ Abrir / renovar Wallet' : '📱 Obtener mi tarjeta'}
          </button>
          <a class="btn-secondary btn-block" href="${getLoyiCardRegisterUrl()}" target="_blank" rel="noopener noreferrer" style="text-align:center;margin-top:8px;display:block;text-decoration:none;padding:10px;border-radius:10px">
            Abrir enlace LoyiCard
          </a>
        </div>
      </div>

      <div class="loyalty-card loyalty-card-lg" style="margin-top:18px">
        <div class="loyalty-progress-wrap">
          <div class="loyalty-progress-bar"><div class="loyalty-progress-fill" style="width:${progress}%;background:${level.color}"></div></div>
          <div class="loyalty-progress-labels">
            <span>${points} pts</span>
            <span>${nextLevel ? `${nextLevel.min - points} pts para ${nextLevel.name}` : '¡Nivel máximo!'}</span>
          </div>
        </div>
        <div class="loyalty-redeem-box">
          <div>
            <strong>Canje disponible</strong>
            <p style="margin:4px 0 0;font-size:13px;color:var(--color-text-secondary)">
              ${Math.floor(points / LOYALTY.redemptionRate) > 0
                ? `Puedes canjear hasta $${Math.floor(points / LOYALTY.redemptionRate)} en tu próxima compra`
                : 'Acumula al menos 100 puntos para canjear $1'}
            </p>
          </div>
          <button class="btn-primary" onclick="closeModal(document.getElementById('clientDashboard'));setTimeout(()=>{document.getElementById('cartFloating')?.click()||document.getElementById('cartBtn')?.click()},200)" ${points < 100 ? 'disabled' : ''}>
            💱 Canjear en carrito
          </button>
        </div>
      </div>

      <h4 style="margin:24px 0 12px">Niveles del programa</h4>
      <div class="loyalty-levels">
        ${LOYALTY.levels.map(l => `
          <div class="loyalty-level-card ${l.name === level.name ? 'current' : ''}" style="--lvl-color:${l.color}">
            <div class="ll-icon">${l.icon}</div>
            <strong>${l.name}</strong>
            <small>Desde ${l.min} pts</small>
            <div class="ll-perk">${l.discount > 0 ? Math.round(l.discount * 100) + '% dto. extra' : 'Nivel inicial'}</div>
            ${l.name === level.name ? '<span class="ll-current">Tu nivel</span>' : ''}
          </div>`).join('')}
      </div>

      <div class="cd-card" style="margin-top:20px">
        <h4>Cómo funciona (estilo LoyiCard)</h4>
        <ul class="loyalty-howto">
          <li>📱 <strong>Tarjeta 100% digital</strong> en tu móvil — sin cartón ni apps extra</li>
          <li>🛒 Ganas <strong>1 punto por cada $1</strong> en compras completadas</li>
          <li>★ Cada <strong>100 puntos = 1 sello</strong>; 10 sellos = $10 de canje</li>
          <li>💱 También puedes canjear <strong>100 pts = $1</strong> directo en el carrito</li>
          <li>🏆 Al subir de nivel obtienes descuento automático extra</li>
          <li>🎁 Al registrarte recibes <strong>50 puntos de bienvenida</strong></li>
        </ul>
      </div>`;
  } else if (clientDashTab === 'orders') {
    body.innerHTML = `
      <h3 style="margin-bottom:16px">📦 Mis Pedidos</h3>
      ${myOrders.length === 0
        ? '<div class="empty-state"><p style="font-size:48px">📭</p><p>No tienes pedidos todavía</p><button class="btn-primary" onclick="closeModal(document.getElementById(\'clientDashboard\'))" style="margin-top:12px">Ir a comprar</button></div>'
        : myOrders.map(o => `
          <div class="cd-order-card">
            <div class="cd-order-header">
              <div>
                <strong>${o.id}</strong>
                <span class="cd-badge completed">Completado</span>
              </div>
              <div class="cd-order-date">${new Date(o.date).toLocaleString('es')}</div>
            </div>
            <div class="cd-order-items">
              ${o.items.map(it => `
                <div class="cd-order-item">
                  <img src="${it.image || DEFAULT_IMAGE}" alt="">
                  <div><strong>${it.name}</strong><br><small>${it.qty} × ${formatPrice(it.price)}</small></div>
                  <strong>${formatPrice(it.price * it.qty)}</strong>
                </div>`).join('')}
            </div>
            <div class="cd-order-footer">
              ${o.discount > 0 ? `<span>Descuento: -${formatPrice(o.discount)}</span>` : ''}
              <span class="status-pill ${orderStatusMeta(o.status).class}">${orderStatusMeta(o.status).label}</span>
              <strong>Total: ${formatPrice(o.total)}</strong>
              <div class="cd-order-actions" style="width:100%;display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
                <a class="btn-secondary btn-sm" target="_blank" rel="noopener" href="${getWhatsAppOrderUrl(o)}" style="text-decoration:none">💬 WhatsApp</a>
                <a class="btn-ghost btn-sm" href="${getMailtoOrderUrl(o)}" style="text-decoration:none">✉️ Correo</a>
              </div>
            </div>
          </div>`).join('')}`;
  } else if (clientDashTab === 'favorites') {
    body.innerHTML = `
      <h3 style="margin-bottom:16px">❤️ Mis Favoritos</h3>
      ${favProducts.length === 0
        ? '<div class="empty-state"><p style="font-size:48px">🤍</p><p>No tienes favoritos</p></div>'
        : `<div class="products-grid" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">${favProducts.map(p => `
          <article class="product-card">
            <div class="product-image" onclick="openQuickView(${p.id});closeModal(document.getElementById('clientDashboard'))">
              <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="product-info">
              <h3 class="product-name" style="font-size:14px">${p.name}</h3>
              <div class="price-row"><span class="price" style="font-size:18px">${formatPrice(p.price)}</span></div>
              <div class="product-actions">
                <button class="btn-add-cart" onclick="addToCart(${p.id})" ${!p.inStock ? 'disabled' : ''}>🛒</button>
                <button class="btn-favorite active" onclick="toggleFavorite(${p.id})">❤️</button>
              </div>
            </div>
          </article>`).join('')}</div>`}`;
  } else if (clientDashTab === 'profile') {
    body.innerHTML = `
      <h3 style="margin-bottom:16px">👤 Mi Perfil</h3>
      <form id="profileForm" class="cd-profile-form">
        <div class="form-grid">
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" id="profName" value="${currentUser.name || ''}" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="profEmail" value="${currentUser.email || ''}" disabled>
          </div>
          <div class="form-group">
            <label>Teléfono</label>
            <input type="tel" id="profPhone" value="${currentUser.phone || ''}" placeholder="Opcional">
          </div>
          <div class="form-group">
            <label>Dirección</label>
            <input type="text" id="profAddress" value="${currentUser.address || ''}" placeholder="Opcional">
          </div>
        </div>
        <div class="form-group">
          <label>Nueva contraseña (dejar vacío para no cambiar)</label>
          <input type="password" id="profPassword" placeholder="••••••••" minlength="6">
        </div>
        <button type="submit" class="btn-primary">💾 Guardar cambios</button>
      </form>`;
    document.getElementById('profileForm').onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('profName').value.trim();
      const phone = document.getElementById('profPhone').value.trim();
      const address = document.getElementById('profAddress').value.trim();
      const newPass = document.getElementById('profPassword').value;
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
      updateAuthUI();
      showToast('✅ Perfil actualizado');
      renderClientDashboard();
    };
  }
}

// ============================================
// PANEL ADMIN
// ============================================
function openAdminPanel() {
  if (!isAdmin()) {
    showToast('Acceso solo para administradores', 'error');
    openModal(document.getElementById('authModal'));
    return;
  }
  window.location.href = 'admin.html';
}

function renderAdminDashboard() {
  const total = products.length;
  const inStock = products.filter(p => p.inStock && p.stock > 0).length;
  const outOfStock = products.filter(p => !p.inStock || p.stock === 0).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length;
  const totalValue = products.reduce((s, p) => s + (p.price * (p.stock || 0)), 0);
  const offers = products.filter(p => p.offer).length;
  const avgRating = products.length ? (products.reduce((s, p) => s + (p.rating || 0), 0) / products.length).toFixed(1) : 0;
  const totalStock = products.reduce((s, p) => s + (p.stock || 0), 0);
  const totalOrders = orders.length;
  const revenue = orders.reduce((s, o) => s + o.total, 0);

  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('statTotal', total);
  set('statInStock', inStock);
  set('statOutOfStock', outOfStock);
  set('statLowStock', lowStock);
  set('statValue', formatPrice(totalValue));
  set('statOffers', offers);
  set('statAvgRating', avgRating);
  set('statTotalUnits', totalStock);
  set('statOrders', totalOrders);
  set('statRevenue', formatPrice(revenue));
  set('statUsers', users.filter(u => u.role === 'client').length);

  renderCategoryChart();
  renderAdminAlerts();
}

function renderCategoryChart() {
  const chart = document.getElementById('categoryChart');
  if (!chart) return;
  const colors = ['#667eea', '#a855f7', '#22d3ee', '#f59e0b', '#10b981', '#f43f5e', '#8b5cf6', '#06b6d4'];
  const cats = {};
  products.forEach(p => {
    const c = p.category || 'Sin categoría';
    cats[c] = (cats[c] || 0) + 1;
  });
  const entries = Object.entries(cats).sort((a, b) => b[1] - a[1]);
  if (!entries.length) {
    chart.innerHTML = '<p style="color:#94a3b8;font-size:13px;margin:0">Sin productos aún</p>';
    return;
  }
  const maxCount = Math.max(...entries.map(e => e[1]), 1);
  chart.innerHTML = entries.map(([cat, count], i) => {
    const pct = Math.max(8, (count / maxCount) * 100);
    const color = colors[i % colors.length];
    const short = cat.length > 18 ? cat.slice(0, 16) + '…' : cat;
    return `<div class="chart-item"><div class="chart-label" title="${cat}">${short}</div>
      <div class="chart-bar-container"><div class="chart-bar" style="width:${pct}%;background:${color}"><span class="chart-value">${count}</span></div></div></div>`;
  }).join('');
}

/** Ajuste rápido de stock desde la tabla admin */
function adminAdjustStock(id, delta) {
  const p = getProduct(id);
  if (!p) return;
  const next = Math.max(0, (p.stock || 0) + delta);
  p.stock = next;
  p.inStock = next > 0;
  saveProducts();
  renderAdminDashboard();
  renderAdminTable();
  showToast(`📦 ${p.name}: stock ${next}`);
}

function renderAdminAlerts() {
  const alerts = document.getElementById('adminAlerts');
  if (!alerts) return;
  const low = products.filter(p => p.stock > 0 && p.stock <= 5);
  const out = products.filter(p => !p.inStock || p.stock === 0);
  let html = '';
  if (out.length) html += `<div class="alert alert-danger"><strong>⚠️ ${out.length} agotado(s)</strong><p>${out.map(p => p.name).join(', ')}</p></div>`;
  if (low.length) html += `<div class="alert alert-warning"><strong>⚡ ${low.length} stock bajo</strong><p>${low.map(p => `${p.name} (${p.stock})`).join(', ')}</p></div>`;
  if (!html) html = `<div class="alert alert-success"><strong>✓ Todo en orden</strong><p>Sin alertas</p></div>`;
  alerts.innerHTML = html;
}

function renderAdminTable() {
  const tbody = document.getElementById('adminTableBody');
  if (!tbody) return;
  const search = (document.getElementById('adminSearch')?.value || '').toLowerCase().trim();
  const catFilter = document.getElementById('adminFilterCategory')?.value || '';
  const stockFilter = document.getElementById('adminFilterStock')?.value || '';

  let filtered = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search) || (p.sku || '').toLowerCase().includes(search);
    const matchCat = !catFilter || p.category === catFilter;
    let matchStock = true;
    if (stockFilter === 'in') matchStock = p.inStock && p.stock > 0;
    else if (stockFilter === 'out') matchStock = !p.inStock || p.stock === 0;
    else if (stockFilter === 'low') matchStock = p.stock > 0 && p.stock <= 5;
    else if (stockFilter === 'offer') matchStock = p.offer;
    return matchSearch && matchCat && matchStock;
  });

  const countEl = document.getElementById('adminProductCount');
  if (countEl) countEl.textContent = filtered.length + ' de ' + products.length + ' productos';

  tbody.innerHTML = filtered.length === 0
    ? '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--color-text-secondary)">No hay productos con estos filtros</td></tr>'
    : filtered.map(p => `
      <tr>
        <td><div class="product-cell"><img src="${p.image || DEFAULT_IMAGE}" onerror="this.src='${DEFAULT_IMAGE}'"><div><strong>${p.name}</strong><small>${p.sku || 'SKU-' + p.id}</small></div></div></td>
        <td><span class="tag">${p.category}</span></td>
        <td><strong>${formatPrice(p.price)}</strong>${p.oldPrice ? `<br><small class="old-price">${formatPrice(p.oldPrice)}</small>` : ''}</td>
        <td>
          <div class="stock-quick">
            <button type="button" class="stock-btn" onclick="adminAdjustStock(${p.id}, -1)" title="-1">−</button>
            <span class="stock-badge ${p.stock > 5 ? 'in-stock' : p.stock > 0 ? 'low-stock' : 'out-of-stock'}">${p.stock}</span>
            <button type="button" class="stock-btn" onclick="adminAdjustStock(${p.id}, 1)" title="+1">+</button>
          </div>
        </td>
        <td>⭐ ${p.rating} <small>(${p.reviews})</small></td>
        <td><div class="admin-badges">
          ${p.offer ? '<span class="mini-badge offer">OFERTA</span>' : ''}
          ${p.isNew ? '<span class="mini-badge new">NUEVO</span>' : ''}
          ${p.inStock ? '<span class="mini-badge active">ACTIVO</span>' : '<span class="mini-badge inactive">INACTIVO</span>'}
        </div></td>
        <td><div class="action-btns actions">
          <button class="btn-icon edit" onclick="editProduct(${p.id})" title="Editar">✏️</button>
          <button class="btn-icon duplicate" onclick="duplicateProduct(${p.id})" title="Duplicar">📋</button>
          <button class="btn-icon delete" onclick="deleteProduct(${p.id})" title="Eliminar">🗑️</button>
        </div></td>
      </tr>`).join('');
}

function duplicateProduct(id) {
  const p = getProduct(id);
  if (!p) return;
  const newId = Math.max(...products.map(x => x.id), 0) + 1;
  products.push({ ...structuredClone(p), id: newId, name: p.name + ' (Copia)', sku: (p.sku || 'SKU') + '-COPY' });
  saveProducts();
  renderAdminDashboard();
  renderAdminTable();
  showToast(`📋 Duplicado: ${p.name}`);
}

function exportProducts() {
  const blob = new Blob([JSON.stringify(products, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `productos_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast('📥 Exportado');
}

function importProducts() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (Array.isArray(imported) && confirm(`¿Importar ${imported.length} productos? Reemplazará los actuales.`)) {
          products = imported;
          saveProducts();
          renderAdminDashboard();
          renderAdminTable();
          showToast('✅ Importados');
        }
      } catch { showToast('Archivo inválido', 'error'); }
    };
    reader.readAsText(file);
  };
  input.click();
}

function resetProducts() {
  if (confirm('¿Restaurar productos por defecto? Se perderán los cambios.')) {
    products = structuredClone(defaultProducts);
    saveProducts();
    renderAdminDashboard();
    renderAdminTable();
    if (document.getElementById('productsGrid')) renderProducts(getFilteredProducts());
    showToast('✅ Restaurados');
  }
}

function formatSoles(n) {
  return 'S/ ' + (Number(n) || 0).toFixed(2);
}

function updateProductPricingUI() {
  const cost = parseFloat(document.getElementById('pCost')?.value) || 0;
  const margin = parseFloat(document.getElementById('pMargin')?.value) || 0;
  const price = parseFloat(document.getElementById('pPrice')?.value) || 0;
  const igvPct = parseFloat(document.getElementById('pIgv')?.value) || 0;

  // Precio sugerido = costo * (1 + margen/100)
  const suggested = cost > 0 ? cost * (1 + margin / 100) : 0;
  const estProfit = suggested - cost;
  const igvAmount = price * (igvPct / 100);
  const priceWithIgv = price + igvAmount;
  const realProfit = price - cost;

  const setTxt = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  setTxt('pSuggested', formatSoles(suggested));
  setTxt('pEstProfit', formatSoles(estProfit));
  setTxt('pIgvAmount', formatSoles(igvAmount));
  setTxt('pPriceWithIgv', formatSoles(priceWithIgv));
  setTxt('pRealProfit', formatSoles(realProfit));
}

function initProductPricingControls() {
  ['pCost', 'pMargin', 'pPrice', 'pIgv'].forEach(id => {
    const el = document.getElementById(id);
    if (!el || el.dataset.pricingBound) return;
    el.dataset.pricingBound = '1';
    el.addEventListener('input', updateProductPricingUI);
    el.addEventListener('change', updateProductPricingUI);
  });
  const applyBtn = document.getElementById('pApplySuggested');
  if (applyBtn && !applyBtn.dataset.bound) {
    applyBtn.dataset.bound = '1';
    applyBtn.addEventListener('click', () => {
      const cost = parseFloat(document.getElementById('pCost')?.value) || 0;
      const margin = parseFloat(document.getElementById('pMargin')?.value) || 0;
      const suggested = cost > 0 ? cost * (1 + margin / 100) : 0;
      const priceEl = document.getElementById('pPrice');
      if (priceEl) {
        priceEl.value = suggested.toFixed(2);
        updateProductPricingUI();
        showToast('Precio sugerido aplicado');
      }
    });
  }
  updateProductPricingUI();
}

function editProduct(id) {
  const p = getProduct(id);
  if (!p) return;
  document.getElementById('productModalTitle').textContent = '✏️ Editar Producto';
  document.getElementById('productId').value = p.id;
  document.getElementById('pName').value = p.name;
  document.getElementById('pCategory').value = p.category;
  document.getElementById('pPrice').value = p.price;
  document.getElementById('pOldPrice').value = p.oldPrice || '';
  document.getElementById('pStock').value = p.stock || 0;
  document.getElementById('pRating').value = p.rating || 4;
  document.getElementById('pReviews').value = p.reviews || 0;
  document.getElementById('pSku').value = p.sku || '';
  document.getElementById('pDescription').value = p.description || '';
  document.getElementById('pFeatures').value = (p.features || []).join(', ');
  document.getElementById('pOffer').checked = !!p.offer;
  document.getElementById('pInStock').checked = p.inStock !== false;
  document.getElementById('pIsNew').checked = !!p.isNew;
  // Costeo / rentabilidad
  const costEl = document.getElementById('pCost');
  const marginEl = document.getElementById('pMargin');
  const igvEl = document.getElementById('pIgv');
  const delEl = document.getElementById('pDelivery');
  if (costEl) costEl.value = p.cost != null ? p.cost : 0;
  if (marginEl) marginEl.value = p.margin != null ? p.margin : 40;
  if (igvEl) igvEl.value = p.igv != null ? String(p.igv) : '18';
  if (delEl) delEl.value = p.delivery || 'gratis';
  const preview = document.getElementById('imagePreview');
  const placeholder = document.getElementById('previewPlaceholder');
  if (p.image && p.image !== DEFAULT_IMAGE) {
    preview.src = p.image;
    preview.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
  } else {
    preview.src = '';
    preview.style.display = 'none';
    if (placeholder) placeholder.style.display = 'block';
  }
  initProductPricingControls();
  updateProductPricingUI();
  openModal(document.getElementById('productModal'));
}

function deleteProduct(id) {
  const p = getProduct(id);
  if (!p || !confirm(`¿Eliminar "${p.name}"?`)) return;
  products = products.filter(x => x.id !== id);
  saveProducts();
  renderAdminDashboard();
  renderAdminTable();
  if (document.getElementById('productsGrid')) renderProducts(getFilteredProducts());
  showToast('🗑️ Eliminado');
}

// ============================================
// CHAT
// ============================================
const chatResponses = {
  greeting: ['¡Hola! 👋 Soy el asistente IA de Absolut 360. Pregúntame por productos, ofertas o cómo mejorar imágenes de productos.', '¡Bienvenido! Prueba: "mejorar calidad de imagen" o "imagen para lapiceros".'],
  thanks: ['¡De nada! 😊', '¡Para eso estoy!', '¡Cualquier otra cosa, avísame!'],
  bye: ['¡Hasta pronto! 👋', '¡Que tengas un buen día!'],
  fallback: ['Puedes preguntar por categorías, ofertas, stock, o por imágenes: "mejorar calidad de imagen", "imagen para taza".', 'Prueba: "¿qué ofertas hay?", "imagen para lapiceros" o "mejorar calidad de foto".']
};

function getChatReply(text) {
  const q = text.toLowerCase().trim();
  if (/hola|buenas|hey|hi|hello/.test(q)) return chatResponses.greeting[Math.floor(Math.random() * 2)];
  if (/gracias|thanks|thank/.test(q)) return chatResponses.thanks[Math.floor(Math.random() * 3)];
  if (/adios|chao|bye|hasta luego/.test(q)) return chatResponses.bye[Math.floor(Math.random() * 2)];
  if (/oferta|descuento|promo|barato/.test(q)) {
    const offers = products.filter(p => p.offer && p.inStock);
    if (!offers.length) return 'Ahora mismo no hay ofertas activas. ¡Vuelve pronto!';
    return `🔥 Ofertas actuales:\n${offers.map(p => `• ${p.name} — ${formatPrice(p.price)}${p.oldPrice ? ` (antes ${formatPrice(p.oldPrice)})` : ''}`).join('\n')}`;
  }
  if (/stock|disponible|hay/.test(q)) {
    const found = products.find(p => q.includes(p.name.toLowerCase().split(' ')[0]) || q.includes((p.sku || '').toLowerCase()));
    if (found) {
      if (found.stock <= 0) return `❌ "${found.name}" está agotado.`;
      if (found.stock <= 5) return `⚡ Solo quedan ${found.stock} unidades de "${found.name}".`;
      return `✅ "${found.name}" tiene ${found.stock} unidades en stock. Precio: ${formatPrice(found.price)}`;
    }
  }
  if (/recomienda|suger|mejor|popular|qué me/.test(q)) {
    let candidates = [...products].filter(p => p.inStock).sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (/electrónica|tecnología|gadget/.test(q)) candidates = candidates.filter(p => p.category === 'Electrónica');
    if (/ropa|camiseta|moda/.test(q)) candidates = candidates.filter(p => p.category === 'Ropa');
    if (/hogar|casa|lámpara|silla/.test(q)) candidates = candidates.filter(p => p.category === 'Hogar');
    if (/deporte|gym|correr|zapatilla/.test(q)) candidates = candidates.filter(p => p.category === 'Deportes');
    if (/auricular|audio|sonido/.test(q)) candidates = candidates.filter(p => /auricular/i.test(p.name));
    const top = candidates.slice(0, 3);
    if (!top.length) return 'No encontré productos que coincidan. Prueba con otra categoría.';
    return `✨ Te recomiendo:\n${top.map(p => `• ${p.name} — ${formatPrice(p.price)} ⭐${p.rating}`).join('\n')}`;
  }
  const match = products.find(p => q.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(q.split(' ').find(w => w.length > 4) || ''));
  if (match) {
    return `📦 ${match.name}\nPrecio: ${formatPrice(match.price)}\nStock: ${match.stock > 0 ? match.stock + ' uds.' : 'Agotado'}\n⭐ ${match.rating} (${match.reviews} reseñas)\n${match.description.slice(0, 120)}...`;
  }
  if (/categoría|categorias|qué venden|productos/.test(q)) {
    const counts = {};
    products.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return `📂 Categorías:\n${Object.entries(counts).map(([c, n]) => `• ${c}: ${n} productos`).join('\n')}`;
  }
  if (/cupón|cupon|descuento código|código/.test(q)) {
    return `🎟️ Cupones disponibles:\n• BIENVENIDO10 → 10% de descuento\n• AHORRA20 → 20% (mín. $100)\n• ENVIOGRATIS → $5 de descuento (mín. $30)`;
  }
  if (/envío|envio|entrega|shipping/.test(q)) return '📦 Envío gratis en compras mayores a $50. Tiempo estimado: 3-5 días hábiles.';
  if (/devolución|devolver|garantía|garantia/.test(q)) return '🔄 Devoluciones gratuitas en 30 días. Garantía de 1 año en la mayoría de productos.';
  if (/login|sesión|cuenta|registr/.test(q)) return 'Puedes iniciar sesión o registrarte con el botón de arriba a la derecha. Demo cliente: cliente@demo.com / cliente123';

  // —— IA de imágenes: calidad, relación con producto, consejos ——
  if (/mejorar.*(imagen|foto|calidad)|calidad.*(imagen|foto)|upscale|nitidez|resoluci[oó]n|mejorar foto/.test(q)) {
    return `✨ <strong>Asistente IA · Mejora de imagen</strong><br><br>
1. <strong>Resolución:</strong> usa mínimo 1200×1200 px (cuadrado) para la tienda.<br>
2. <strong>Fondo:</strong> blanco o neutro; el producto debe ocupar ~70% del encuadre.<br>
3. <strong>Luz:</strong> luz natural difusa o softbox; evita sombras duras.<br>
4. <strong>Enfoque:</strong> nítido en el producto (no en el fondo).<br>
5. <strong>Formato:</strong> JPG optimizado &lt; 500 KB o WebP.<br><br>
💡 En el panel admin, al subir imágenes del producto, la galería las ordena y puedes marcar la principal.<br>
Escribe <em>"imagen para [nombre del producto]"</em> y te digo qué foto conviene.`;
  }

  if (/imagen.*(para|de|relacion)|foto.*(para|de|producto)|qu[eé] imagen|qu[eé] foto|relacionar.*(imagen|foto)/.test(q)) {
    // Detect product keywords
    const tips = [];
    if (/lapicer|bol[ií]grafo|pen/.test(q)) tips.push('✒️ <strong>Lapiceros:</strong> foto de varios lapiceros juntos (kit), ángulo superior, logo visible, fondo claro.');
    if (/taza|mug|cer[aá]mica/.test(q)) tips.push('☕ <strong>Tazas:</strong> taza blanca con logo, vapor opcional, vista 3/4, fondo claro.');
    if (/tomatodo|botella|bottle/.test(q)) tips.push('🍼 <strong>Tomatodos:</strong> botella de pie, tapa visible, marca al frente, fondo minimalista.');
    if (/lanyard|cord[oó]n|credencial/.test(q)) tips.push('🏷️ <strong>Lanyards:</strong> cordón extendido o en uso, logo legible, colores corporativos.');
    if (/cuaderno|notebook|libreta/.test(q)) tips.push('📓 <strong>Cuadernos:</strong> tapa con logo, apilados o abiertos, textura del papel.');
    if (/nfc|tarjeta|card|wowcard|anillo|ring/.test(q)) tips.push('💳 <strong>NFC / tarjetas:</strong> tarjeta cerca de un móvil, chip/logo visible, estilo premium.');
    if (/pack|networking/.test(q)) tips.push('📡 <strong>Packs:</strong> set completo en flat-lay (tarjeta + accesorios), branding Absolut 360.');
    if (!tips.length) {
      // try match product names
      const found = products.filter(p => q.includes((p.name||'').toLowerCase().slice(0, 12)) || q.includes((p.category||'').toLowerCase()));
      if (found.length) {
        return `🖼️ Para <strong>${found[0].name}</strong> (${found[0].category}): usa una foto real del producto, fondo limpio, buena luz y el logo legible. Relación imagen↔título: si el título dice "${found[0].name.split(' ')[0]}", la foto debe mostrar eso claramente.`;
      }
      return `🖼️ <strong>Relacionar imagen ↔ producto</strong><br>
• El título y la foto deben coincidir (ej. "Kit lapiceros" → muchos lapiceros).<br>
• Una imagen principal + 2–4 secundarias (detalle, uso, pack).<br>
• Pregúntame: <em>"imagen para lapiceros"</em> o <em>"mejorar calidad de foto"</em>.`;
    }
    return `🖼️ <strong>Guía de imagen por producto</strong><br><br>${tips.join('<br><br>')}<br><br>¿Quieres consejos de mejora de calidad? Escribe <em>"mejorar calidad de imagen"</em>.`;
  }

  if (/foto|imagen|galer[ií]a|subir imagen/.test(q)) {
    return `📷 Puedo ayudarte a:<br>
• <strong>Mejorar calidad</strong> → escribe "mejorar calidad de imagen"<br>
• <strong>Elegir foto según el producto</strong> → "imagen para taza" / "imagen para NFC"<br>
• En admin: sube hasta 6 imágenes por producto (máx 2MB c/u).`;
  }

  return chatResponses.fallback[Math.floor(Math.random() * 2)];
}

function initChat() {
  const toggle = document.getElementById('chatToggle');
  const box = document.getElementById('chatBox');
  const messages = document.getElementById('chatMessages');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');
  if (!toggle || !box) return;
  toggle.onclick = () => box.classList.toggle('open');
  function appendMsg(text, who = 'bot') {
    const div = document.createElement('div');
    div.className = `chat-msg ${who}`;
    div.innerHTML = text.replace(/\n/g, '<br>');
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }
  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    appendMsg(text, 'user');
    input.value = '';
    setTimeout(() => appendMsg(getChatReply(text), 'bot'), 400 + Math.random() * 400);
  }
  if (send) send.onclick = handleSend;
  if (input) input.onkeydown = e => { if (e.key === 'Enter') handleSend(); };
  if (messages && messages.children.length === 0) appendMsg(chatResponses.greeting[0], 'bot');
}

// ============================================
// PÁGINAS ESPECÍFICAS
// ============================================
function initOffersPage() {
  const grid = document.getElementById('offersGrid');
  const noOffers = document.getElementById('noOffers');
  if (!grid) return;
  const offers = products.filter(p => p.offer);
  if (offers.length === 0) {
    grid.innerHTML = '';
    if (noOffers) noOffers.style.display = 'block';
  } else {
    if (noOffers) noOffers.style.display = 'none';
    renderProducts(offers, 'offersGrid');
  }
}

function initCatalogPage() {
  document.querySelectorAll('.category-card').forEach(card => {
    const cat = card.dataset.category;
    if (!cat) return;
    const count = products.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;
    const countEl = card.querySelector('.category-count');
    if (countEl) countEl.textContent = `${count} producto${count !== 1 ? 's' : ''}`;
    card.onclick = () => {
      sessionStorage.setItem('filterCategory', cat);
      window.location.href = 'app.html';
    };
  });
}

function initContactPage() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.onsubmit = e => {
      e.preventDefault();
      showToast('📤 ¡Mensaje enviado! Te responderemos pronto.');
      form.reset();
    };
  }
  injectLoyiCardPublicBlock(document.querySelector('.contact-container') || document.querySelector('main'));
}

function injectLoyiCardPublicBlock(container) {
  if (!LOYICARD.enabled || !container || document.getElementById('loyicardPublicBlock')) return;
  const div = document.createElement('div');
  div.id = 'loyicardPublicBlock';
  div.className = 'loyicard-public-block';
  const qr = getLoyiCardQrUrl(140);
  const url = getLoyiCardRegisterUrl();
  div.innerHTML = `
    <h3>📱 Tarjeta digital Absolut 360</h3>
    <p>Escanea el QR o pulsa el botón para guardar tu tarjeta de fidelización en el Wallet del móvil. Powered by LoyiCard · Sin descargar apps.</p>
    <a href="${url}" target="_blank" rel="noopener noreferrer">
      <img src="${qr}" alt="QR tarjeta LoyiCard Absolut 360" width="140" height="140" loading="lazy"
        onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=140x140&data='+encodeURIComponent('${url}')">
    </a>
    <button type="button" class="btn-primary" onclick="openLoyiCardRegister()">Obtener mi tarjeta digital</button>
  `;
  container.appendChild(div);
}

// ============================================
// TEMA
// ============================================
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    toggle.textContent = '☀️';
  }
  toggle.onclick = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    toggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };
}

function initHeaderNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  let backdrop = document.getElementById('navBackdrop');
  if (!backdrop && document.body) {
    backdrop = document.createElement('div');
    backdrop.id = 'navBackdrop';
    backdrop.className = 'nav-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(backdrop, document.body.firstChild);
  }

  // Panel móvil en <body> (fuera del header) → ocupa toda la pantalla
  let panel = document.getElementById('mobileMenuPanel');
  if (!panel && nav && !document.body.classList.contains('admin-body')) {
    const iconMap = {
      'app.html': '🏠',
      'catalogo.html': '📂',
      'ofertas.html': '🔥',
      'contacto.html': '✉️'
    };
    panel = document.createElement('aside');
    panel.id = 'mobileMenuPanel';
    panel.className = 'mobile-menu-panel';
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('aria-label', 'Menú de navegación');

    const head = document.createElement('div');
    head.className = 'mobile-menu-head';
    head.innerHTML = `
      <h2 class="mobile-menu-title">Menú</h2>
      <button type="button" class="mobile-menu-close" aria-label="Cerrar menú">
        <span class="close-bars" aria-hidden="true"><span></span><span></span><span></span></span>
      </button>
    `;
    panel.appendChild(head);

    const list = document.createElement('div');
    list.className = 'mobile-menu-list';
    const links = nav.querySelectorAll('a[href]');
    if (links.length) {
      links.forEach(a => {
        const file = (a.getAttribute('href') || '').split('/').pop() || 'app.html';
        const item = document.createElement('a');
        item.href = a.getAttribute('href');
        item.className = 'mobile-menu-item' + (a.classList.contains('active') ? ' active' : '');
        item.innerHTML = `
          <span class="mobile-menu-icon" aria-hidden="true">${iconMap[file] || '•'}</span>
          <span class="mobile-menu-label">${(a.textContent || '').trim()}</span>
        `;
        list.appendChild(item);
      });
    } else {
      [
        { href: 'app.html', icon: '🏠', label: 'Inicio' },
        { href: 'catalogo.html', icon: '📂', label: 'Categorías' },
        { href: 'ofertas.html', icon: '🔥', label: 'Ofertas' },
        { href: 'contacto.html', icon: '✉️', label: 'Contacto' }
      ].forEach(d => {
        const item = document.createElement('a');
        item.href = d.href;
        item.className = 'mobile-menu-item';
        item.innerHTML = `<span class="mobile-menu-icon" aria-hidden="true">${d.icon}</span><span class="mobile-menu-label">${d.label}</span>`;
        list.appendChild(item);
      });
    }
    panel.appendChild(list);
    document.body.appendChild(panel);
  }

  function setNavOpen(open) {
    const isMobile = window.innerWidth <= 900;
    if (!isMobile) open = false;

    if (panel) {
      panel.classList.toggle('open', open);
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
    if (nav) nav.classList.toggle('open', open);
    if (toggle) {
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    }
    if (backdrop) {
      backdrop.classList.toggle('show', open);
      backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
    document.body.style.overflow = (open && isMobile) ? 'hidden' : '';
  }

  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = panel ? panel.classList.contains('open') : !!(nav && nav.classList.contains('open'));
      setNavOpen(!isOpen);
    });
  }
  if (panel) {
    panel.querySelector('.mobile-menu-close')?.addEventListener('click', (e) => {
      e.stopPropagation();
      setNavOpen(false);
    });
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setNavOpen(false)));
  }
  if (nav) {
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setNavOpen(false)));
  }
  backdrop?.addEventListener('click', () => setNavOpen(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setNavOpen(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setNavOpen(false);
  });
  document.addEventListener('click', (e) => {
    if (!panel || !panel.classList.contains('open')) return;
    if (panel.contains(e.target)) return;
    if (toggle && toggle.contains(e.target)) return;
    setNavOpen(false);
  });

  // Búsqueda expandible en móvil
  const searchBox = document.getElementById('searchBox');
  const searchBtn = document.getElementById('searchToggleBtn');
  const searchInput = document.getElementById('searchInput');
  if (searchBox && searchBtn && searchInput) {
    searchBtn.addEventListener('click', (e) => {
      if (window.innerWidth <= 640) {
        e.preventDefault();
        searchBox.classList.toggle('expanded');
        if (searchBox.classList.contains('expanded')) searchInput.focus();
        else searchInput.blur();
      } else if (searchInput.value.trim()) {
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      } else {
        searchInput.focus();
      }
    });
    searchInput.addEventListener('blur', () => {
      setTimeout(() => {
        if (window.innerWidth <= 640 && !searchInput.value.trim()) {
          searchBox.classList.remove('expanded');
        }
      }, 180);
    });
  }

  // Botón carrito del header
  const headerCart = document.getElementById('cartBtn');
  if (headerCart && !headerCart.dataset.bound) {
    headerCart.dataset.bound = '1';
    headerCart.addEventListener('click', () => {
      renderCart();
      openModal(document.getElementById('cartModal'));
    });
  }
}

// ============================================
// EVENTOS GLOBALES + INIT
// ============================================
function setupGlobalEvents() {
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.modal-overlay')));
  });
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay); });
  });

  const cartBtn = document.getElementById('cartFloating') || document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      renderCart();
      openModal(document.getElementById('cartModal'));
    });
  }

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);

  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const qtyInput = document.getElementById('qtyInput');
  if (qtyMinus && qtyInput) qtyMinus.onclick = () => { if (+qtyInput.value > 1) qtyInput.value = +qtyInput.value - 1; };
  if (qtyPlus && qtyInput) qtyPlus.onclick = () => { if (+qtyInput.value < 10) qtyInput.value = +qtyInput.value + 1; };

  const detailAdd = document.getElementById('detailAddToCart');
  if (detailAdd) {
    detailAdd.onclick = () => {
      if (!currentProduct) return;
      const qty = parseInt(document.getElementById('qtyInput')?.value || 1);
      if (addToCart(currentProduct.id, qty)) closeModal(document.getElementById('productDetailModal'));
    };
  }

  // Auth forms
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const res = login(email, password);
      if (res.ok) {
        closeModal(document.getElementById('authModal'));
        showToast(`✅ Bienvenido, ${res.user.name}`);
        loginForm.reset();
        if (isAdmin()) {
          window.location.href = 'admin.html';
        } else {
          if (window.LoyiCardClient) {
            LoyiCardClient.ensureMemberForCurrentUser().finally(() => openClientDashboard());
          } else {
            openClientDashboard();
          }
        }
      } else {
        showToast(res.msg, 'error');
      }
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const password = document.getElementById('regPassword').value;
      const phone = (document.getElementById('regPhone') || {}).value || '';
      const d = (document.getElementById('regDobD') || {}).value || '';
      const m = (document.getElementById('regDobM') || {}).value || '';
      const y = (document.getElementById('regDobY') || {}).value || '';
      const birth = (d && m && y) ? `${y.padStart(4,'0')}-${m.padStart(2,'0')}-${d.padStart(2,'0')}` : '';
      const terms = !!(document.getElementById('regTerms') || {}).checked;
      const newsletter = !!(document.getElementById('regNewsletter') || {}).checked;
      const res = register(name, email, password, {
        phone, birth, terms, newsletter, requireTerms: true
      });
      if (res.ok) {
        closeModal(document.getElementById('authModal'));
        showToast(`🎉 Cuenta creada. ¡Bienvenido, ${res.user.name}! Obtén tu tarjeta digital en 📱 Tarjeta`);
        registerForm.reset();
        openClientDashboard();
        setTimeout(() => {
          if (LOYICARD.enabled && !hasClickedLoyiCardRegister()) {
            switchClientTab('loyalty');
          }
        }, 400);
      } else {
        showToast(res.msg, 'error');
      }
    });
  }

  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => switchAuthTab(tab.dataset.tab));
  });

  // Legacy admin btn
  const adminBtn = document.getElementById('adminBtn');
  if (adminBtn) {
    adminBtn.addEventListener('click', e => {
      e.preventDefault();
      if (isAdmin()) openAdminPanel();
      else {
        openModal(document.getElementById('authModal'));
        showToast('Inicia sesión como administrador', 'warning');
      }
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);

  // Product form
  const imageInput = document.getElementById('imageInput');
  if (imageInput) {
    imageInput.setAttribute('multiple', 'multiple');
    imageInput.addEventListener('change', function () {
      handleProductImagesSelected(this.files);
      this.value = '';
    });
  }

  const addProductBtn = document.getElementById('addProductBtn');
  if (addProductBtn) {
    addProductBtn.addEventListener('click', () => {
      document.getElementById('productModalTitle').textContent = '➕ Nuevo Producto';
      document.getElementById('productForm').reset();
      document.getElementById('productId').value = '';
      productImages = [];
      if (typeof syncMainPreview === 'function') syncMainPreview();
      if (typeof renderImageGallery === 'function') renderImageGallery();
      document.getElementById('pInStock').checked = true;
      const marginEl = document.getElementById('pMargin');
      if (marginEl && !marginEl.value) marginEl.value = 40;
      const igvEl = document.getElementById('pIgv');
      if (igvEl) igvEl.value = '18';
      initProductPricingControls();
      updateProductPricingUI();
      openModal(document.getElementById('productModal'));
    });
  }

  const productForm = document.getElementById('productForm');
  if (productForm) {
    productForm.addEventListener('submit', e => {
      e.preventDefault();
      const id = document.getElementById('productId').value;
      const preview = document.getElementById('imagePreview');
      const featuresText = document.getElementById('pFeatures').value;
      const features = featuresText ? featuresText.split(',').map(f => f.trim()).filter(Boolean) : [];
      const data = {
        name: document.getElementById('pName').value.trim(),
        category: document.getElementById('pCategory').value,
        price: parseFloat(document.getElementById('pPrice').value),
        oldPrice: document.getElementById('pOldPrice').value ? parseFloat(document.getElementById('pOldPrice').value) : null,
        cost: document.getElementById('pCost') ? (parseFloat(document.getElementById('pCost').value) || 0) : 0,
        margin: document.getElementById('pMargin') ? (parseFloat(document.getElementById('pMargin').value) || 0) : 40,
        igv: document.getElementById('pIgv') ? (parseFloat(document.getElementById('pIgv').value) || 0) : 18,
        delivery: document.getElementById('pDelivery')?.value || 'gratis',
        stock: parseInt(document.getElementById('pStock').value) || 0,
        rating: parseFloat(document.getElementById('pRating').value) || 4,
        reviews: parseInt(document.getElementById('pReviews').value) || 0,
        sku: document.getElementById('pSku').value.trim() || `SKU-${Date.now()}`,
        description: document.getElementById('pDescription').value.trim(),
        features,
        offer: document.getElementById('pOffer').checked,
        inStock: document.getElementById('pInStock').checked,
        isNew: document.getElementById('pIsNew').checked,
        image: (productImages[0] && productImages[0].dataUrl) ? productImages[0].dataUrl : ((preview && preview.style.display !== 'none' && preview.src) ? preview.src : DEFAULT_IMAGE)
      };
      if (id) {
        const idx = products.findIndex(p => p.id === parseInt(id));
        if (idx !== -1) products[idx] = { ...products[idx], ...data };
        showToast('✅ Producto actualizado');
      } else {
        const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ id: newId, ...data });
        showToast('✅ Producto agregado');
      }
      saveProducts();
      closeModal(document.getElementById('productModal'));
      renderAdminDashboard();
      renderAdminTable();
      if (document.getElementById('productsGrid')) renderProducts(getFilteredProducts());
    });
  }

  document.getElementById('adminSearch')?.addEventListener('input', renderAdminTable);
  document.getElementById('adminFilterCategory')?.addEventListener('change', renderAdminTable);
  document.getElementById('adminFilterStock')?.addEventListener('change', renderAdminTable);

  if (document.getElementById('productsGrid')) {
    const onFilterChange = () => updateProducts();
    document.querySelectorAll('input[name="cat"]').forEach(cb => {
      cb.addEventListener('change', onFilterChange);
      cb.addEventListener('click', onFilterChange); // mejor respuesta táctil en móvil
    });
    document.querySelectorAll('input[name="rating"]').forEach(cb => {
      cb.addEventListener('change', onFilterChange);
      cb.addEventListener('click', onFilterChange);
    });
    // Precio: actualizar al escribir y al salir del campo
    ['minPrice', 'maxPrice'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', onFilterChange);
      el.addEventListener('change', onFilterChange);
    });
    document.getElementById('sortSelect')?.addEventListener('change', onFilterChange);

    // Categoría guardada desde catalogo.html
    const savedCat = sessionStorage.getItem('filterCategory');
    if (savedCat) {
      sessionStorage.removeItem('filterCategory');
      const target = normalizeText(savedCat);
      const cb = [...document.querySelectorAll('input[name="cat"]')]
        .find(c => normalizeText(c.value) === target);
      if (cb) {
        cb.checked = true;
        // En móvil abrir filtros para que se vea la categoría activa
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && window.innerWidth <= 768) {
          sidebar.classList.remove('filters-collapsed');
        }
      }
      updateProducts();
    }

    document.getElementById('searchInput')?.addEventListener('input', e => {
      const q = normalizeText(e.target.value);
      if (!q) { updateProducts(); return; }
      const filtered = products.filter(p =>
        normalizeText(p.name).includes(q) ||
        normalizeText(p.category).includes(q) ||
        normalizeText(p.sku).includes(q)
      );
      renderProducts(filtered);
      const header = document.querySelector('.products-header h1');
      if (header) header.textContent = `🔍 ${filtered.length} resultado${filtered.length !== 1 ? 's' : ''}`;
    });
  }

  document.getElementById('searchInput')?.addEventListener('input', e => {
    if (!document.getElementById('offersGrid')) return;
    const q = e.target.value.toLowerCase().trim();
    const offers = products.filter(p => p.offer);
    const filtered = q
      ? offers.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      : offers;
    renderProducts(filtered, 'offersGrid');
  });
}

// ============================================
// ARRANQUE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Garantizar solo 1 admin en la lista de usuarios
  ensureSingleAdmin();

  // Página admin se inicializa en admin.js
  if (document.body.classList.contains('admin-body') || window.location.pathname.includes('admin.html')) {
    return;
  }

  // Admin no debe ver la tienda: redirigir al panel exclusivo
  if (isAdmin()) {
    window.location.href = 'admin.html';
    return;
  }

  updateCartUI();
  initTheme();
  initHeaderNav();
  updateAuthUI();
  setupGlobalEvents();
  updateCompareBar();
  initChat();
  initStoreSurprise();

  const path = window.location.pathname.split('/').pop() || 'app.html';

  if (path.includes('app.html') || path === '' || path === '/') {
    initAbsCategoryChips();
    initAbsToolbar();
    renderProducts(getFilteredProducts());
  } else if (path.includes('ofertas')) {
    initOffersPage();
  } else if (path.includes('catalogo')) {
    initCatalogPage();
  } else if (path.includes('contacto')) {
    initContactPage();
  }
});


// ============================================
// ELEMENTOS NOVEDOSOS DE LA TIENDA
// ============================================
function initStoreSurprise() {
  injectLiveTicker();
  injectAuroraHero();
  injectScrollReveal();
  injectMobileFilterToggle();
}

function injectMobileFilterToggle() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar || document.getElementById('filterToggleBtn')) return;

  // Botón limpiar filtros (siempre visible en la barra lateral)
  if (!document.getElementById('clearFiltersBtn')) {
    const clearWrap = document.createElement('div');
    clearWrap.className = 'filter-actions';
    clearWrap.innerHTML = `
      <button type="button" class="btn-secondary filter-clear-btn" id="clearFiltersBtn">🗑️ Limpiar filtros</button>
    `;
    sidebar.appendChild(clearWrap);
    document.getElementById('clearFiltersBtn')?.addEventListener('click', clearAllFilters);
  }

  const btn = document.createElement('button');
  btn.id = 'filterToggleBtn';
  btn.className = 'filter-toggle-btn';
  btn.type = 'button';
  btn.innerHTML = '🔍 Mostrar filtros';
  btn.addEventListener('click', () => {
    sidebar.classList.toggle('filters-collapsed');
    updateFilterBadge();
  });
  // En móvil: filtros colapsados al inicio
  if (window.innerWidth <= 768) {
    sidebar.classList.add('filters-collapsed');
  }
  sidebar.insertBefore(btn, sidebar.firstChild);
  updateFilterBadge();
}

function injectLiveTicker() {
  if (document.getElementById('liveTicker')) return;
  const header = document.querySelector('.site-header');
  if (!header) return;

  const offers = products.filter(p => p.offer && p.inStock);
  const msgs = [
    '✨ Envío gratis en compras +$50',
    '🎟️ Cupón BIENVENIDO10 → 10% dto.',
    '🔥 Ofertas del día actualizadas',
    '🛡️ Garantía de 1 año en productos',
    '💬 Chat en vivo disponible 24/7'
  ];
  if (offers.length) {
    msgs.unshift(`🔥 ${offers.length} oferta${offers.length > 1 ? 's' : ''} activas ahora`);
  }

  const ticker = document.createElement('div');
  ticker.id = 'liveTicker';
  ticker.className = 'live-ticker';
  ticker.innerHTML = `
    <div class="ticker-track">
      ${[...msgs, ...msgs].map(m => `<span class="ticker-item">${m}</span>`).join('')}
    </div>`;
  header.insertAdjacentElement('beforebegin', ticker);
}

function injectAuroraHero() {
  // Solo en páginas con hero
  const hero = document.querySelector('.hero-section');
  if (!hero || hero.querySelector('.aurora-layer')) return;
  const layer = document.createElement('div');
  layer.className = 'aurora-layer';
  layer.innerHTML = '<span></span><span></span><span></span>';
  hero.prepend(layer);

  // Contador animado de productos en hero si existe
  if (!hero.querySelector('.hero-stats')) {
    const stats = document.createElement('div');
    stats.className = 'hero-stats';
    const inStock = products.filter(p => p.inStock && p.stock > 0).length;
    const offers = products.filter(p => p.offer).length;
    stats.innerHTML = `
      <div class="hero-stat"><strong data-count="${products.length}">0</strong><span>Productos</span></div>
      <div class="hero-stat"><strong data-count="${inStock}">0</strong><span>Disponibles</span></div>
      <div class="hero-stat"><strong data-count="${offers}">0</strong><span>Ofertas</span></div>`;
    hero.appendChild(stats);
    animateCounters(stats);
  }
}

function animateCounters(root) {
  root.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 900;
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
}

function injectScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.product-card, .category-card, .contact-card, .filter-section').forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}




// ============================================
// ABSOLUT 360 — chips de categoría + toolbar
// ============================================
let activeAbsCategory = '';

function initAbsCategoryChips() {
  const wrap = document.getElementById('categoryChips');
  if (!wrap || typeof STORE_CATEGORIES === 'undefined') return;
  const cats = STORE_CATEGORIES;
  const priority = ['Todos','Página Web y Tienda','Marketing Digital IA','Branding Corporativo','Eventos y BTL','Consultoría Estratégica','Productos NFC','Tecnología NFC'];
  const ordered = [...priority.filter(c => cats.includes(c)), ...cats.filter(c => !priority.includes(c))];
  wrap.innerHTML = ordered.map((c, i) => {
    const val = c === 'Todos' ? '' : c;
    const active = (c === 'Todos' && !activeAbsCategory) || activeAbsCategory === c;
    const short = c === 'Página Web y Tienda' ? 'Web y Tienda'
      : c === 'Marketing Digital IA' ? 'Marketing IA'
      : c === 'Branding Corporativo' ? 'Branding'
      : c === 'Consultoría Estratégica' ? 'Consultoría'
      : c;
    return `<button type="button" class="cat-chip${active ? ' active' : ''}${i < 6 ? ' cat-service' : ''}" data-cat="${val}" title="${c}">${short}</button>`;
  }).join('');
  wrap.querySelectorAll('.cat-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      activeAbsCategory = btn.dataset.cat || '';
      wrap.querySelectorAll('.cat-chip').forEach(b => b.classList.toggle('active', b === btn));
      // sync sidebar checkboxes
      document.querySelectorAll('input[name="cat"]').forEach(cb => {
        cb.checked = activeAbsCategory
          ? normalizeText(cb.value) === normalizeText(activeAbsCategory)
          : false;
      });
      updateProducts();
    });
  });
}

function initAbsToolbar() {
  const filterBtn = document.getElementById('absFilterBtn');
  const clearBtn = document.getElementById('absClearBtn');
  const search = document.getElementById('absSearchInput');
  const sort = document.getElementById('absSort');
  const run = () => {
    const q = (search?.value || '').trim();
    const min = parseFloat(document.getElementById('absPriceMin')?.value || '');
    const max = parseFloat(document.getElementById('absPriceMax')?.value || '');
    if (document.getElementById('minPrice') && !isNaN(min)) document.getElementById('minPrice').value = min;
    if (document.getElementById('maxPrice') && !isNaN(max)) document.getElementById('maxPrice').value = max;
    if (document.getElementById('sortSelect') && sort) document.getElementById('sortSelect').value = sort.value;
    if (q && document.getElementById('searchInput')) {
      document.getElementById('searchInput').value = q;
      document.getElementById('searchInput').dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }
    updateProducts();
  };
  filterBtn?.addEventListener('click', run);
  clearBtn?.addEventListener('click', () => {
    activeAbsCategory = '';
    if (search) search.value = '';
    ['absPriceMin','absPriceMax','minPrice','maxPrice','searchInput'].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = '';
    });
    document.querySelectorAll('input[name="cat"]').forEach(cb => cb.checked = false);
    initAbsCategoryChips();
    updateProducts();
  });
  sort?.addEventListener('change', run);
  search?.addEventListener('keydown', e => { if (e.key === 'Enter') run(); });
}

function ensureSingleAdmin() {
  const admins = users.filter(u => u.role === 'admin');
  if (admins.length <= 1) return;
  // Mantener solo el primero (el demo), el resto a client
  admins.slice(1).forEach(a => {
    const idx = users.findIndex(u => u.id === a.id);
    if (idx !== -1) users[idx].role = 'client';
  });
  saveUsers();
  if (currentUser && currentUser.role === 'admin') {
    const stillAdmin = users.find(u => u.id === currentUser.id && u.role === 'admin');
    if (!stillAdmin) {
      currentUser.role = 'client';
      saveCurrentUser();
    }
  }
}


// Floating WhatsApp + EmailJS init
function initEmailJS() {
  const cfg = getEmailJSConfig();
  if (!cfg.enabled) return;
  const boot = () => {
    try {
      const c = getEmailJSConfig();
      if (c.ready) emailjs.init({ publicKey: c.publicKey });
    } catch (e) { console.warn('EmailJS init', e); }
  };
  if (typeof emailjs !== 'undefined') {
    boot();
    return;
  }
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  s.async = true;
  s.onload = boot;
  document.head.appendChild(s);
}

document.addEventListener('DOMContentLoaded', () => {
  try { ensureFloatingWhatsApp(); } catch (_) {}
  try { checkAcceptQuoteFromUrl(); } catch (_) {}
  try { initEmailJS(); } catch (_) {}
});


function renderHomeTestimonials() {
  const el = document.getElementById('homeTestimonials');
  if (!el) return;
  let reviews = [];
  try {
    const all = JSON.parse(localStorage.getItem('productReviews') || '{}');
    Object.keys(all).forEach(pid => {
      (all[pid] || []).forEach(r => reviews.push({ ...r, productId: pid }));
    });
  } catch (_) {}
  // fallback demo if empty
  if (!reviews.length) {
    reviews = [
      { name: 'María G.', rating: 5, comment: 'Excelente calidad en las tarjetas NFC. Llegaron rápido y el diseño es premium.', productId: 2, date: new Date().toISOString() },
      { name: 'Carlos R.', rating: 5, comment: 'Muy buena atención y productos publicitarios de primer nivel. Recomendados.', productId: 1, date: new Date().toISOString() },
      { name: 'Andrea P.', rating: 4, comment: 'El pack networking nos ayudó en la feria. Volveremos a comprar.', productId: 1, date: new Date().toISOString() }
    ];
  }
  reviews.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  const top = reviews.slice(0, 6);
  el.innerHTML = top.map(r => {
    const n = Math.min(5, Math.max(1, Number(r.rating) || 5));
    const stars2 = '★'.repeat(n) + '☆'.repeat(5 - n);
    const prod = (typeof products !== 'undefined' ? products : []).find(p => String(p.id) === String(r.productId));
    return `<div class="testimonial-card">
      <div class="stars">${stars2}</div>
      <div class="t-comment">"${String(r.comment || '').replace(/"/g, '&quot;')}"</div>
      <div class="t-meta">
        <span class="t-name">${r.name || 'Cliente'}</span>
        <span>${prod ? prod.name.slice(0, 28) : 'Absolut 360'}</span>
      </div>
    </div>`;
  }).join('');
}


function updateHeaderFavCount() {
  const el = document.getElementById('headerFavCount');
  if (!el) return;
  const n = (favorites || []).length;
  el.textContent = n;
  el.style.display = n > 0 ? 'inline-flex' : 'none';
}
function openFavoritesFromHeader() {
  if (!isLoggedIn()) {
    showToast('Inicia sesión para ver favoritos', 'warning');
    openModal(document.getElementById('authModal'));
    return;
  }
  openClientDashboard();
  setTimeout(() => { try { switchClientTab('favorites'); } catch (_) {} }, 200);
}
window.openFavoritesFromHeader = openFavoritesFromHeader;
