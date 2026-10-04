// ===================== CONFIG =====================
const LOW_STOCK_THRESHOLD = 5;
const ADMIN_CREDENTIALS = { user: 'admin', pass: 'admin123' };

// ===================== DATOS =====================
let products = loadFromStorage('admin_products', [
  { id: 1, name: "Auriculares Bluetooth Pro", sku: "ELEC-001", category: "Electrónica", price: 59.99, stock: 12, image: "", emoji: "🎧" },
  { id: 2, name: "Smartwatch Series 5", sku: "ELEC-002", category: "Electrónica", price: 129.99, stock: 3, image: "", emoji: "⌚" },
  { id: 3, name: "Camiseta Algodón Premium", sku: "ROPA-001", category: "Ropa", price: 24.99, stock: 45, image: "", emoji: "👕" },
  { id: 4, name: "Lámpara LED Inteligente", sku: "HOGAR-001", category: "Hogar", price: 34.50, stock: 2, image: "", emoji: "💡" },
  { id: 5, name: "Mancuernas 10kg", sku: "DEPORT-001", category: "Deportes", price: 42.00, stock: 0, image: "", emoji: "🏋️" },
  { id: 6, name: "Zapatillas Running", sku: "DEPORT-002", category: "Deportes", price: 79.99, stock: 18, image: "", emoji: "👟" },
  { id: 7, name: "Teclado Mecánico RGB", sku: "ELEC-003", category: "Electrónica", price: 89.99, stock: 7, image: "", emoji: "⌨️" },
  { id: 8, name: "Jeans Slim Fit", sku: "ROPA-002", category: "Ropa", price: 49.99, stock: 23, image: "", emoji: "👖" },
]);

let cart = loadFromStorage('store_cart', []);
let currentCategory = 'all';
let currentStockFilter = 'all';
let searchTerm = '';
let sortBy = 'default';
let editingId = null;

// ===================== STORAGE =====================
function loadFromStorage(key, defaultValue) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ===================== TOAST =====================
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===================== NAVEGACIÓN =====================
function showLogin() {
  document.getElementById('loginScreen').classList.add('active');
}

function hideLogin() {
  document.getElementById('loginScreen').classList.remove('active');
}

function doLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const errorMsg = document.getElementById('loginError');

  if (user === ADMIN_CREDENTIALS.user && pass === ADMIN_CREDENTIALS.pass) {
    localStorage.setItem('admin_session', 'active');
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('storeView').style.display = 'none';
    document.getElementById('adminView').style.display = 'block';
    renderAdminTable();
    showToast('🎉 Bienvenido al panel de administración', 'success');
  } else {
    errorMsg.style.display = 'block';
    setTimeout(() => errorMsg.style.display = 'none', 3000);
  }
}

function doLogout() {
  localStorage.removeItem('admin_session');
  document.getElementById('adminView').style.display = 'none';
  document.getElementById('storeView').style.display = 'block';
  renderStore();
}

function goToStore() {
  document.getElementById('adminView').style.display = 'none';
  document.getElementById('storeView').style.display = 'block';
  renderStore();
}

