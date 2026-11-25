# Hikayat Bisu — foundation and simplified test arena

This static Phaser 3.90.0 ES-module project has no bundler or build step. It starts at Title, then enters Balai Cerita camp. The test arena is accessible from camp. Choose a boy or girl hero, name, language, and difficulty tier. Settings and Kata save locally. There are no accounts, analytics, or tracking.

## GitHub Pages

In repository Settings → Pages select **Deploy from a branch**, branch **main**, folder **/(root)**. Open the resulting Pages link in a current phone browser in landscape. Add to Home Screen for fullscreen. Load once online for offline caching. A local preview can run with `python3 -m http.server 8000` from the root; direct `file://` loading cannot import JSON or register a service worker.

## Controls

Move with the floating left stick. Jump with the large right button; press again quickly in the air for a double jump. Jump while touching a wall to leap away. Land on enemies from above to defeat them and bounce. Touching their sides or underside costs Semangat. A future ranged Attack button is reserved diagonally above Jump and remains hidden until that ability is implemented. On a keyboard, A/D or arrows move and Space jumps; a controller's left stick and south button also work.

The top-right **Susun Butang** control opens the layout editor to move and resize the Jump button. Three fingers toggle debug information and future ability flags. The two sample puzzle entries can be checked at `/tools/validate.html`. Stages and puzzle gameplay are reserved for later phases. Visuals and audio are procedural.
