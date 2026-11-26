import economy from '../config/economy.json' with {type:'json'};
import {ensurePhase3,swapCompanion} from './CompanionState.js';
export function runtime(settings,id){if(!settings.party)ensurePhase3(settings);settings.companionRuntime??={};return settings.companionRuntime[id]??={cooldownRemainingMs:0,pledge:0,staggerRemainingMs:0}}
export function tickCompanions(settings,delta){for(const id of settings.party){const state=runtime(settings,id);state.cooldownRemainingMs=Math.max(0,state.cooldownRemainingMs-delta);state.staggerRemainingMs=Math.max(0,state.staggerRemainingMs-delta)}}
export function earnCompanionCharge(settings,source='hit'){const gain=source==='parry'?economy.companion.parryCooldownGainMs:economy.companion.hitCooldownGainMs;const pledge=source==='parry'?economy.companion.pledgeParryGain:economy.companion.pledgeHitGain;for(const id of settings.party){const state=runtime(settings,id);state.cooldownRemainingMs=Math.max(0,state.cooldownRemainingMs-gain);state.pledge=Math.min(economy.companion.pledgeMax,state.pledge+pledge)}}
export function commandReady(settings){const id=settings.activeCompanion;return Boolean(id&&settings.party.includes(id)&&runtime(settings,id).cooldownRemainingMs<=0&&runtime(settings,id).staggerRemainingMs<=0)}
export function activateCommand(settings){if(!commandReady(settings))return false;runtime(settings,settings.activeCompanion).cooldownRemainingMs=economy.companion.commandCooldownMs;return true}
export function pledgeReady(settings){const id=settings.activeCompanion;return Boolean(id&&settings.companions[id]?.setia&&runtime(settings,id).pledge>=economy.companion.pledgeMax)}
export function activatePledge(settings){if(!pledgeReady(settings))return false;const id=settings.activeCompanion;runtime(settings,id).pledge=0;if(id==='kancil')settings.companionEffects.kancilHintBarrage+=economy.companion.pledgeHintCharges;return true}
export {swapCompanion};
