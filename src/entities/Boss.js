import {Enemy} from './Enemy.js';
import cfg from '../config/combat.json' with {type:'json'};
import sayings from '../../content/boss_peribahasa.json' with {type:'json'};
import {recordBoss} from '../systems/CompanionState.js';
// Reusable three-round contract; Stage 1 has ordinary enemies only.
export class Boss extends Enemy{
 constructor(scene,data){super(scene,{...data,health:cfg.boss.healthPerRound,pattern:'charge',kind:'boss',deathName:sayings.find(x=>x.id===data.peribahasaId)?.text||scene.t[data.nameKey]});this.round=1;this.node.setScale(2);this.label.setText(scene.t[data.nameKey]);this.state='intro';this.timer=cfg.boss.introMs;scene.soundFx.stop()}
 update(delta){if(this.state==='intro'){this.timer-=delta;if(this.timer<=0)this.state='patrol';return}if(this.waiting)return;this.pattern=['patrol','charge','shooter'][this.round-1];super.update(delta)}
 hit(damage,direction){if(this.waiting||this.state==='intro')return;if(this.hp-damage>0){super.hit(damage,direction);return}if(this.round<cfg.boss.rounds){this.waiting=true;this.scene.puzzleHost.kataKunci(correct=>{this.waiting=false;this.round++;this.hp=cfg.boss.healthPerRound;this.stunned=correct?cfg.boss.stunMs:0;if(!correct)this.hp=Math.ceil(this.hp*cfg.boss.buffMultiplier)})}else{recordBoss(this.scene.s,this.data.peribahasaId);this.scene.s.maxHearts+=cfg.boss.rewardHalfHearts;this.scene.s.hearts=this.scene.s.maxHearts;super.hit(damage,direction);this.scene.save()}}
}
