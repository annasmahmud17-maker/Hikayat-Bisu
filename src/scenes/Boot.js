import * as Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import {Save} from '../systems/Save.js';
import {heroFrames} from '../entities/HeroArt.js';
import {palette as p} from '../theme/palette.js';
export class Boot extends Phaser.Scene{
  constructor(){super('boot')}
  create(){this.game.settings=Save.load();for(const look of Object.keys(p.hero))heroFrames(this,look,this.game.settings.skin);this.game.debugEnabled=false;this.scene.launch('debug');this.scene.start('title');document.dispatchEvent(new Event('hikayat-ready'))}
}
