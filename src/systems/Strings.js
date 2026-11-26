import ms from '../strings/ms.json?v=z2-1' with {type:'json'};
import en from '../strings/en.json?v=z2-1' with {type:'json'};
export const stringsFor=language=>language==='en'?en:ms;
