import {loadContent} from '../systems/Content.js?v=z2-1';
const files={CR:'cryptograms',RV:'crossings',CM:'cardsets',TD:'defence_waves'};
export class PuzzleContent{
 static async load(){const entries=await Promise.all(Object.entries(files).map(async([style,file])=>[style,await loadContent(file+'.json')]));return new PuzzleContent(Object.fromEntries(entries))}
 constructor(banks){this.banks=banks}
 get(puzzle,tier){const id=puzzle.contentIds[tier],entry=this.banks[puzzle.style]?.find(x=>x.id===id);if(!entry)throw Error(`Missing ${puzzle.style} ${id}`);return structuredClone(entry)}
 short(style,tier){return structuredClone(this.banks[style].find(x=>x.tier===tier))}
}
