import economy from '../config/economy.json' with {type:'json'};
export const companionIds=['kancil','lang','rimau','dayang','hidden'];
export const charmIds=['laju','kebal'];
export const bossIds=['beringin','dalang','naga','garuda','kelembai','hantuRaya','sangBisu'];
export function initialCompanions(){return Object.fromEntries(companionIds.map(id=>[id,{unlocked:false,setia:false,quest:{attempts:0,replaysUsed:0,closed:false,active:false,step:0,mistakes:0}}]))}
export function ensurePhase3(settings){
 const defaults=initialCompanions(),old=settings.companions||{};
 settings.companions=Object.fromEntries(companionIds.map(id=>{const item=old[id],source=typeof item==='object'&&item!==null?item:{unlocked:item===true||defaults[id].unlocked};return [id,{...defaults[id],...source,quest:{...defaults[id].quest,...source.quest}}]}));
 settings.party=Array.isArray(settings.party)?[...new Set(settings.party)].filter(id=>settings.companions[id]?.unlocked).slice(0,economy.partyMax):[];
 if(!settings.party.length)settings.party=[companionIds.find(id=>settings.companions[id].unlocked)].filter(Boolean);
 settings.activeCompanion=settings.party.includes(settings.activeCompanion)?settings.activeCompanion:settings.party[0];
 settings.companionEffects={kancilHintBarrage:0,...settings.companionEffects};
 settings.repository={collected:[],achievement:false,...settings.repository};settings.repository.collected=[...new Set(settings.repository.collected)].filter(id=>bossIds.includes(id));settings.repository.achievement=settings.repository.collected.length===economy.repositoryGoal;
 settings.charms=Object.fromEntries(charmIds.map(id=>[id,{owned:false,notches:0,equipped:false,...settings.charms?.[id]}]));
 settings.purchases={adFree:false,...settings.purchases};
 settings.benches={discovered:['entrance'],selected:'entrance',...settings.benches};settings.benches.discovered=[...new Set(settings.benches.discovered)].filter(id=>economy.benches.some(b=>b.id===id));if(!settings.benches.discovered.includes('entrance'))settings.benches.discovered.unshift('entrance');if(!settings.benches.discovered.includes(settings.benches.selected))settings.benches.selected='entrance';
 return settings;
}
export function selectParty(settings,id){ensurePhase3(settings);if(!settings.companions[id]?.unlocked)return false;const party=settings.party;if(party.includes(id)){if(party.length===1)return false;settings.party=party.filter(x=>x!==id)}else if(party.length<economy.partyMax)party.push(id);else return false;settings.activeCompanion=settings.party.includes(settings.activeCompanion)?settings.activeCompanion:settings.party[0];return true}
export function swapCompanion(settings){ensurePhase3(settings);if(settings.party.length<2)return false;settings.activeCompanion=settings.party.find(id=>id!==settings.activeCompanion);return true}
export function recordBoss(settings,id){ensurePhase3(settings);if(!bossIds.includes(id))return false;if(!settings.repository.collected.includes(id))settings.repository.collected.push(id);settings.repository.achievement=settings.repository.collected.length===economy.repositoryGoal;return true}
export function replayQuote(settings,id){ensurePhase3(settings);const q=settings.companions[id]?.quest;if(!q||!settings.companions[id].unlocked||q.closed||q.active||q.attempts===0||q.replaysUsed>=economy.setia.replayCosts.length)return null;return {cost:economy.setia.replayCosts[q.replaysUsed],lastChance:q.replaysUsed===1,needsAd:!settings.purchases.adFree}}
export function startQuest(settings,id,kata,{adCompleted=false}={}){ensurePhase3(settings);let c=settings.companions[id];if(!c?.unlocked||c.setia||c.quest.closed)return {ok:false,reason:'unavailable'};if(c.quest.active)return {ok:true,kata,resumed:true};if(c.quest.attempts){const quote=replayQuote(settings,id);c=settings.companions[id];if(!quote)return {ok:false,reason:'closed'};if(kata<quote.cost)return {ok:false,reason:'kata'};if(quote.needsAd&&!adCompleted)return {ok:false,reason:'ad'};kata-=quote.cost;c.quest.replaysUsed++}c.quest.active=true;c.quest.step=0;c.quest.mistakes=0;c.quest.attempts++;return {ok:true,kata}}
export function questMistake(settings,id){const q=settings.companions[id]?.quest;if(q?.active)q.mistakes++}
export function questStep(settings,id){const c=settings.companions[id],q=c?.quest;if(!q?.active)return null;q.step++;if(q.step<economy.setia.chainLength)return {done:false,step:q.step};q.active=false;const passed=q.mistakes===0;if(passed)c.setia=true;else if(q.replaysUsed>=economy.setia.replayCosts.length)q.closed=true;return {done:true,passed,closed:q.closed}}
export function buyCharm(settings,id,kata){ensurePhase3(settings);const item=settings.charms[id],cfg=economy.charms[id];if(!cfg)return {ok:false,kata};const cost=item.owned?cfg.refillCost:cfg.cost;if(kata<cost||item.owned&&item.notches===cfg.notches)return {ok:false,kata};item.owned=true;item.notches=cfg.notches;item.equipped=true;return {ok:true,kata:kata-cost}}
export function consumeCharm(settings,id){const item=settings.charms?.[id];if(!item?.owned||!item.equipped||item.notches<=0)return false;item.notches--;return true}
export function discoverBench(settings,id){ensurePhase3(settings);if(!economy.benches.some(b=>b.id===id))return false;if(!settings.benches.discovered.includes(id))settings.benches.discovered.push(id);settings.benches.selected=id;return true}
