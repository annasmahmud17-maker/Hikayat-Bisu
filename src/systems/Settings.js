import {Save} from './Save.js';
export function updateSettings(settings,changes){Object.assign(settings,changes);Save.write(settings);return settings}
