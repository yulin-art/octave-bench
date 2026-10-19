// Demo 数据，来源：飞书多维表格「录屏」「同题对比」两张表。
// tier: high | mid | low（表中「分层」高/中/低）
// scores: 分数出来后补 { overall, mechanics, depth, visuals, art }；为 null 时卡片只显示分层
// play: Web 试玩包路径（可选）
window.BENCH = window.BENCH || {};

const V = (f) => ({ video: `static/videos/${f}.mp4`, poster: `static/posters/${f}.jpg` });

BENCH.demos = [
  {
    model: "Fable 5.1 xhigh",
    org: "Anthropic",
    items: [
      { title: "Side-scrolling Shooter", task: "expert_shooter_2d_003", family: "Action", tier: "high", ...V("fable51__action-expert-shooter-2d-003") },
      { title: "Flashlight Puzzle", task: "online_l5_puzzle_3d_0223", family: "Adventure & Puzzle", tier: "high", ...V("fable51__adventure-puzzle-online-l5-puzzle-3d-0223") },
      { title: "Interactive Fiction", task: "v3_interactive_fiction_2d_062", family: "Adventure & Puzzle", tier: "high", portrait: true, ...V("fable51__adventure-puzzle-v3-interactive-fiction-2d-062") },
      { title: "Social Deduction", task: "v3_social_deduction_3d_092", family: "Social & Tabletop", tier: "mid", portrait: true, ...V("fable51__social-tabletop-v3-social-deduction-3d-092") },
      { title: "Night Market Trading", task: "hard_rewrite_075", family: "Social & Tabletop", tier: "mid", portrait: true, ...V("fable51__social-tabletop-hard-rewrite-075") },
      { title: "Action RPG", task: "online_l5_action_rpg_3d_0279", family: "RPG", tier: "low", ...V("fable51__rpg-online-l5-action-rpg-3d-0279") },
    ],
  },
  {
    model: "GPT-6 Astra",
    org: "OpenAI",
    items: [
      { title: "Real-time Strategy", task: "v3_rts_2d_023", family: "Strategy", tier: "high", ...V("gpt6-astra__strategy-v3-rts-2d-023") },
      { title: "Tower Defense Remake", task: "repro_dungeonwarfare3_mobile_2d_013", family: "Strategy", tier: "high", ...V("gpt6-astra__strategy-repro-dungeonwarfare3-mobile-2d-013") },
      { title: "Isometric Infiltration", task: "expert_puzzle_3d_009", family: "Adventure & Puzzle", tier: "high", ...V("gpt6-astra__adventure-puzzle-expert-puzzle-3d-009") },
      { title: "Side-scrolling Shooter", task: "expert_shooter_2d_003", family: "Action", tier: "mid", ...V("gpt6-astra__action-expert-shooter-2d-003") },
      { title: "Neon Platformer", task: "v3_platformer_2d_007", family: "Action", tier: "mid", ...V("gpt6-astra__action-v3-platformer-2d-007") },
      { title: "Ecosystem Sandbox", task: "hard_sandbox_3d_012", family: "Simulation & Sandbox", tier: "low", ...V("gpt6-astra__simulation-sandbox-hard-sandbox-3d-012") },
    ],
  },
];

// 同题对比：同一个任务，不同模型的产出
BENCH.compare = [
  {
    task: "expert_shooter_2d_003", title: "Side-scrolling Shooter", family: "Action",
    entries: [
      { model: "Fable 5.1 xhigh", ...V("fable51__action-expert-shooter-2d-003") },
      { model: "GPT-6 Astra", ...V("gpt6-astra__action-expert-shooter-2d-003") },
    ],
  },
  {
    task: "v3_rts_2d_023", title: "Real-time Strategy", family: "Strategy",
    entries: [
      { model: "Fable 5.1 xhigh", ...V("fable51__strategy-v3-rts-2d-023") },
      { model: "GPT-6 Astra", ...V("gpt6-astra__strategy-v3-rts-2d-023") },
    ],
  },
  {
    task: "repro_tinybookshop_mobile_2d_014", title: "Bookshop Sim Remake", family: "Social & Tabletop",
    entries: [
      { model: "Fable 5.1 xhigh", portrait: true, ...V("fable51__simulation-sandbox-repro-tinybookshop-mobile-2d-014") },
      { model: "GPT-6 Astra", ...V("gpt6-astra__social-tabletop-repro-tinybookshop-mobile-2d-014") },
    ],
  },
];

// 首屏视口轮播的片段（文件名, 起始秒）
BENCH.heroReel = [
  ["gpt6-astra__strategy-v3-rts-2d-023", 4],
  ["fable51__action-expert-shooter-2d-003", 3],
  ["gpt6-astra__adventure-puzzle-expert-puzzle-3d-009", 5],
  ["gpt6-astra__action-v3-platformer-2d-007", 2],
  ["fable51__strategy-v3-rts-2d-023", 6],
  ["gpt6-astra__simulation-sandbox-hard-sandbox-3d-012", 4],
  ["gpt6-astra__strategy-repro-dungeonwarfare3-mobile-2d-013", 3],
];
