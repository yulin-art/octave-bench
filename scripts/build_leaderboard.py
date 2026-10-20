"""Regenerate data/leaderboard.js from the H5 website data export.

Usage: python3 scripts/build_leaderboard.py <export>/data > data/leaderboard.js
Inputs: leaderboard_official.csv, model_capability_results.csv
"""
import csv, sys, json

d = sys.argv[1]
META = {  # model_key -> (display name, org); names follow the paper's Table 5
    "cc_deepseek_flash_41": ("DeepSeek-V4.1-Flash", "DeepSeek"),
    "cc_deepseek_v4_flash": ("DeepSeek-V4-Flash-0731", "DeepSeek"),
    "cc_fable_5": ("Fable 5", "Anthropic"),
    "cc_fable_5_1": ("Fable 5.1 xhigh", "Anthropic"),
    "cc_glm_5_2": ("GLM-5.2", "Zhipu AI"),
    "cc_glm_5_3": ("GLM-5.3", "Zhipu AI"),
    "cc_opus_5": ("Opus 5", "Anthropic"),
    "cc_seed_evolving": ("Seed Evolving V4", "ByteDance Seed"),
    "codex_deepseek_v4_pro": ("DeepSeek-V4-Pro", "DeepSeek"),
    "codex_gpt_5_5": ("GPT-5.5", "OpenAI"),
    "codex_gpt_5_6_sol": ("GPT-5.6-sol", "OpenAI"),
    "codex_gpt_6_astra": ("GPT-6 Astra", "OpenAI"),
}
SELF_EVAL = {"codex_gpt_6_astra"}  # evaluator is the same model
UPDATED = "2026-10-15"

p = lambda x: round(float(x) * 100, 1)
caps = {}
for r in csv.DictReader(open(f"{d}/model_capability_results.csv", encoding="utf-8-sig")):
    caps.setdefault(r["model_key"], {})[r["primary_paper"]] = p(r["rate"])
rows = []
for r in csv.DictReader(open(f"{d}/leaderboard_official.csv", encoding="utf-8-sig")):
    k = r["model_key"]
    name, org = META[k]
    rows.append({"model": name, "org": org, "key": k,
                 "harness": "Claude Code" if k.startswith("cc_") else "Codex CLI",
                 "selfEval": k in SELF_EVAL,
                 "completeness": p(r["public_rate"]), "richness": p(r["hidden_rate"]),
                 "gateFail": p(r["failure_rate"]), "caps": caps[k]})
rows.sort(key=lambda e: -e["completeness"])

print(f"""// 排行榜数据：由 scripts/build_leaderboard.py 从 website_summary 导出包生成（分析版本 {UPDATED}）。
// completeness = 公开要求通过率，richness = 隐藏要求通过率，gateFail = 门禁失败或缺产物比例，
// caps = C1–C8 primary capability 下的要求通过率。数值均为 0–100，保留 1 位小数。
window.BENCH = window.BENCH || {{}};

BENCH.leaderboard = {{
  updated: "{UPDATED}",
  note: "All 2,160 attempts (12 combinations × 180 tasks, one attempt each) are scored: gate failures keep their raw judgments and missing artifacts score zero. Fixed-sample descriptive results; no confidence intervals. † The evaluator is the same model.",
  entries: [""")
for e in rows:
    print("    " + json.dumps(e, ensure_ascii=False) + ",")
print("  ],\n};")
