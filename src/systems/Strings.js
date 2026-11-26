import ms from '../strings/ms.json?v=18' with {type:'json'};
import en from '../strings/en.json?v=18' with {type:'json'};
export const stringsFor=language=>language==='en'?en:ms;
