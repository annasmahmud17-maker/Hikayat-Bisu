import {Save} from './Save.js?v=z1-3';
export function updateSettings(settings,changes){Object.assign(settings,changes);Save.write(settings);return settings}
