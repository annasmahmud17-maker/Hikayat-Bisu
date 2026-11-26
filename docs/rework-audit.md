# Rework audit

Snapshot: `31113195d634a3738804c2b87c03d7a261d5f679` (legacy-sidescroller). Every tracked file at the start of this rework is listed once. The addendum retains Bayang and last-Pondok respawn; it overrides the removal line in Phase 1.

## Keep

- `.gitignore`
- `audio/.gitkeep`
- `docs/phaser-license.md`

## Adapt

- `README.md`
- `content/affixes.json`
- `content/antonyms.json`
- `content/boss_peribahasa.json`
- `content/dialects.json`
- `content/distractors.json`
- `content/jawi.json`
- `content/names.json`
- `content/parts_of_speech.json`
- `content/peribahasa.json`
- `content/puzzles.json`
- `content/sentences.json`
- `content/synonyms.json`
- `content/translations.json`
- `docs/decisions.md`
- `docs/phase-1-qa.md`
- `docs/phase-2-qa.md`
- `docs/phase-4-qa.md`
- `index.html`
- `manifest.webmanifest`
- `src/boot/startup.js`
- `src/config/combat.json`
- `src/config/economy.json`
- `src/config/foundation.json`
- `src/config/puzzles.json`
- `src/config/settings.json`
- `src/entities/Enemy.js`
- `src/entities/Hero.js`
- `src/main.js`
- `src/scenes/Boot.js`
- `src/scenes/Camp.js`
- `src/scenes/Debug.js`
- `src/scenes/Map.js`
- `src/scenes/Title.js`
- `src/strings/en.json`
- `src/strings/ms.json`
- `src/systems/CompanionState.js`
- `src/systems/Content.js`
- `src/systems/Providers.js`
- `src/systems/Save.js`
- `src/systems/Settings.js`
- `src/systems/Sound.js`
- `src/systems/Strings.js`
- `src/systems/ValidateContent.js`
- `src/theme/palette.js`
- `src/ui/Controls.js`
- `src/ui/Hud.js`
- `sw.js`
- `tools/validate.html`

## Remove

- `content/stage1_setia.json`
- `content/stage1_story.json`
- `src/config/stage1.json`
- `src/entities/CompanionManager.js`
- `src/entities/HeroArt.js`
- `src/scenes/Arena.js`
- `src/scenes/PuzzleRoom.js`
- `src/stages/stage1/.gitkeep`
- `src/stages/stage1/Atmosphere.js`
- `src/stages/stage1/ForestEnemy.js`
- `src/stages/stage1/Stage1.js`
- `src/stages/stage1/State.js`
- `src/stages/stage2/.gitkeep`
- `src/stages/stage3/.gitkeep`
- `src/stages/stage4/.gitkeep`
- `src/stages/stage5/.gitkeep`
- `src/stages/stage6/.gitkeep`
- `src/systems/CompanionLoop.js`
- `src/systems/KataKunci.js`
- `src/systems/PuzzleContent.js`
- `src/ui/PuzzleOverlay.js`
- `src/ui/camp.css`
- `src/ui/puzzles.css`
- `tests/browser.html`
- `tests/mobile.html`
- `tests/phase3.test.mjs`
- `tests/puzzles.test.mjs`
- `tests/stage1-browser.html`
- `tests/stage1-browser.js`
- `tests/stage1.test.mjs`
- `src/systems/CampAudio.js`
