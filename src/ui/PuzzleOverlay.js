import cfg from '../config/puzzles.json?v=18' with {type:'json'};
import {palette} from '../theme/palette.js?v=18';
import {PuzzleSession,accepts,normalize,shuffle} from '../systems/PuzzleContent.js?v=18';
import {stringsFor} from '../systems/Strings.js?v=18';
import {Save} from '../systems/Save.js?v=18';
export function themeElement(element){for(const [key,value] of Object.entries(palette))if(typeof value==='string')element.style.setProperty('--'+key,value);element.style.setProperty('--target',cfg.minTarget+'px');element.style.setProperty('--transition',cfg.transitionMs+'ms');element.style.setProperty('--dim-opacity',cfg.dimOpacity)}
export function el(tag,text,parent,cls){const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(cls)node.className=cls;if(parent)parent.append(node);return node}
export function button(parent,text,fn){const b=el('button',text,parent);b.type='button';b.addEventListener('click',fn);return b}
export class PuzzleOverlay{
 constructor(scene,banks){this.scene=scene;this.banks=banks;this.t=stringsFor(scene.game.settings.language).puzzle}
 async open(variant,options={}){
  if(this.active)return false;
  const model=this.banks.make(variant,options.tier||this.scene.game.settings.difficulty,options);if(model.stub)return false;
  this.active=true;this.model=model;this.options=options;this.step=0;this.removed=new Set();this.picked=[];this.completed=new Set();this.assignments=new Map();this.result=null;this.message='';this.selected=null;this.detected=false;this.forbiddenPairs=new Set();this.disabledWords=new Set();
  const scene=this.scene;this.wallet=options.wallet||{get hp(){return scene.hero.hp},set hp(value){scene.hero.hp=value},get kata(){return scene.kata},set kata(value){scene.kata=value}};
  this.session=new PuzzleSession(model,this.wallet,{kancil:Boolean(options.kancil??scene.game.settings.party?.includes('kancil')),freeHintLimit:1+(scene.game.settings.companionEffects?.kancilHintBarrage||0)});
  this.inputEnabled=scene.input.enabled;this.physicsPaused=scene.physics?.world.isPaused;this.scenePaused=scene.scene.isPaused();this.focusBefore=document.activeElement;
  if(scene.controls){scene.controls.stick.axis=0;scene.controls.stick.vertical=0;scene.controls.stick.active=null;scene.controls.pressed={};scene.controls.pointerButtons.clear();scene.controls.drawStick()}
  scene.input.keyboard?.resetKeys();scene.input.enabled=false;scene.physics?.world.pause();if(!this.scenePaused)scene.scene.manager.pause(scene.scene.key);
  this.dialog=el('dialog',undefined,document.body,'puzzle-dialog');themeElement(this.dialog);this.dialog.setAttribute('aria-labelledby','puzzle-title');this.dialog.addEventListener('cancel',e=>{e.preventDefault();this.close(this.result?true:null)});this.dialog.addEventListener('pointerdown',e=>e.stopPropagation());
  this.dialog.showModal();this.render();this.dialog.classList.add('visible');this.dialog.querySelector('button')?.focus();
  this.shutdown=()=>this.close(null,true);scene.events.once('shutdown',this.shutdown);return true;
 }
 persist(){this.options.onChange?.(this.wallet);if(this.scene.settings&&this.scene.save)this.scene.save();else Save.write(this.scene.game.settings)}
 label(value){return this.model.classOptions?this.t.classes[value]:value}
 announce(text){this.message=text;this.status.textContent=text;this.stats.textContent=`${this.t.health} ${this.wallet.hp} · ${this.t.kata} ${this.wallet.kata}`;this.persist()}
 render(){
  const m=this.model,t=this.t;this.dialog.replaceChildren();
  const head=el('header',undefined,this.dialog);el('h2',(m.boss?t.bossTitle+' · ':'')+t.titles[m.variant],head).id='puzzle-title';button(head,t.close,()=>this.close(this.result?true:null));
  el('p',t.draft,this.dialog,'puzzle-draft');this.stats=el('p',`${t.health} ${this.wallet.hp} · ${t.kata} ${this.wallet.kata}`,this.dialog,'puzzle-stats');
  const body=el('section',undefined,this.dialog,'puzzle-body');
  const instructions={order:'order',sort:'sort',pairs:'pair',choice:'choose',chain:'choose',word:'tapWord',detect:'tapWord',repair:'repair'};el('p',t[instructions[m.mode]],body);
  if(m.prompt)el('h3',m.classPrompt?t.classes[m.prompt]:m.prompt,body);
  if(m.gloss)el('p',t.gloss+': '+m.gloss,body);
  if(m.clauses)el('p',m.clauses.join(' · '),body);
  if(m.mode==='order')this.renderOrder(body);
  if(m.mode==='choice')this.renderChoices(body,m.options,m.acceptedAnswers);
  if(m.mode==='chain'){const step=m.steps[this.step];el('p',`${t.step} ${this.step+1}/${m.steps.length}`,body);el('h3',step.prompt,body);this.renderChoices(body,step.options,step.acceptedAnswers)}
  if(m.mode==='sort')this.renderSort(body);
  if(m.mode==='pairs')this.renderPairs(body);
  if(m.mode==='word'||m.mode==='detect'||m.mode==='repair')this.renderWords(body);
  this.status=el('p',this.message,this.dialog,'puzzle-status');this.status.setAttribute('role','status');this.status.setAttribute('aria-live','polite');
  const footer=el('footer',undefined,this.dialog);const k=button(footer,t.kancilHint,()=>this.hint(true));k.disabled=!this.session.kancil||this.session.kancilUsed>=this.session.freeHintLimit||Boolean(this.result);
  const price=cfg.hintCosts[this.session.hints];const paid=button(footer,t.hint+(price===undefined?'':` · ${price} ${t.kata}`),()=>this.hint());paid.disabled=price===undefined||Boolean(this.result);
  if(this.result)button(footer,t.next,()=>this.close(true));
 }
 renderOrder(body){const m=this.model;this.orderTokens??=shuffle([...m.tokens,...m.extra].map((text,id)=>({text,id})));const answer=el('div',undefined,body,'puzzle-words puzzle-answer');answer.setAttribute('aria-label',this.t.order);for(const id of this.picked){const token=this.orderTokens.find(x=>x.id===id);button(answer,token.text,()=>{this.picked.splice(this.picked.indexOf(id),1);this.render()})}const bank=el('div',undefined,body,'puzzle-words');for(const token of this.orderTokens)if(!this.picked.includes(token.id)&&!this.removed.has(token.text))button(bank,token.text,()=>{this.picked.push(token.id);this.render()});const actions=el('div',undefined,body,'puzzle-words');button(actions,this.t.reset,()=>{this.picked=[];this.render()});button(actions,this.t.check,()=>this.submit(this.picked.map(id=>this.orderTokens.find(x=>x.id===id).text).join(' ')))}
 renderChoices(body,options,answers){const list=el('div',undefined,body,'puzzle-choices');for(const value of options)if(!this.removed.has(value)){const b=button(list,this.label(value),()=>this.submit(value,answers));b.disabled=Boolean(this.result)}}
 renderSort(body){const m=this.model,words=el('div',undefined,body,'puzzle-words');for(const word of m.words){const b=button(words,word.word+(this.assignments.has(word.id)?' · '+this.t.classes[this.assignments.get(word.id)]:''),()=>{this.selected=word.id;this.render()});b.setAttribute('aria-pressed',String(this.selected===word.id))}const altars=el('div',undefined,body,'puzzle-choices');for(const cls of m.classes)if(!this.removed.has(cls))button(altars,this.t.classes[cls],()=>{if(!this.selected)return;this.assignments.set(this.selected,cls);this.selected=null;this.render()});button(body,this.t.check,()=>{if(this.assignments.size!==m.words.length){this.announce(this.t.insufficient);return}const correct=m.words.every(word=>accepts(this.assignments.get(word.id),word.acceptedAnswers));this.submit(correct?'yes':'no',['yes'])})}
 renderPairs(body){const m=this.model;this.rightOrder??=shuffle(m.pairs.map((pair,i)=>i));const grid=el('div',undefined,body,'puzzle-pairs');const left=el('div',undefined,grid),right=el('div',undefined,grid);m.pairs.forEach((pair,i)=>{const b=button(left,pair.left,()=>{this.selected=i;this.render()});b.disabled=this.completed.has(i);b.setAttribute('aria-pressed',String(this.selected===i))});for(const i of this.rightOrder){const pair=m.pairs[i];const b=button(right,pair.right,()=>{if(this.selected===null)return;const row=m.pairs[this.selected];if(!this.session.answer(pair.right,row.answers)){this.fail();return}this.completed.add(this.selected);this.selected=null;if(this.completed.size===m.pairs.length)this.success();else this.render()});b.disabled=this.completed.has(i)||this.forbiddenPairs.has(`${this.selected}|${i}`)}}
 renderWords(body){const m=this.model;if(m.source)el('h3',m.source,body);const words=el('div',undefined,body,'puzzle-words');m.tokens.forEach((word,i)=>{const b=button(words,word,()=>{if(m.mode==='word'){this.submit(word);return}if(!this.session.answer(String(i),[String(m.wrongIndex)])){this.fail();return}if(m.mode==='detect'){this.success();return}this.detected=true;this.render()});b.disabled=Boolean(this.result)||this.disabledWords.has(i);b.setAttribute('aria-pressed',String(this.detected&&i===m.wrongIndex))});if(m.mode==='repair'&&this.detected)this.renderChoices(body,m.options,[m.replacement]);if(m.mode==='detect'&&this.result)el('p',m.tokens.filter((_,i)=>i!==m.wrongIndex).join(' '),body)}
 submit(value,answers){if(this.result)return;const m=this.model;if(!this.session.answer(value,answers)){this.fail();return}if(m.mode==='chain'&&this.step<m.steps.length-1){this.step++;this.removed.clear();this.message=this.t.correct;this.render();return}this.success()}
 fail(){this.options.onMistake?.(this.model);if(this.model.boss){this.announce(this.t.bossWrong);this.close(false);return}this.announce(this.t.wrong)}
 success(){this.result=true;this.message=this.t.correct;this.render();this.dialog.querySelectorAll('.puzzle-body button').forEach(b=>b.disabled=true);this.persist()}
 hint(free=false){const outcome=this.session.hint(free);if(outcome.ok&&free&&this.session.kancilUsed>1){const effects=this.scene.game.settings.companionEffects;if(effects)effects.kancilHintBarrage=Math.max(0,effects.kancilHintBarrage-1)}if(!outcome.ok){this.announce(this.t[outcome.reason]);return}const m=this.model;let options=[],answers=m.acceptedAnswers;
  if(m.mode==='order'){options=m.extra;answers=m.tokens}
  else if(m.mode==='choice')options=m.options;
  else if(m.mode==='chain'){options=m.steps[this.step].options;answers=m.steps[this.step].acceptedAnswers}
  else if(m.mode==='repair'){this.detected=true;options=m.options;answers=[m.replacement]}
  else if(m.mode==='sort'){const word=m.words.find(x=>!this.assignments.has(x.id))||m.words[0];this.selected=word.id;options=m.classes;answers=m.words.flatMap(x=>x.acceptedAnswers)}
  let wrong=options.find(v=>!accepts(v,answers)&&!this.removed.has(v));if(wrong)this.removed.add(wrong);
  if(m.mode==='pairs'){this.selected??=m.pairs.findIndex((_,i)=>!this.completed.has(i));const i=m.pairs.findIndex((p,i)=>!this.completed.has(i)&&!accepts(p.right,m.pairs[this.selected].answers)&&!this.forbiddenPairs.has(`${this.selected}|${i}`));if(i>=0){this.forbiddenPairs.add(`${this.selected}|${i}`);wrong=m.pairs[i].right}}
  if(m.mode==='word'||m.mode==='detect'){const i=m.tokens.findIndex((token,i)=>!this.disabledWords.has(i)&&(m.mode==='word'?!accepts(token,m.acceptedAnswers):i!==m.wrongIndex));if(i>=0){this.disabledWords.add(i);wrong=m.tokens[i]}}
  // Pair and word-selection puzzles have no disposable option: reveal a correct next action.
  let hint=m.hint;
  if(m.mode==='pairs'){const p=m.pairs.find((_,i)=>!this.completed.has(i));hint=`${p.left} · ${p.right}`}
  if(m.mode==='word')hint=m.word;
  if(m.mode==='detect'||m.mode==='repair')hint=m.tokens[m.wrongIndex];
  if(m.mode==='order')hint=m.acceptedAnswers[0].split(' ').slice(0,this.session.hints+1).join(' ');
  if(m.mode==='sort'){const word=m.words.find(x=>x.id===this.selected);hint=word.word+' · '+this.t.classes[word.wordClass]}
  this.message=(wrong?this.t.removed+' ':'')+(free&&wrong?'':hint);this.persist();this.render();
 }
 async close(result=null,shutdown=false){if(!this.active||this.closing)return;this.closing=true;this.dialog.classList.remove('visible');if(!shutdown)await new Promise(resolve=>setTimeout(resolve,cfg.transitionMs));this.dialog.close();this.dialog.remove();this.active=false;this.orderTokens=null;this.rightOrder=null;this.closing=false;this.scene.events.off('shutdown',this.shutdown);if(!shutdown){this.scene.input.keyboard?.resetKeys();this.scene.input.enabled=this.inputEnabled;if(!this.physicsPaused)this.scene.physics?.world.resume();if(!this.scenePaused)this.scene.scene.manager.resume(this.scene.scene.key);this.focusBefore?.focus();if(result===true)this.options.onCorrect?.(this.model);if(result===false)this.options.onWrong?.(this.model);this.options.onClose?.(result)}this.persist()}
}
