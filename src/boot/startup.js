import strings from '../strings/ms.json?v=8' with {type:'json'};
const panel=document.getElementById('startup');panel.textContent=strings.loading;
window.addEventListener('error',event=>{panel.textContent=`${strings.loadError} ${event.message||''}`});
window.addEventListener('unhandledrejection',event=>{panel.textContent=`${strings.loadError} ${event.reason?.message||''}`});
document.addEventListener('hikayat-ready',()=>panel.remove(),{once:true});
try{await import('../main.js?v=9')}catch(error){panel.textContent=`${strings.loadError} ${error.message||''}`}
