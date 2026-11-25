import {Save} from './Save.js';
export const Settings={load:()=>Save.load(),update:(current,patch)=>{Object.assign(current,patch);Save.write(current,current.checkpoint);return current}};
