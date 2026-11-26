# Top-down Phase 2 QA

## Scope

Chapter 1 stages 1–5 only. Four JSON-driven puzzle engines replace TEMP shrines. Fifty draft puzzle entries supply 25 stage placements with tier-specific content. No separate test room is added.

## Verified

- PASS: `node --test tests/*.test.mjs` — 17 tests. These include all 50 entries and resets, 25 puzzle references across all three tiers, four short boss modes, hint ledger pricing/persistence, card retry, river checkpoint behavior, tower failure/refund, three boss rounds and exactly-once rewards, save round trips, tile reachability and offline module graph.
- PASS: browser `/tools/validate.html` — zero validation errors; 338 draft records across retained and new banks. Draft is an editorial status, not an error.
- PASS: browser title → camp → implemented stage; debug skips stay within real stages.
- PASS: normal Biasa tower wave completed with class-specific towers; grammar note and seal awarded.
- PASS: normal cryptogram decoded, pillar pushed north into the revealed pit with Act, hero crossed, seal and grammar note awarded.
- PASS: river words move; tapping through the movement-control layer sends the hero onto the selected log and fills a sentence slot. Falling returns to the bank; bilingual toggle and retry are available.
- PASS: card mismatch wakes a guardian; Kancil hint opens an anchor and removes a wrong partner. The guardian combat/resume branch is implemented; a complete guardian defeat → card resume was not manually observed.
- PASS: Kancil found in Stage 3 room 3, immediately joins the party and appears in camp selection. Existing saved choice reloads.
- PASS: no application-origin console error observed in the checked browser sessions. Browser extension metadata errors are external to the game.

## Phone test sequence

1. After merging and Pages deployment, open the game with `?update=z2-1`, landscape, and choose Biasa. Enter Pangkal Rimba. Tap the small debug button or three fingers for stage/shrine skips.
2. At each shrine press Aksi. RV: tap a correct log on the next row or use the pad; wait for alignment before crossing from a moving log. CR: choose cipher letters, then approach the pillar from below and press Aksi; walk across its filled pit. CM: open pairs; defeat the guardian after a mismatch. TD: choose a class, place towers on pads, start the wave; replace towers or retry without spending Kata.
3. Solve all five seals per stage and use the exit. Rest at Pondok points. Reload and confirm seals, hints, Kata and party persist.
4. Find Kancil in Sungai Embun; visit camp to bond/select him. Check one free wrong-option removal per puzzle, swapping with a second debug-found companion, and his tiny-gap chest in Stage 4.
5. Clear Pohon Beringin's five seals, rest before the arena, then defeat all three rounds. Check root slam, falling leaves, dimming pulse, intervening Kata Kunci, heart container, proverb Repository entry and no duplicate rewards after reload.
6. Rotate during CM/TD, test four simultaneous touches, move/resize controls, and run normal and low-power modes. Check offline reload after one complete online load.

## Acceptance and remaining device checks

- PASS (logic checks plus browser sampling): four engines, 25 solvable puzzles, tier filtering, replay-safe resets, hints, five-seal gates, draft content validation, Kancil recruitment/selection, boss round/reward logic.
- NOT TESTED: every puzzle solved manually on a physical phone, complete guardian resume interaction, unassisted Beringin victory on Biasa, companion swapping by touch, portrait touch layout, four simultaneous touches, full offline device replay, sustained 60 fps on a mid-range phone.
- NOT TESTED: editorial correctness. All wording remains draft for a Malay editor, including the six prototype sentences.

Low-power mode was visibly capped at about 30 fps in remote browser checks. That does not establish the 60 fps phone target.
