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
