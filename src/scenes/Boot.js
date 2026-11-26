import * as Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import {applyPowerMode} from '../systems/PowerMode.js?v=z2-1';
import {Save} from '../systems/Save.js?v=z2-1';
import {SpriteRenderer} from '../render/sprites.js?v=z2-1';
export class Boot extends Phaser.Scene{
 constructor(){super('boot')}
 preload(){SpriteRenderer.preload(this)}
 create(){this.game.settings=Save.load();applyPowerMode(this.game);this.game.debugEnabled=false;this.scene.launch('debug');this.scene.start('title');document.dispatchEvent(new Event('hikayat-ready'))}
}
