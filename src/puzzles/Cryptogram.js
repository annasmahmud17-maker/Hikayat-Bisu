import cfg from '../config/puzzles.json?v=z2-1' with {type:'json'};
import combat from '../config/combat.json?v=z2-1' with {type:'json'};
import {CipherModel} from './Models.js?v=z2-1';
import {el,button} from '../ui/dom.js?v=z2-1';
import {palette as p,color} from '../theme/palette.js?v=z2-1';
export class Cryptogram{
 constructor(host,entry,options){this.host=host;this.scene=host.scene;this.entry=entry;this.options=options;this.model=new CipherModel(entry,options);this.objects=[];this.originalRows=[...this.scene.room.rows]}
 begin(){if(!this.options.short)this.resetWorld()}
 get canHint(){return !this.model.solved}
 resetWorld(){this.restore();this.pushed=false;this.pitNode=null;this.pillarNode=null;const [x,y]=this.scene.tilePos(cfg.CR.start);Object.assign(this.scene.hero,{x,y});this.scene.hero.update(0,{x:0,y:0})}
 reset(){this.model.reset();if(!this.options.short)this.resetWorld()}
 render(){const h=this.host,m=this.model,t=this.scene.t;el('p',this.entry.meaning[this.scene.s.language],h.body);if(m.solved){el('p',t.pushInstruction,h.body);return}el('p',t.cipherHelp,h.body);const cells=el('div',null,h.body,'cipher-cells');for(const ch of [...m.plain]){if(ch===' '){el('span',' ',cells,'cipher-space');continue}const code=m.codes[ch],guess=m.guesses[code],b=button(cells,(guess||'＿')+'\n'+code,()=>{m.select(code);h.render()});b.disabled=guess===ch;b.setAttribute('aria-pressed',m.selected===ch)}const keys=el('div',null,h.body,'letter-keys');const blocked=m.blocked[m.codes[m.selected]]||[];for(const letter of [...cfg.CR.alphabet])if(!blocked.includes(letter))button(keys,letter,()=>{const result=m.choose(letter);if(!result.correct){if(h.wrong())return}else if(result.done){if(this.options.short){h.succeed();return}this.reveal()}h.render()})}
 reveal(){if(this.pitNode||this.options.short)return;const [x,y]=this.scene.tilePos(cfg.CR.pit),[px,py]=this.scene.tilePos(cfg.CR.pillar);this.pitNode=this.scene.add.rectangle(x,y,combat.tile,combat.tile,color(p.silence)).setStrokeStyle(2,color(p.rimba.accent)).setDepth(y);this.pillarNode=this.scene.add.rectangle(px,py,combat.tile*.7,combat.tile*.7,color(p.rimba.far)).setStrokeStyle(3,color(p.rimba.glow)).setDepth(py);this.objects.push(this.pitNode,this.pillarNode);this.setTile(cfg.CR.pit,'~');this.setTile(cfg.CR.pillar,'#')}
 setTile([x,y],ch){const row=[...this.scene.room.rows[y]];row[x]=ch;this.scene.room.rows[y]=row.join('')}
 act(){if(!this.model.solved)return false;const hero=this.scene.hero,[x,y]=this.scene.tilePos(cfg.CR.pillar);if(!this.pushed&&Math.hypot(hero.x-x,hero.y-y)<cfg.CR.pushRadius&&hero.y>y&&hero.facing==='north'){this.pushed=true;this.setTile(cfg.CR.pillar,'.');this.setTile(cfg.CR.pit,'.');const [tx,ty]=this.scene.tilePos(cfg.CR.pit);this.pillarNode.setPosition(tx,ty).setDepth(ty).setFillStyle(color(p.rimba.mid));this.host.message(this.scene.t.crossBridge);return true}return false}
 update(){if(this.pushed){const [x,y]=this.scene.tilePos(cfg.CR.pit);if(Math.hypot(this.scene.hero.x-x,this.scene.hero.y-y)<combat.tile/2)this.host.succeed()}}
 hint(free){this.model.hint(free);if(this.model.solved){if(this.options.short)this.host.succeed();else this.reveal()}}
 restore(){this.scene.room.rows=[...this.originalRows];for(const object of this.objects)object.destroy();this.objects=[]}
 destroy(){this.restore()}
}
