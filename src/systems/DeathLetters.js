import cfg from '../config/deathLetters.json?v=z1-3' with {type:'json'};
import economy from '../config/economy.json?v=z1-3' with {type:'json'};
import {palette as p} from '../theme/palette.js?v=z1-3';
export class DeathLetters{
 constructor(scene,biome){this.scene=scene;this.biome=biome;this.pool=Array.from({length:cfg.poolSize},()=>({node:scene.add.text(0,0,'',{font:`${cfg.fontSize}px serif`,color:p[biome].glow}).setOrigin(.5).setDepth(7000).setVisible(false),active:false}))}
 burst({x,y,size,name,kind='small',collect=true}){const text=[...name.replace(/\s/gu,'')],limit=kind==='boss'||kind==='mini'?text.length:kind==='medium'?cfg.mediumLetters:cfg.smallLetters;const count=this.scene.game.settings.lowPower?Math.min(limit,cfg.lowPowerLimit):limit;for(let i=0;i<count;i++){const item=this.pool.find(x=>!x.active);if(!item)break;Object.assign(item,{active:true,age:0,x,y,baseX:x,baseY:y,angle:Math.PI*2*i/count,spread:size||cfg.spread,collect:collect&&Math.random()<cfg.collectShare});item.node.setText(text[i%text.length]||'ا').setPosition(x,y).setColor(item.collect?p[this.biome].glow:p.white).setAlpha(1).setVisible(true)}}
 update(delta,hero){for(const item of this.pool){if(!item.active)continue;item.age+=delta;const shatter=Math.min(1,item.age/cfg.shatterMs),drift=Math.max(0,(item.age-cfg.shatterMs)/cfg.driftMs);item.x=item.baseX+Math.cos(item.angle)*item.spread*shatter+Math.sin(drift*cfg.swayRate+item.angle)*cfg.sway*drift;item.y=item.baseY+Math.sin(item.angle)*item.spread*shatter-drift*cfg.rise;item.node.setPosition(item.x,item.y).setAlpha(1-drift);if(item.age>cfg.shatterMs&&item.collect&&Math.hypot(hero.x-item.x,hero.y-item.y)<cfg.collectRadius){this.scene.s.kata+=economy.letterKata;this.scene.soundFx.play('collect');this.release(item)}else if(drift>=1)this.release(item)}}
 release(item){item.active=false;item.node.setVisible(false)}
 lights(){return this.pool.filter(x=>x.active&&x.collect)}
 destroy(){this.pool.forEach(x=>x.node.destroy())}
}
