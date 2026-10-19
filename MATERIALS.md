# 素材清单 (Materials Checklist)

Priority: **P0** = needed before launch · **P1** = strongly recommended · **P2** = nice to have.
The "Goes to" column is where to drop each file / which data file to edit. Any image not yet provided shows up on the page as a dashed placeholder box labeled with its expected path.

## 1. Basic info → `index.html` (search for `TODO(素材)`)

| # | Item | Pri | Notes |
|---|---|---|---|
| 1.1 | Benchmark name + paper title / subtitle | P0 | Name should be short; the subtitle is usually phrased as a question ("Can Agents …?") |
| 1.2 | One-line core question (tagline) | P0 | The headline at the top of Overview |
| 1.3 | Author list, homepage links, affiliations, equal-contribution / corresponding marks | P0 | |
| 1.4 | Venue / status | P1 | e.g. Preprint, NeurIPS D&B 2026 |
| 1.5 | Link URLs: Paper PDF, arXiv, GitHub, Dataset (HF), contact email | P0 | Put the PDF at `static/pdf/paper.pdf` if self-hosting |
| 1.6 | Abstract | P0 | |
| 1.7 | BibTeX | P0 | |
| 1.8 | Acknowledgements + footer tagline | P1 | |

## 2. Brand visuals → `static/images/`

| # | File | Pri | Specs |
|---|---|---|---|
| 2.1 | `logo.png` | P2 | Horizontal benchmark logo, transparent background, height ≥ 144px |
| 2.2 | `favicon.svg` | P1 | Square |
| 2.3 | `og-cover.png` | P1 | 1200×630, the preview card for shares on Twitter / Slack / WeChat |
| 2.4 | Theme color | P2 | Currently purple `#5b4bff`; change `--accent` in `assets/css/style.css` |

## 3. Paper figures → `static/images/figures/` (vector exports or ≥2x PNG; transparent or white backgrounds both work, as long as they read in dark mode)

| # | File | Pri | Content |
|---|---|---|---|
| 3.1 | `teaser.png` (or `teaser.mp4`) | P0 | Main visual: one image/clip that explains what the bench does. A collage of several generated game screenshots works well. Suggested 2400×1200 |
| 3.2 | `overview.png` | P0 | Method / pipeline overview (task → agent → artifact → evaluation) |
| 3.3 | `eval-pipeline.png` | P0 | Evaluation pipeline diagram |
| 3.4 | `task-distribution.png` | P2 | Task distribution chart (the page can also generate a bar chart from data automatically) |
| 3.5 | `example-task.png` | P1 | Output screenshot / scoring illustration for one representative task |
| 3.6 | `finding-1.png` … `finding-N.png` | P1 | Key charts from the Analysis section (scaling curves, judge consistency, etc.) |

## 4. Structured content → `data/content.js`

| # | Item | Pri | Notes |
|---|---|---|---|
| 4.1 | Overview numbers (4) | P0 | Task count, number of categories, number of rubric dimensions, environment/engine |
| 4.2 | Design principles (Desiderata), 3 items | P0 | Title + 1–2 sentences each |
| 4.3 | Comparison table against existing benchmarks | P0 | Columns = your differentiating dimensions; rows = GameDevBench, GameCraft-Bench, etc. + Ours |
| 4.4 | Task categories + counts | P0 | |
| 4.5 | Prompt of one representative task | P1 | Goes in `#examplePrompt` in `index.html` |
| 4.6 | Evaluation steps (3–6) | P0 | |
| 4.7 | Rubric dimensions (key / short name / description) | P0 | The keys must match the score fields in the leaderboard and demos |
| 4.8 | Key findings, 3–5 items | P0 | Title + one paragraph each, optionally with a chart |

## 5. Leaderboard → `data/leaderboard.js`

| # | Item | Pri | Notes |
|---|---|---|---|
| 5.1 | Per entry: Agent framework, Model, provider, Vision/Text, open-weight or not, release date | P0 | |
| 5.2 | Per entry: Overall + per-rubric scores (0–100) | P0 | |
| 5.3 | Confidence interval / std (optional) | P1 | Shown as ±; also state how many runs |
| 5.4 | Score notes + last-updated date | P0 | |
| 5.5 | Provider logos `static/images/logos/*.svg` | P1 | Anthropic, OpenAI, Google, Moonshot, Qwen, DeepSeek, Zhipu, Xiaomi… square SVGs |

## 6. Demos → `data/demos.js` + `static/videos|posters|games/`

Pick **3–6 representative cases per model**, ideally covering different categories and both high- and low-scoring games (including failure cases makes the page more credible).

| # | Item | Pri | Specs |
|---|---|---|---|
| 6.1 | Gameplay recording `static/videos/<model>__<task>.mp4` | P0 | H.264, 720p, 15–30s, muted, ≤ 8MB per file (`ffmpeg -i in.mov -vf scale=-2:720 -c:v libx264 -crf 26 -an -movflags +faststart out.mp4`) |
| 6.2 | Cover image `static/posters/<model>__<task>.jpg` | P0 | 16:9, first frame or a highlight frame, ≤ 200KB |
| 6.3 | Game title / category / Agent / scores | P0 | Same fields as the leaderboard |
| 6.4 | Playable web build `static/games/<model>__<task>/index.html` | P1 | e.g. a Godot HTML5 export. Pick 3–5 that run smoothly. **Note:** Godot 4 web exports need SharedArrayBuffer (COOP/COEP headers), which GitHub Pages does not support → either use single-threaded export (Godot 4.3+ can disable Thread Support) or host on Netlify/Vercel/Cloudflare and configure the headers |
| 6.5 | Task prompt for each demo (optional) | P2 | Can be added later as an expandable view |

## 7. Deployment

| # | Item | Pri | Notes |
|---|---|---|---|
| 7.1 | Hosting choice: GitHub Pages / Cloudflare Pages / Vercel | P0 | If there are playable games, Cloudflare/Netlify are recommended (custom headers) |
| 7.2 | Domain (e.g. `bench.rezona.ai`) | P1 | |
| 7.3 | Analytics (GA / Plausible / visitor badge) | P2 | |
| 7.4 | Large-file strategy | P1 | If total videos + game packages > 1GB, consider Git LFS or a CDN/OSS |
