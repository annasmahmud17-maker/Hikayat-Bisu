import cfg from '../config/puzzles.json?v=17' with {type:'json'};
export const normalize=value=>String(value??'').normalize('NFC').trim().replace(/\s+/gu,' ').toLocaleLowerCase();
export const accepts=(value,answers)=>answers.some(answer=>normalize(answer)===normalize(value));
export function shuffle(list,random=Math.random){const out=[...list];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out}
const root=new URL('../../content/',import.meta.url);
export class WordBanks{
  constructor(banks){this.banks=banks}
  static async load(fetcher=fetch){const entries=await Promise.all(cfg.files.map(async name=>{const response=await fetcher(new URL(name+'.json',root));if(!response.ok)throw Error(`${name}: HTTP ${response.status}`);const rows=await response.json();if(!Array.isArray(rows))throw Error(`${name}: expected array`);return [name,rows]}));return new WordBanks(Object.fromEntries(entries))}
  tier(name,tier){return (this.banks[name]||[]).filter(item=>item.tier===tier)}
  distractors(name,item,correct,field='word',limit=cfg.optionCount-1){const excluded=new Set(correct.map(normalize));const candidates=this.tier(name,item.tier).filter(row=>row.id!==item.id).flatMap(row=>Array.isArray(row[field])?row[field]:[row[field]]).filter(v=>typeof v==='string'&&!excluded.has(normalize(v)));return shuffle([...new Map(candidates.map(v=>[normalize(v),v])).values()]).slice(0,limit)}
  options(name,item,answers,field='word',extra=[]){return shuffle([...new Map([answers[0],...extra,...this.distractors(name,item,answers,field)].filter(v=>typeof v==='string'&&(accepts(v,answers)?normalize(v)===normalize(answers[0]):true)).map(v=>[normalize(v),v])).values()])}
  pick(name,tier,index=0){const rows=this.tier(name,tier);if(!rows.length)throw Error(`No ${name} for ${tier}`);return rows[index%rows.length]}
  make(variant,tier,{index=0,direction='ms-en',boss=false}={}){
    if(variant==='4d'||variant==='4e')return {variant,stub:true,enabled:cfg.flags[variant]};
    let item,model;const pick=name=>this.pick(name,tier,index);
    if(['1c','1d','2c','2d','3c','3d','4c'].includes(variant)){item=this.tier('puzzles',tier).filter(x=>x.variant===variant)[index%this.tier('puzzles',tier).filter(x=>x.variant===variant).length];model={...structuredClone(item)};
      if(variant==='1d')model.mode='order';
      if(variant==='1c')model.mode='detect';
      if(variant==='2c'){model.mode='choice';model.options=shuffle(item.words)}
      if(variant==='2d'){model.mode='choice';model.prompt=`${item.root} → ${item.form}`;model.options=shuffle(cfg.classes);model.classOptions=true}
      if(['3c','3d'].includes(variant))model.mode='chain';
      if(variant==='4c')model.mode='repair';
    }else if(variant==='1a'){item=pick('sentences');model={...item,mode:'order'}}
    else if(variant==='1b'){item=pick('affixes');model={...item,mode:'choice',prompt:`${item.affix} + ${item.root}`,options:this.options('affixes',item,item.acceptedAnswers,'correctForm',item.wrongForms)}}
    else if(variant==='2a'){item=pick('parts_of_speech');const words=this.tier('parts_of_speech',tier);model={...item,mode:'sort',words:Array.from({length:cfg.sortCount},(_,i)=>words[(index+i)%words.length]),classes:cfg.classes}}
    else if(variant==='2b'){item=pick('parts_of_speech');model={...item,mode:'word',tokens:item.example.split(' '),prompt:item.wordClass,acceptedAnswers:[item.word],classPrompt:true}}
    else if(variant==='3a'||variant==='4b'){const name=variant==='3a'?'synonyms':'translations';item=pick(name);const rows=this.tier(name,tier);model={...item,mode:'pairs',pairs:Array.from({length:cfg.pairCount},(_,i)=>{const row=rows[(index+i)%rows.length];return {left:variant==='3a'?row.word:row[direction==='ms-en'?'ms':'en'],right:variant==='3a'?row.synonyms[0]:row[direction==='ms-en'?'en':'ms'],answers:variant==='3a'?row.synonyms:row.alternatives[direction==='ms-en'?'en':'ms']}})}}
    else if(variant==='3b'){item=pick('antonyms');model={...item,mode:'choice',prompt:item.word,options:this.options('antonyms',item,item.acceptedAnswers,'antonyms')}}
    else if(variant==='4a'){item=pick('translations');const target=direction==='ms-en'?'en':'ms',source=target==='en'?'ms':'en';model={...item,mode:'order',prompt:item[source],tokens:item[target].split(' '),acceptedAnswers:item.alternatives[target],gloss:tier==='mudah'?item[target]:null}}
    else if(variant==='peribahasa'){item=pick('peribahasa');const alternatives=this.distractors('peribahasa',item,item.acceptedAnswers,'acceptedAnswers');model={...item,mode:'choice',prompt:item.text,options:shuffle([item.meaning.ms,...alternatives])}}
    else throw Error(`Unknown variant ${variant}`);
    model=structuredClone(model);model.variant=variant;model.boss=boss;
    if(model.mode==='order'){// One extra word gives Kancil an actual wrong option to remove.
      const extras=this.tier('distractors',tier).find(x=>x.variant===variant)?.options||[];
      model.extra=extras.filter(x=>!model.acceptedAnswers.some(a=>a.split(' ').some(t=>normalize(t)===normalize(x)))).slice(0,1);
    }
    if(boss){if(model.pairs)model.pairs=model.pairs.slice(0,1);if(model.words)model.words=model.words.slice(0,1);if(model.steps)model.steps=model.steps.slice(0,1)}
    return model;
  }
}
export class PuzzleSession{
  constructor(model,wallet,{kancil=false}={}){this.model=model;this.wallet=wallet;this.kancil=kancil;this.kancilUsed=false;this.hints=0;this.wrong=0}
  answer(value,answers=this.model.acceptedAnswers){const correct=accepts(value,answers);if(!correct){this.wrong++;if(!this.model.boss)this.wallet.hp=Math.max(cfg.minimumHealth,this.wallet.hp-cfg.damage)}return correct}
  hint(free=false){if(free){if(!this.kancil||this.kancilUsed)return {ok:false,reason:'noHint'};this.kancilUsed=true;return {ok:true,free:true}}const cost=cfg.hintCosts[this.hints];if(cost===undefined)return {ok:false,reason:'noHint'};if(this.wallet.kata<cost)return {ok:false,reason:'noKata'};this.wallet.kata-=cost;this.hints++;return {ok:true,cost}}
}
