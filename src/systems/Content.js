export {WordBanks,normalize,accepts} from './PuzzleContent.js?v=18';
export async function loadContent(file){if(!/^[a-z_]+\.json$/.test(file))throw new Error('Invalid content path');const response=await fetch(new URL('../../content/'+file,import.meta.url));if(!response.ok)throw new Error(`Content unavailable: ${file}`);return response.json()}
