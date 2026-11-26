import {palette} from '../theme/palette.js';
import {stringsFor} from '../systems/Strings.js';
for(const [key,value] of Object.entries(palette))if(typeof value==='string')document.documentElement.style.setProperty('--'+key,value);
document.querySelector('meta[name="theme-color"]').content=palette.background;
const t=stringsFor('ms'),status=document.getElementById('startup');status.textContent=t.loading;document.getElementById('landscape').textContent=t.portraitHint;
const error=()=>{status.hidden=false;status.textContent=t.loadError;document.body.append(status)};
window.addEventListener('error',error);window.addEventListener('unhandledrejection',error);
document.addEventListener('hikayat-ready',()=>status.remove(),{once:true});
try{await import('../main.js')}catch(e){console.error(e);error()}
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
