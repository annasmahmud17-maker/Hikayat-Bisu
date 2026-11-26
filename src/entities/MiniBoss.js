import {Enemy} from './Enemy.js?v=z2-1';
import cfg from '../config/combat.json?v=z2-1' with {type:'json'};
export class MiniBoss extends Enemy{
 constructor(scene,data){super(scene,{...data,health:cfg.miniBoss.health,kind:'mini'});this.patternClock=0;this.node.setScale(1.5)}
 update(delta){this.patternClock+=delta;this.pattern=Math.floor(this.patternClock/cfg.miniBoss.patternSwapMs)%2?'shooter':'charge';super.update(delta)}
}