function switchTab(tab, element) {
  document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
  element.classList.add('active');

  const titles = {
    inventory: '📦 Gestión de Inventario',
    orders: '📝 Gestión de Pedidos',
    customers: '👥 Clientes',
    analytics: '📊 Analíticas'
  };

  document.getElementById('pageTitle').textContent = titles[tab] || titles.inventory;

  if (tab !== 'inventory') {
    document.getElementById('productsTable').innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;padding:80px 20px;color:var(--color-text-secondary)">
          <div style="font-size:40px;margin-bottom:16px">🚧</div>
          <p style="font-size:18px;font-weight:600">Módulo en desarrollo</p>
          <p style="font-size:14px;margin-top:8px">Esta sección estará disponible próximamente</p>
        </td>
      </tr>`;
  } else {
    renderAdminTable();
  }
}

// ===================== TIENDA =====================
function renderStore() {
  renderCategories();
  renderProducts();
  updateCartUI();
}

function renderCategories() {
  const cats = [...new Set(products.map(p => p.category))];
  const list = document.getElementById('categoryList');

  list.innerHTML = `
    <li><a href="#" data-category="all" class="${currentCategory === 'all' ? 'active' : ''}">Todos</a></li>
    ${cats.map(c => `<li><a href="#" data-category="${c}" class="${currentCategory === c ? 'active' : ''}">${c}</a></li>`).join('')}
  `;

  list.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      list.querySelectorAll('a').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      currentCategory = a.dataset.category;
      renderProducts();
      if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('active');
      }
    });
  });
}

function renderProducts() {
  let filtered = products.filter(p => {
    const matchCat = currentCategory === 'all' || p.category === currentCategory;
    const matchSearch = !searchTerm ||
      p.name.toLowerCase().includes(searchTerm) ||
      p.sku.toLowerCase().includes(searchTerm);

    let matchStock = true;
    if (currentStockFilter === 'instock') matchStock = p.stock > LOW_STOCK_THRESHOLD;
    if (currentStockFilter === 'low') matchStock = p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD;

    return matchCat && matchSearch && matchStock;
  });

  if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

  const grid = document.getElementById('productsGrid');
  const empty = document.getElementById('emptyState');

  if (filtered.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';

  grid.innerHTML = filtered.map(p => {
    let badgeClass = 'badge-instock';
    let badgeText = 'En Stock';
    if (p.stock === 0) {
      badgeClass = 'badge-out';
      badgeText = 'Agotado';
    } else if (p.stock <= LOW_STOCK_THRESHOLD) {
      badgeClass = 'badge-low';
      badgeText = 'Stock Bajo';
    }

    const imgContent = p.image
      ? `<img src="${p.image}" alt="${p.name}" onerror="this.parentElement.innerHTML='${p.emoji || '📦'}'">`
      : (p.emoji || '📦');

    return `
      <article class="product-card">
        <div class="product-img">
          ${imgContent}
          <span class="badge-stock ${badgeClass}">${badgeText}</span>
        </div>
        <div class="product-info">
          <h2 class="product-title">${p.name}</h2>
          <p class="product-category">${p.category} · ${p.sku}</p>
          <p class="product-price">$${p.price.toFixed(2)}</p>
          <button class="btn-add-cart" data-id="${p.id}" ${p.stock === 0 ? 'disabled' : ''}>
            ${p.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
          </button>
        </div>
      </article>`;
  }).join('');

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.id)));
  });
}

// ===================== CARRITO =====================
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product || product.stock === 0) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    if (existing.qty >= product.stock) {
      showToast('❌ No hay más stock disponible', 'error');
      return;
    }
    existing.qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji || '📦',
      qty: 1
    });
  }

  saveToStorage('store_cart', cart);
  updateCartUI();
  showToast(`✅ ${product.name} añadido al carrito`);
}

function updateCartUI() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cart-count').textContent = count;

  const container = document.getElementById('cartItems');
  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:#94a3b8;padding:40px 0;">Tu carrito está vacío</p>`;
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-qty">
            <button onclick="changeQty(${item.id}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
      </div>`).join('');
  }

  const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  document.getElementById('cartTotal').textContent = '$' + total.toFixed(2);
}

window.changeQty = function(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  saveToStorage('store_cart', cart);
  updateCartUI();
};

// ===================== ADMIN =====================
function getStatus(stock) {
  if (stock === 0) return { label: 'Agotado', class: 'badge-out' };
  if (stock <= LOW_STOCK_THRESHOLD) return { label: 'Stock Bajo', class: 'badge-low' };
  return { label: 'En Stock', class: 'badge-instock' };
}

function getStockClass(stock) {
  if (stock === 0) return 'low';
  if (stock <= LOW_STOCK_THRESHOLD) return 'medium';
  return 'normal';
}

function renderAdminTable() {
  const search = document.getElementById('searchInput').value.toLowerCase().trim();
  const statusFilter = document.getElementById('filterStatus').value;
  const catFilter = document.getElementById('filterCategory').value;

  let filtered = products.filter(p => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search) ||
      p.sku.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search);
    const matchCat = catFilter === 'all' || p.category === catFilter;

    let matchStatus = true;
    if (statusFilter === 'instock') matchStatus = p.stock > LOW_STOCK_THRESHOLD;
    if (statusFilter === 'low') matchStatus = p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD;
    if (statusFilter === 'outofstock') matchStatus = p.stock === 0;

    return matchSearch && matchCat && matchStatus;
  });

  const tbody = document.getElementById('productsTable');

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;padding:60px 20px;color:var(--color-text-secondary)">
          <div style="font-size:32px;margin-bottom:12px">📭</div>
          <p style="font-size:16px;font-weight:600;margin-bottom:4px">No se encontraron productos</p>
        </td>
      </tr>`;
  } else {
    tbody.innerHTML = filtered.map(p => {
      const status = getStatus(p.stock);
      const stockClass = getStockClass(p.stock);
      const imgDisplay = p.image
        ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px" onerror="this.style.display='none';this.parentElement.textContent='${p.emoji}'">`
        : p.emoji;

      return `
        <tr>
          <td>
            <div class="product-cell">
              <div class="product-img-admin">${imgDisplay}</div>
              <div class="product-details">
                <div class="name">${p.name}</div>
                <div class="sku">${p.sku}</div>
              </div>
            </div>
          </td>
          <td>${p.category}</td>
          <td class="price-cell">$${p.price.toFixed(2)}</td>
          <td>
            <div class="stock-control">
              <button onclick="changeStock(${p.id}, -1)">−</button>
              <span class="stock-value ${stockClass}">${p.stock}</span>
              <button onclick="changeStock(${p.id}, 1)">+</button>
            </div>
          </td>
          <td><span class="badge ${status.class}">${status.label}</span></td>
          <td>
            <div class="actions-cell">
              <button class="btn btn-sm" onclick="editProduct(${p.id})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Eliminar</button>
            </div>
          </td>
        </tr>`;
    }).join('');
  }

  updateStats();
  saveToStorage('admin_products', products);
}

function updateStats() {
  const total = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD).length;
  const inventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  document.getElementById('statTotal').textContent = total;
  document.getElementById('statStock').textContent = totalStock.toLocaleString();
  document.getElementById('statLow').textContent = lowStock;
  document.getElementById('statValue').textContent = '$' + inventoryValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function changeStock(id, delta) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  const newStock = p.stock + delta;
  if (newStock < 0) {
    showToast('❌ No puedes tener stock negativo', 'error');
    return;
  }

  p.stock = newStock;
  renderAdminTable();
  showToast(`📦 Stock de "${p.name}" ${delta > 0 ? 'aumentado' : 'disminuido'} a ${p.stock}`, 'success');
}

