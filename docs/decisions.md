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
