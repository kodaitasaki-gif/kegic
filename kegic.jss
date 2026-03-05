<script>
// ---- DATA ----
const products = [
  { id:'marked-cards', name:'Premium Marked Playing Cards', cat:'marked', price:'$34.99', oldPrice:'$49.99', emoji:'♠', badge:'Best Seller', badgeType:'gold', diff:1, diffLabel:'Beginner Friendly' },
  { id:'rising-card', name:'Rising Card Gimmick', cat:'card', price:'$39.99', emoji:'🃏', badge:'New', badgeType:'', diff:2, diffLabel:'Intermediate' },
  { id:'invisible-thread', name:'Invisible Thread Reel Pro', cat:'accessories', price:'$24.99', emoji:'🧵', diff:2, diffLabel:'Intermediate' },
  { id:'pro-coins', name:'Pro Manipulation Coin Set', cat:'professional', price:'$49.99', emoji:'🪙', badge:'Pro Pick', badgeType:'', diff:3, diffLabel:'Advanced' },
  { id:'starter-kit', name:'Complete Beginner Magic Kit', cat:'beginner', price:'$59.99', oldPrice:'$89.99', emoji:'🎩', badge:'Sale', badgeType:'', diff:1, diffLabel:'Beginner Friendly' },
  { id:'svengali', name:'Svengali Deck — Classic', cat:'card', price:'$19.99', emoji:'🎴', diff:1, diffLabel:'Beginner Friendly' },
  { id:'gimmick-pen', name:'Pen Through Bill Gimmick', cat:'professional', price:'$29.99', emoji:'🖊', diff:2, diffLabel:'Intermediate' },
  { id:'cups-balls', name:'Chrome Cups & Balls Set', cat:'professional', price:'$79.99', emoji:'🥤', diff:3, diffLabel:'Advanced' },
  { id:'flash-paper', name:'Flash Paper — Pro Pack', cat:'accessories', price:'$14.99', emoji:'📄', diff:2, diffLabel:'Intermediate' },
  { id:'dove-pan', name:'Appearing Dove Pan', cat:'professional', price:'$129.99', emoji:'🕊', badge:'Pro Only', badgeType:'', diff:4, diffLabel:'Expert' },
  { id:'stripper-deck', name:'Stripper Deck — Red Back', cat:'card', price:'$22.99', emoji:'🃏', diff:1, diffLabel:'Beginner Friendly' },
  { id:'linking-rings', name:'Linking Rings — 8 Ring Set', cat:'professional', price:'$89.99', emoji:'⭕', diff:3, diffLabel:'Advanced' },
  { id:'learn-cards', name:'Card Magic Starter Guide', cat:'beginner', price:'$9.99', emoji:'📚', diff:1, diffLabel:'Beginner Friendly' },
  { id:'thumb-tip', name:'Thumb Tip — Flesh Tone', cat:'accessories', price:'$7.99', emoji:'👍', diff:1, diffLabel:'Beginner Friendly' },
  { id:'sponge-balls', name:'Professional Sponge Ball Set', cat:'beginner', price:'$12.99', emoji:'🔴', diff:1, diffLabel:'Beginner Friendly' },
  { id:'coin-gimmick', name:'Expanded Shell Coin', cat:'professional', price:'$44.99', emoji:'🪙', diff:3, diffLabel:'Advanced' },
  { id:'wand', name:'Classic Magic Wand — Pro', cat:'accessories', price:'$34.99', emoji:'🪄', diff:1, diffLabel:'All Levels' },
  { id:'memorized-deck', name:'Memorized Deck Training System', cat:'card', price:'$27.99', emoji:'🧠', diff:4, diffLabel:'Expert' },
];

const faqData = [
  { q: 'Are your marked cards detectable by non-magicians?', a: 'Our proprietary micro-print system is invisible to untrained eyes under all common lighting conditions — stage lights, UV, flash photography, and natural light. Thousands of professional magicians have used our decks in high-scrutiny environments without detection.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day satisfaction guarantee on all products. If you\'re not fully satisfied, contact support@kegic.com for a hassle-free return. Please note that products must be unused and in original packaging.' },
  { q: 'Do you offer wholesale pricing for magic shops?', a: 'Yes! We partner with magic shops and entertainment supply companies worldwide. Contact us through the wholesale inquiry form for volume pricing and minimum order information.' },
  { q: 'Are your beginner products suitable for children?', a: 'Our Beginner Magic Kit and most beginner products are suitable for ages 10 and up. Products marked "Pro Only" or "Advanced" may involve materials not suitable for younger performers.' },
  { q: 'How long does shipping take?', a: 'Orders ship within 1–2 business days. Standard domestic shipping takes 3–5 business days. Express (1–2 days) and international options are available at checkout. Free shipping on orders over $75.' },
  { q: 'Are secrets protected? I\'m worried about the exposure of methods.', a: 'All our products are sold exclusively to verified buyers. We do not publish method explanations publicly. Digital instructions use download links that expire after 3 downloads and are tied to your account.' },
  { q: 'Do you offer video tutorials with purchases?', a: 'Most products include access to a private tutorial video. You\'ll receive a link in your order confirmation email. Subscriber members in our Inner Circle get access to our full video library.' },
];

// ---- CART STATE ----
let cart = [];

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$','')) * item.qty;
    return sum + price;
  }, 0);
}

