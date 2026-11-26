import economy from '../config/economy.json?v=z1-3' with {type:'json'};
export const companionIds=['kancil','rimau','lang','dayang','hidden'];
export function findCompanion(s,id){if(!companionIds.includes(id))return false;s.companions[id]??={found:true,setia:false,puzzles:{}};s.companions[id].found=true;return true}
export function selectParty(s,id){if(!s.companions[id]?.found)return false;if(s.party.includes(id))s.party=s.party.filter(x=>x!==id);else if(s.party.length<economy.partyMax)s.party.push(id);else return false;if(!s.party.includes(s.activeCompanion))s.activeCompanion=s.party[0]||null;return true}
export function swapCompanion(s){if(s.party.length<2)return false;s.activeCompanion=s.party.find(id=>id!==s.activeCompanion);return true}
export function recordBoss(s,id){if(!s.repository.collected.includes(id))s.repository.collected.push(id)}
export function questRecord(s,id,puzzle){s.companions[id]??={found:false,setia:false,puzzles:{}};return s.companions[id].puzzles[puzzle]??={attempts:0,replaysUsed:0,active:false,closed:false,solved:false}}
export function replayQuote(s,id,puzzle){const q=questRecord(s,id,puzzle);if(q.closed||q.solved||q.active)return null;return {cost:q.attempts?economy.setia.replayCosts[q.replaysUsed]:0,needsAd:q.attempts>0&&!s.purchases.adFree,lastChance:q.replaysUsed===1}}
export function startQuest(s,id,puzzle,{adCompleted=false}={}){const q=questRecord(s,id,puzzle);if(q.closed||q.solved)return false;if(q.active)return true;const quote=replayQuote(s,id,puzzle);if(quote.cost===undefined||s.kata<quote.cost||quote.needsAd&&!adCompleted)return false;s.kata-=quote.cost;if(q.attempts)q.replaysUsed++;q.attempts++;q.active=true;return true}
export function finishQuest(s,id,puzzle,correct){const q=questRecord(s,id,puzzle);if(!q.active)return false;q.active=false;q.solved=correct;if(!correct&&q.replaysUsed===economy.setia.replayCosts.length)q.closed=true;return q.solved}
