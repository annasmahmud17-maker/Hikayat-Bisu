import cfg from '../config/combat.json' with {type:'json'};
import {canOccupy,dominantAxis} from '../systems/WorldState.js';
import {palette as p,color} from '../theme/palette.js';
const vector={north:{x:0,y:-1},south:{x:0,y:1},east:{x:1,y:0},west:{x:-1,y:0}};
export class Hero{
 constructor(scene,x,y){this.scene=scene;this.x=x;this.y=y;this.facing='south';this.invincibleUntil=0;this.slashAt=-Infinity;this.dead=false;this.node=scene.renderer.draw(scene.s.look,x,y,this.facing)}
 move(dx,dy){const r=cfg.movement.bodyRadius;if(canOccupy(this.scene.room.rows,this.x+dx,this.y,r,cfg.tile))this.x+=dx;if(canOccupy(this.scene.room.rows,this.x,this.y+dy,r,cfg.tile))this.y+=dy}
 update(delta,input){if(this.dead)return;const axis=dominantAxis(input.x,input.y);if(axis.x||axis.y){this.facing=axis.x>0?'east':axis.x<0?'west':axis.y<0?'north':'south';this.move(axis.x*cfg.movement.speed*delta/1000,axis.y*cfg.movement.speed*delta/1000)}this.scene.renderer.draw(this.scene.s.look,this.x,this.y,this.facing,0,this.node);this.node.setAlpha(this.scene.time.now<this.invincibleUntil?(Math.floor(this.scene.time.now/100)%2?.35:1):1)}
 slash(){const s=this.scene,now=s.time.now;if(this.dead||now-this.slashAt<cfg.hero.slashCooldownMs)return;this.slashAt=now;s.soundFx.play('slash');const v=vector[this.facing];s.renderer.slash(this.x,this.y,this.facing);for(const enemy of [...s.enemies]){const dx=enemy.x-this.x,dy=enemy.y-this.y,d=Math.hypot(dx,dy),dot=d?(dx*v.x+dy*v.y)/d:1;if(d<cfg.hero.slashRange&&dot>Math.cos(cfg.hero.slashArc/2))enemy.hit(cfg.hero.damage,v)}s.hitBayang(v)}
 hurt(amount,from){const scene=this.scene,now=scene.time.now;if(this.dead||now<this.invincibleUntil)return;scene.s.hearts=Math.max(0,scene.s.hearts-amount);this.invincibleUntil=now+cfg.hero.hurtInvincibleMs;const d=Math.hypot(this.x-from.x,this.y-from.y)||1;this.move((this.x-from.x)/d*cfg.hero.knockback,(this.y-from.y)/d*cfg.hero.knockback);this.node.setTint(color(p.white));scene.time.delayedCall(cfg.hero.flashMs,()=>{if(this.node.active)this.node.clearTint()});scene.soundFx.play('hurt');scene.shake();if(scene.s.hearts===0){this.dead=true;scene.defeat()}}
 destroy(){this.node.destroy()}
}
