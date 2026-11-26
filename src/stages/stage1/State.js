import cfg from '../../config/stage1.json' with {type:'json'};
export function stageState(settings){
 if(!settings.stage1){settings.stage1={room:'ambang',visited:[],benches:['entrance'],checkpoint:'entrance',doors:{},cleared:[],chests:[],wallJump:false,recruited:Boolean(settings.companions?.kancil?.setia),bossDefeated:false,teaserSeen:false,bonded:false,elapsedMs:0};}
 const state=settings.stage1;if(!state.initialized){state.initialized=true;if(!state.recruited){settings.companions.kancil.unlocked=false;settings.party=settings.party.filter(id=>id!=='kancil');settings.activeCompanion=settings.party[0]||null}}
 if(!cfg.rooms.some(r=>r.id===state.room))state.room='ambang';
 return state;
}
export function canExit(state,room,direction){if(!room.exits[direction])return false;if(room.id==='sarang'&&direction==='right'&&!state.recruited)return false;if(direction==='right'&&room.door&&(state.doors[room.id]||0)<cfg.route.doorQuestions)return false;if(room.id==='akar'&&direction==='up'&&!state.wallJump)return false;return true}
export function canCompanionGate(settings,id){return Boolean(settings.companions?.[id]?.unlocked&&settings.party?.includes(id))}
export function benchSpawn(state){return cfg.benches[state.checkpoint]||'ambang'}
