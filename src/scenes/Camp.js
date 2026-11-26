import * as Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import {palette as p,color} from '../theme/palette.js?v=z2-1';
import {stringsFor} from '../systems/Strings.js?v=z2-1';
import {Save} from '../systems/Save.js?v=z2-1';
import {selectParty,companionIds} from '../systems/CompanionState.js?v=z2-1';
import {Sound} from '../systems/Sound.js?v=z2-1';
import {SpriteRenderer} from '../render/sprites.js?v=z2-1';
import {ParticleLayer} from '../render/ParticleLayer.js?v=z2-1';
import {panel,el,button} from '../ui/dom.js?v=z2-1';
export class Camp extends Phaser.Scene{
 constructor(){super('camp')}
 create(){this.s=this.game.settings;this.t=stringsFor(this.s.language);this.cameras.main.setBackgroundColor(p.camp.far);const g=this.add.graphics();g.fillStyle(color(p.camp.mid)).fillRoundedRect(480,30,440,480,30);g.lineStyle(2,color(p.gold),.6).strokeRoundedRect(495,45,410,450,20);for(const x of [550,850]){g.fillStyle(color(p.camp.near)).fillRect(x,60,20,400);g.lineStyle(2,color(p.goldShade)).strokeRect(x+3,70,14,370)}g.fillStyle(color(p.camp.light),.15).fillCircle(715,300,125);g.fillStyle(color(p.camp.light)).fillTriangle(685,340,720,245,748,340);this.add.text(720,385,this.t.campLine,{font:'19px serif',color:p.camp.glow}).setOrigin(.5);this.renderer=new SpriteRenderer(this,'camp');this.renderer.draw(this.s.look,720,195,'south').setScale(2);this.particles=new ParticleLayer(this,'camp',960,540);this.soundFx=new Sound(this.s);this.root=panel(this,this.t.camp);this.render();this.root.addEventListener('pointerdown',()=>{this.soundFx.unlock();if(!this.soundFx.timer)this.soundFx.motif('camp')});this.events.once('shutdown',()=>{this.particles.destroy();this.soundFx.destroy();Save.write(this.s)})}
 render(){const root=this.root,t=this.t,s=this.s;root.replaceChildren();el('h1',t.camp,root);el('p',`${t.welcome} ${s.heroName} · ${t.kata} ${s.kata}`,root);el('h2',t.party,root);el('p',t.partyHelp,root);const found=companionIds.filter(id=>s.companions[id]?.found);if(!found.length){el('p',t.noCompanions,root);el('div','◇   ◇',root,'empty-slots')}for(const id of found){const b=button(root,`${s.party.includes(id)?'◆':'◇'} ${t[id]}`,()=>{selectParty(s,id);Save.write(s);this.render()});b.setAttribute('aria-pressed',s.party.includes(id))}for(let n=1;n<=5;n++){const id=`ch1_s${n}`;if(s.progress.unlocked.includes(id))button(root,t.enterStage+' · '+t[['stage_pangkal','stage_titi','stage_sungai','stage_kunang','stage_beringin'][n-1]],()=>{Save.write(s);this.scene.start('stage',{id})})}if(s.companions.kancil?.found){s.story??={};button(root,t.bondKancil,()=>{s.story.kancilBonded=true;el('p',t.kancilBond,root);Save.write(s)})}button(root,t.map,()=>this.scene.start('map',{returnTo:'camp'}));button(root,t.repository,()=>this.scene.start('repository',{returnTo:'camp'}));button(root,t.editHero,()=>this.scene.start('title'))}
 update(_,delta){this.particles?.update(delta)}
}
