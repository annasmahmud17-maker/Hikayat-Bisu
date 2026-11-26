import {el,theme} from './dom.js';
import cfg from '../config/combat.json' with {type:'json'};
export class Hud{
 constructor(scene){this.scene=scene;this.root=el('div',null,document.getElementById('ui'),'hud');theme(this.root);this.hearts=el('div',null,this.root,'hearts');this.kata=el('span',null,this.root,'kata');this.status=el('div',null,this.root,'status');this.status.setAttribute('role','status');this.update()}
 update(){const s=this.scene.s;const signature=`${s.hearts}|${s.maxHearts}|${s.kata}`;if(signature===this.signature)return;this.signature=signature;this.hearts.replaceChildren();for(let i=0;i<s.maxHearts/2;i++){const heart=el('span','♥',this.hearts,'heart');heart.style.setProperty('--fill',Math.max(0,Math.min(2,s.hearts-i*2))/2*100+'%')}this.hearts.setAttribute('aria-label',`${this.scene.t.hearts} ${s.hearts/2}/${s.maxHearts/2}`);this.kata.textContent=`${this.scene.t.kata} ${s.kata}`}
 message(text){this.status.textContent=text;this.until=this.scene.time.now+cfg.ui.messageMs;this.scene.time.delayedCall(cfg.ui.messageMs,()=>{if(this.scene.time.now>=this.until)this.status.textContent=''})}
 destroy(){this.root.remove()}
}
