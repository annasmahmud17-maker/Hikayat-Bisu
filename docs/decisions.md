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
