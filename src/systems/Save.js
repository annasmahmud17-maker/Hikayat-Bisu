import defaults from '../config/settings.json?v=z2-1' with {type:'json'};
import config from '../config/foundation.json?v=z2-1' with {type:'json'};
const clone=value=>structuredClone(value);
export function migrate(record){
 const s=clone(defaults);
 if(!record||typeof record!=='object')return s;
 for(const key of ['heroName','language','difficulty','look','skin','masterVolume','musicVolume','effectsVolume','lowPower','shake','hitStop'])if(typeof record[key]===typeof s[key])s[key]=record[key];
 s.heroName=s.heroName.slice(0,24);if(!['boy','girlA','girlB'].includes(s.look))s.look='boy';if(!['ms','en'].includes(s.language))s.language='ms';if(!['mudah','biasa','mahir'].includes(s.difficulty))s.difficulty='biasa';
 s.kata=Math.max(0,Number(record.kata??record.checkpoint?.kata)||0);
 s.repository={collected:[...new Set((record.repository?.collected||[]).filter(x=>typeof x==='string'))]};s.purchases={adFree:record.purchases?.adFree===true};
 // Old stage and companion unlocks describe a different world. Only import preferences and currency.
 if(record.format!=='topdown'||record.schema!==config.schema)return s;
 s.maxHearts=Math.max(defaults.maxHearts,Math.min(30,Number(record.maxHearts)||defaults.maxHearts));s.hearts=Math.max(0,Math.min(s.maxHearts,Number(record.hearts)||s.maxHearts));
 s.companions=record.companions&&typeof record.companions==='object'?record.companions:{};s.party=[...new Set(record.party||[])].filter(id=>s.companions[id]?.found).slice(0,2);s.activeCompanion=s.party.includes(record.activeCompanion)?record.activeCompanion:s.party[0]||null;
 s.layout=record.layout&&typeof record.layout==='object'?record.layout:null;s.abilities={inkArrow:record.abilities?.inkArrow===true};
 s.story={...(record.story||{})};
 const p=record.progress||{};s.progress={current:/^ch[1-4]_s(?:[1-9]|10)$/.test(p.current)?p.current:'ch1_s1',unlocked:[...new Set(['ch1_s1',...(p.unlocked||[])])],cleared:[...new Set(p.cleared||[])],stages:p.stages&&typeof p.stages==='object'?p.stages:{},lesserKeys:[...new Set(p.lesserKeys||[])].filter(n=>[1,2,3].includes(n))};
 s.bayang=record.bayang&&Number.isFinite(record.bayang.kata)?record.bayang:null;
 return s;
}
let memory=clone(defaults);
export class Save{
 static load(){try{const current=localStorage.getItem(config.saveKey);const legacy=current?null:localStorage.getItem(config.legacyKey);memory=migrate(JSON.parse(current||legacy||'null'))}catch{memory=migrate(null)}return clone(memory)}
 static write(s){memory=migrate(s);try{localStorage.setItem(config.saveKey,JSON.stringify(memory));return true}catch{return false}}
}
