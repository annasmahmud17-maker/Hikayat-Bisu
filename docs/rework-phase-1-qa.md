# Top-down Phase 1 QA

## Verified in browser

- Title, camp, Stage 1 and 40-stage map load. Three hero looks are selectable; the emerald placeholder was checked in play under lighting.
- Keyboard movement is cardinal, with instant stop. Wall and water geometry are checked by the same collision predicate; the Node reachability check covers all five rooms.
- Five temporary shrine overlays solve in the real stage via debug shortcuts; Menu shows 5/5 fragments and three empty lesser-key slots. The exit returns to camp.
- Rest at Pondok Lumut restores 5 hearts. Debug defeat in the last room drops 97 of 195 Kata, respawns at Pondok Lumut with full hearts, and a two-hit Bayang recovery returns to 195 Kata.
- Menu opens; Slash resize changes 76px to 84px. Persistence is covered in the save test.
- Returning from camp/map to Stage 1 was rechecked after fixing repeated lighting cleanup.
- Browser normal-mode FPS varied roughly 54–61. The native timer low-power mode measured about 28 fps with a 30 fps setting; phone performance remains unverified.
- The browser validator reports zero errors and 288 draft entries. Slash removed a nearby enemy and its letters were visible.
- No new application console errors appeared after the lighting cleanup fix; browser-extension messages are outside the game.

## Automated

Run `node --test tests/*.test.mjs` with Node 24+. Tests cover legacy migration, cardinal movement/collision, five-seal gate, all 40 catalog entries, Stage 1 route reachability, per-puzzle Setia replay limits and costs, full save round-trip/blocked storage, preserved bank metadata, module dependencies and offline cache paths.

## Phone checks still required

1. Open the branch version served from a local static server or merge the PR to test on GitHub Pages. Enter a name, choose each look, language and tier, then reload.
2. Hold the left floating pad and tap Tetak/Aksi simultaneously. Confirm four independent touches, safe areas and no page zoom.
3. Walk through all five rooms, collide with walls/water, slash both enemy types and collect glowing letters. Watch the white then ember tell with a sound.
4. Rest at a Pondok, solve a shrine, background/reopen the game, and confirm the seal remains solved.
5. Use the debug panel (three fingers or ⋮) to visit a shrine, add Kata, test defeat, or unlock companions for framework checks.
6. Drag and resize every button in Menu → Susun butang, then reload. Turn off hit-stop/shake and enable low power.
7. After one complete online load, close, turn on airplane mode and reload. Check Title, Stage 1, map and validator. Install to Home Screen and check fullscreen.
8. Measure sustained 60 fps on the target phone and 30 fps in low-power mode. Portrait puzzle layout needs device verification.

## Deliberate Phase 1 limits

- Exactly five TEMP shrine interactions replace the real four puzzle styles until Phase 2. No extra test room exists.
- Stage 1 is playable. The other 39 map entries are future stages and cannot be entered yet, even after their progression flag unlocks.
- Companions are not found during Stage 1. Debug discovery can exercise selection/follow/swap and Kancil's bonus chest; authored companion events and Setia stories arrive later.
- Boss and mini-boss classes are scaffolding. The debug panel spawns a guardian in the current real room, using temporary Kata Kunci responses. No story boss is added to Stage 1.
- Old stage progress and ability unlocks cannot map to the new world. Migration keeps the old save untouched and copies name/look/preferences/Kata/repository/ad-free into the new top-down schema.
