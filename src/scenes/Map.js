import * as Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import catalog from '../../content/stage_catalog.json' with {type:'json'};
import {stringsFor} from '../systems/Strings.js';
import {palette as p} from '../theme/palette.js';
import {panel,el,button} from '../ui/dom.js';
import {Save} from '../systems/Save.js';
export class Map extends Phaser.Scene{
 constructor(){super('map')}
 init(data){this.returnTo=data.returnTo||'camp'}
 create(){const s=this.game.settings,t=stringsFor(s.language);this.cameras.main.setBackgroundColor(p.camp.near);const root=panel(this,t.map);root.classList.add('wide');el('p',t.mapHelp,root);for(let chapter=1;chapter<=4;chapter++){el('h2',`${t.chapter} ${chapter}`,root);const row=el('div',null,root,'stage-grid');for(const entry of catalog.filter(x=>x.chapter===chapter)){const unlocked=s.progress.unlocked.includes(entry.id),cleared=s.progress.cleared.includes(entry.id);const b=button(row,`${entry.stage} ${cleared?'◆':unlocked?'◇':'·'}`,()=>{if(entry.implemented)this.scene.start('stage',{id:entry.id})});b.disabled=!unlocked||!entry.implemented;b.title=entry.implemented?t.enterStage:t.futureStage;b.setAttribute('aria-label',`${t.chapter} ${chapter} ${t.stage} ${entry.stage} ${unlocked?t.unlocked:t.locked}`)}}const current=s.progress.stages[s.progress.current];if(current){el('h2',t.roomMap,root);const rooms=el('div',null,root,'room-map');for(let n=1;n<=5;n++){const visited=current.visited.includes(`r${n}`),node=el('span',visited?t[`room${n}`]:'?',rooms,visited?'visited':'');node.title=visited?t.explored:t.unexplored}el('h2',t.travel,root);for(const [id,state] of Object.entries(s.progress.stages)){const available=catalog.find(x=>x.id===id)?.implemented;if(available&&(s.progress.cleared.includes(id)||id===s.progress.current))button(root,`${id} · ${t.pondok}`,()=>{s.progress.current=id;Save.write(s);this.scene.start('stage',{id})})}}button(root,t.back,()=>this.scene.start(this.returnTo,this.returnTo==='stage'?{id:s.progress.current}:{}))}
}
