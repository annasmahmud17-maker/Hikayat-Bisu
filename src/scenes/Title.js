import * as Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import cfg from '../config/combat.json?v=z2-1' with {type:'json'};
import {palette as p,color} from '../theme/palette.js?v=z2-1';
import {SpriteRenderer} from '../render/sprites.js?v=z2-1';
import {stringsFor} from '../systems/Strings.js?v=z2-1';
import {Save} from '../systems/Save.js?v=z2-1';
import {panel,el,button} from '../ui/dom.js?v=z2-1';
export class Title extends Phaser.Scene{
 constructor(){super('title')}
 create(){const s=this.game.settings,t=stringsFor(s.language);this.cameras.main.setBackgroundColor(p.camp.far);this.add.rectangle(720,270,400,500,color(p.camp.mid)).setStrokeStyle(2,color(p.camp.accent));const renderer=new SpriteRenderer(this,'camp'),hero=renderer.draw(s.look,720,250,'south').setScale(4);this.add.text(720,365,t.gameTitle,{font:'30px serif',color:p.gold}).setOrigin(.5);const root=panel(this,t.gameTitle);el('p',t.titlePrompt,root);const nameLabel=el('label',t.heroName,root),input=el('input',null,nameLabel);input.value=s.heroName;input.maxLength=cfg.ui.nameMax;input.autocomplete='off';const select=(id,label,choices)=>{const field=el('label',label,root),node=el('select',null,field);for(const [value,text] of choices){const option=el('option',text,node);option.value=value}node.value=s[id];node.addEventListener('change',()=>{s[id]=node.value;Save.write(s);if(id==='look')renderer.draw(s.look,720,250,'south',0,hero);if(id==='language')this.scene.restart()});return node};select('look',t.look,['boy','girlA','girlB'].map(x=>[x,t[x]]));select('language',t.language,[['ms',t.ms],['en',t.en]]);select('difficulty',t.difficulty,['mudah','biasa','mahir'].map(x=>[x,t[x]]));input.addEventListener('input',()=>{s.heroName=input.value.slice(0,cfg.ui.nameMax);Save.write(s)});button(root,t.begin,()=>{s.heroName=input.value.trim();if(!s.heroName){input.focus();return}Save.write(s);this.scene.start('camp')})}
}
