import {palette} from '../theme/palette.js?v=z2-1';
import {stringsFor} from '../systems/Strings.js?v=z2-1';
for(const [key,value] of Object.entries(palette))if(typeof value==='string')document.documentElement.style.setProperty('--'+key,value);
document.querySelector('meta[name="theme-color"]').content=palette.background;
const t=stringsFor('ms'),status=document.getElementById('startup');status.textContent=t.loading;document.getElementById('landscape').textContent=t.portraitHint;
const error=event=>{const detail=event?.message||event?.reason?.message||'';status.hidden=false;status.textContent=t.loadError+(detail?' · '+detail:'');document.body.append(status)};
window.addEventListener('error',error);window.addEventListener('unhandledrejection',error);
document.addEventListener('hikayat-ready',()=>status.remove(),{once:true});
try{await import('../main.js?v=z2-1')}catch(e){console.error(e);error(e)}
