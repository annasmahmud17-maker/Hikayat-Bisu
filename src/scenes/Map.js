import * as Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import {palette as p,color} from '../theme/palette.js';
import {stringsFor} from '../systems/Strings.js';
import {Save} from '../systems/Save.js';
import economy from '../config/economy.json' with {type:'json'};
export class Map extends Phaser.Scene{
 constructor(){super('map')}
 init(data){this.returnTo=data.returnTo||'camp'}
 create(){const s=this.game.settings,t=stringsFor(s.language).campUI;this.cameras.main.setBackgroundColor(p.camp.far);this.add.rectangle(480,270,840,440,color(p.parchment)).setStrokeStyle(4,color(p.gold));this.add.text(480,100,t.mapTitle,{font:'34px serif',color:p.inkText}).setOrigin(.5);this.add.line(0,0,250,280,720,280,color(p.goldShade)).setOrigin(0);for(const [i,b] of economy.benches.entries()){const available=s.benches.discovered.includes(b.id);const label=this.add.text(300+i*350,270,t[b.id]+'\n'+(available?t.travel:t.undiscovered),{font:'22px sans-serif',color:available?p.buttonText:p.disabled,backgroundColor:p.button,align:'center',padding:{x:15,y:12}}).setOrigin(.5);if(available)label.setInteractive().on('pointerdown',()=>{s.benches.selected=b.id;Save.write(s);this.scene.start('arena')})}this.add.text(480,440,t.back,{font:'21px sans-serif',color:p.buttonText,backgroundColor:p.button,padding:{x:20,y:12}}).setOrigin(.5).setInteractive().on('pointerdown',()=>this.scene.start(this.returnTo))}
}
