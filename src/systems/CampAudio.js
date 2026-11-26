import economy from '../config/economy.json' with {type:'json'};
export class CampAudio{
 constructor(settings){this.settings=settings;this.context=null;this.timer=null;this.step=0}
 start(){if(this.timer)return;try{this.context??=new (window.AudioContext||window.webkitAudioContext)();this.context.resume();this.timer=setInterval(()=>this.note(),economy.camp.lullabyStepMs);this.note()}catch{}}
 note(){if(!this.context||this.context.state!=='running')return;const frequency=economy.camp.lullabyNotes[this.step++%economy.camp.lullabyNotes.length],now=this.context.currentTime,osc=this.context.createOscillator(),gain=this.context.createGain();osc.type='sine';osc.frequency.setValueAtTime(frequency,now);gain.gain.setValueAtTime(Math.max(.001,this.settings.masterVolume*this.settings.musicVolume*.025),now);gain.gain.exponentialRampToValueAtTime(.001,now+.65);osc.connect(gain).connect(this.context.destination);osc.start(now);osc.stop(now+.7)}
 stop(){clearInterval(this.timer);this.timer=null;this.context?.suspend().catch(()=>{})}
}
