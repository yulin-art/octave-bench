// 结构化的页面内容。来源：website_summary_20261020（分析版本 2026-10-15）。
window.BENCH = window.BENCH || {};

// 首屏下方数字条
BENCH.stats = [
  { value: "180", label: "Tasks" },
  { value: "1,800", label: "Requirements" },
  { value: "8", label: "Capability dimensions" },
  { value: "12", label: "Model–harness pairs" },
];

// 设计原则。key 为小标签（像素字体显示）
BENCH.desiderata = [
  { key: "Coverage", title: "Built around capabilities", desc: "Every task is annotated with the game-development capabilities it exercises, and the suite is constructed so that all eight dimensions, C1–C8, are covered." },
  { key: "Depth", title: "Public and hidden requirements", desc: "Each task has six public Completeness requirements and four hidden Richness requirements that probe deeper relationships, edge cases and cross-system coupling." },
  { key: "Realism", title: "Real sources, real platforms", desc: "Tasks come from player requests, commercial-mechanics reconstructions and expert designs, and span PC Web and Mobile Web, 2D and 3D." },
];

// 与已有 benchmark 对比。true/false 渲染为 ✓/✗，字符串原样显示
BENCH.comparison = {
  columns: ["Benchmark", "Environment", "Tasks", "Capability-controlled", "Hidden requirements", "Mobile Web", "Complete game"],
  rows: [
    ["GameDevBench", "Godot editor tasks", "333", false, false, false, false],
    ["OpenGame-Bench", "Web game generation", "150", false, false, false, true],
    ["GameCraft-Bench", "Real game engine", "140", false, "Partial", false, true],
    ["WebGameBench", "Browser games", "111", false, false, false, true],
    ["GameXpert-Bench", "Web games", "97", false, true, false, true],
    { highlight: true, cells: ["OCTAVE (Ours)", "HTML5 / Web browser", "180", true, true, true, true] },
  ],
};

// 任务类别及数量
BENCH.families = [
  { name: "Action", count: 30 },
  { name: "Strategy", count: 34 },
  { name: "Adventure & Puzzle", count: 31 },
  { name: "Simulation & Sandbox", count: 45 },
  { name: "Social & Tabletop", count: 16 },
  { name: "RPG", count: 24 },
];
BENCH.suiteSplit = [
  { label: "PC Web", count: 95 }, { label: "Mobile Web", count: 85 },
  { label: "2D", count: 91 }, { label: "3D", count: 89 },
];

// 示例任务（英文翻译，原始为中文）
BENCH.exampleTask = {
  id: "hard_action_rpg_3d_017",
  tags: "RPG · 3D · PC Web",
  prompt: `Create a director-AI dynamic dungeon game. An invisible director adjusts pressure according to the player state, while a class-based party uses destructible walls to reroute.

Core mechanics
A multi-level dungeon contains rooms, destructible walls, and enemy squads. The director continuously observes health, resources, progression speed, and kill efficiency: it increases pressure during efficient progression, slows down and provides supplies when the player is near death, and creates enemy-spawn waves with peaks and troughs. The party includes a tank, ranged attacker, and healer. After a wall is destroyed, both the player and enemies update their routes. Reaching the core wins; death loses.

Must implement
In controlled runs, efficient and endangered players must experience different spawn intensity; sustained danger must trigger supplies or slower spawning; the spawn sequence must contain peaks and troughs; the three classes must act according to their roles; destroying a wall must open a traversable route that enemies can use; each level must remain connected, win/loss must be defined, and seeded restarts must be deterministic.

Creative freedom
Class count, dungeon theme, equipment, and additional events are unconstrained.`,
};

// 评测流程步骤
BENCH.evalSteps = [
  { title: "Generate", desc: "Each of 12 model–harness pairs (Claude Code or Codex CLI) builds every task from a blank workspace within 120 minutes. The final attempt is kept." },
  { title: "Static gate", desc: "Entry files, imports and the execution path are checked in the source. Failures are flagged for diagnosis, not removed." },
  { title: "Source judge", desc: "A judge reads the specification and source and marks every public and hidden requirement as pass or fail." },
  { title: "Human cross-check", desc: "A sample of requirement judgments is re-labeled by people to measure where the judge disagrees." },
  { title: "Average all attempts", desc: "All 2,160 attempts count. Missing artifacts score zero on all ten requirements." },
];

// 能力维度 C1–C8（key 需与 leaderboard.js 中 caps 的字段一致）
BENCH.rubrics = [
  { key: "C1", title: "Core Rules", desc: "Rules, state transitions, core mechanics, and win/loss conditions." },
  { key: "C2", title: "AI / NPC", desc: "NPC behavior, decision logic, and autonomous system behavior." },
  { key: "C3", title: "Numerical Design", desc: "Attributes, resources, economy, progression, and numerical relationships." },
  { key: "C4", title: "Interaction & Input", desc: "Player input, interaction mappings, and controls." },
  { key: "C5", title: "Levels & Scenes", desc: "Spatial organization, levels, scenes, and progression." },
  { key: "C6", title: "Animation & Rendering", desc: "Rendering, animation, and dynamic visual states." },
  { key: "C7", title: "Feedback & Game Feel", desc: "Visual, auditory, and state feedback linked to actions and events." },
  { key: "C8", title: "Guidance & Meta-UI", desc: "Tutorials, hints, HUDs, menus, pausing, and end-of-game summaries." },
];

// 主要发现。stat 为大号数字（可选），image 为配图（可选）
BENCH.findings = [
  { title: "Delivering a working project is the first bottleneck", stat: "21.0%", statLabel: "of 2,160 attempts fail the static gate or produce no artifact",
    desc: "Rates range from 13.3% for GPT-6 Astra to 33.3% for Seed Evolving V4. Because failed attempts stay in the averages, delivery problems lower every score downstream.", wide: true },
  { title: "No independently judged system meets the specification reliably", stat: "44.7 / 40.7", statLabel: "Fable 5.1: best Completeness / Richness without self-evaluation",
    desc: "Among combinations whose evaluator is a different model, none passes more than 50% of requirements on either layer." },
  { title: "Task source changes how hard a task looks",
    desc: "Player requests score 27.4% / 28.8% (Completeness / Richness), commercial-mechanics reconstructions 52.0% / 49.2%, and expert-designed tasks 65.1% / 72.7%.",
    image: "static/images/figures/finding-source.png" },
  { title: "Capability gaps concentrate in experience-side loops",
    desc: "C1 Core Rules and C3 Numerical Design are relatively strong, while C7 Feedback & Game Feel is lowest overall. On hidden requirements, C4 Interaction & Input also falls behind.",
    image: "static/images/figures/finding-capability.png" },
  { title: "One aggregate hides platform and evaluator effects",
    desc: "Mobile scores higher than PC on both layers and fails the gate less often, and GPT-6 Astra benefits from same-model evaluation. Read rankings together with task composition and evaluator setup.",
    image: "static/images/figures/finding-platform.png" },
];