function renderCart() {
  const el = document.getElementById('cartItems');
  if (cart.length === 0) {
    el.innerHTML = `<div style="text-align:center;padding:60px 20px;color:var(--muted)">
      <div style="font-size:48px;margin-bottom:16px">🎩</div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:20px;margin-bottom:8px">Your cart is empty</div>
      <div style="font-size:12px">Add some magic to get started</div>
    </div>`;
  } else {
    el.innerHTML = cart.map((item,i) => `
      <div class="cart-item">
        <div class="cart-item-img">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${item.price}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${i},-1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${i},1)">+</button>
          </div>
        </div>
      </div>
    `).join('');
  }
  document.getElementById('cartTotal').textContent = '$' + getCartTotal().toFixed(2);
  document.getElementById('cartCount').textContent = cart.reduce((s,i)=>s+i.qty,0);
}

function changeQty(i, delta) {
  cart[i].qty += delta;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  renderCart();
}

function addToCart(name, price, emoji) {
  const existing = cart.find(i => i.name === name);
  if (existing) { existing.qty++; }
  else { cart.push({ name, price, emoji, qty: 1 }); }
  renderCart();
  openCart();
}

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('overlay').classList.add('active');
}
function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
}

// ---- PAGES ----
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if (el) {
    el.classList.add('active');
    el.classList.add('page-enter');
    setTimeout(() => el.classList.remove('page-enter'), 600);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showProductDetail(id) {
  showPage('product');
}

function filterAndGo(cat) {
  showPage('shop');
  setTimeout(() => filterProducts(cat, document.querySelector(`.filter-tag[onclick*="'${cat}'"]`)), 100);
}

// ---- PRODUCTS ----
function renderProductCard(p, onclick = '') {
  const diffDots = Array.from({length:5}, (_,i) => `<div class="diff-dot${i < p.diff ? ' filled' : ''}"></div>`).join('');
  const badgeHtml = p.badge ? `<div class="product-badge ${p.badgeType}">${p.badge}</div>` : '';
  const oldPriceHtml = p.oldPrice ? `<span class="old">${p.oldPrice}</span>` : '';
  return `
    <div class="product-card" onclick="${onclick || `addToCart('${p.name}','${p.price}','${p.emoji}')`}">
      ${badgeHtml}
      <div class="product-img">
        <div class="product-img-inner prod-art" style="background:radial-gradient(ellipse at center,rgba(139,26,26,0.15),#080808)">
          <div style="font-size:90px;z-index:1;position:relative;filter:drop-shadow(0 4px 20px rgba(0,0,0,0.8))">${p.emoji}</div>
        </div>
      </div>
      <div class="add-cart-overlay">
        <button class="btn-primary" style="font-size:10px;" onclick="event.stopPropagation();addToCart('${p.name}','${p.price}','${p.emoji}')">Add to Cart</button>
      </div>
      <div class="product-info">
        <div class="product-category">${p.cat.charAt(0).toUpperCase()+p.cat.slice(1)} Magic</div>
        <div class="product-name">${p.name}</div>
        <div class="product-bottom">
          <div class="product-price">${oldPriceHtml}${p.price}</div>
          <div class="product-diff">
            <div class="diff-dots">${diffDots}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (grid) grid.innerHTML = products.slice(0, 8).map(p => renderProductCard(p, p.id === 'marked-cards' ? "showProductDetail('marked-cards')" : '')).join('');
}

let activeFilter = 'all';
function renderShop(filter='all') {
  const grid = document.getElementById('shopGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);
  if (grid) grid.innerHTML = filtered.map(p => renderProductCard(p, p.id === 'marked-cards' ? "showProductDetail('marked-cards')" : '')).join('');
  const count = document.getElementById('shopCount');
  if (count) count.textContent = filtered.length + ' product' + (filtered.length !== 1 ? 's' : '');
}

function filterProducts(cat, btn) {
  activeFilter = cat;
  document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderShop(cat);
}

// ---- FAQ ----
function renderFAQ() {
  const el = document.getElementById('faqList');
  if (!el) return;
  el.innerHTML = faqData.map((f,i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-q" onclick="toggleFaq(${i})">
        <span>${f.q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join('');
}

function toggleFaq(i) {
  const item = document.getElementById('faq-' + i);
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(fi => fi.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ---- MARQUEE ----
function renderMarquee() {
  const items = ['Premium Marked Cards','Invisible Gimmicks','Stage-Tested Props','Free Shipping $75+','Card Magic Essentials','Pro Coin Sets','Secure Checkout','New Arrivals Weekly'];
  const track = document.getElementById('marqueeTrack');
  if (!track) return;
  const html = [...items,...items].map(t => `
    <div class="marquee-item"><div class="marquee-dot"></div>${t}</div>
  `).join('');
  track.innerHTML = html;
}

// ---- PARTICLES ----
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i=0; i<25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random()*100 + '%';
    p.style.width = p.style.height = (Math.random()*2+1) + 'px';
    p.style.animationDuration = (Math.random()*15+8) + 's';
    p.style.animationDelay = (Math.random()*10) + 's';
    container.appendChild(p);
  }
}

// ---- TOAST ----
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function handleEmailSignup() {
  const val = document.getElementById('emailInput')?.value;
  if (val && val.includes('@')) {
    showToast('✦ Welcome to the Inner Circle!');
    document.getElementById('emailInput').value = '';
  } else {
    showToast('Please enter a valid email address.');
  }
}

// ---- CURSOR ----
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
function animCursor() {
  cursorDot.style.left = mx+'px'; cursorDot.style.top = my+'px';
  rx += (mx-rx)*0.15; ry += (my-ry)*0.15;
  cursorRing.style.left = rx+'px'; cursorRing.style.top = ry+'px';
  requestAnimationFrame(animCursor);
}
animCursor();

// ---- SCROLL NAV ----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ---- INIT ----
renderFeatured();
renderShop();
renderFAQ();
renderMarquee();
createParticles();
</script>
