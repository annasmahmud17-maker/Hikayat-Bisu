import cfg from '../config/audio.json?v=z2-1' with {type:'json'};
export class Sound{
 constructor(settings){this.settings=settings;this.context=null;this.timer=null;this.step=0}
 unlock(){try{this.context??=new(window.AudioContext||window.webkitAudioContext)();this.context.resume().catch(()=>{})}catch{}}
 tone(frequency,volume){try{if(volume<=0||!this.context||this.context.state!=='running')return;const c=this.context,o=c.createOscillator(),g=c.createGain(),now=c.currentTime;o.type='sine';o.frequency.setValueAtTime(frequency,now);o.frequency.exponentialRampToValueAtTime(frequency*cfg.tailFrequency,now+cfg.duration);g.gain.setValueAtTime(Math.max(cfg.minGain,volume*cfg.gain),now);g.gain.exponentialRampToValueAtTime(cfg.minGain,now+cfg.duration);o.connect(g).connect(c.destination);o.start(now);o.stop(now+cfg.duration)}catch{}}
 play(kind){this.unlock();this.tone(cfg.tones[kind]||cfg.tones.click,this.settings.masterVolume*this.settings.effectsVolume)}
 motif(biome){this.stop();const notes=cfg.motifs[biome]||cfg.motifs.rimba;this.timer=setInterval(()=>{if(!document.hidden)this.tone(notes[this.step++%notes.length],this.settings.masterVolume*this.settings.musicVolume)},cfg.motifStepMs)}
 stop(){clearInterval(this.timer);this.timer=null}
 destroy(){this.stop();this.context?.close().catch(()=>{})}
}
// Future real sound files belong in /audio and can replace play()/motif() here.
