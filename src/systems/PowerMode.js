import cfg from '../config/combat.json?v=z1-3' with {type:'json'};
// Phaser 3.90 caches the timer target; keep that pinned-engine detail here.
export function applyPowerMode(game){const fps=game.settings.lowPower?cfg.lowFps:cfg.fps;game.loop.targetFps=fps;game.loop._target=1000/fps;game.loop.raf.delay=1000/fps}
