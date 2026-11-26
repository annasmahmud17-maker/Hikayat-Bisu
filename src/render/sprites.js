import cfg from '../config/sprites.json?v=z2-1' with {type:'json'};
import combat from '../config/combat.json?v=z2-1' with {type:'json'};
import {tilesFor} from '../theme/palette.js?v=z2-1';
import {palette as p,color} from '../theme/palette.js?v=z2-1';
const vectors={north:[0,-1],south:[0,1],east:[1,0],west:[-1,0]};
export class SpriteRenderer{
 constructor(scene,biome='rimba'){this.scene=scene;this.biome=biome}
 static preload(scene){for(const [key,entry] of Object.entries(cfg.keys))if(entry.type==='sheet'&&entry.path)scene.load.spritesheet(key,entry.path,{frameWidth:entry.frameWidth,frameHeight:entry.frameHeight})}
 texture(key,facing='south'){
  const entry=cfg.keys[key]||cfg.keys.daun;if(entry.type==='sheet')return key;
  const texture=`shape-${this.biome}-${key}-${facing}`;if(this.scene.textures.exists(texture))return texture;
  const size=cfg.frameSize,g=this.scene.make.graphics({x:0,y:0},false),cx=size/2,cy=size/2,b=p[this.biome]||p.rimba;
  g.lineStyle(cfg.rimWidth,color(b.near));
  if(p.hero[key]){const h=p.hero[key],w=cfg.heroSize;g.fillStyle(color(h.cloth)).fillRoundedRect(cx-w/2,cy-w/2,w,w,9);g.lineStyle(cfg.rimWidth,color(h.rim)).strokeRoundedRect(cx-w/2,cy-w/2,w,w,9);g.fillStyle(color(h.shade)).fillRoundedRect(cx,cy-w/2,w/2,w,6);g.fillStyle(color(p.gold)).fillRect(cx-w/2,cy+3,w,4);g.fillStyle(color(key==='boy'?h.cloth:key==='girlA'?h.rim:p.hair));if(key==='boy')g.fillTriangle(cx-8,cy-13,cx+10,cy-13,cx+4,cy-23);else if(key==='girlA')g.fillTriangle(cx-13,cy-13,cx+13,cy-13,cx,cy-25);else g.fillEllipse(cx-10,cy-13,10,18);const [dx,dy]=vectors[facing];g.fillStyle(color(p.blade)).fillCircle(cx+dx*13,cy+dy*13,3)}
  else if(p.companions[key]){g.fillStyle(color(p.companions[key].body)).fillCircle(cx,cy,cfg.companionSize/2);g.lineStyle(cfg.rimWidth,color(p.gold)).strokeCircle(cx,cy,cfg.companionSize/2)}
  else if(key==='shrine'||key==='pondok'||key==='chest'){g.fillStyle(color(b.accent),.2).fillCircle(cx,cy,22);g.fillStyle(color(key==='pondok'?p.gold:b.accent)).fillTriangle(cx,cy-15,cx+14,cy,cx,cy+15);g.fillTriangle(cx,cy-15,cx-14,cy,cx,cy+15);g.lineStyle(cfg.rimWidth,color(b.glow)).lineBetween(cx-5,cy,cx+5,cy)}
  else if(key==='gate'||key==='tablet'||key==='shortcut'){g.fillStyle(color(b.far)).fillRoundedRect(8,5,32,38,3);g.lineStyle(cfg.rimWidth,color(b.accent)).strokeRoundedRect(8,5,32,38,3);g.lineBetween(16,18,32,18);g.lineBetween(16,27,30,27)}
  else if(key==='bayang'){g.fillStyle(color(p.bayang)).fillRoundedRect(8,8,32,32,10);g.lineStyle(cfg.rimWidth,color(p.blank)).strokeRoundedRect(8,8,32,32,10)}
  else if(key==='tile'){g.fillStyle(color(b.mid)).fillRect(0,0,size,size)}
  else{g.fillStyle(color(p.enemy)).fillEllipse(cx,cy,cfg.enemySize,cfg.enemySize*.85);g.lineStyle(cfg.rimWidth,color(b.far)).strokeEllipse(cx,cy,cfg.enemySize,cfg.enemySize*.85);g.fillStyle(color(b.near)).fillCircle(cx+7,cy-4,3)}
  g.generateTexture(texture,size,size);g.destroy();return texture;
 }
 draw(key,x,y,facing='south',frame=0,existing=null){const config=cfg.keys[key]||cfg.keys.daun,texture=this.texture(key,facing);const node=existing||this.scene.add.sprite(x,y,texture);node.setPosition(x,y).setTexture(texture,config.type==='sheet'?frame:undefined).setDepth(y);if(config.type==='sheet'){const definition=config.animations[facing],anim=`${key}-${facing}`;if(definition){if(!this.scene.anims.exists(anim))this.scene.anims.create({key:anim,frames:this.scene.anims.generateFrameNumbers(key,{frames:definition.frames}),frameRate:definition.frameRate,repeat:definition.repeat});node.play(anim,true)}}return node}
 tiles(rows,tile){const b=p[this.biome],colors=tilesFor(this.biome),nodes=[];if(cfg.keys.tile.type==='sheet'){for(const [y,row] of rows.entries())for(const [x,ch] of [...row].entries()){const node=this.draw('tile',(x+.5)*tile,(y+.5)*tile,'south',cfg.tileFrames[ch==='#'?'wall':ch==='~'?'water':'floor']);node.setDepth(-1);nodes.push(node)}return nodes}const g=this.scene.add.graphics().setDepth(-1);for(const [y,row] of rows.entries())for(const [x,ch] of [...row].entries()){let fill=color(ch==='#'?colors.wall:ch==='~'?colors.water:colors.floor);if(ch==='.'&&(x+y)%2){const hex=colors.floor.slice(1);const channels=[0,2,4].map(i=>Math.min(255,Math.round(parseInt(hex.slice(i,i+2),16)*(1+cfg.checkerLift))));fill=(channels[0]<<16)|(channels[1]<<8)|channels[2]}g.fillStyle(fill).fillRect(x*tile,y*tile,tile,tile);if(ch==='#')g.fillStyle(color(colors.wallTop)).fillRect(x*tile,y*tile,tile,4);if(ch==='~')g.lineStyle(1,color(b.light),.2).lineBetween(x*tile+tile*.2,y*tile+tile/2,x*tile+tile*.8,y*tile+tile/2)}nodes.push(g);return nodes}
 slash(x,y,facing){const [dx,dy]=vectors[facing],theta=Math.atan2(dy,dx),g=this.scene.add.graphics().setDepth(y+1),style=cfg.slash;g.lineStyle(style.trailWidth,color(p.bayang),style.trailAlpha);g.beginPath();g.arc(x,y,combat.hero.slashRange-style.trailOffset,theta-combat.hero.slashArc/2,theta+combat.hero.slashArc/2);g.strokePath();g.lineStyle(style.width,color(p.blade),style.alpha);g.beginPath();g.arc(x,y,combat.hero.slashRange,theta-combat.hero.slashArc/2,theta+combat.hero.slashArc/2);g.strokePath();this.scene.tweens.add({targets:g,alpha:0,duration:combat.hero.slashDurationMs,onComplete:()=>g.destroy()})}
 label(node,text,large=false){const label=this.scene.add.text(node.x,node.y,text,{font:`${large?22:15}px serif`,color:p.blank,align:'center'}).setOrigin(.5).setDepth(node.depth+1);return label}
}
// Gameplay uses this single entry point; only sprites.json changes when sheets arrive.
export function draw(renderer,key,x,y,facing='south',frame=0,existing=null){return renderer.draw(key,x,y,facing,frame,existing)}
