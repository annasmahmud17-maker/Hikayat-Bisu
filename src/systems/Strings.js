import ms from '../strings/ms.json' with {type:'json'};
import en from '../strings/en.json' with {type:'json'};
export const stringsFor=language=>language==='en'?en:ms;
