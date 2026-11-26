# Hikayat Bisu — foundation and simplified test arena

This static Phaser 3.90.0 ES-module project has no bundler or build step. It starts at Title, then enters Balai Cerita camp. The test arena is accessible from camp. Choose a boy or girl hero, name, language, and difficulty tier. Settings and Kata save locally. There are no accounts, analytics, or tracking.

## GitHub Pages

In repository Settings → Pages select **Deploy from a branch**, branch **main**, folder **/(root)**. Open the resulting Pages link in a current phone browser in landscape. Add to Home Screen for fullscreen. Load once online for offline caching. A local preview can run with `python3 -m http.server 8000` from the root; direct `file://` loading cannot import JSON or register a service worker.

## Controls

Move with the floating left stick. Jump with the large right button; press again quickly in the air for a double jump. Jump while touching a wall to leap away. Land on enemies from above to defeat them and bounce. Touching their sides or underside costs Semangat. A future ranged Attack button is reserved diagonally above Jump and remains hidden until that ability is implemented. On a keyboard, A/D or arrows move and Space jumps; a controller's left stick and south button also work.

The top-right **Susun Butang** control opens the layout editor to move and resize the Jump button. Three fingers toggle debug information and future ability flags. The two sample puzzle entries can be checked at `/tools/validate.html`. Stages and puzzle gameplay are reserved for later phases. Visuals and audio are procedural.

## Phase 2 puzzles

Balai Cerita → **Bilik Ujian Teka-teki** opens the isolated puzzle test room. All active variants work by touch; Jawi and dialect are disabled future stubs. Validation is at [`tools/validate.html`](tools/validate.html), including a broken-entry test.

Run engine/content checks with `node --test tests/puzzles.test.mjs` (Node 24+). See [`docs/phase-2-qa.md`](docs/phase-2-qa.md) for phone checks and remaining editorial/device review.

To use in a stage, load `WordBanks`, construct one `PuzzleOverlay(scene, banks)`, then call `overlay.open('1a', {tier, onCorrect, onClose})`. It defaults to `scene.hero.hp`, `scene.kata` and the saved Kancil party flag. A custom `wallet: {hp, kata}` can be supplied. Import `kataKunci` and call `kataKunci(overlay, '3b', {boss: {stun(){…}, buff(){…}}})` for a boss. Callbacks run after the closing transition and action restoration. Keep the overlay instance per scene to prevent concurrent modals.

### Phase 3 camp test

Enter a hero name and open **Balai Cerita**. Use Pasukan to choose one or two companions (unlock a second through the three-finger debug panel), Setia for Kancil's three riddle chains, Azimat for the two-notch samples, and Peribahasa for collected boss sayings. The debug panel can add each draft peribahasa and toggle an ad-free test flag. Earn Kata by stomping enemies in the arena; discover the far Pondok to use fast travel from the camp map. A free Setia replay shows an opt-in five-second mock ad; the ad-free test flag skips it but still charges Kata. Reload to check persistence. The seven proverb meanings remain drafts pending Malay editorial review.

## Phase 4 — Rimba Aksara

From camp select **Jelajah Rimba Aksara** / **Explore Rimba Aksara**. The twelve-room stage has three Pondok checkpoints, three syntax doors, a syntax chest, leaf/beetle enemies, Root Guard and wall-jump chest, Kancil recruitment, two optional companion chests, and Beringin Sunyi. Rest restores Semangat/Ink and saves. Use the mini-map's Map button for discovered Pondok travel; travel is disabled during encounters.

Touch: left stick, Jump, Slash, Read/Use, dodge, parry, heal and ink buttons. Keyboard: A/D or arrows, Space jump, J slash, E interact, M map, K parry, L dodge, H heal, I ink. Kancil's command and Setia-only Pledge use the existing companion buttons. Hear his bonding scene in camp's Setia tab after recruitment.

Run `node --test tests/*.test.mjs`. For live engine verification open `tests/stage1-browser.html` on a local preview; it creates an isolated test campaign in that preview origin, drives the real Phaser scene and writes a visible report. It does not measure human playthrough pacing. See `docs/phase-4-qa.md` for the complete phone checklist and verification limits.
