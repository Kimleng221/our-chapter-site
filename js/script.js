/* Our Chapter · script. Needs translations.js and config.js first. */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
/* Khmer / English: swaps every text found in the KH dictionary */
const sp=t=>{const a=t.match(/^[^A-Za-z0-9]*/)[0],b=t.match(/[^A-Za-z0-9.!?…’]*$/)[0];return[a,t.slice(a.length,t.length-b.length),b]};
const LR=[],h1=$('h1'),h1E=h1.innerHTML;
const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName)||!n.nodeValue.trim()?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
for(let n;n=tw.nextNode();){const o=n.nodeValue,[a,c,b]=sp(o);if(KH[c]||/^\d+$/.test(c))LR.push({n,o,a,c,b})}
const PH=$$('[placeholder]').map(e=>({e,o:e.placeholder}));
function setLg(l){document.documentElement.lang=l=='kh'?'km':'en';LR.forEach(r=>r.n.nodeValue=l=='kh'?r.a+(KH[r.c]||NUM(r.c))+r.b:r.o);PH.forEach(p=>p.e.placeholder=l=='kh'?(KH[p.o]||p.o):p.o);h1.innerHTML=l=='kh'?H1K:h1E;$('#lgp').textContent=l=='kh'?'EN English':'KH ខ្មែរ';try{localStorage.setItem('ocl',l)}catch(x){}}
$('#lgp').onclick=()=>setLg(document.documentElement.lang=='km'?'en':'kh');
try{const s=localStorage.getItem('ocl');if(s=='kh'||(!s&&/^km/i.test(navigator.language||'')))setLg('kh')}catch(x){}
/* Personal link: ?to=Sokha fills the guest name box */
try{const g=(new URLSearchParams(location.search).get('to')||'').trim().slice(0,40);if(g)$('#gi').value=g}catch(x){}
const gi=$('#gi'),gd=()=>$('#gn').textContent=gi.value.trim()||'Guest';gi.oninput=gd;gd();
/* Start-creating pop-up */
const md=$('#md'),mf=$('#mf'),M={tg:$('#btg'),wa:$('#bwa'),fb:$('#bfb')};
const v=n=>mf[n].value.trim(),REQ=['nm','dt','ct'],bad=()=>REQ.filter(n=>!v(n));
const msg=()=>`💌 New invitation request · Our Chapter\n👫 Names: ${v('nm')}\n📅 Date: ${v('dt')||'-'}\n💎 Package: ${mf.pk.value}\n🌐 Language: ${mf.ln.value}\n📞 Contact: ${v('ct')||'-'}\n📝 Notes: ${v('nt')||'-'}`;
function upd(){const q=encodeURIComponent(msg()),ok=!bad().length,U={wa:`https://wa.me/${WA}?text=${q}`,tg:`https://t.me/${TG}?text=${q}`,fb:`https://www.messenger.com/t/${FB}`};
for(const k in M){ok?M[k].href=U[k]:M[k].removeAttribute('href');M[k].classList.toggle('dis',!ok)}if(ok)$('#mw').hidden=true}
const openM=()=>{upd();$('#mt').hidden=$('#mw').hidden=true;md.hidden=false;document.body.style.overflow='hidden'};
const closeM=()=>{md.hidden=true;document.body.style.overflow=''};
mf.addEventListener('input',e=>{e.target.classList.remove('bad');upd()});mf.onsubmit=e=>e.preventDefault();
$('.mx').onclick=closeM;md.onclick=e=>{if(e.target==md)closeM()};addEventListener('keydown',e=>{if(e.key=='Escape')closeM()});
$$('a[href="#start"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();if(a.dataset.plan)mf.pk.value=a.dataset.plan;openM()}));
Object.values(M).forEach(a=>a.addEventListener('click',e=>{const b=bad();if(b.length){e.preventDefault();b.forEach(n=>mf[n].classList.add('bad'));mf[b[0]].focus();$('#mw').hidden=false;return}
try{navigator.clipboard.writeText(msg()).catch(()=>{})}catch(x){}$('#mt').hidden=false}));
