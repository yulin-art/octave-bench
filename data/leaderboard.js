// 排行榜数据。分数为 0–100；rank 按 overall 自动计算。
// 分数尚未提供：scores 为 null 时显示 “—”，表格按模型名排列。
window.BENCH = window.BENCH || {};

BENCH.leaderboard = {
  updated: "",
  note: "Scores will be released together with the paper.",
  entries: [
    { model: "Fable 5.1 xhigh", org: "Anthropic", agent: "", type: "", open: false, date: "", scores: null },
    { model: "GPT-6 Astra", org: "OpenAI", agent: "", type: "", open: false, date: "", scores: null },
    { model: "GPT-5.6-sol", org: "OpenAI", agent: "", type: "", open: false, date: "", scores: null },
    { model: "Seed Evolving V4", org: "ByteDance Seed", agent: "", type: "", open: false, date: "", scores: null },
    { model: "GLM-5.3", org: "Zhipu AI", agent: "", type: "", open: false, date: "", scores: null },
    { model: "DeepSeek-V4-Pro", org: "DeepSeek", agent: "", type: "", open: false, date: "", scores: null },
  ],
};
