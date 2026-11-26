import {solveSeal} from '../systems/WorldState.js?v=z1-3';
import {el,button,theme} from '../ui/dom.js?v=z1-3';
export class PuzzleHost{
 constructor(scene){this.scene=scene}
 open(station){const scene=this.scene;if(scene.state.seals.includes(station.id))return;scene.paused=true;scene.controls.reset();const dialog=el('dialog',null,document.body,'puzzle');theme(dialog);document.body.classList.add('puzzle-open');el('h2',scene.t.tempTitle,dialog);el('p',scene.t.tempBody,dialog);const close=()=>{dialog.close();dialog.remove();scene.paused=false;document.body.classList.remove('puzzle-open')};button(dialog,scene.t.solve,()=>{solveSeal(scene.s,scene.stage.id,station.id);scene.events.emit('puzzle-solved',station.id);scene.soundFx.play('seal');scene.refreshShrines();scene.save();close()});button(dialog,scene.t.back,close);dialog.addEventListener('cancel',e=>{e.preventDefault();close()});dialog.showModal();scene.events.once('shutdown',()=>{dialog.remove();document.body.classList.remove('puzzle-open')})}
 fail(id){this.scene.events.emit('puzzle-failed',id)}
 kataKunci(callback){const scene=this.scene;scene.paused=true;const d=el('dialog',null,document.body,'puzzle');theme(d);el('h2',scene.t.tempKata,d);for(const [text,result] of [[scene.t.solve,true],[scene.t.retry,false]])button(d,text,()=>{d.close();d.remove();scene.paused=false;callback(result)});d.addEventListener('cancel',e=>e.preventDefault());d.showModal()}
}
