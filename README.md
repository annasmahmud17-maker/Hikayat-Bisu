# Hikayat Bisu

A phone-first top-down action-puzzle adventure set in Alam Lisan. Original procedural shapes and WebAudio placeholders; no accounts, analytics, tracking, bundler or build step. Phaser **3.90.0** is loaded as an ES module from jsDelivr. Runtime assets are same-origin except that pinned engine.

## Current phase

Master Prompt v2, Phase 2. Title → Balai Cerita → Chapter 1 stages 1–5. Each stage has five walkable rooms, five authored puzzles, Pondok points, enemies and an optional companion chest. The engines are **RV** moving word-log crossings, **CR** cryptogram chambers with a pushable pillar, **CM** matching cards with letter guardians, and **TD** class-specific word tower defence. Fifty draft entries cover all three tiers. Kancil joins in Stage 3; Stage 5 ends with Beringin Sunyi, Kata Kunci rounds, a heart container and a Repository proverb. The map shows forty stages; only the first five are implemented.

Use the floating pad to move; **Tetak / Slash** attacks and **Aksi / Act** interacts. Keyboard: WASD/arrows, Space to slash, E to act, Q to swap, Escape for Menu. A controller's left stick, button 0 and button 1 move, slash and act. Menu contains the layout editor, hit-stop/shake toggles, low power and volume controls. Three fingers or the small ⋮ button opens debug tools inside the real stage.

When defeated, half the Kata goes to a Bayang and the hero returns to the last Pondok. Defeat the Bayang to recover it; another defeat replaces the old Bayang. Seal progress remains saved. Rest to restore hearts and autosave.

## GitHub Pages

1. Merge the `zelda-phase-2` pull request into `main` when ready.
2. Repository Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
3. Open `https://annasmahmud17-maker.github.io/Hikayat-Bisu/` after deployment completes. Close/reopen once to update an older service worker.
4. On Android Chrome, use Add to Home Screen / Install app. Landscape is preferred; puzzle dialogs also fit portrait. One successful complete online load caches the shell, all five implemented stages, content and pinned engine for later offline use.

For local development, serve the repository root with any static HTTP server (for example `python3 -m http.server 8000`). No dependencies need installation. Modern Chromium with JSON import attributes is required.

## Files and validation

- `/src/render/sprites.js` and `/src/config/sprites.json`: one rendering API for placeholders and future sheets. `/src/render/LightingLayer.js` and `ParticleLayer.js`: atmosphere.
- `/content/stages/ch1_s1.json` through `ch1_s5.json`: room string rows and exactly five puzzle references each. `stage_catalog.json`: all forty map entries.
- `/src/config/`: movement/combat, economy, Bayang share, pooled death letters, atmosphere and audio tuning.
- `/src/strings/ms.json` and `en.json`: interface/lore text. `/content/`: puzzle banks and draft proverb text.
- `/tools/validate.html`: content and stage validation. `node --test tests/*.test.mjs`: engine-independent checks with Node 24+.
- `/docs/rework-audit.md`: every original tracked file categorized keep/adapt/remove. `/docs/zelda-phase-2-qa.md`: current verified checks and phone checklist.

The legacy branch/tag `legacy-sidescroller` preserves pre-rework main. The old localStorage record is untouched; the new schema copies compatible preferences and Kata while resetting incompatible world progress. All storage operations use try/catch. Future real audio can be wired behind Sound in `/audio`; AdProvider and PurchaseProvider remain local mocks. Every peribahasa adaptation remains draft pending Malay editorial review.

## Puzzle notes

Press Aksi at a glowing shrine. Puzzle targets use native HTML controls; CR and RV stay in the world. RV log taps assist alignment while the pad remains usable. CM pauses ordinary enemies and wakes one guardian after a mismatch. TD uses puzzle-local ink points, unrelated to Kata, with free resets. Wrong exploration moves remove half a heart, floored at half a heart, and never charge Kata. Paid hints cost 20, 40, then 80 Kata; Kancil offers one free wrong-option removal per puzzle. Hint use persists when closing, resetting or reloading. A short grammar note follows every solved seal.

Three-finger / ⋮ debug tools skip directly into the five real stages and their shrines. Stage 1 narrator text introduces each style. On an old installation use `?update=z2-1` once to request the new cache graph without deleting saved data. The former TEMP seal state is invalidated once; earned currency and compatible preferences remain.
