document.documentElement.classList.add("js-ready");
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

// ---- SCROLL NAV ----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

renderFeatured();
renderShop();
renderFAQ();
renderMarquee();
createParticles();

// ---- SCROLL PROGRESS ----
const progressBar = document.getElementById('scrollProgress');
function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
  if (progressBar) progressBar.style.width = pct + '%';
}

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function initReveal() {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .line-draw').forEach(el => revealObserver.observe(el));
}

// ---- STAGGER PRODUCT CARDS ----
function staggerCards() {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach((card, i) => { card.style.transitionDelay = (i % 4) * 0.09 + 's'; });
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('card-visible'); cardObserver.unobserve(e.target); } });
  }, { threshold: 0.08 });
  cards.forEach(c => cardObserver.observe(c));
}

// ---- HERO SPOTLIGHT ----
const heroEl = document.querySelector('.hero');
const spotlight = document.getElementById('heroSpotlight');
if (heroEl && spotlight) {
  heroEl.addEventListener('mousemove', e => {
    const rect = heroEl.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%';
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%';
    spotlight.style.background = `radial-gradient(500px circle at ${x} ${y}, rgba(201,168,76,0.05), transparent 40%)`;
  });
}

// ---- HERO GRID PARALLAX ----
const heroGrid = document.querySelector('.hero-grid');
window.addEventListener('scroll', () => {
  updateProgress();
  if (heroGrid) heroGrid.style.transform = `translateY(${window.scrollY * 0.25}px)`;
});

// ---- CARD STACK TILT ----
const cardStack = document.querySelector('.card-stack');
const heroCardVisual = document.querySelector('.hero-card-visual');
if (heroCardVisual && cardStack) {
  heroCardVisual.addEventListener('mousemove', e => {
    const rect = heroCardVisual.getBoundingClientRect();
    const rx = ((e.clientY - rect.top - rect.height/2) / rect.height) * -12;
    const ry = ((e.clientX - rect.left - rect.width/2) / rect.width) * 14;
    cardStack.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    cardStack.style.transition = 'transform 0.1s';
  });
  heroCardVisual.addEventListener('mouseleave', () => {
    cardStack.style.transform = 'rotateX(0) rotateY(0)';
    cardStack.style.transition = 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1)';
  });
}

// ---- STAT COUNTER ----
function animateCounter(el, target, suffix, duration) {
  const start = performance.now();
  function update(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const statsEl = document.querySelector('.story-stats');
if (statsEl) {
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const nums = e.target.querySelectorAll('.stat-num');
        const targets = [[40000,'K+',1800],[180,'+',1400],[6,' YRS',800]];
        nums.forEach((num, i) => { if(targets[i]) animateCounter(num, targets[i][0], targets[i][1], targets[i][2]); });
      }
    });
  }, { threshold: 0.5 }).observe(statsEl);
}

// ---- MAGNETIC BUTTONS ----
function initMagnetic() {
  document.querySelectorAll('.btn-primary, .btn-ghost, .cart-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width/2) * 0.18;
      const y = (e.clientY - rect.top - rect.height/2) * 0.18;
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      setTimeout(() => { btn.style.transition = ''; }, 500);
    });
  });
}

const _origShowPage = showPage;
window.showPage = function(page) {
  _origShowPage(page);
  setTimeout(() => { initReveal(); staggerCards(); initMagnetic(); }, 60);
};

initReveal();
staggerCards();
initMagnetic();
updateProgress();
