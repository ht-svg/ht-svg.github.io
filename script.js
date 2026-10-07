/* ============ AZUR LANE 个人小站 · 交互脚本 ============ */

// ---------- 打字机轮播（独角兽台词） ----------
const lines = [
  '「指挥、指揮官様…欢迎回家。」—— 独角兽',
  '「就像天使一样？…呜…有、有点不好意思……」',
  '「白鸽队，出击！为指挥官献上胜利的应援 ✦」',
  '「今天也一起在港区努力吧…我会陪着你的。」',
  '「碧蓝的航线尽头，是必须守护的大海与人们。」'
];
let li = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');
function typeLoop() {
  if (!tw) return;
  const cur = lines[li];
  if (!deleting) {
    tw.textContent = cur.slice(0, ++ci);
    if (ci >= cur.length) { deleting = true; setTimeout(typeLoop, 2200); return; }
    setTimeout(typeLoop, 55);
  } else {
    tw.textContent = cur.slice(0, --ci);
    if (ci <= 0) { deleting = false; li = (li + 1) % lines.length; setTimeout(typeLoop, 400); return; }
    setTimeout(typeLoop, 22);
  }
}
typeLoop();

// ---------- 漂浮粒子（海光气泡） ----------
const pbox = document.getElementById('ocean-particles');
for (let i = 0; i < 36; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const s = 2 + Math.random() * 6;
  p.style.width = p.style.height = s + 'px';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.setProperty('--sway', (Math.random() * 80 - 40) + 'px');
  p.style.animationDuration = 7 + Math.random() * 12 + 's';
  p.style.animationDelay = -Math.random() * 15 + 's';
  p.style.opacity = .2 + Math.random() * .5;
  pbox.appendChild(p);
}

// ---------- 点击特效：✦ 🦄 ⚓ 迸发 ----------
const sparkChars = ['✦', '🦄', '⚓', '✧', '💙'];
document.addEventListener('click', e => {
  for (let i = 0; i < 5; i++) {
    const sp = document.createElement('span');
    sp.className = 'click-spark';
    sp.textContent = sparkChars[Math.floor(Math.random() * sparkChars.length)];
    sp.style.left = e.clientX + 'px';
    sp.style.top = e.clientY + 'px';
    sp.style.setProperty('--dx', (Math.random() * 90 - 45) + 'px');
    sp.style.setProperty('--dy', (-30 - Math.random() * 70) + 'px');
    document.body.appendChild(sp);
    setTimeout(() => sp.remove(), 850);
  }
});

// ---------- 滚动进场 & 技能条填充 ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('in-view');
      en.target.querySelectorAll('.bar i').forEach(b => b.classList.add('grow'));
    }
  });
}, { threshold: .18 });
document.querySelectorAll('.section, .skill-card, .unicorn-showcase, .about-card, .work-card, .log-item').forEach(el => {
  el.classList.add('reveal');
  io.observe(el);
});

// ---------- 皮肤画廊点击 → 放大主图（Hero 立绘切换） ----------
const heroImg = document.querySelector('.unicorn-img');
const fallbackUnicorn = 'https://patchwiki.biligame.com/images/blhx/a/af/p1m0ks9impayw5bmvq6wjc8ctxynhw5.jpg';
document.querySelectorAll('.us-skin img').forEach(img => {
  img.addEventListener('click', () => {
    if (!heroImg) return;
    heroImg.src = img.src;
    heroImg.onerror = () => { heroImg.onerror = null; heroImg.src = fallbackUnicorn; };
    heroImg.animate(
      [{ transform: 'scale(.96)', opacity: .4 }, { transform: 'scale(1)', opacity: 1 }],
      { duration: 450, easing: 'ease-out' }
    );
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
  });
});

// ---------- 移动端汉堡菜单 ----------
const burger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open')));

// ---------- 联系表单（前端演示） ----------
const form = document.getElementById('contactForm');
const tip = document.getElementById('formTip');
form.addEventListener('submit', e => {
  e.preventDefault();
  tip.textContent = '📡 电波已穿越碧蓝之海送达港区！独角兽说：谢谢你，指挥官～ 🦄';
  form.reset();
  setTimeout(() => (tip.textContent = ''), 5000);
});
