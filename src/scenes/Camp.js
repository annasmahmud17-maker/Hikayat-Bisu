import * as Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import {palette as p,color} from '../theme/palette.js?v=17';
import {stringsFor} from '../systems/Strings.js?v=17';
import foundation from '../config/foundation.json?v=17' with {type:'json'};
export class Camp extends Phaser.Scene{
  constructor(){super('camp')}
  create(){const t=stringsFor(this.game.settings.language);this.cameras.main.setBackgroundColor(p.camp.far);this.add.rectangle(480,270,870,460,color(p.camp.mid)).setStrokeStyle(3,color(p.gold));this.add.text(480,140,t.camp,{font:'40px serif',color:p.buttonText}).setOrigin(.5);this.add.text(480,240,`${t.welcome}, ${this.game.settings.heroName}`,{font:'26px sans-serif',color:p.parchment}).setOrigin(.5);this.add.text(480,300,t.campPlaceholder,{font:'18px sans-serif',color:p.parchment}).setOrigin(.5);const button=(x,label,fn)=>this.add.text(x,foundation.campButtonY,label,{font:'22px sans-serif',backgroundColor:p.button,color:p.buttonText,padding:{x:18,y:12}}).setOrigin(.5).setInteractive({useHandCursor:true}).on('pointerdown',fn);button(200,t.editHero,()=>this.scene.start('title'));button(480,t.testArena,()=>this.scene.start('arena'));button(760,t.puzzleRoom,()=>this.scene.start('puzzle-room'))}
}
