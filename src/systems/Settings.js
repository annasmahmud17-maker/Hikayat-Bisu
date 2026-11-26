import {Save} from './Save.js?v=z2-1';
export function updateSettings(settings,changes){Object.assign(settings,changes);Save.write(settings);return settings}
