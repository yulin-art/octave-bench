// 排行榜数据：由 scripts/build_leaderboard.py 从 website_summary 导出包生成（分析版本 2026-10-15）。
// completeness = 公开要求通过率，richness = 隐藏要求通过率，gateFail = 门禁失败或缺产物比例，
// caps = C1–C8 primary capability 下的要求通过率。数值均为 0–100，保留 1 位小数。
window.BENCH = window.BENCH || {};

BENCH.leaderboard = {
  updated: "2026-10-15",
  note: "All 2,160 attempts (12 combinations × 180 tasks, one attempt each) are scored: gate failures keep their raw judgments and missing artifacts score zero. Fixed-sample descriptive results; no confidence intervals. † The evaluator is the same model.",
  entries: [
    {"model": "GPT-6 Astra", "org": "OpenAI", "key": "codex_gpt_6_astra", "harness": "Codex CLI", "selfEval": true, "completeness": 57.1, "richness": 49.3, "gateFail": 13.3, "caps": {"C1": 58.1, "C2": 46.7, "C3": 58.3, "C4": 55.2, "C5": 52.5, "C6": 51.1, "C7": 57.6, "C8": 54.0}},
    {"model": "Fable 5.1 xhigh", "org": "Anthropic", "key": "cc_fable_5_1", "harness": "Claude Code", "selfEval": false, "completeness": 44.7, "richness": 40.7, "gateFail": 17.8, "caps": {"C1": 43.9, "C2": 40.1, "C3": 46.6, "C4": 39.3, "C5": 45.9, "C6": 42.9, "C7": 41.2, "C8": 43.1}},
    {"model": "Fable 5", "org": "Anthropic", "key": "cc_fable_5", "harness": "Claude Code", "selfEval": false, "completeness": 39.0, "richness": 39.3, "gateFail": 21.1, "caps": {"C1": 41.0, "C2": 35.2, "C3": 44.7, "C4": 40.8, "C5": 35.1, "C6": 36.4, "C7": 36.5, "C8": 41.4}},
    {"model": "Opus 5", "org": "Anthropic", "key": "cc_opus_5", "harness": "Claude Code", "selfEval": false, "completeness": 37.2, "richness": 40.4, "gateFail": 16.1, "caps": {"C1": 45.1, "C2": 32.6, "C3": 40.9, "C4": 30.3, "C5": 41.3, "C6": 40.8, "C7": 29.4, "C8": 39.7}},
    {"model": "GPT-5.6-sol", "org": "OpenAI", "key": "codex_gpt_5_6_sol", "harness": "Codex CLI", "selfEval": false, "completeness": 33.4, "richness": 32.6, "gateFail": 16.7, "caps": {"C1": 40.5, "C2": 27.6, "C3": 37.5, "C4": 28.9, "C5": 34.3, "C6": 27.7, "C7": 27.1, "C8": 33.3}},
    {"model": "GLM-5.3", "org": "Zhipu AI", "key": "cc_glm_5_3", "harness": "Claude Code", "selfEval": false, "completeness": 31.1, "richness": 34.0, "gateFail": 21.7, "caps": {"C1": 34.7, "C2": 26.0, "C3": 37.5, "C4": 28.4, "C5": 33.1, "C6": 34.2, "C7": 24.7, "C8": 35.6}},
    {"model": "GPT-5.5", "org": "OpenAI", "key": "codex_gpt_5_5", "harness": "Codex CLI", "selfEval": false, "completeness": 26.9, "richness": 28.3, "gateFail": 15.6, "caps": {"C1": 32.7, "C2": 20.1, "C3": 36.0, "C4": 25.9, "C5": 26.0, "C6": 26.6, "C7": 25.9, "C8": 23.0}},
    {"model": "DeepSeek-V4.1-Flash", "org": "DeepSeek", "key": "cc_deepseek_flash_41", "harness": "Claude Code", "selfEval": false, "completeness": 25.9, "richness": 28.9, "gateFail": 20.6, "caps": {"C1": 32.7, "C2": 20.1, "C3": 34.5, "C4": 23.4, "C5": 21.5, "C6": 27.7, "C7": 21.2, "C8": 31.6}},
    {"model": "GLM-5.2", "org": "Zhipu AI", "key": "cc_glm_5_2", "harness": "Claude Code", "selfEval": false, "completeness": 24.3, "richness": 28.1, "gateFail": 26.7, "caps": {"C1": 31.8, "C2": 21.4, "C3": 32.2, "C4": 22.9, "C5": 23.1, "C6": 26.6, "C7": 12.9, "C8": 24.1}},
    {"model": "DeepSeek-V4-Flash-0731", "org": "DeepSeek", "key": "cc_deepseek_v4_flash", "harness": "Claude Code", "selfEval": false, "completeness": 23.5, "richness": 28.5, "gateFail": 26.7, "caps": {"C1": 32.4, "C2": 20.7, "C3": 25.0, "C4": 23.4, "C5": 25.6, "C6": 27.2, "C7": 15.3, "C8": 26.4}},
    {"model": "DeepSeek-V4-Pro", "org": "DeepSeek", "key": "codex_deepseek_v4_pro", "harness": "Codex CLI", "selfEval": false, "completeness": 22.2, "richness": 27.5, "gateFail": 22.8, "caps": {"C1": 27.5, "C2": 19.4, "C3": 28.8, "C4": 24.9, "C5": 26.0, "C6": 17.4, "C7": 20.0, "C8": 26.4}},
    {"model": "Seed Evolving V4", "org": "ByteDance Seed", "key": "cc_seed_evolving", "harness": "Claude Code", "selfEval": false, "completeness": 21.0, "richness": 24.9, "gateFail": 33.3, "caps": {"C1": 28.0, "C2": 18.8, "C3": 28.4, "C4": 21.9, "C5": 21.9, "C6": 15.8, "C7": 8.2, "C8": 25.3}},
  ],
};
