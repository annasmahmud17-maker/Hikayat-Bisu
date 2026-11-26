import cfg from '../config/puzzles.json?v=z2-1' with {type:'json'};
import combat from '../config/combat.json?v=z2-1' with {type:'json'};
import {solveSeal} from '../systems/WorldState.js?v=z2-1';
import {Save} from '../systems/Save.js?v=z2-1';
import {HintLedger} from './Models.js?v=z2-1';
import {Cryptogram} from './Cryptogram.js?v=z2-1';
import {Crossing} from './Crossing.js?v=z2-1';
import {Matching} from './Matching.js?v=z2-1';
import {Defence} from './Defence.js?v=z2-1';
import {el,button,theme} from '../ui/dom.js?v=z2-1';
const engines={CR:Cryptogram,RV:Crossing,CM:Matching,TD:Defence};
export class PuzzleHost{
 constructor(scene){this.scene=scene;this.active=null;this.worldActive=false;this.guardian=null}
 open(station){if(this.active||this.scene.hero.dead)return;const puzzle=this.scene.stage.puzzles.find(p=>p.id===station.id);if(!puzzle||this.scene.state.seals.includes(puzzle.id))return;const record=this.scene.state.puzzles[puzzle.id]??={hints:0,kancilUsed:false};this.start(this.content.get(puzzle,this.scene.s.difficulty),record,{puzzle})}
 start(entry,record,options={}){this.options=options;this.entry=entry;this.record=record;this.ledger=new HintLedger(this.scene.s,record);this.worldActive=!options.short&&['CR','RV'].includes(entry.style);this.scene.controls.reset();this.scene.paused=!this.worldActive;this.scene.hero.invincibleUntil=Infinity;this.active=new engines[entry.style](this,entry,options);this.mount();this.active.begin?.();this.render();if(this.scene.stage.stage===1&&!options.short)this.message(this.scene.t['tutorial'+entry.style]);this.scene.save()}
 mount(){const s=this.scene,t=s.t;this.panel=el(this.worldActive?'section':'dialog',null,document.getElementById('ui'),this.worldActive?'world-dock':'puzzle engine-dialog');theme(this.panel);this.panel.setAttribute('aria-label',t['puzzle'+this.entry.style]);const head=el('header',null,this.panel);el('h2',(this.options.short?t.kataKunci+' · ':'')+t['puzzle'+this.entry.style],head);button(head,t.close,()=>this.cancel());this.body=el('div',null,this.panel,'engine-body');this.status=el('p',null,this.panel,'engine-status');this.status.setAttribute('role','status');const foot=el('footer',null,this.panel);this.freeButton=button(foot,t.kancilHint,()=>this.hint(true));this.paidButton=button(foot,t.hint,()=>this.hint());this.resetButton=button(foot,t.resetPuzzle,()=>{this.active.reset();this.render()});this.active.render();this.updateHints();if(!this.worldActive){s.controls.root.hidden=true;document.body.classList.add('puzzle-open');this.panel.addEventListener('cancel',event=>{event.preventDefault();this.cancel()});this.panel.showModal()}}
 render(){if(!this.active||!this.panel)return;this.body.replaceChildren();this.active.render();this.updateHints()}
 updateHints(){if(!this.ledger)return;const t=this.scene.t;this.freeButton.disabled=!this.scene.s.party.includes('kancil')||this.record.kancilUsed||this.active.canHint===false;this.paidButton.disabled=this.ledger.cost===undefined||this.scene.s.kata<(this.ledger.cost??0)||this.active.canHint===false;this.resetButton.disabled=Boolean(this.active.model?.busy);this.paidButton.textContent=t.hint+(this.ledger.cost===undefined?'':` · ${this.ledger.cost} ${t.kata}`)}
 hint(free=false){if(!this.active||this.active.canHint===false)return;if(!this.ledger.take(free)){this.message(this.scene.t.noHint);return}this.active.hint(free);this.message(free?this.scene.t.wrongRemoved:this.entry.hint);this.render();this.scene.save()}
 message(text){if(this.status)this.status.textContent=text}
 penalty(){this.scene.soundFx.play('hurt');this.scene.s.hearts=Math.max(cfg.minimumHearts,this.scene.s.hearts-cfg.minorDamage);this.scene.hud.update();this.scene.events.emit('puzzle-failed',this.options.puzzle?.id);this.scene.save()}
 wrong(){if(this.options.short){this.finish(false);return true}this.penalty();this.message(this.scene.t.puzzleWrong);return false}
 succeed(){if(!this.active||this.completing)return;this.completing=true;const note=this.entry['note_'+this.scene.s.language];if(this.options.short){this.finish(true);return}solveSeal(this.scene.s,this.scene.stage.id,this.options.puzzle.id);this.scene.state.puzzles[this.options.puzzle.id].solved=true;this.scene.events.emit('puzzle-solved',this.options.puzzle.id);this.scene.soundFx.play('seal');this.scene.refreshShrines();this.scene.save();this.closeActive();this.showNote(note)}
 showNote(note){const d=el('dialog',null,document.getElementById('ui'),'puzzle');theme(d);document.body.classList.add('puzzle-open');this.scene.paused=true;this.scene.controls.root.hidden=true;el('h2',this.scene.t.pageRestored,d);el('p',note,d);const close=()=>{d.close();d.remove();document.body.classList.remove('puzzle-open');this.scene.paused=false;this.scene.controls.root.hidden=false;this.scene.onPuzzleComplete?.()};button(d,this.scene.t.continue,close);d.addEventListener('cancel',e=>{e.preventDefault();close()});this.noteDialog=d;d.showModal()}
 closePanel(){if(this.panel){if(this.panel.tagName==='DIALOG')this.panel.close();this.panel.remove();this.panel=null}document.body.classList.remove('puzzle-open');this.scene.controls.root.hidden=false}
 closeActive(){this.guardian=null;this.active?.destroy();this.active=null;this.worldActive=false;this.closePanel();this.scene.hero.invincibleUntil=this.scene.time.now+combat.hero.respawnSafeMs;this.scene.paused=false;this.completing=false;this.scene.save()}
 cancel(force=false){if(!force&&this.active instanceof Matching&&this.active.model.busy&&!this.guardian){clearTimeout(this.active.timer);this.interruptForGuardian();return}if(this.options?.short){this.finish(false);return}this.closeActive()}
 finish(correct){const callback=this.options.onResult;this.closeActive();callback?.(correct)}
 kataKunci(callback,style='CR'){if(this.active)return;const record=this.scene.state.puzzles['boss-'+this.scene.state.bossRound]??={hints:0,kancilUsed:false};this.start(this.content.short(style,this.scene.s.difficulty),record,{short:true,onResult:callback})}
 interruptForGuardian(){if(this.options.short){this.finish(false);return}this.closePanel();this.scene.paused=false;this.scene.hero.invincibleUntil=this.scene.time.now+combat.hero.respawnSafeMs;this.guardian=this.scene.spawnPuzzleGuardian();this.scene.hud.message(this.scene.t.guardianAwake)}
 updateGuardian(){if(!this.guardian||!this.active)return;if(this.guardian.hp<=0){this.guardian=null;this.scene.paused=true;this.scene.hero.invincibleUntil=Infinity;this.active.model.hideMismatch();this.mount()}}
 updateWorld(delta,input){this.active?.update?.(delta,input)}
 act(){return this.worldActive&&this.active?.act?.()}
 destroy(){this.noteDialog?.remove();this.active?.destroy();this.active=null;this.closePanel();this.guardian=null}
}
