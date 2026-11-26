# Phase 4 QA — Rimba Aksara

## Verified

- PASS: `node --test tests/*.test.mjs` — 18 tests covering content schemas, accepted answers, per-tier reachability, hint/replay costs, party gates, twelve reciprocal rooms, three checkpoints, wall-jump gate and 120 syntax items.
- PASS: Live Phaser integration (`tests/stage1-browser.html`): start from Stage 1, emerald rim, three bench saves, modal pause/resume, denied companion gates, root chest acquisition, physical wall-jump climb, late Kancil recruitment, bonus chest, bonding, full 3a/3b/3d Setia chain and Pledge unlock, boss phase transition, Repository reward and timed teaser.
- PASS: Stage 1 palette tokens match the Master Prompt; sun shafts use alpha 0.15. Girl rim is 3.5px. All art and audio are generated locally.
- PASS: Browser preview frame timing sampled around 55–60 fps on the desktop test host. This is not an Android performance result.
- PASS: Beringin reward is idempotent; already collected chests and door lines persist; backtracking gates remain optional.
- PASS: Syntax and Setia wording is marked draft. No external imagery, fonts or audio added.

## Phone checks still needed

1. Open the phase build in a current Android browser, landscape. Start a new hero or continue at Balai Cerita, then select **Jelajah Rimba Aksara**.
2. Explore Batu Bersurat (1a), Gerbang Imbuhan (1b), Simpul Ayat (1d), and the Lurah Embun chest (1c). Test Mudah, Biasa and Mahir. Three correct puzzles open each door. Wrong answers may splash Semangat but never take Kata or lock the path.
3. Rest at Pondok Ambang, Pondok Akar and Pondok Kanopi; reload/background the app after each and use Peta to return. Confirm Kata, doors, chests and wall-jump survive.
4. Defeat Pengawal Akar, open its chest, move under the short left wall into the shaft, hold toward a wall and press Jump when touching it. Alternate walls to climb, then use the upper exit. It must stay inaccessible before the reward.
5. Backtrack to Celah Rahsia without Kancil: the chest stays closed. Recruit him at Sarang Kancil and return with him in the party to recover it. Batu Menanti stays closed until a later Rimau party visit.
6. At camp select Setia, hear Kancil's bonding scene, then complete 3a → 3b → 3d. A clean chain grants Setia. A chain with mistakes offers up to two paid replays; free players opt into the mock ad and may close only after five seconds. Before replay two, check the last-chance message. There is no time limit or failure screen.
7. Fight Beringin on Biasa: white/ember tell, floor roots, falling leaves, syntax Kata Kunci at half health, correct stun or wrong temporary resistance, phase-two dimming pulses. Canceling Kata Kunci leaves it available through Read/Use.
8. After victory confirm the Repository receives **Di mana bumi dipijak, di situ langit dijunjung**, then watch the ten-second pose-copying shadow teaser. Reload: reward and teaser must not repeat.
9. Return online once until offline caching completes, then test airplane-mode reload. Check movement + Jump + Slash multi-touch, audio levels and low-power mode.

## Acceptance checklist

| Requirement | Result |
| --- | --- |
| Camp → Stage 1 route and boss progression | PASS — engine integration |
| First-time 20–30 minute completion | NOT TESTED — unassisted phone playthrough needed |
| Solvable, tier-aware syntax and Setia | PASS — content/engine checks; Malay editorial approval pending |
| Biasa boss beaten within a few tries | NOT TESTED — human balance playtest needed |
| Kata Kunci clean pause/resume | PASS — live Phaser integration |
| Kancil and Rimau gates deny the wrong party | PASS — state checks and live denial checks |
| Exact palette / 15% shafts / stronger emerald rim | PASS — source and visual inspection |
| Saving at each Pondok | PASS — persistence and live checks |
| 60 fps on a mid-range phone | NOT TESTED — desktop preview ~55–60 fps |

Known limits: all language content is draft; audio is procedural placeholder; human pacing, difficulty and Android frame rate remain unverified. No Stage 2 or later gameplay was added.

Commit message: `feat: add Rimba Aksara Stage 1 and Kancil story progression`
