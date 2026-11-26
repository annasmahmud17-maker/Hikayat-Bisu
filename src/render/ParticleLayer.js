import atmosphere from '../config/atmosphere.json' with {type:'json'};
import cfg from '../config/combat.json' with {type:'json'};
import {palette as p,color} from '../theme/palette.js';
export class ParticleLayer{
 constructor(scene,biome,width,height){this.scene=scene;this.width=width;this.height=height;this.config=atmosphere.biomes[biome];this.items=[];this.edges=scene.add.graphics().setDepth(9000);const b=p[biome];this.edges.fillStyle(color(b.near),atmosphere.lighting.edgeOpacity);for(let i=0;i<this.config.edgeShapes;i++){const x=i*width/this.config.edgeShapes;this.edges.fillEllipse(x,12,65,42);this.edges.fillEllipse(x,height-8,85,40)}const n=scene.game.settings.lowPower?this.config.lowCount:this.config.count;for(let i=0;i<n;i++){const dot=scene.add.circle(Math.random()*width,Math.random()*height,biome==='istana'||biome==='dasar'?3:2,color(b.glow),this.config.opacity).setDepth(9001);this.items.push(dot)}}
 update(delta){for(const [i,dot] of this.items.entries()){dot.setVisible(!this.scene.game.settings.lowPower||i<this.config.lowCount);dot.y-=this.config.speed*delta/1000;dot.x+=Math.sin(this.scene.time.now/1000+dot.y)*delta/1000;if(dot.y<0)dot.y=this.height}}
 destroy(){this.edges.destroy();this.items.forEach(x=>x.destroy())}
}
