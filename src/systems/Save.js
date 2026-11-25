import defaults from '../config/settings.json?v=12' with {type:'json'};
const KEY='hikayat-bisu-phase1';
let memory=structuredClone(defaults);
function migrate(record){if(!record||typeof record!=='object')return structuredClone(defaults);if(record.schema===1||record.schema===2)return {...structuredClone(defaults),...record,schema:2,abilities:{...defaults.abilities,...record.abilities},companions:{...record.companions}};return structuredClone(defaults)}
export class Save{
  static load(){try{const raw=localStorage.getItem(KEY);memory=raw?migrate(JSON.parse(raw)):structuredClone(defaults)}catch{memory=structuredClone(defaults)}return structuredClone(memory)}
  static write(settings,checkpoint){memory=migrate({...settings,checkpoint:checkpoint??settings.checkpoint??memory.checkpoint});try{localStorage.setItem(KEY,JSON.stringify(memory));return true}catch{return false}}
  static autosave(settings,checkpoint){const listener=()=>{if(document.hidden)Save.write(settings,checkpoint?.())};document.addEventListener('visibilitychange',listener);return()=>document.removeEventListener('visibilitychange',listener)}
}
