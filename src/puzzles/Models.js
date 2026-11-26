import cfg from '../config/puzzles.json?v=z2-1' with {type:'json'};
import economy from '../config/economy.json?v=z2-1' with {type:'json'};
export const normalize=value=>String(value).normalize('NFC').trim().replace(/\s+/gu,' ').toLocaleLowerCase();
export function shuffle(values,random=Math.random){const out=[...values];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out}
export class HintLedger{
 constructor(settings,record){this.s=settings;this.record=record;record.hints??=0;record.kancilUsed??=false}
 take(free=false){if(free){if(!this.s.party.includes('kancil')||this.record.kancilUsed)return false;this.record.kancilUsed=true;return true}const cost=economy.hintCosts[this.record.hints];if(cost===undefined||this.s.kata<cost)return false;this.s.kata-=cost;this.record.hints++;return true}
 get cost(){return economy.hintCosts[this.record.hints]}
}
export class CipherModel{
 constructor(entry,{short=false}={}){this.entry=entry;this.short=short;this.plain=entry.text.toUpperCase();this.unique=[...new Set([...this.plain].filter(c=>/[A-Z]/.test(c)))];this.codes=Object.fromEntries(this.unique.map(c=>[c,cfg.CR.alphabet[(cfg.CR.alphabet.indexOf(c)+7)%cfg.CR.alphabet.length]]));this.prefill=short?this.unique.length-cfg.short.letters:Math.floor(this.unique.length*cfg.CR.prefill[entry.tier]);this.reset()}
 reset(){this.guesses=Object.fromEntries(this.unique.slice(0,this.prefill).map(c=>[this.codes[c],c]));this.blocked={};this.selectNext()}
 selectNext(){this.selected=this.unique.find(c=>this.guesses[this.codes[c]]!==c)||null}
 get solved(){return !this.selected}
 select(code){const plain=this.unique.find(c=>this.codes[c]===code);if(plain&&this.guesses[code]!==plain)this.selected=plain}
 choose(letter){if(this.solved)return {correct:true,done:true};const correct=letter===this.selected;this.guesses[this.codes[this.selected]]=letter;if(correct)this.selectNext();return {correct,done:this.solved}}
 hint(free=false){if(this.solved)return;const key=this.codes[this.selected];if(free){const wrong=[...cfg.CR.alphabet].find(c=>c!==this.selected&&!(this.blocked[key]||[]).includes(c));(this.blocked[key]??=[]).push(wrong)}else this.choose(this.selected)}
}
export class CrossingModel{
 constructor(entry,{short=false,direction='ms'}={}){this.entry=entry;this.short=short;this.direction=direction;this.reset()}
 reset(){this.progress=[];this.removed={}}
 get orders(){return this.entry.orders[this.direction].map(s=>s.split(' ').slice(0,this.short?cfg.short.rows:undefined))}
 nextWords(){return [...new Set(this.orders.filter(order=>this.progress.every((word,i)=>normalize(word)===normalize(order[i]))).map(order=>order[this.progress.length]).filter(Boolean))]}
 get done(){return this.orders.some(order=>order.length===this.progress.length&&order.every((word,i)=>normalize(word)===normalize(this.progress[i])))}
 options(row){const primary=this.orders[0][row],valid=this.orders.map(a=>a[row]).filter(Boolean),pool=[...this.entry.decoys[this.direction],...this.orders[0]].filter(w=>!valid.some(v=>normalize(v)===normalize(w)));return [...new Set([...valid,...pool])].slice(0,3).filter(w=>!(this.removed[row]||[]).includes(w))}
 land(word){const correct=this.nextWords().some(w=>normalize(w)===normalize(word));if(correct)this.progress.push(word);return {correct,done:this.done}}
 fail(){if(this.entry.tier!=='mudah')this.progress=[]}
 hint(){const row=this.progress.length,next=this.nextWords();const wrong=this.options(row).find(w=>!next.some(v=>normalize(v)===normalize(w)));if(wrong)(this.removed[row]??=[]).push(wrong);return next[0]}
}
export class CardModel{
 constructor(entry,{short=false,random=Math.random}={}){this.entry=entry;this.pairs=entry.pairs.slice(0,short?cfg.short.pairs:cfg.CM.pairs[entry.tier]);this.random=random;this.reset()}
 reset(){this.cards=shuffle(this.pairs.flatMap(pair=>[{id:pair.id+'-l',pair:pair.id,text:pair.left},{id:pair.id+'-r',pair:pair.id,text:pair.right}]),this.random);this.matched=new Set();this.open=[];this.blocked=new Set();this.busy=false}
 get done(){return this.matched.size===this.pairs.length}
 pick(index){if(this.busy||this.matched.has(this.cards[index]?.pair)||this.open.includes(index)||this.blocked.has(index))return null;this.open.push(index);if(this.open.length<2)return 'open';const [a,b]=this.open;if(this.cards[a].pair===this.cards[b].pair){this.matched.add(this.cards[a].pair);this.open=[];this.blocked.clear();return this.done?'done':'match'}this.busy=true;return 'mismatch'}
 hideMismatch(){this.open=[];this.blocked.clear();this.busy=false}
 hint(){const anchor=this.open[0]??this.cards.findIndex(c=>!this.matched.has(c.pair));if(anchor<0)return;this.open=[anchor];const wrong=this.cards.findIndex((c,i)=>i!==anchor&&c.pair!==this.cards[anchor].pair&&!this.matched.has(c.pair)&&!this.blocked.has(i));if(wrong>=0)this.blocked.add(wrong)}
}
export class DefenceModel{
 constructor(entry,{short=false}={}){this.entry=entry;this.short=short;this.path=cfg.TD.path.map(([x,y])=>({x:x*cfg.TD.width,y:y*cfg.TD.height}));this.pads=cfg.TD.pads.map(([x,y])=>({x:x*cfg.TD.width,y:y*cfg.TD.height}));this.reset()}
 reset(){this.ink=cfg.TD.ink;this.towers=[];this.balloons=[];this.queue=this.entry.words.slice(0,this.short?cfg.short.words:cfg.TD.words[this.entry.tier]).map(x=>({...x}));this.active=false;this.finished=false;this.failed=false;this.spawnTimer=0;this.leaks=0;this.popped=0}
 build(pad,type){if(!cfg.TD.classes.includes(type)||!this.pads[pad])return false;const existing=this.towers.find(t=>t.pad===pad);if(existing){this.ink+=cfg.TD.towerCost;this.towers=this.towers.filter(t=>t!==existing)}if(this.ink<cfg.TD.towerCost)return false;this.ink-=cfg.TD.towerCost;this.towers.push({pad,type,timer:0});return true}
 start(){if(!this.finished)this.active=true}
 tick(delta){if(!this.active||this.finished)return;this.spawnTimer-=delta;if(this.queue.length&&this.spawnTimer<=0){const data=this.queue.shift();this.balloons.push({...data,x:this.path[0].x,y:this.path[0].y,waypoint:1,hp:cfg.TD.health[this.entry.tier]});this.spawnTimer=cfg.TD.spawnMs}for(const b of [...this.balloons]){let remaining=cfg.TD.speed[this.entry.tier]*delta/1000;while(remaining>0&&this.path[b.waypoint]){const target=this.path[b.waypoint],dx=target.x-b.x,dy=target.y-b.y,d=Math.hypot(dx,dy);if(d<=remaining){b.x=target.x;b.y=target.y;b.waypoint++;remaining-=d}else{b.x+=dx/d*remaining;b.y+=dy/d*remaining;remaining=0}}if(!this.path[b.waypoint]){this.leaks++;this.balloons=this.balloons.filter(x=>x!==b)}}for(const tower of this.towers){tower.timer-=delta;if(tower.timer>0)continue;const pad=this.pads[tower.pad],target=this.balloons.filter(b=>b.class===tower.type&&Math.hypot(b.x-pad.x,b.y-pad.y)<=cfg.TD.range).sort((a,b)=>b.waypoint-a.waypoint)[0];if(target){target.hp--;tower.timer=cfg.TD.cooldownMs;tower.flash={x:target.x,y:target.y};if(target.hp<=0){this.popped++;this.balloons=this.balloons.filter(x=>x!==target)}}}if(!this.queue.length&&!this.balloons.length){this.finished=true;this.failed=this.leaks>0;this.active=false}}
 hint(){return this.balloons[0]||this.queue[0]}
}
