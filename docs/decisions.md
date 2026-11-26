# Phase 1 decisions

- The first playable deliverable is a grey-box arena. World stages, puzzles, companions, ads, purchases and music remain outside this phase. Disabled companion buttons are present so the complete touch arc can be arranged.
- Three looks use generated 64×64 textures and one 24×39 physics body. Four selectable skin tones are cosmetic. No external assets are used.
- Wall jump, full dash and glide have code paths with false unlock flags. Langkah remains a short dodge.
- A resting bench checkpoints Kata; the hero respawns at the arena entrance. Bayang holds lost Kata until touched; it does not spawn in the pit.
- Phaser 3.90.0 is pinned from jsDelivr. Service worker stores same-origin modules as they are requested and the engine on install. First load requires network.
- JSON modules with import attributes require a current browser engine. Test in current Chrome or Firefox on Android.
- Settings and checkpoint share one versioned localStorage record. Private browsing or quota denial means settings remain in memory for that session.
- Sound is synthetic WebAudio. The sound class is the later /audio replacement hook.
- The Phase 1 combat HUD places a large Libas action at the lower right and Teman/Tukar below Semangat. Existing saved layouts migrate these three controls once; other custom positions stay intact. Reset restores the new defaults.
- The action label is Tetak. Phase 1 uses a large lower-right Tetak button with a separated arc of jump, dodge, parry, heal, Ink and Pledge actions. Saved layouts migrate once to the new arrangement.
- The grey-box wall is short enough to clear with the starting jump. Wall-jump, dash and glide remain progression-locked. Platforms and the wall are configured in combat.json so the whole test route is traversable.

# Phase 0 foundation added after Phase 1

- The earlier combat arena remains available from the empty Balai Cerita camp. Boot starts at Title so first-time players choose a name, look, language and tier before entering it.
- Save schema 2 migrates the existing schema 1 record in place under the same localStorage key, preserving Kata and button layouts. A migration stub supplies ability and companion flags.
- Four pointer slots are configured in Phaser; a simultaneous three-finger touch opens the diagnostic panel. Debug unlocks are saved for future phases and do not turn the locked Phase 1 moves into finished progression content.
- The two content entries are draft validator samples, not a stage word bank. Content wording awaits Malay editorial review.
- The web manifest uses a CSS named colour because JSON cannot import palette tokens. The page applies palette tokens at startup. No external images, sound or fonts are included.
- Existing phones can retain Phase 1 modules under a cache-first service worker while receiving Phase 0 scenes. All local module and JSON import URLs now share a version token, including the palette and save defaults. Each release refreshes that token and the service worker cache name together. Startup errors report the actual exception without assuming an internet fault.

# Phase 1 control simplification

- The boy and the headscarf girl are the only selectable hero looks. Old Girl B saves migrate to the girl without erasing the player's name, Kata or other settings.
- Enemies are defeated with a descending top contact and a bounce. Side or underside contact damages the hero. Enemy proximity attacks and melee buttons are removed from this arena revision; enemies still dissolve into collectible letters.
- A second Jump press within 500 ms of takeoff makes a double jump. Jump while touching a wall makes a wall jump. Both are available from the start so the test route works without ability unlocks.
- The future ranged attack has a reserved position diagonally above Jump, but is hidden until its ability and implementation both exist. The layout editor now migrates only Jump and this reserved position once.
- The play camera zooms slightly and follows the hero; a separate UI camera keeps thumb controls at fixed screen positions. Ink remains saved internally but is hidden from the simplified HUD.
- Live play showed the first enemy under a raised platform. The test enemies now occupy open ground, spaced from the starting bench and pit, so top-down stomps can be practiced without a platform intercepting the fall.

## Phase 2 (2026-11-26)

