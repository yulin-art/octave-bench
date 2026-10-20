# OCTAVE Website

OCTAVE: A Capability-Resolved Benchmark for End-to-End HTML5 Game Generation.

Pure static site (HTML/CSS/JS, no build step).

```bash
python3 -m http.server 8000   # → http://localhost:8000
```

## Structure

```
index.html            page skeleton + text content (search "TODO(素材)")
data/content.js       stats / desiderata / comparison / families / eval steps / rubrics / findings
data/leaderboard.js   leaderboard entries
data/demos.js         demo videos + playable builds, grouped by model
assets/css/style.css  styles (theme color: --accent)
assets/js/main.js     rendering logic
static/images/        logo, favicon, og-cover, figures/, logos/
static/videos/        gameplay mp4
static/posters/       video posters
static/games/         web game builds (<model>__<task>/index.html)
```

Missing images/videos render as dashed placeholders labeled with the expected path — drop the file in and it shows up.

See [MATERIALS.md](MATERIALS.md) for the full materials checklist.

To refresh the leaderboard from a new data export:

```bash
python3 scripts/build_leaderboard.py <website_summary>/data > data/leaderboard.js
```
