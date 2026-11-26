import cfg from '../config/foundation.json?v=z2-1' with {type:'json'};
export function stageState(s,id){return s.progress.stages[id]??={room:'r1',visited:[],seals:[],pondok:{room:'r1',x:2,y:5},shortcuts:[],chests:[],bossRounds:{},puzzles:{},puzzleRevision:2}}
export function solveSeal(s,id,puzzle){const state=stageState(s,id);if(!state.seals.includes(puzzle))state.seals.push(puzzle);return state.seals.length}
export function gateOpen(s,id){return stageState(s,id).seals.length===cfg.sealsPerStage}
export function clearStage(s,id){if(!gateOpen(s,id))return false;if(!s.progress.cleared.includes(id))s.progress.cleared.push(id);const match=/ch(\d)_s(\d+)/.exec(id),c=+match[1],n=+match[2];const next=n<cfg.stagesPerChapter?`ch${c}_s${n+1}`:c<cfg.chapters?`ch${c+1}_s1`:null;if(next&&!s.progress.unlocked.includes(next))s.progress.unlocked.push(next);return true}
export function dominantAxis(x,y){if(Math.abs(x)>=Math.abs(y))return {x:Math.sign(x),y:0};return {x:0,y:Math.sign(y)}}
export function canOccupy(rows,x,y,radius,tile){for(const [dx,dy] of [[-radius,-radius],[radius,-radius],[-radius,radius],[radius,radius]]){const ch=rows[Math.floor((y+dy)/tile)]?.[Math.floor((x+dx)/tile)];if(!ch||ch==='#'||ch==='~')return false}return true}
