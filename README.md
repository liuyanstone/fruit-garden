# Fruit Garden / 果香消消乐
An original bilingual, accessible fruit match-3 game for GitHub Pages. No installation, login, ads or external dependencies.

Choose Easy (7×7, 32 moves, 5 fruit types), Medium (8×8, 30 moves, 6 types) or Hard (9×9, 28 moves, 6 types). Every game has a randomly seeded board, fruit palette, shape and one of six challenges: collect fruit, melt ice, open crates, deliver baskets, activate specials, or a mixed adventure. Every initial board is stable and has a legal move. Stuck boards reshuffle automatically. Random challenges are not guaranteed wins within the move budget.

Match 4 for rockets, 5 for rainbow fruit, and T/L shapes for flower bombs. Special combinations include crossed rockets, wide bomb/rocket blasts, double bombs, rainbow/color clears and rainbow/special chains. Hammer and shuffle boosters cost no moves. Hints are unlimited. Use touch swipes, click two neighbors, or arrows plus Enter/Space.

Score: fruit 10 × cascade (capped at ×5), each special 40, ice layer 20, crate 50, basket 250. Win bonus (300 + remaining moves × 50) × difficulty multiplier 1/1.5/2. Stars reflect remaining moves. Daily highest completed score is stored separately per difficulty using the device’s local date. All state and sound preferences stay in localStorage (`fruit-garden-v1`, `fruit-garden-language`). Scores include unsuccessful completed attempts. Original SVG fruit artwork, no borrowed game assets.

Serve this directory using any static HTTP server. Run `node check.mjs` for engine and content verification. Entry: index.html. Engine: engine.mjs. Browser UI: app.mjs. All content is bilingual and uses no network libraries.
