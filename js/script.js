/* Our Chapter · main script
   Needs translations.js and config.js to be loaded first (see index.html). */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) {
    e.target.classList.add('in');
    io.unobserve(e.target);
} }), { threshold: .15 });
$$('.rv').forEach(e => io.observe(e));
/* Personal link: yourdomain.com/?to=Sokha fills the guest name in the demo box */
try {
    const guest = (new URLSearchParams(location.search).get('to') || '').trim().slice(0, 40);
    if (guest) $('#gi').value = guest;
} catch (x) { }
document.body.classList.add('rd');
$('#mq').innerHTML += $('#mq').innerHTML;
/* reviews: copy each row once so the slide loops without a gap */
$$('.tm-track').forEach(t => [...t.children].forEach(n => { const k = n.cloneNode(true); k.setAttribute('aria-hidden', 'true'); t.append(k); }));
/* EN / KH switch: translates every text node found in the dictionary */
const sp = t => { const a = t.match(/^[^A-Za-z0-9]*/)[0], b = t.match(/[^A-Za-z0-9.!?…’]*$/)[0]; return [a, t.slice(a.length, t.length - b.length), b]; };
const LR = [], h1 = $('h1'), h1E = h1.innerHTML;
const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => /^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName) || !n.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
for (let n; n = tw.nextNode();) {
    const o = n.nodeValue, [a, c, b] = sp(o);
    if (KH[c] || /^\d+$/.test(c))
        LR.push({ n, o, a, c, b });
}
const PH = $$('[placeholder]').map(e => ({ e, o: e.placeholder }));
function setLg(l) { document.documentElement.lang = l == 'kh' ? 'km' : 'en'; LR.forEach(r => r.n.nodeValue = l == 'kh' ? r.a + (KH[r.c] || NUM(r.c)) + r.b : r.o); PH.forEach(p => p.e.placeholder = l == 'kh' ? (KH[p.o] || p.o) : p.o); h1.innerHTML = l == 'kh' ? H1K : h1E; $('#lgp').textContent = l == 'kh' ? 'EN English' : 'KH ខ្មែរ'; $$('.lgs button').forEach(b => b.classList.toggle('on', b.dataset.l == l)); try {
    localStorage.setItem('ocl', l);
}
catch (x) { } }
$$('.lgs button').forEach(b => b.onclick = () => setLg(b.dataset.l));
$('#lgp').onclick = () => setLg(document.documentElement.lang == 'km' ? 'en' : 'kh');
/* Phone menu: hamburger opens the dropdown; closes on link tap, Esc, or tapping outside */
const nv = $('nav'), mb = $('#mb');
const menu = o => { nv.classList.toggle('open', o); mb.setAttribute('aria-expanded', String(o)); };
mb.onclick = () => menu(!nv.classList.contains('open'));
$$('#mp a').forEach(a => a.addEventListener('click', () => menu(false)));
addEventListener('keydown', e => { if (e.key == 'Escape') menu(false); });
document.addEventListener('click', e => { if (!nv.contains(e.target)) menu(false); });
try {
    const saved = localStorage.getItem('ocl');
    if (saved == 'kh' || (!saved && /^km/i.test(navigator.language || '')))
        setLg('kh');
}
catch (x) { }
const TPL = { Standard: 'Personal & Memorable', Premium: 'Personal & Memorable', VIP: 'Bespoke & Extraordinary' };
const PREM_TPL = ['Personal & Memorable', 'Exclusive & Luxurious', 'Grand & Majestic'];
const md = $('#md'), mf = $('#mf'), M = { tg: $('#btg'), fb: $('#bfb'), wa: $('#bwa') };
const msg = () => { const v = n => mf[n].value.trim(); return `💌 New invitation request · Our Chapter\n👫 Names: ${v('nm')}\n📅 Date: ${v('dt') || '-'}\n💎 Package: ${mf.pk.value}\n🎨 Template: ${mf.tp.value}\n🌐 Language: ${mf.ln.value}\n📞 Contact: ${v('ct') || '-'}\n📝 Notes: ${v('nt') || '-'}`; };
const REQ = ['nm', 'dt', 'ct'], bad = () => REQ.filter(n => !mf[n].value.trim());
function upd() {
    const q = encodeURIComponent(msg()), ok = !bad().length, U = { wa: `https://wa.me/${WA}?text=${q}`, tg: `https://t.me/${TG}?text=${q}`, fb: `https://www.messenger.com/t/${FB}` };
    for (const k in M) {
        ok ? M[k].setAttribute('href', U[k]) : M[k].removeAttribute('href');
        M[k].classList.toggle('dis', !ok);
        M[k].setAttribute('aria-disabled', String(!ok));
    }
    if (ok)
        $('#mw').hidden = true;
}
function openM() { upd(); $('#mt').hidden = true; $('#mw').hidden = true; md.hidden = false; requestAnimationFrame(() => md.classList.add('on')); document.body.style.overflow = 'hidden'; mf.nm.focus({ preventScroll: true }); }
function closeM() { md.classList.remove('on'); document.body.style.overflow = ''; setTimeout(() => md.hidden = true, 250); }
mf.addEventListener('input', e => { e.target.classList.remove('bad'); upd(); });
mf.onsubmit = e => e.preventDefault();
mf.pk.addEventListener('change', () => { const t = TPL[mf.pk.value.split(' ')[0]]; if (t && !(!mf.pk.value.startsWith('VIP') && PREM_TPL.includes(mf.tp.value))) mf.tp.value = t; upd(); });
$('.mx').onclick = closeM;
md.onclick = e => { if (e.target === md)
    closeM(); };
