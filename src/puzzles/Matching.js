import cfg from '../config/puzzles.json?v=z2-1' with {type:'json'};
import {CardModel} from './Models.js?v=z2-1';
import {el,button} from '../ui/dom.js?v=z2-1';
export class Matching{
 constructor(host,entry,options){this.host=host;this.scene=host.scene;this.entry=entry;this.model=new CardModel(entry,options)}
 get canHint(){return !this.model.busy&&!this.model.done}
 reset(){clearTimeout(this.timer);this.model.reset()}
 render(){const h=this.host,t=this.scene.t;el('h3',t['kind_'+this.entry.kind],h.body);el('p',t.cardHelp,h.body);const grid=el('div',null,h.body,'card-grid');this.model.cards.forEach((card,index)=>{const matched=this.model.matched.has(card.pair),visible=matched||this.model.open.includes(index),b=button(grid,visible?card.text:'◇',()=>{const outcome=this.model.pick(index);h.render();if(outcome==='done')h.succeed();if(outcome==='mismatch'){h.message(t.guardianAwake);this.timer=setTimeout(()=>{if(h.active===this)h.interruptForGuardian()},cfg.CM.mismatchMs)}});b.disabled=matched||this.model.busy||this.model.blocked.has(index);b.setAttribute('aria-label',visible?card.text:t.hiddenCard+' '+(index+1));if(matched)b.classList.add('matched')})}
 hint(){this.model.hint()}
 destroy(){clearTimeout(this.timer)}
}
