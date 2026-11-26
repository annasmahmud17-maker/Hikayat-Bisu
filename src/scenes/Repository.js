import * as Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import sayings from '../../content/boss_peribahasa.json?v=z1-3' with {type:'json'};
import {stringsFor} from '../systems/Strings.js?v=z1-3';
import {palette as p} from '../theme/palette.js?v=z1-3';
import {panel,el,button} from '../ui/dom.js?v=z1-3';
export class Repository extends Phaser.Scene{
 constructor(){super('repository')}
 init(data){this.returnTo=data.returnTo||'camp'}
 create(){const s=this.game.settings,t=stringsFor(s.language);this.cameras.main.setBackgroundColor(p.camp.far);const root=panel(this,t.repository);root.classList.add('wide');el('p',t.draft,root);for(const entry of sayings){const details=el('details',null,root);el('summary',s.repository.collected.includes(entry.id)?entry.text:t.unknownProverb,details);if(s.repository.collected.includes(entry.id)){el('p',entry.meaning[s.language],details);el('p',entry.fit[s.language],details)}}button(root,t.back,()=>this.scene.start(this.returnTo,this.returnTo==='stage'?{id:s.progress.current}:{}))}
}
