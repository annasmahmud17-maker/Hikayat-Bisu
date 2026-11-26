import * as Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import {stringsFor} from '../systems/Strings.js?v=z1-3';
import {findCompanion,recordBoss,companionIds} from '../systems/CompanionState.js?v=z1-3';
import {Save} from '../systems/Save.js?v=z1-3';
import {el,button,theme} from '../ui/dom.js?v=z1-3';
import cfg from '../config/combat.json?v=z1-3' with {type:'json'};
import sayings from '../../content/boss_peribahasa.json?v=z1-3' with {type:'json'};
export class Debug extends Phaser.Scene{
 constructor(){super('debug')}
 create(){
  this.fpsFrames=0;this.fpsStamp=performance.now();this.measuredFps=0;this.pointers=new Set();
  this.root=el('section',null,document.getElementById('ui'),'debug-panel');theme(this.root);this.root.hidden=true;
  this.toggle=el('button','⋮',document.getElementById('ui'),'debug-toggle');
  this.toggle.setAttribute('aria-label',stringsFor(this.game.settings.language).debug);
  this.toggle.addEventListener('click',()=>this.render());
  this.down=event=>{this.pointers.add(event.pointerId);if(this.pointers.size===3&&!this.latched){this.latched=true;this.render()}};
  this.up=event=>{this.pointers.delete(event.pointerId);if(!this.pointers.size)this.latched=false};
  document.addEventListener('pointerdown',this.down);document.addEventListener('pointerup',this.up);document.addEventListener('pointercancel',this.up);
  this.events.once('shutdown',()=>{this.hide();this.root.remove();this.toggle.remove();document.removeEventListener('pointerdown',this.down);document.removeEventListener('pointerup',this.up);document.removeEventListener('pointercancel',this.up)})
 }
 hide(){this.root.hidden=true;if(this.activeStage)this.activeStage.paused=this.wasPaused;this.activeStage=null}
 render(){
  if(!this.root.hidden){this.hide();return}
  this.root.hidden=false;
  const s=this.game.settings,t=stringsFor(s.language),stage=this.scene.get('stage');
  if(this.scene.isActive('stage')&&stage.stage){this.activeStage=stage;this.wasPaused=stage.paused;stage.paused=true;stage.controls.reset()}
  this.root.replaceChildren();el('h2',t.debug,this.root);this.stats=el('p',null,this.root);button(this.root,t.close,()=>this.hide());
  for(const id of companionIds)button(this.root,t.find+' '+t[id],()=>{findCompanion(s,id);Save.write(s);if(this.scene.isActive('camp'))this.scene.get('camp').render()});
  button(this.root,t.debugKata,()=>{s.kata+=cfg.ui.debugKata;Save.write(s)});
  button(this.root,t.debugArrow,()=>{s.abilities.inkArrow=!s.abilities.inkArrow;Save.write(s)});
  button(this.root,t.debugAd,()=>{s.purchases.adFree=!s.purchases.adFree;Save.write(s)});
  for(const entry of sayings)button(this.root,entry.boss,()=>{recordBoss(s,entry.id);Save.write(s)});
  if(!this.activeStage)return;
  for(const room of stage.stage.rooms)button(this.root,t[room.nameKey],()=>{stage.enterRoom(room.id,room.entrance);this.hide()});
  for(const room of stage.stage.rooms)button(this.root,t.debugShrine+' '+t[room.nameKey],()=>{stage.enterRoom(room.id,room.shrines[0].tile);this.hide()});
  button(this.root,t.debugExit,()=>{const room=stage.stage.rooms.find(r=>r.exit);stage.enterRoom(room.id,room.exit.tile);this.hide()});
  button(this.root,t.debugHurt,()=>{stage.hero.invincibleUntil=0;stage.hero.hurt(s.maxHearts,{x:stage.hero.x-1,y:stage.hero.y});this.hide()});
  button(this.root,t.debugShooter,()=>{const enemy=stage.enemies.find(x=>x.hp>0);if(enemy)enemy.pattern='shooter';this.hide()});
  button(this.root,t.debugEnemy,()=>{const enemy=stage.enemies.find(x=>x.hp>0);if(enemy){enemy.x=stage.hero.x+30;enemy.y=stage.hero.y;enemy.home={x:enemy.x,y:enemy.y};stage.hero.facing='east';enemy.timer=cfg.enemy.cooldownMs}this.hide()});
  button(this.root,t.debugBoss,()=>{stage.debugSpawnBoss();this.hide()});
 }
 update(){this.fpsFrames++;const now=performance.now();if(now-this.fpsStamp>=1000){this.measuredFps=this.fpsFrames*1000/(now-this.fpsStamp);this.fpsStamp=now;this.fpsFrames=0}if(!this.root.hidden)this.stats.textContent=`${Math.round(this.measuredFps)} FPS · ${this.game.settings.lowPower?cfg.lowFps:cfg.fps} cap · ${this.pointers.size} · ${this.game.scene.getScenes(true).map(x=>x.scene.key).join(', ')}`}
}
