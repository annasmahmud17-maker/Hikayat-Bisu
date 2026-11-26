# Phase 2 — Puzzle engine and word banks

Scope: reusable puzzles and the test room only. No stage, companion quest, economy shop or later-phase content is implemented. Phase 1's boy/girl selection and simplified controls are retained.

## Phone testing

1. Open the Phase 2 branch through a static web server. From Balai Cerita choose **Bilik Ujian Teka-teki**. The pull request must be merged before GitHub Pages on `main` serves it.
2. Select a variant and tier, then **Buka teka-teki**. Sentence building uses tapping: tap bank words in order and tap answer words to return them. Panels scroll internally on short landscape screens. Sorting uses word then altar; pairing uses left then right; translation repair uses wrong word then replacement.
3. Try wrong answers repeatedly. Semangat stops at 1; Kata stays unchanged. Complete the same puzzle afterwards.
4. Enable the test-room Kancil checkbox, reopen and request his free hint. Then buy hints for 20, 40 and 80 Kata. The wallet here is isolated test money and health, reset on entering the room.
5. Switch Mudah/Biasa/Mahir and inspect different vocabulary. Test translations in both directions. Use **Teruskan** in the room to cycle through more items; in a solved modal it closes the modal.
6. Choose **Uji Kata Kunci**. The action pulse and moving gold marker freeze behind the panel. Correct answers increment the stun counter; wrong answers close the panel and increment boss strength. The pulse resumes after closing. Closing without answering applies neither effect.
7. Open **Penyemak Kandungan**. Clean banks show zero errors and 218 draft warnings. **Uji entri rosak** injects a broken copy in memory and reports duplicate ID, malformed tokens, missing accepted answers and invalid review status. Run normal validation again to clear the injected fixture.
8. Load online once, wait for the service worker to finish, then reload in airplane mode and repeat a puzzle and validation. Check on a real phone before accepting this as device/offline tested.

## Automated checks

Run `node --test tests/puzzles.test.mjs` with Node 24+. No installation or build step.

- Seed quotas, all 12 loaders, schemas and draft audit.
- Every generated model for all 16 active variants, all tiers, both translation directions and ten indices (960 models).
- Accepted-answer case/spacing normalization, lexical alternatives, reachability of sentence tokens, safe distractors, disabled future variants.
- Repeated mistakes preserve Kata and at least one health; boss mistakes do not charge health.
- Kancil once, hint escalation 20/40/80, insufficient funds and exhausted hints.
- Deliberately malformed fixture returns useful errors instead of crashing the validator.

Open `tests/mobile.html` on the same static server and click **Run Phase 2 QA**. This browser harness additionally solves variants using rendered buttons in a 740×360 viewport, checks physical CSS target dimensions, verifies Phaser scene/physics/input pause restoration, and exercises boss results. It reports its results above the test viewport.

## Acceptance record

- [x] All active variants have touch controls with at least 56 CSS px button targets; no keyboard is required.
- [x] Wrong answers cannot hard-lock exploration; health is floored at 1, no Kata loss, immediate retry.
- [x] Exact tier filtering changes vocabulary.
- [x] Reusable Kata Kunci wrapper pauses action and restores prior input/physics state.
- [x] Validator identifies the deliberately broken entry.
- [x] Puzzle prompts, clues, tokens, answer lists and hint text come from JSON; interface strings are in both locale JSON files.
- [ ] Physical Android device playthrough: not tested in this environment.
- [ ] Airplane-mode reload on a physical phone: not tested in this environment.
- [ ] Malay editorial approval: pending; every seeded entry remains draft.

## Intentional limits

Jawi and dialect banks are empty stubs and their flags are false. Three-step paid hints stop after the third purchase. Kancil removes a wrong token/option/pair edge where one exists; for a one-pair boss puzzle with no disposable option he reveals the valid pairing. A boss failure resumes the fight and calls `buff`; the actual boss's buff and stun implementations belong to its stage phase. Translation word banks expose only alternatives constructible from their tokens; the validator and model tests check this. New lexical alternatives must include compatible tokens or use a separately authored exercise.

## Verification result (2026-11-26)

Node: 9/9 tests passed, including 960 model combinations. Browser: 96/96 variant/tier/direction button-driven solves passed at 740×360, 32/32 boss success/failure outcomes passed, all puzzle buttons measured at least 56 CSS px (allowing subpixel rounding), Phaser scene/input/physics resumed, hint charges and the repeated-error floor passed. The browser validator reported zero errors for 218 draft entries and six diagnostic errors for the injected broken entry. Physical touch hardware and airplane mode remain untested.