- Add a native DOM dialog above Phaser so 56px targets are measured in physical CSS pixels rather than shrinking with a 960×540 canvas. Touch tapping is the primary interaction for all variants; the page stays fixed and short panels scroll internally.
- Pause the calling scene, physics and input before opening. Call SceneManager pause/resume directly so chained puzzle callbacks cannot race queued scene operations. Clear held movement and keyboard keys, and restore the previous pause/input state only after the closing transition.
- Exploration mistakes remove one Semangat, floored at one, without knockback, death or Kata loss. Boss mistakes cost no health or Kata and resume with the stage's `buff` callback. Closing a puzzle is always available and has no success/failure effect.
- Hints cost 20, 40, 80 within one modal session, then stop. Kancil is available when his party flag is set (the test room has an isolated override), usable once per modal, and removes one wrong choice. In pairing puzzles remove a wrong pairing edge; in the single-pair boss wrapper reveal the valid pairing because there is no wrong edge to remove. Paid hints also show a clue or next correct action.
- All eleven Master Prompt word banks load from same-origin JSON. `puzzles.json` adds explicitly authored repairs, linked clauses, odd-one-out items and chains; infer no unsupported Malay morphology from a heuristic. meN sound changes are authored in affixes.json, with rule notes. Generic distractor generation excludes every accepted answer after normalization.
- Peribahasa expressions and source IDs come from the user's `KriptograMelayu_127_Peribahasa_Diluluskan.md` (17 October version). Meanings are newly paraphrased rather than copied wholesale; English glosses are new. Editorial approval for that project does not approve these adaptations, which remain draft.
- Seed 30 sentence items; 20 each of affixes, parts of speech, synonyms, antonyms and translations; ten peribahasa; nine names; variant-specific distractors and 21 additional exercises. Jawi/dialects are empty, disabled banks until their later phase.
- Test-room health and Kata are isolated from campaign saves. The reusable overlay defaults to the caller's real hero/Kata wallet and persists through the caller's save hook.
- Preserve the existing save key/schema and all simplified Phase 1 controls. Update the service-worker resource version consistently so old code and new imports cannot mix.

## Phase 3 (2026-11-26)

- The camp is a procedural warm firelit room with letter fireflies and a quiet synthesized gamelan-like tone. Audio begins only after a camp tap, respecting mobile audio unlock rules. There are no external audio or art downloads.
- Kancil is the only story companion authored in this phase. Other companion records and generic follow/retreat/stun scaffolding support debug testing without claiming later-stage abilities or stories are finished.
- A Setia attempt contains three riddle-chain puzzles. Any wrong answer marks that attempt unfinished at the end of the chain; the player can correct and continue without a failure screen. Closing the overlay preserves the current step. Two replays cost 60 then 120 Kata; free mode additionally asks for one opt-in mock rewarded ad for each replay. The mock close button unlocks after five seconds. Ad-free skips only the ad. No attempt has a time limit.
- The seven boss peribahasa entries are draft editorial text. Debug collection demonstrates the Repository and seven-entry achievement until boss scenes exist. Two azimat have two notches: Laju boosts early arena movement; Kebal blocks two later contacts. Purchasing and refilling costs live in economy.json.
- The first bench is discovered by default. The far bench is discovered by approaching it, and fast travel selects the spawn in the arena. Companion world sprites have no physics bodies and cannot block the hero. The Kancil command crosses the small gap in the wall and reveals a one-time Kata cache.
- Phase 3 branches from the open phase-2 pull request and targets phase-2; no later stages or production ad integration are included.

## Phase 4 — Rimba Aksara

