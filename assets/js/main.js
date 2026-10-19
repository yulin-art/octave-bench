(() => {
  const B = window.BENCH || {};
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmt = (n) => (typeof n === "number" ? n.toFixed(1) : "—");
  const rubrics = B.rubrics || [];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TIER = { high: "Strong", mid: "Typical", low: "Weak" };

  // ---------- placeholders: 缺失的图片显示为带文件路径的占位框 ----------
  function placeholder(label, cls = "") {
    const d = document.createElement("div");
    d.className = "ph " + cls;
    d.innerHTML = `<span>${esc(label)}</span>`;
    return d;
  }
  function wireImg(img) {
    const label = img.dataset.ph || img.getAttribute("src");
    const swap = () => img.isConnected && img.replaceWith(placeholder(label, img.className));
    if (!img.getAttribute("src")) return swap();
    img.addEventListener("error", swap, { once: true });
    if (img.complete && img.naturalWidth === 0) swap();
  }
  const wireAllImgs = (root = document) => root.querySelectorAll("img[data-ph]").forEach(wireImg);

  // 厂商单字母标识（无需外部 logo 文件）
  const ORG_KEY = { Anthropic: "anthropic", OpenAI: "openai", "ByteDance Seed": "seed", "Zhipu AI": "zhipu", DeepSeek: "deepseek" };
  const orgOf = (model) => {
    for (const g of B.demos || []) if (g.model === model) return g.org;
    for (const e of (B.leaderboard || {}).entries || []) if (e.model === model) return e.org;
    return "";
  };
  const mono = (org) => org ? `<span class="mono mono-${ORG_KEY[org] || "x"}" title="${esc(org)}" aria-hidden="true">${esc(org[0])}</span>` : "";

  function wireVideo(v, onFail) {
    const fail = () => onFail && onFail();
    v.querySelector("source")?.addEventListener("error", fail, { once: true });
    v.addEventListener("error", fail, { once: true });
  }
  const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting && !reduceMotion) v.play().catch(() => {}); else v.pause();
  }), { threshold: 0.35 }) : null;

  // ---------- theme ----------
  const root = document.documentElement;
  try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
  $("#themeToggle").addEventListener("click", () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });

  // ---------- hero reel ----------
  (function heroReel() {
    const reel = B.heroReel || [];
    if (!reel.length) return;
    const meta = {};
    (B.demos || []).forEach((g) => g.items.forEach((d) => {
      meta[d.video.split("/").pop().replace(".mp4", "")] = { model: g.model, ...d };
    }));
    const vids = [$("#reelA"), $("#reelB")];
    const dots = $("#reelDots");
    dots.innerHTML = reel.map(() => "<i></i>").join("");
    let i = 0, cur = 0;
    const SHOW = 4200;

    function load(v, k) {
      const [file, start] = reel[k];
      v.src = `static/videos/${file}.mp4#t=${start}`;
      v.poster = `static/posters/${file}.jpg`;
    }
    function label(k) {
      const m = meta[reel[k][0]] || {};
      $("#reelTask").textContent = m.task ? `${m.task}` : reel[k][0];
      $("#reelModel").textContent = m.model || "";
      $("#reelFamily").textContent = m.family ? `${m.family} · ${m.title}` : "";
      [...dots.children].forEach((d, j) => d.classList.toggle("on", j === k));
    }
    load(vids[0], 0); vids[0].classList.add("on"); label(0);
    if (reduceMotion) return;
    load(vids[1], 1);
    vids[0].play().catch(() => {});
    setInterval(() => {
      if (document.hidden) return;
      const next = 1 - cur;
      i = (i + 1) % reel.length;
      vids[next].play().catch(() => {});
      vids[next].classList.add("on"); vids[cur].classList.remove("on");
      label(i);
      const old = vids[cur];
      cur = next;
      setTimeout(() => { old.pause(); load(old, (i + 1) % reel.length); }, 700);
    }, SHOW);
  })();

  // ---------- hero HUD ----------
  $("#stats").innerHTML = (B.stats || []).map((s) =>
    `<div class="hud-cell"><div class="hud-value">${esc(s.value)}</div><div class="hud-label">${esc(s.label)}</div></div>`).join("");

  // ---------- design ----------
  $("#desiderata").innerHTML = (B.desiderata || []).map((d) =>
    `<div class="desideratum"><div class="k">${esc(d.key || "")}</div><h4>${esc(d.title)}</h4><p>${esc(d.desc)}</p></div>`).join("");

  if (B.comparison) {
    const cell = (v) => v === true ? '<span class="yes" aria-label="yes">✓</span>' : v === false ? '<span class="no" aria-label="no">✗</span>' : esc(v);
    const head = `<thead><tr>${B.comparison.columns.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>`;
    const body = B.comparison.rows.map((r) => {
      const cells = Array.isArray(r) ? r : r.cells;
      return `<tr class="${r.highlight ? "hl" : ""}">${cells.map((c) => `<td>${cell(c)}</td>`).join("")}</tr>`;
    }).join("");
    $("#comparisonTable").innerHTML = head + `<tbody>${body}</tbody>`;
  }

  // 任务分布：有数量时画像素方块条，否则只列类别
  const fams = B.families || [];
  const counted = fams.every((f) => typeof f.count === "number");
  if (counted) {
    const famMax = Math.max(1, ...fams.map((f) => f.count));
    const unit = Math.max(1, Math.ceil(famMax / 24));
    const famTotal = fams.reduce((a, f) => a + f.count, 0);
    $("#familyTotal").textContent = `${famTotal} tasks across ${fams.length} categories` + (unit > 1 ? ` · each block = ${unit} tasks` : "");
    $("#familyBars").innerHTML = fams.map((f) =>
      `<div class="fbar"><span>${esc(f.name)}</span>
         <span class="ftrack" aria-hidden="true">${"<i></i>".repeat(Math.max(1, Math.round(f.count / unit)))}</span>
         <span class="fcount">${f.count}</span></div>`).join("");
  } else {
    $("#familyTotal").textContent = `${fams.length} game categories`;
    $("#familyBars").innerHTML = `<div class="fam-chips">${fams.map((f) => `<span class="fam-chip">${esc(f.name)}</span>`).join("")}</div>`;
  }

  // ---------- evaluation ----------
  $("#evalSteps").innerHTML = (B.evalSteps || []).map((s) =>
    `<li class="pipe-step"><h4>${esc(s.title)}</h4><p>${esc(s.desc)}</p></li>`).join("");
  $("#rubrics").innerHTML = rubrics.map((r) =>
    `<div class="rubric"><dt><span class="sw"></span>${esc(r.title)}</dt><dd>${esc(r.desc)}</dd></div>`).join("");

  // ---------- leaderboard ----------
  const LB = B.leaderboard || { entries: [] };
  $("#lbNote").textContent = LB.note || "";
  $("#lbUpdated").textContent = LB.updated ? `Last updated ${LB.updated}.` : "";
  const scored = LB.entries.some((e) => e.scores);
  const sc = (e, k) => (e.scores ? e.scores[k] : null);
  const ranked = scored
    ? [...LB.entries].sort((a, b) => (sc(b, "overall") ?? -1) - (sc(a, "overall") ?? -1)).map((e, i) => ({ ...e, rank: e.scores ? i + 1 : null }))
    : LB.entries.map((e) => ({ ...e, rank: null }));
  const has = (k) => LB.entries.some((e) => e[k]);
  if (!LB.entries.some((e) => e.open)) $("#lbFilter").hidden = true;
  let lbFilter = "all", lbSort = scored ? { key: "overall", dir: -1 } : null;

  function renderLB() {
    const cols = [
      scored && { key: "rank", label: "#" },
      { key: "model", label: has("agent") ? "Model / Agent" : "Model" },
      { key: "org", label: "Organization" },
      has("type") && { key: "type", label: "Input" },
      { key: "overall", label: "Overall", cls: "overall" },
      ...rubrics.map((r) => ({ key: r.key, label: r.short || r.title })),
      has("date") && { key: "date", label: "Released" },
    ].filter(Boolean);
    const val = (e, k) => (rubrics.some((r) => r.key === k) || k === "overall" ? sc(e, k) ?? -1 : e[k] ?? "");
    const rows = ranked.filter((e) => lbFilter === "all" || (lbFilter === "open" ? e.open : !e.open));
    if (lbSort) rows.sort((a, b) => {
      const x = val(a, lbSort.key), y = val(b, lbSort.key);
      return (typeof x === "number" ? x - y : String(x).localeCompare(String(y))) * lbSort.dir;
    });
    const best = {};
    if (scored) rubrics.forEach((r) => (best[r.key] = Math.max(...rows.map((e) => sc(e, r.key) ?? -1))));

    const head = `<thead><tr>${cols.map((c) => {
      const on = lbSort && lbSort.key === c.key;
      return `<th data-key="${c.key}" class="${c.cls || ""} ${on ? "sorted" : ""}" aria-sort="${on ? (lbSort.dir < 0 ? "descending" : "ascending") : "none"}">${esc(c.label)}${on ? `<span class="arr"> ${lbSort.dir < 0 ? "↓" : "↑"}</span>` : ""}</th>`;
    }).join("")}</tr></thead>`;

    const cell = {
      rank: (e) => `<td class="rank r${e.rank}"><b>${e.rank ?? "—"}</b></td>`,
      model: (e) => `<td><div class="who">${mono(e.org)}<div class="who-text"><b>${esc(e.model)}</b>${e.agent || e.open ? `<small>${esc(e.agent)}${e.open ? (e.agent ? " · " : "") + "open-weight" : ""}</small>` : ""}</div></div></td>`,
      org: (e) => `<td class="muted">${esc(e.org)}</td>`,
      type: (e) => `<td>${e.type ? `<span class="tag ${e.type === "Vision" ? "vision" : ""}">${esc(e.type)}</span>` : ""}</td>`,
      overall: (e) => e.scores ? `<td class="overall"><div class="ov">
        <span class="ov-bar"><span style="width:${e.scores.overall}%"></span></span>
        <span class="ov-num">${fmt(e.scores.overall)}</span>
        <span class="ov-ci">${e.ci != null ? "±" + e.ci : ""}</span></div></td>`
        : `<td class="overall"><div class="ov"><span class="ov-bar pending"></span><span class="ov-num muted">—</span><span class="ov-ci"></span></div></td>`,
      date: (e) => `<td class="muted">${esc(e.date)}</td>`,
    };
    const body = rows.map((e) => `<tr>${cols.map((c) => {
      if (cell[c.key]) return cell[c.key](e);
      const v = sc(e, c.key);
      if (v == null) return `<td class="heat muted">—</td>`;
      return `<td class="heat ${v === best[c.key] ? "best" : ""}" style="background:color-mix(in srgb, var(--accent) ${Math.round((v / 100) * 22)}%, transparent)">${fmt(v)}</td>`;
    }).join("")}</tr>`).join("");

    const t = $("#leaderboardTable");
    t.innerHTML = head + `<tbody>${body}</tbody>`;
    t.querySelectorAll("th").forEach((th) => th.addEventListener("click", () => {
      const k = th.dataset.key;
      lbSort = lbSort && lbSort.key === k ? { key: k, dir: -lbSort.dir } : { key: k, dir: ["rank", "model", "org", "type"].includes(k) ? 1 : -1 };
      renderLB();
    }));
  }
  $("#lbFilter").addEventListener("click", (ev) => {
    const b = ev.target.closest("button"); if (!b) return;
    lbFilter = b.dataset.filter;
    $("#lbFilter").querySelectorAll("button").forEach((x) => x.classList.toggle("active", x === b));
    renderLB();
  });
  renderLB();

  // ---------- findings ----------
  $("#findings").innerHTML = (B.findings || []).map((f) => `
    <article class="finding">
      <h4>${esc(f.title)}</h4>
      <p>${esc(f.desc)}</p>
      ${f.image ? `<img class="finding-img" data-ph="${esc(f.image)}" src="${esc(f.image)}" alt="">` : ""}
    </article>`).join("");

  // ---------- tabs helper ----------
  function tabs(el, labels, onPick) {
    el.innerHTML = labels.map((l, i) => `<button role="tab" data-i="${i}" class="${i === 0 ? "active" : ""}" aria-selected="${i === 0}">${l}</button>`).join("");
    el.addEventListener("click", (ev) => {
      const b = ev.target.closest("button"); if (!b) return;
      el.querySelectorAll("button").forEach((x) => { x.classList.toggle("active", x === b); x.setAttribute("aria-selected", x === b); });
      onPick(+b.dataset.i);
    });
    onPick(0);
  }
  const videoTag = (d) =>
    `<video muted loop playsinline preload="metadata" poster="${esc(d.poster)}"><source src="${esc(d.video)}" type="video/mp4"></video>`;
  function mountVideos(container, list) {
    container.querySelectorAll("[data-vi]").forEach((m) => {
      const d = list[+m.dataset.vi];
      const v = m.querySelector("video");
      wireVideo(v, () => m.contains(v) && v.replaceWith(placeholder(`${d.video}\n${d.poster}`, "video")));
      if (io) io.observe(v);
    });
  }

  // ---------- same-task comparison ----------
  const cmp = B.compare || [];
  if (cmp.length) {
    tabs($("#compareTabs"), cmp.map((c) => esc(c.title)), (k) => {
      const c = cmp[k];
      const grid = $("#compareGrid");
      grid.innerHTML = `
        <div class="compare-meta"><span class="fam-chip">${esc(c.family)}</span><code>${esc(c.task)}</code></div>
        ${c.entries.map((e, i) => `
          <figure class="cmp-item">
            <div class="cmp-media ${e.portrait ? "portrait" : ""}" data-vi="${i}">${videoTag(e)}</div>
            <figcaption>${mono(orgOf(e.model))}<b>${esc(e.model)}</b></figcaption>
          </figure>`).join("")}`;
      mountVideos(grid, c.entries);
      // 两段同时从头开始
      const vs = grid.querySelectorAll("video");
      vs.forEach((v) => (v.currentTime = 0));
    });
  } else {
    $("#compare").hidden = true;
  }

  // ---------- demos ----------
  const demos = B.demos || [];
  tabs($("#demoTabs"), demos.map((g) => `${mono(g.org)}${esc(g.model)}`), (k) => {
    const g = demos[k]; if (!g) return;
    const grid = $("#demoGrid");
    grid.innerHTML = g.items.map((d, i) => `
      <article class="demo">
        <div class="demo-media ${d.portrait ? "portrait" : ""}" data-vi="${i}">
          ${d.play ? '<span class="demo-badge">Playable</span>' : ""}
          ${videoTag(d)}
        </div>
        <div class="demo-info">
          <div class="demo-title">${esc(d.title)}</div>
          <div class="demo-meta">${esc(d.family)} · <code>${esc(d.task)}</code></div>
          ${d.scores
            ? `<div class="demo-score"><b>${fmt(d.scores.overall)}</b><small>OVERALL</small></div>
               <div class="demo-rubric">${rubrics.map((r) => `<div>${esc(r.short || r.title)} <i><span style="width:${d.scores[r.key] || 0}%"></span></i></div>`).join("")}</div>`
            : d.tier ? `<div class="demo-score"><span class="tier tier-${d.tier}">${TIER[d.tier]}</span><small>TIER</small></div>` : ""}
          ${d.play ? `<button class="btn play" data-src="${esc(d.play)}" data-title="${esc(d.title)}">Play in browser</button>` : ""}
        </div>
      </article>`).join("");
    mountVideos(grid, g.items);
  });

  // ---------- play modal ----------
  const modal = $("#playModal"), frame = $("#playFrame");
  document.addEventListener("click", (ev) => {
    const b = ev.target.closest(".play"); if (!b) return;
    frame.src = b.dataset.src;
    $("#playTitle").textContent = b.dataset.title;
    $("#playNewTab").href = b.dataset.src;
    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
  });
  const close = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); frame.src = "about:blank"; };
  $("#playClose").addEventListener("click", close);
  modal.addEventListener("click", (ev) => { if (ev.target === modal) close(); });
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") close(); });

  // ---------- citation ----------
  $("#copyBib").addEventListener("click", async () => {
    const btn = $("#copyBib");
    try { await navigator.clipboard.writeText($("#bibtex").textContent); btn.textContent = "Copied"; }
    catch (e) { getSelection().selectAllChildren($("#bibtex")); btn.textContent = "Press ⌘C"; }
    setTimeout(() => (btn.textContent = "Copy"), 1600);
  });

  // ---------- nav active section ----------
  const links = [...document.querySelectorAll(".nav-links a")];
  if ("IntersectionObserver" in window) {
    const so = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("section[id]").forEach((s) => so.observe(s));
  }

  wireAllImgs();
})();
