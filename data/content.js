// 结构化的页面内容。所有值均为占位符，替换为真实素材即可。
window.BENCH = window.BENCH || {};

// Overview 顶部数字卡片
BENCH.stats = [
  { value: "000", label: "Tasks" },
  { value: "6", label: "Game Categories" },
  { value: "0", label: "Rubric Categories" },
  { value: "XX", label: "Environment / Engine" },
];

// 设计原则（3 条左右）。key 为小标签（像素字体显示）
BENCH.desiderata = [
  { key: "Grounding", title: "Desideratum A", desc: "TODO: one or two sentences explaining this principle." },
  { key: "Completeness", title: "Desideratum B", desc: "TODO: one or two sentences explaining this principle." },
  { key: "Verification", title: "Desideratum C", desc: "TODO: one or two sentences explaining this principle." },
];

// 与已有 benchmark 对比。true/false 渲染为 ✓/✗，字符串原样显示
BENCH.comparison = {
  columns: ["Benchmark", "Environment", "Desideratum A", "Desideratum B", "Desideratum C", "# Tasks"],
  rows: [
    ["GameDevBench", "Godot", false, false, true, "333"],
    ["Other Bench", "Web", true, false, false, "—"],
    ["Other Bench 2", "Web", true, true, false, "—"],
    { highlight: true, cells: ["BenchName (Ours)", "TODO", true, true, true, "000"] },
  ],
};

// 任务类别及数量（count 未知时为 null，只显示类别名）
BENCH.families = [
  { name: "Action", count: null },
  { name: "Strategy", count: null },
  { name: "Adventure & Puzzle", count: null },
  { name: "Simulation & Sandbox", count: null },
  { name: "Social & Tabletop", count: null },
  { name: "RPG", count: null },
];

// 评测流程步骤
BENCH.evalSteps = [
  { title: "Step 1", desc: "TODO: e.g. package task, environment, and hidden rubric." },
  { title: "Step 2", desc: "TODO: e.g. agent produces artifact + traces." },
  { title: "Step 3", desc: "TODO: e.g. gate on launchability." },
  { title: "Step 4", desc: "TODO: e.g. collect gameplay evidence." },
  { title: "Step 5", desc: "TODO: e.g. score evidence against rubric." },
];

// 评分维度（key 需与 leaderboard.js 中 scores 的字段一致）
BENCH.rubrics = [
  { key: "mechanics", short: "Mech.", title: "Core Mechanics", desc: "TODO: what this category measures." },
  { key: "depth", short: "Depth", title: "Content Depth", desc: "TODO: what this category measures." },
  { key: "visuals", short: "Visuals", title: "Functional Visuals", desc: "TODO: what this category measures." },
  { key: "art", short: "Art", title: "Art & Presentation", desc: "TODO: what this category measures." },
];

// 主要发现（3–5 条）
BENCH.findings = [
  { title: "Finding 1", desc: "TODO: one-paragraph takeaway.", image: "static/images/figures/finding-1.png" },
  { title: "Finding 2", desc: "TODO: one-paragraph takeaway.", image: "static/images/figures/finding-2.png" },
  { title: "Finding 3", desc: "TODO: one-paragraph takeaway.", image: "" },
  { title: "Finding 4", desc: "TODO: one-paragraph takeaway.", image: "" },
];