- Stage 1 is a separate scene with twelve reciprocal rooms, three local Pondok checkpoints, an explored-room mini-map and fast travel to discovered Pondok. Root Guard → reward chest → physical wall-jump shaft → syntax gate → Kancil → Beringin is the mandatory route. The gap and stone barrier are optional backtracking chests; Rimau is not recruited in this phase.
- The simplified test arena retains its temporary wall-jump/double-jump conveniences. Campaign abilities are acquired from Stage 1 state, not from arena demo flags. Save schema 4 migrates old records without discarding Kata, purchases, repository or earned Setia. Unrecruited demo Kancil is removed from campaign party; earned Setia is retained.
- Syntax content is 30 distinct entries per variant (10 per tier), replacing the earlier smaller seed sets. The affix door uses only meN-, ber- and di-. Each of the three mandatory syntax doors restores three lines, with progress saved between questions. Exploration puzzles never kill or cost Kata for a wrong answer.
- New combat uses the existing hero and procedurally generated leaf, beetle, root guard and banyan silhouettes. Slash, ink, dodge, parry and heal are active in Stage 1; the arena's simplified contact design is preserved. Beetle tell is 600ms on Biasa, scaled by the existing difficulty multipliers. Tree/guard attacks have distinct tells and recovery windows. No later-stage ability is introduced.
- Kancil recruitment is required before leaving his room toward the boss. His camp bonding dialogue unlocks a tier-aware, written 3a → 3b → 3d Setia chain. Existing two-replay costs, opt-in five-second mock ad, last-chance warning and soft closure are retained. Setia grants a passive extra free hint as well as the Pledge move.
- Exact rainforest palette comes from palette.stage1, sun-shaft opacity is 0.15, with four parallax rates, mist, letters, hanging roots, dew and sparse foreground leaves. Emerald heroes have a 3.5px procedural rim plus a subtle outline halo. Audio is original WebAudio: frog/insect bed and soft saron/gender-like tones; /audio remains the replacement hook.
- The ten-second post-boss shadow copies Kancil's sprite pose/flip/scale. Its completion, the proverb and boss death persist independently so a reload cannot duplicate the reward. All Malay content remains draft pending editorial approval.
- The 20–30 minute target is a first-time playtest target, not a timer or forced waiting period. Automated engine checks verify progression and mechanics; unassisted completion time, Biasa attempts and mid-range Android performance require device playtesting.
- Root-source GitHub Pages workflow remains buildless. dist/ and .openai/ are ignored local preview files. Versioned v21 imports and a new service-worker cache prefetch both canonical and versioned module URLs to prevent stale phase code after updates.

## Master Prompt v2 / top-down Phase 1 (2026-11-26)

- This rework supersedes the earlier phases. Original content and all side-view code remain recoverable at snapshot `31113195d634a3738804c2b87c03d7a261d5f679` on branch/tag `legacy-sidescroller`. A branch-scoped backup workflow creates the immutable remote tag because the GitHub connector exposes branch creation but no tag endpoint.
- Use a separate `hikayat-bisu-topdown` save key, `format: topdown`, schema 2. Legacy numbered schemas 1–4 belong to the old game and are distinguished by format. Copy hero identity, preferences, Kata, repository and ad-free status; drop obsolete ability, charm, platformer and stage state. The previous storage record is not deleted.
- The addendum wins over the contradictory removal/entrance-respawn lines: keep Bayang at the defeat room, holding floor(50% of Kata). A second defeat replaces the old Bayang and permanently loses its held Kata. Respawn at the last Pondok with full hearts, preserving seals. Stage entrance is the first rest point.
- Continuous pixel movement snaps input to one dominant axis on 48px collision tiles. Walls and water are solid; actor sprites share the renderer but use data-driven collision radii independently of art. No gravity/Arcade platformer system is configured.
- Show only hearts and Kata during play. Kepingan Hikayat, three Kunci Kecil slots, volume, map, repository and settings live in Menu as the addendum requests. Companion buttons appear only when a found party is selected.
- Stage 1 has five real rooms, five TEMP shrines and no story companion unlock. Each stub uses the PuzzleHost interface and emits solved/failed events; authored CR/RV/CM/TD play is deferred to Phase 2. Preserve the old word banks as draft data with chapter and bilingual note metadata, but disconnect the retired puzzle-test UI.
- Keep the existing exact Phaser 3.90.0 CDN ES module. A configurable renderer maps placeholder keys to future sheet paths/frames. No paid or copyrighted game assets, fonts or music are introduced; the named inspirations guide only mood and interaction.
- The warm camp and Rimba use simple procedural art, a soft canvas lighting mask and pooled floating letters. Future biome configurations are present; their stages are not built. Low-power mode reduces lights/particles and caps the loop at 30 fps.
- Content validation checks every implemented stage listed in the 40-entry catalog. Unimplemented map entries have no playable file yet, keeping this phase limited to Chapter 1 Stage 1. The Crossy Syntax prototype is not in this repository; porting its six authored entries belongs with the later puzzle-content phase.

- Use Phaser's native timeout loop for a predictable mobile power toggle. PowerMode keeps the cached target and public timer delay together; low power was checked around 28 fps in the remote browser with the configured 30 fps target.
