import cfg from '../config/puzzles.json?v=18' with {type:'json'};
import {normalize} from './PuzzleContent.js?v=18';
const required=['id','tier','topic','stage','domain','acceptedAnswers','hint','syllabusRef','reviewStatus','notes'];
const schemas={sentences:{tokens:'array',validOrders:'array'},affixes:{root:'string',affix:'string',correctForm:'string',wrongForms:'array',ruleNote:'string'},parts_of_speech:{word:'string',wordClass:'string',example:'string',classShift:'object'},synonyms:{word:'string',synonyms:'array',register:'string'},antonyms:{word:'string',antonyms:'array',effect:'string'},translations:{ms:'string',en:'string',alternatives:'object'},peribahasa:{text:'string',kind:'string',meaning:'object',theme:'string'},jawi:{rumi:'string',jawi:'string'},dialects:{standard:'string',dialect:'string',region:'string'},names:{word:'string',kind:'string'},distractors:{variant:'string',options:'array'},puzzles:{variant:'string'}};
export function validateBanks(banks){const errors=[],warnings=[],ids=new Set();let count=0;const error=(label,msg)=>errors.push(`${label}: ${msg}`);
 for(const name of cfg.files){const rows=banks[name];if(!Array.isArray(rows)){error(name,'schema: expected array');continue}const seen=new Set();
  for(const [i,x] of rows.entries()){count++;const label=`${name}[${i}]`;if(!x||typeof x!=='object'||Array.isArray(x)){error(label,'schema: expected object');continue}
   for(const key of required)if(!(key in x))error(label,`missing ${key}`);
   if(typeof x.id!=='string'||!x.id||ids.has(x.id))error(label,`duplicate/invalid id ${x.id}`);ids.add(x.id);
   if(!cfg.tiers.includes(x.tier))error(label,'invalid tier');
   if(!['riddle','sky-nature','names-kinship','dialect-archaic','general'].includes(x.domain))error(label,'invalid domain');
   if(!Number.isInteger(x.stage)||x.stage<1||x.stage>6)error(label,'invalid stage');
   for(const key of ['topic','hint','syllabusRef','notes'])if(typeof x[key]!=='string')error(label,`invalid ${key}`);
   const answers=x.acceptedAnswers;if(!Array.isArray(answers)||!answers.length||answers.some(a=>typeof a!=='string'||!a.trim()))error(label,'missing valid acceptedAnswers');
   if(!['draft','reviewed','approved'].includes(x.reviewStatus))error(label,'invalid reviewStatus');else if(x.reviewStatus!=='approved')warnings.push(`${label}: ${x.reviewStatus}`);
   for(const [key,type] of Object.entries(schemas[name]||{})){const v=x[key];if(type==='array'?!Array.isArray(v)||!v.length:type==='object'?!v||typeof v!=='object'||Array.isArray(v):typeof v!==type||!v.trim())error(label,`schema ${key}: expected ${type}`)}
   const identity=x.word||x.text||x.ms||(x.root?x.root+'|'+x.affix:null)||(Array.isArray(x.tokens)?x.tokens.join(' '):null)||(name==='distractors'?x.variant:null)||(name==='puzzles'?x.variant+'|'+(x.prompt||x.steps?.[0]?.prompt||x.id):null)||x.rumi||x.standard;
   const sig=normalize(identity)+'|'+x.tier;if(identity&&seen.has(sig))error(label,'duplicate content in tier');seen.add(sig);
   const matches=v=>Array.isArray(answers)&&answers.some(a=>normalize(a)===normalize(v));
   if(name==='sentences'&&Array.isArray(x.validOrders)){for(const order of x.validOrders){if(!matches(order))error(label,'valid order missing accepted answer');if(Array.isArray(x.tokens)&&JSON.stringify(x.tokens.map(normalize).sort())!==JSON.stringify(String(order).split(/\s+/u).map(normalize).sort()))error(label,'tokens do not build valid order')}}
   if(name==='affixes'&&!matches(x.correctForm))error(label,'correctForm missing accepted answer');
   if(name==='parts_of_speech'&&!cfg.classes.includes(x.wordClass))error(label,'invalid wordClass');
   if(['synonyms','antonyms'].includes(name)&&Array.isArray(x[name]))for(const a of x[name])if(!matches(a))error(label,'lexical answer missing accepted answer');
   if(name==='translations')for(const language of ['ms','en']){if(!Array.isArray(x.alternatives?.[language])||!x.alternatives[language].length)error(label,`missing ${language} alternatives`);else for(const a of x.alternatives[language])if(!matches(a))error(label,'translation missing accepted answer')}
   if(name==='peribahasa'&&(!x.meaning?.ms||!x.meaning?.en||!matches(x.meaning.ms)))error(label,'meaning missing accepted answer');
   if(name==='puzzles'){const fields={'1c':['tokens','wrongIndex','replacement'],'1d':['tokens','clauses','conjunction'],'2c':['words'],'2d':['root','form'],'3c':['start','steps'],'3d':['steps'],'4c':['source','broken','tokens','wrongIndex','replacement','options']};if(!fields[x.variant])error(label,'invalid exercise variant');else for(const key of fields[x.variant])if(!(key in x))error(label,`schema missing ${key}`);if(Array.isArray(x.steps))for(const step of x.steps)if(!step.prompt||!Array.isArray(step.acceptedAnswers)||!step.acceptedAnswers.length||!step.options?.some(v=>step.acceptedAnswers.includes(v)))error(label,'unsolvable chain step')}
  }
 }
 return {count,errors,warnings,ok:errors.length===0};
}
