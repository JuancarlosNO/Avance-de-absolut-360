# Absolut 360 — Tienda demo (estática)

Tienda + panel admin en HTML/CSS/JS con `localStorage` (sin backend).

## Cuentas demo
- **Admin:** `admin@tutienda.com` / `admin123` (también `admin@tienda.com` si está en datos)
- **Cliente:** `cliente@demo.com` / `cliente123`

## Incluye (alineado a la demo del video)
- Ticker promocional, trust badges, precios S/ y USD
- Catálogo con chips de servicios + filtros (SKU, precio, destacados)
- Carrito, cupones (`BIENVENIDO10`), favoritos, comparar
- Registro con teléfono PE, fecha, términos y newsletter
- LoyiCard: puntos, niveles, sellos, QR, enlace Wallet
- Opiniones de productos
- Cotizaciones: solicitud → formalizar en admin → **link de aceptación** → pedido + correo `Cotización ACEPTADA …`
- Pedidos con estados de envío y cobro + badge de nuevos
- WhatsApp flotante (izquierda) y carrito flotante (derecha)
- Admin: productos, pedidos, cotizaciones, clientes, finanzas, comprobantes, equipo, respaldo, insights
- Libro de reclamaciones
- Notificaciones por **mailto + WhatsApp** (EmailJS opcional en `EMAILJS_CONFIG`)

## Cómo probar cotización
1. Cliente solicita cotización desde un producto.
2. Admin → Cotizaciones → **Enviar cotización** (monto).
3. Abrir el link `app.html?acceptQuote=TOKEN` → se crea el pedido.

## Abrir
Sirve la carpeta con cualquier servidor estático o abre `app.html` en el navegador.

## Demo — flujo cotización (video Absolut 360)
1. Cliente solicita cotización desde un producto.
2. Admin → Cotizaciones → **Enviar cotización** (monto + notas).
3. Se abre correo/WhatsApp al cliente con link `app.html?acceptQuote=TOKEN`.
4. Al aceptar se crea el pedido y el aviso **Cotización ACEPTADA …**.

## Cuentas demo
- Admin: `admin@tutienda.com` / `admin123`
- Cliente: `cliente@demo.com` / `cliente123`

## Cupón
`BIENVENIDO10` → 10% descuento

## EmailJS (opcional)
En `app.js` → `EMAILJS_CONFIG`: `enabled: true` + tus claves de emailjs.com
