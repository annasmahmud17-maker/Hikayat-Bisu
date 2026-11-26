import defaults from '../config/settings.json' with {type:'json'};
import {ensurePhase3} from './CompanionState.js';
const KEY='hikayat-bisu-phase1';
let memory=ensurePhase3(structuredClone(defaults));
function migrate(record){if(!record||typeof record!=='object'||![1,2,3].includes(record.schema))return ensurePhase3(structuredClone(defaults));return ensurePhase3({...structuredClone(defaults),...record,look:record.look==='girlB'?'girlA':record.look,schema:3,abilities:{...defaults.abilities,...record.abilities,wallJump:true,doubleJump:true}})}
export class Save{
 static load(){try{const raw=localStorage.getItem(KEY);memory=raw?migrate(JSON.parse(raw)):migrate(null)}catch{memory=migrate(null)}return structuredClone(memory)}
 static write(settings,checkpoint){memory=migrate({...settings,checkpoint:checkpoint??settings.checkpoint??memory.checkpoint});try{localStorage.setItem(KEY,JSON.stringify(memory));return true}catch{return false}}
 static autosave(settings,checkpoint){const listener=()=>{if(document.hidden)Save.write(settings,checkpoint?.())};document.addEventListener('visibilitychange',listener);return()=>document.removeEventListener('visibilitychange',listener)}
}
