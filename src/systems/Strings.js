import ms from '../strings/ms.json?v=z1-3' with {type:'json'};
import en from '../strings/en.json?v=z1-3' with {type:'json'};
export const stringsFor=language=>language==='en'?en:ms;