addEventListener('keydown', e => { if (e.key == 'Escape' && !md.hidden)
    closeM(); });
Object.values(M).forEach(a => a.addEventListener('click', e => { const b = bad(); if (b.length) {
    e.preventDefault();
    b.forEach(n => { const f = mf[n]; f.classList.remove('bad'); void f.offsetWidth; f.classList.add('bad'); });
    mf[b[0]].focus();
    $('#mw').hidden = false;
    return;
} try {
    navigator.clipboard.writeText(msg()).catch(() => { });
}
catch (x) { } $('#mt').hidden = false; }));
const tl = $$('.tb a:not(.go)'), so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting)
    tl.forEach(a => a.classList.toggle('on', a.getAttribute('href') == '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
tl.forEach(a => { const s = $(a.getAttribute('href')); s && so.observe(s); });
$$('a[href="#start"],.band .btn').forEach(a => a.addEventListener('click', e => { e.preventDefault(); if (a.dataset.plan) mf.pk.value = a.dataset.plan; const t = a.dataset.tpl || TPL[mf.pk.value.split(' ')[0]]; if (t) mf.tp.value = t; openM(); }));
const hero = $('#hero');
hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; $$('[data-d]').forEach(s => s.style.transform = `translate(${x * s.dataset.d}px,${y * s.dataset.d}px)`); });
function pop(x, y) { for (let i = 0; i < 14; i++) {
    const p = document.createElement('i'), a = Math.random() * 6.28, d = 60 + Math.random() * 90;
    p.className = 'cf';
    p.textContent = ['💗', '🌸', '✨', '💌', '🎀'][i % 5];
    p.style.cssText = `left:${x}px;top:${y}px;--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d - 40}px`;
    document.body.append(p);
    setTimeout(() => p.remove(), 950);
} }
$$('.btn').forEach(b => b.addEventListener('click', e => pop(e.clientX, e.clientY)));
const gi = $('#gi');
function gd() { const n = gi.value.trim() || 'Guest'; $('#gn').textContent = n; $('#gu').textContent = 'ourchapter.app/?to=' + encodeURIComponent(n); }
gi.oninput = gd;
gd();
for (let i = 0; i < 14; i++) {
    const h = document.createElement('i');
    h.className = 'rh';
    h.textContent = ['♥', '🌸', '✨'][i % 3];
    h.style.cssText = `left:${Math.random() * 100}%;font-size:${14 + Math.random() * 16}px;animation-duration:${5 + Math.random() * 5}s;animation-delay:-${Math.random() * 8}s`;
    $('.band').append(h);
}
