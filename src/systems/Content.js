import foundation from '../config/foundation.json?v=z1-3' with {type:'json'};
export async function loadContent(file){if(!/^(?:[a-z_]+|stages\/ch[1-4]_s(?:[1-9]|10))\.json$/.test(file))throw Error('Invalid content path');const r=await fetch(new URL('../../content/'+file+'?v='+foundation.build,import.meta.url));if(!r.ok)throw Error(`Content unavailable: ${file}`);return r.json()}
