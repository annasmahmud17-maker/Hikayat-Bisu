import {palette} from '../theme/palette.js?v=18';
import {stringsFor} from '../systems/Strings.js?v=18';
document.querySelector('meta[name="theme-color"]').content=palette.background;
const panel=document.getElementById('startup');panel.style.color=palette.buttonText;panel.style.backgroundColor=palette.background;panel.textContent=stringsFor('ms').loading;
window.addEventListener('error',event=>{panel.textContent=`${stringsFor('ms').loadError} ${event.message||''}`});
window.addEventListener('unhandledrejection',event=>{panel.textContent=`${stringsFor('ms').loadError} ${event.reason?.message||''}`});
document.addEventListener('hikayat-ready',()=>panel.remove(),{once:true});
const landscape=document.getElementById('landscape');landscape.textContent=stringsFor('ms').portraitHint;landscape.style.backgroundColor=palette.camp.far;landscape.style.color=palette.parchment;
try{await import('../main.js?v=18')}catch(error){panel.textContent=`${stringsFor('ms').loadError} ${error.message||''}`}