function openModal() {
  editingId = null;
  document.getElementById('modalTitle').textContent = 'Agregar Nuevo Producto';
  document.getElementById('productForm').reset();
  document.getElementById('editId').value = '';
  document.getElementById('modalOverlay').classList.add('active');
  document.getElementById('formName').focus();
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  editingId = null;
}

function editProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  editingId = id;
  document.getElementById('modalTitle').textContent = 'Editar Producto';
  document.getElementById('editId').value = id;
  document.getElementById('formName').value = p.name;
  document.getElementById('formSku').value = p.sku;
  document.getElementById('formCategory').value = p.category;
  document.getElementById('formPrice').value = p.price;
  document.getElementById('formStock').value = p.stock;
  document.getElementById('formImage').value = p.image || '';
  document.getElementById('modalOverlay').classList.add('active');
}

function saveProduct() {
  const name = document.getElementById('formName').value.trim();
  const sku = document.getElementById('formSku').value.trim().toUpperCase();
  const category = document.getElementById('formCategory').value;
  const price = parseFloat(document.getElementById('formPrice').value);
  const stock = parseInt(document.getElementById('formStock').value) || 0;
  const image = document.getElementById('formImage').value.trim();

  if (!name || !sku || !category || isNaN(price)) {
    showToast('⚠️ Completa todos los campos obligatorios', 'error');
    return;
  }

  if (price < 0 || stock < 0) {
    showToast('⚠️ El precio y stock no pueden ser negativos', 'error');
    return;
  }

  const skuExists = products.some(p => p.sku === sku && p.id !== editingId);
  if (skuExists) {
    showToast('⚠️ Ya existe un producto con ese SKU', 'error');
    return;
  }

  const emojis = {
    "Electrónica": "🔌",
    "Ropa": "👔",
    "Hogar": "🏠",
    "Deportes": "⚽"
  };

  if (editingId) {
    const p = products.find(x => x.id === editingId);
    p.name = name;
    p.sku = sku;
    p.category = category;
    p.price = price;
    p.stock = stock;
    p.image = image;
    showToast(`✅ "${name}" actualizado correctamente`, 'success');
  } else {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    products.push({
      id: newId,
      name,
      sku,
      category,
      price,
      stock,
      image,
      emoji: emojis[category] || "📦"
    });
    showToast(`✅ "${name}" agregado al inventario`, 'success');
  }

  closeModal();
  renderAdminTable();
}

function deleteProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  if (!confirm(`¿Eliminar permanentemente "${p.name}"?\n\nEsta acción no se puede deshacer.`)) {
    return;
  }

  products = products.filter(x => x.id !== id);
  renderAdminTable();
  showToast(`🗑️ "${p.name}" eliminado`, 'success');
}

// ===================== EVENTOS =====================
document.addEventListener('DOMContentLoaded', () => {

  // Sidebar móvil
  document.getElementById('toggle-sidebar')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('active');
  });

  // Carrito
  document.getElementById('cartIcon')?.addEventListener('click', () => {
    document.getElementById('cartOverlay').classList.add('active');
  });

  document.getElementById('closeCart')?.addEventListener('click', () => {
    document.getElementById('cartOverlay').classList.remove('active');
  });

  document.getElementById('cartOverlay')?.addEventListener('click', e => {
    if (e.target.id === 'cartOverlay') {
      document.getElementById('cartOverlay').classList.remove('active');
    }
  });

  document.getElementById('clearCart')?.addEventListener('click', () => {
    if (confirm('¿Vaciar todo el carrito?')) {
      cart = [];
      saveToStorage('store_cart', cart);
      updateCartUI();
    }
  });

  document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (cart.length === 0) return alert('El carrito está vacío');

    // Descontar stock
    cart.forEach(item => {
      const p = products.find(x => x.id === item.id);
      if (p) p.stock = Math.max(0, p.stock - item.qty);
    });
    saveToStorage('admin_products', products);

    alert('¡Gracias por tu compra! (Simulación)\nTotal: ' + document.getElementById('cartTotal').textContent);
    cart = [];
    saveToStorage('store_cart', cart);
    updateCartUI();
    document.getElementById('cartOverlay').classList.remove('active');
    renderStore();
  });

  // Filtros de stock (tienda)
  document.querySelectorAll('[data-stock]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('[data-stock]').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      currentStockFilter = a.dataset.stock;
      renderProducts();
    });
  });

  // Búsqueda tienda
  document.getElementById('searchStore')?.addEventListener('input', e => {
    searchTerm = e.target.value.toLowerCase().trim();
    renderProducts();
  });

  // Ordenar
  document.getElementById('sortSelect')?.addEventListener('change', e => {
    sortBy = e.target.value;
    renderProducts();
  });

  // Filtros admin
  document.getElementById('searchInput')?.addEventListener('input', renderAdminTable);
  document.getElementById('filterStatus')?.addEventListener('change', renderAdminTable);
  document.getElementById('filterCategory')?.addEventListener('change', renderAdminTable);

  // Modal
  document.getElementById('modalOverlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  // Login con Enter
  document.getElementById('loginPass')?.addEventListener('keypress', e => {
    if (e.key === 'Enter') doLogin();
  });

  // ========== INICIALIZACIÓN ==========
  // Siempre empieza mostrando la tienda
  if (localStorage.getItem('admin_session') === 'active') {
    document.getElementById('storeView').style.display = 'none';
    document.getElementById('adminView').style.display = 'block';
    renderAdminTable();
  } else {
    document.getElementById('storeView').style.display = 'block';
    document.getElementById('adminView').style.display = 'none';
    renderStore();
  }
});