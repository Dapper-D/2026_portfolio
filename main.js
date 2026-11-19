(() => {
  const S = window.SITE;
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- icons ---------- */
  const ICON = {
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.6 4 18.6 4.3 18.6 4.3c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.75Z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 5h20v14H2V5Zm2 2v.4l8 5.1 8-5.1V7H4Zm16 2.8-8 5-8-5V17h16V9.8Z"/></svg>',
    resume: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h9l5 5v15H6V2Zm8 1.5V8h4.5L14 3.5ZM8.5 12v1.5h9V12h-9Zm0 3.5V17h9v-1.5h-9Z"/></svg>',
    open: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3ZM5 5h6v2H5v12h12v-6h2v8H3V5h2Z"/></svg>'
  };

  /* ---------- simple bindings ---------- */
  $$("[data-bind]").forEach((el) => (el.textContent = S[el.dataset.bind] ?? ""));
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  $$("[data-mail]").forEach((el) => (el.href = "mailto:" + S.links.email));

  const linkDefs = [
    ["github", "GitHub", S.links.github],
    ["linkedin", "LinkedIn", S.links.linkedin],
    ["resume", "Resume", S.links.resume],
    ["email", "Email", S.links.email && "mailto:" + S.links.email]
  ].filter((l) => l[2]);
  const ext = (u) => /^https?:/.test(u) ? ' target="_blank" rel="noopener"' : "";
  $$("[data-links]").forEach((box) => {
    box.innerHTML = linkDefs.map(([k, label, url]) => `<a class="btn" href="${esc(url)}"${ext(url)}>${ICON[k]}${label}</a>`).join("") +
      (box.closest(".hero") ? `<a class="btn btn--cta" href="#projects">See the work</a>` : "");
  });

  const gh = $("[data-gh]");
  if (gh) { gh.href = S.links.github; gh.innerHTML = ICON.github; }
  const nav = $(".nav");

  /* ---------- mock screens ---------- */
  const MOCK = {
    alerts: () => `<div class="mock">
      <div class="mock__bar"><span class="mock__title">Threat feed</span><span><i class="live-dot"></i> Connected (Live)</span></div>
      <div class="kpis"><div class="kpi"><b>12,408</b>Logs scored</div><div class="kpi"><b>37</b>Anomalies</div><div class="kpi"><b>0.8s</b>To alert</div></div>
      <div class="row"><span class="sev sev--hi">High</span><span>DDoS burst from 10.0.4.22</span><span>now</span></div>
      <div class="row"><span class="sev sev--hi">High</span><span>Port scan, 1,024 ports in 3s</span><span>4s</span></div>
      <div class="row"><span class="sev sev--md">Medium</span><span>SQLi pattern on /login</span><span>19s</span></div>
      <div class="row"><span class="sev sev--md">Medium</span><span>Brute-force pattern on SSH</span><span>33s</span></div>
      <div class="row"><span class="sev sev--lo">Low</span><span>Unusual flow duration</span><span>41s</span></div>
      <div class="row"><span class="sev sev--lo">Low</span><span>New host on 10.0.4.0/24</span><span>1m</span></div>
    </div>`,
    jobs: () => `<div class="mock">
      <div class="mock__bar"><span class="mock__title">Today's matches</span><span>14 new</span></div>
      <div class="job"><b>Security Analyst</b><span class="score">92</span><span>Vancouver, hybrid. Resume and cover letter ready</span></div>
      <div class="job"><b>SOC Analyst, Tier 1</b><span class="score">88</span><span>Remote, Canada. Resume and cover letter ready</span></div>
      <div class="job"><b>IT Compliance Associate</b><span class="score">81</span><span>Burnaby. Resume and cover letter ready</span></div>
      <div class="job"><b>Junior Penetration Tester</b><span class="score">77</span><span>Toronto, remote OK. Tailoring</span></div>
    </div>`,
    map: () => `<div class="mock">
      <div class="mock__bar"><span class="mock__title">Near you, under $50</span><span>23 places</span></div>
      <div class="mapmock">
        <span class="pin" style="left:14%;top:22%">$18 Pho</span>
        <span class="pin" style="left:48%;top:14%">$32 Izakaya</span>
        <span class="pin" style="left:66%;top:52%">$24 Tacos</span>
        <span class="pin" style="left:26%;top:62%">$41 Thai</span>
        <span class="pin" style="left:78%;top:24%">$15 Ramen</span>
      </div>
    </div>`,
    prompt: () => `<div class="mock">
      <div class="prompt">a rainy neon street at night, wide shot, film grain</div>
      <div class="render" role="img" aria-label="Generated image of a neon city at dusk"></div>
      <div class="mock__bar" style="border:0;padding:0"><span>Rendered in 4.2s</span><span class="mock__title">Download</span></div>
    </div>`,
    install: () => `<div class="mock">
      <div class="mock__bar"><span class="mock__title">B3spoken setup</span><span>v0.1</span></div>
      <div class="steps"><span class="done">Check Node.js 22</span><span class="done">Add shortcut</span><span class="done">Start helper</span><span class="now">Open localhost:4317</span></div>
      <div class="meter"><i style="width:86%"></i></div>
    </div>`,
    ai: () => `<div class="mock">
      <div class="mock__bar"><span class="mock__title">Connect an AI</span><span>Pick one</span></div>
      <div class="opt is-on"><b>ChatGPT</b><span>via Codex</span><i class="live-dot"></i></div>
      <div class="opt"><b>Claude</b><span>via Claude Code</span></div>
      <div class="opt"><b>Chrome built-in AI</b><span>Free, on device</span></div>
      <div class="opt"><b>No AI</b><span>Rule-based tailoring</span></div>
    </div>`,
    resume: () => `<div class="mock">
      <div class="mock__bar"><span class="mock__title">Resume library</span><span>38 bullets</span></div>
      <div class="bullet"><code>EXP-02.3</code><span>Automated OpenVAS scans across a /24 lab network</span></div>
      <div class="bullet"><code>EXP-02.4</code><span>Built a Gemini summary step for exploit results</span></div>
      <div class="bullet is-flag"><code>EXP-01.1</code><span>Led compliance for 40+ clients</span><em>Check this</em></div>
      <div class="bullet"><code>PRJ-04.1</code><span>Streamed ML alerts to a Next.js dashboard</span></div>
    </div>`,
    scan: () => `<div class="mock">
      <div class="mock__bar"><span class="mock__title">Morning scan</span><span><i class="live-dot"></i> 06:00</span></div>
      <div class="kpis"><div class="kpi"><b>Job Bank</b>Government</div><div class="kpi"><b>ATS</b>Employer sites</div><div class="kpi"><b>Remote</b>Feeds</div></div>
      <div class="flow"><span>Keywords up</span><i></i><span>Matches down</span></div>
      <div class="meter"><i style="width:64%"></i></div>
    </div>`,
    swap: () => `<div class="mock"><div class="swap">
      <div class="swap__field"><span>You pay</span><b>1.50 ETH</b></div>
      <div class="swap__field"><span>You receive</span><b>5,212 USDC</b></div>
      <div class="swap__btn">Swap</div>
    </div></div>`
  };

  Object.assign(MOCK, {
    report: () => `<div class="mock">
      <div class="mock__bar"><span class="mock__title">auto_report.md</span><span>Gemini summary</span></div>
      <div class="row"><span class="sev sev--hi">Critical</span><span>vsftpd 2.3.4 backdoor on port 21</span><span>Patch</span></div>
      <div class="row"><span class="sev sev--hi">High</span><span>Telnet sends credentials in clear text</span><span>Disable</span></div>
      <div class="row"><span class="sev sev--md">Medium</span><span>NFS export readable by any host</span><span>Restrict</span></div>
      <p class="mock__note">Fix order: close the FTP backdoor, replace Telnet with SSH, then lock down NFS exports.</p>
    </div>`,
    term: () => `<div class="mock mock--term">
      <div class="mock__bar"><span class="mock__title">attack_simulator.py</span><span>PC 2</span></div>
      <pre>Select an attack scenario:
  1) DDoS
  2) PortScan
  3) Web attacks
&gt; 2
[+] Streaming PortScan logs to http://api:8000/ingest
[+] 1,000 records sent
[+] 1,000 records sent</pre>
    </div>`,
    scores: () => `<div class="mock">
      <div class="mock__bar"><span class="mock__title">Isolation Forest</span><span>Anomaly score</span></div>
      ${[["Normal web flow", 12], ["Normal DNS", 18], ["SYN to 1,024 ports", 91], ["Burst from one host", 84], ["Login form, normal", 22]]
        .map(([t, v]) => `<div class="barrow"><span>${t}</span><i><b style="width:${v}%;${v > 60 ? "background:var(--red)" : ""}"></b></i><em>${(v / 100).toFixed(2)}</em></div>`).join("")}
    </div>`,
    locate: () => `<div class="mock">
      <div class="mock__bar"><span class="mock__title">Under50</span><span>Vancouver</span></div>
      <div class="prompt prompt--gold">Near Granville St</div>
      <div class="opt is-on is-gold"><b>Use my location</b><span>Geocoding API</span></div>
      <div class="mapmock"><span class="pin" style="left:46%;top:40%">You</span></div>
    </div>`,
    pricelist: () => `<div class="mock">
      <div class="mock__bar"><span class="mock__title">Average per person</span><span>Under $50</span></div>
      ${[["Pho on Main", "$18"], ["Ramen bar", "$15"], ["Taqueria", "$24"], ["Izakaya", "$32"], ["Steakhouse", "$85"]]
        .map(([n, p], i) => `<div class="row${i === 4 ? " is-out" : ""}"><span class="sev ${i === 4 ? "sev--hi" : "sev--lo"}">${p}</span><span>${n}</span><span>${i === 4 ? "Filtered out" : "Kept"}</span></div>`).join("")}
    </div>`,
    pin: () => `<div class="mock">
      <div class="mock__bar"><span class="mock__title">Text to image</span><span>fal.ai</span></div>
      <div class="prompt prompt--big">a rainy neon street at night, wide shot, film grain<span class="caret"></span></div>
      <div class="swap__btn swap__btn--pink">Generate</div>
    </div>`,
    gen: () => `<div class="mock">
      <div class="prompt">a rainy neon street at night, wide shot, film grain</div>
      <div class="render render--loading"><span>Generating</span></div>
    </div>`,
    dexhero: () => `<div class="mock">
      <div class="mock__bar"><span class="mock__title">1inch clone</span><span>Home</span></div>
      <div class="dex"><b>Swap tokens across chains at the best rate</b><span class="swap__btn">Launch app</span></div>
      <div class="kpis"><div class="kpi"><b>Wallet</b>Section 4</div><div class="kpi"><b>Protocols</b>Section 6</div><div class="kpi"><b>DAO</b>Section 9</div></div>
    </div>`,
    stats: () => `<div class="mock">
      <div class="mock__bar"><span class="mock__title">Stats</span><span>react-countup</span></div>
      <div class="kpis kpis--big"><div class="kpi"><b>0 → 2.4M</b>Sample count</div><div class="kpi"><b>0 → 290</b>Sample count</div><div class="kpi"><b>0 → 12</b>Sample count</div></div>
    </div>`
  });

  /* ---------- roster ---------- */
  $("[data-roster]").innerHTML = S.projects.map((p) =>
    `<button class="chip" role="listitem" data-class="${p.class}" data-go="p-${p.id}"><canvas data-art="${p.art}" data-seed="${p.id.length * 13}" aria-hidden="true"></canvas><span>${esc(p.name)}</span></button>`
  ).join("");

  /* ---------- project layers: intro, viewfinder, optional card ---------- */
  const screenFor = (f) => f.image
    ? `<img src="${esc(f.image)}" alt="${esc(f.alt || "")}" loading="lazy">`
    : (MOCK[f.screen] || (() => ""))();
  const ticks = Array.from({ length: 81 }, (_, k) => `<i class="${k % 5 ? "" : "major"}">${k % 5 ? "" : `<b>${k * 5}</b>`}</i>`).join("");
  const side = (s) => `<div class="seq__col"><h4>${esc(s.name)}</h4><ul>${s.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`;

  const panelsHTML = S.projects.map((p, i) => {
    const live = p.live ? `<a class="btn btn--cta" href="${esc(p.live)}" target="_blank" rel="noopener">${esc(p.liveLabel || "Open live site")}</a>` : "";
    const code = `<a class="btn" href="${esc(p.repo)}" target="_blank" rel="noopener">${ICON.github}View code</a>`;
    const intro = `<article class="L panel" id="p-${p.id}" data-seg="p-${p.id}" data-part="intro" data-class="${p.class}" aria-labelledby="n-${p.id}">
      <div class="panel__frame">
        <canvas class="art" data-art="${p.art}" data-seed="${i * 31 + 5}" aria-hidden="true"></canvas>
        <div class="panel__copy">
          <h3 class="panel__headline">${esc(p.headline)}</h3>
          <p class="panel__body">${esc(p.body)}</p>
          <ul class="stack" aria-label="Built with">${p.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
          <div class="pills">${live}${code}</div>
        </div>
        <div class="panel__screen"><div class="screen" style="--glow:${p.art}44">${screenFor(p)}</div></div>
        <div class="nametag">
          <p class="nametag__name" id="n-${p.id}"><span class="bar"></span>${esc(p.name)}</p>
          <p class="nametag__tag">${esc(p.tag)}${p.live && !p.liveLabel ? ' <i class="live-dot" title="Live site"></i>' : ""}</p>
        </div>
      </div>
    </article>`;
    const q = p.sequence;
    if (!q) return intro;
    const vf = `<section class="L vf" data-seg="p-${p.id}" data-part="vf" aria-label="How ${esc(p.name)} works">
      <div class="vf__meta"><span><i class="rec"></i>REC <span data-tc>00:00:00:00</span></span><span class="vf__name">${esc(p.name)}</span><span data-vf-label>${esc(q.frames[0].label)}</span></div>
      <ol class="vf__strip">${q.frames.map((f, k) => `<li class="vf__frame">
        <div class="screen screen--flat${f.image ? " screen--img" : ""}" style="--glow:${p.art}44">${screenFor(f)}</div>
        <div class="vf__cap"><span class="vf__step">${k + 1} of ${q.frames.length}</span><h4>${esc(f.title)}</h4><p>${esc(f.text)}</p></div>
      </li>`).join("")}</ol>
      <div class="vf__scale" aria-hidden="true"><div class="vf__track">${ticks}</div><span class="vf__mark"></span></div>
    </section>`;
    const card = q.card ? `<section class="L seqcard" data-seg="p-${p.id}" data-part="card">
      <canvas class="art" data-art="${p.art}" data-seed="77" aria-hidden="true"></canvas>
      <div class="seq__cardbox">
        <h4 class="seq__cardtitle">${esc(q.card.title)}</h4>
        <div class="seq__cols">${side(q.card.left)}<span class="seq__link" aria-hidden="true">Keywords up, matches down</span>${side(q.card.right)}</div>
        <div class="pills">${live}${code}</div>
      </div>
    </section>` : "";
    return intro + vf + card;
  }).join("");
  $("[data-panels]").outerHTML = panelsHTML;

  /* ---------- skills, log, archive ---------- */
  $("[data-skills]").innerHTML = S.skills.map((d, i) =>
    `<div class="district" data-item><canvas class="art" data-art="${d.art}" data-seed="${i * 7 + 40}" aria-hidden="true"></canvas><h3>${esc(d.name)}</h3><ul>${d.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`
  ).join("");
  $("[data-log]").innerHTML = S.log.map((l) =>
    `<li data-item><span class="log__date">${esc(l.date)}</span><span class="log__title">${esc(l.title)}</span><span class="log__tag">${esc(l.tag)}</span></li>`
  ).join("");
  $("[data-archive]").innerHTML = S.archive.map((a) =>
    `<li data-item><a href="${esc(a.url)}" target="_blank" rel="noopener"><b>${esc(a.name)}</b><span>${esc(a.note)}</span></a></li>`
  ).join("");
  $$("[data-mail-text]").forEach((el) => (el.textContent = S.links.email));

  /* ---------- generated night skyline ---------- */
  function rng(seed) {
    let a = seed >>> 0 || 1;
    return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function hexA(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
  }
  function paintCity(ctx, w, h, accent, seed) {
    const r = rng(seed);
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#040508");
    sky.addColorStop(0.55, hexA(accent, 0.16));
    sky.addColorStop(0.78, hexA(accent, 0.38));
    sky.addColorStop(1, "#05060a");
    ctx.fillStyle = "#05060a"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);

    const glow = ctx.createRadialGradient(w * (0.55 + r() * 0.3), h * 0.72, 0, w * 0.7, h * 0.72, w * 0.6);
    glow.addColorStop(0, hexA(accent, 0.35)); glow.addColorStop(1, hexA(accent, 0));
    ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);

    const layers = [
      { base: 0.86, maxH: 0.55, col: hexA(accent, 0.22), win: 0.05, wcol: hexA(accent, 0.5) },
      { base: 0.92, maxH: 0.42, col: "#0b0d13", win: 0.12, wcol: hexA(accent, 0.8) },
      { base: 1.0, maxH: 0.32, col: "#05060a", win: 0.18, wcol: "rgba(255,214,150,.85)" }
    ];
    const unit = Math.max(6, w / 260);
    for (const L of layers) {
      let x = -r() * 40;
      while (x < w) {
        const bw = (18 + r() * 60) * unit / 4;
        const bh = h * (0.08 + r() * L.maxH);
        const top = h * L.base - bh;
        ctx.fillStyle = L.col;
        ctx.fillRect(x, top, bw, bh + 2);
        if (r() < 0.25) ctx.fillRect(x + bw * 0.4, top - bh * 0.12, Math.max(2, bw * 0.08), bh * 0.12); // antenna
        ctx.fillStyle = L.wcol;
        const ws = Math.max(2, unit * 0.45), gap = ws * 2.2;
        for (let wy = top + gap; wy < h * L.base - gap; wy += gap)
          for (let wx = x + gap * 0.6; wx < x + bw - ws; wx += gap)
            if (r() < L.win) ctx.fillRect(wx, wy, ws, ws * 1.3);
        x += bw + r() * unit * 2;
      }
    }
    const fog = ctx.createLinearGradient(0, h * 0.7, 0, h);
    fog.addColorStop(0, "rgba(5,6,10,0)"); fog.addColorStop(1, "rgba(5,6,10,.9)");
    ctx.fillStyle = fog; ctx.fillRect(0, h * 0.7, w, h * 0.3);
  }

  const rainy = [];
  function drawCanvas(c) {
    const rect = c.getBoundingClientRect();
    if (!rect.width) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    c.width = Math.round(rect.width * dpr); c.height = Math.round(rect.height * dpr);
    const ctx = c.getContext("2d");
    paintCity(ctx, c.width, c.height, c.dataset.art || "#1ea4ff", +c.dataset.seed || 1);
    if (c.dataset.rain && !reduced) {
      const buf = document.createElement("canvas"); buf.width = c.width; buf.height = c.height;
      buf.getContext("2d").drawImage(c, 0, 0);
      const r = rng(99), drops = Array.from({ length: 140 }, () => ({ x: r() * c.width, y: r() * c.height, s: 0.6 + r() * 0.8 }));
      rainy.length = 0; rainy.push({ c, ctx, buf, drops, dpr });
    }
  }
  const drawAll = () => $$("canvas[data-art]").forEach(drawCanvas);

  let heroVisible = true, last = 0;
  function rain(t) {
    requestAnimationFrame(rain);
    if (!heroVisible || !rainy.length || t - last < 33) return;
    last = t;
    const { c, ctx, buf, drops, dpr } = rainy[0];
    ctx.drawImage(buf, 0, 0);
    ctx.strokeStyle = "rgba(170,200,255,.18)"; ctx.lineWidth = dpr;
    ctx.beginPath();
    for (const d of drops) {
      d.y += 22 * d.s * dpr; d.x -= 3 * d.s * dpr;
      if (d.y > c.height) { d.y = -20; d.x = Math.random() * c.width * 1.1; }
      ctx.moveTo(d.x, d.y); ctx.lineTo(d.x + 3 * dpr, d.y - 16 * d.s * dpr);
    }
    ctx.stroke();
  }

  /* =========================================================
     One pinned stage for the whole page (after anantagame.com).
     The page is a tall .flow; .stage sticks to the viewport and every
     section is a layer on it. Scroll position, in screens, drives a single
     timeline. Each layer fades in and out over its own range, so the
     sequence starts on the very first scroll.
     Phones and reduced motion get a normal stacked page instead (CSS).
     ========================================================= */
  const flow = $("[data-flow]");
  const pinMQ = matchMedia("(prefers-reduced-motion: no-preference)");
  // Smooth scrolling only with a mouse/trackpad on wide screens; touch keeps native momentum
  const lenisMQ = matchMedia("(min-width: 981px) and (pointer: fine)");
  // Stable screen height. Phone address bars change innerHeight while scrolling,
  // so the timeline only re-measures when the width changes (e.g. rotation).
  let vh = innerHeight, lastW = innerWidth;
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const ramp = (g, a, b) => clamp01((g - a) / (b - a));

  const layers = [];      // { el, s, inA, inB, outA, outB, items, itemA, itemB, pan }
  const jumps = {};       // id -> screen position to land on
  const segOf = [];       // [{ name, start, end }] for nav highlighting
  let total = 0;

  const L = (name, part) => $(`.L[data-seg="${name}"]${part ? `[data-part="${part}"]` : ""}`);
  function seg(name, len, defs, jumpAt) {
    const s = total;
    defs.forEach((d) => d.el && layers.push({ ...d, s, items: d.itemA != null ? $$("[data-item]", d.el) : null }));
    segOf.push({ name, start: s, end: s + len });
    const id = defs[0].el && defs[0].el.id;
    if (id) jumps[id] = s + jumpAt;
    total += len;
  }

  seg("hero", 0.75, [{ el: L("hero"), outA: 0, outB: 0.6, fx: "push" }], 0);
  seg("roster", 1.3, [{ el: L("roster"), inA: -0.1, inB: 0.25, outA: 1.05, outB: 1.3 }], 0.3);
  S.projects.forEach((p) => {
    const name = "p-" + p.id;
    const n = p.sequence ? p.sequence.frames.length : 0;
    const defs = [{ el: L(name, "intro"), inA: 0, inB: 0.3, outA: n ? 1.0 : 1.2, outB: n ? 1.25 : 1.45, intro: true }];
    let len = 1.5;
    if (n) {
      const pa = 1.6, pb = pa + (n - 1) * 0.75, pe = pb + 0.35;
      defs.push({ el: L(name, "vf"), inA: 1.3, inB: 1.55, outA: pe, outB: pe + 0.25, pan: [pa, pb, n] });
      len = pe + 0.35;
      if (p.sequence.card) {
        defs.push({ el: L(name, "card"), inA: pe + 0.55, inB: pe + 0.85, outA: pe + 1.6, outB: pe + 1.85 });
        len = pe + 1.85;
      }
    }
    seg(name, len, defs, 0.35);
  });
  seg("skills", 2.0, [{ el: L("skills"), inA: 0, inB: 0.25, outA: 1.75, outB: 2.0, itemA: 0.15, itemB: 0.9 }], 1.0);
  seg("log", 1.9, [{ el: L("log"), inA: 0, inB: 0.25, outA: 1.65, outB: 1.9, itemA: 0.15, itemB: 0.95 }], 1.0);
  seg("archive", 1.2, [{ el: L("archive"), inA: 0, inB: 0.25, outA: 0.95, outB: 1.2, itemA: 0.1, itemB: 0.5 }], 0.65);
  seg("contact", 0.6, [{ el: L("contact"), inA: 0, inB: 0.3 }], 0.6);

  window.__flow = { segOf, jumps, total }; // handy for debugging timings in the console
  const navFor = (name) => (name === "hero" ? "top" : name === "roster" || name.startsWith("p-") ? "projects" : name);
  const navLinks = $$(".nav__links a");
  const chips = $$("[data-go]");
  const vfLabel = new Map(S.projects.filter((p) => p.sequence).map((p) => ["p-" + p.id, p.sequence.frames.map((f) => f.label)]));
  let pinned = false, lenis = null, curSeg = "";

  function layout() {
    pinned = pinMQ.matches;
    vh = innerHeight; lastW = innerWidth;
    document.documentElement.style.setProperty("--stage-h", vh + "px");
    document.documentElement.classList.toggle("is-pinned", pinned);
    flow.style.height = pinned ? (total + 1) * vh + "px" : "";
    if (!pinned) layers.forEach((l) => { l.el.classList.remove("is-off"); l.el.style.removeProperty("--v"); });
    const wantLenis = pinned && lenisMQ.matches;
    if (wantLenis && !lenis && window.Lenis) lenis = new window.Lenis({ autoRaf: true, lerp: 0.09 });
    if (!wantLenis && lenis) { lenis.destroy(); lenis = null; }
    drawAll();
    update();
  }

  function update() {
    if (!pinned) { heroVisible = true; nav.classList.toggle("is-scrolled", scrollY > innerHeight * 0.6); return; }
    const g = (scrollY - flow.offsetTop) / vh;
    for (const l of layers) {
      const vin = l.inA == null ? 1 : ramp(g, l.s + l.inA, l.s + l.inB);
      const vout = l.outA == null ? 1 : 1 - ramp(g, l.s + l.outA, l.s + l.outB);
      const v = vin * vout;
      l.el.style.setProperty("--v", v.toFixed(3));
      l.el.style.setProperty("--dir", vin < 1 ? 1 : -1); // lift in from below, drift up on the way out
      l.el.classList.toggle("is-off", v <= 0.002);
      l.el.classList.toggle("is-on", v > 0.5);
      if (l.intro) l.el.classList.toggle("is-in", v > 0.6);
      if (l.fx === "push") heroVisible = v > 0;
      if (l.items) {
        const m = l.items.length;
        l.items.forEach((it, k) => {
          const a = l.s + l.itemA + ((l.itemB - l.itemA) * k) / m;
          it.style.setProperty("--iv", ramp(g, a, a + 0.22).toFixed(3));
        });
      }
      if (l.pan && v > 0) {
        const [pa, pb, n] = l.pan;
        const pan = ramp(g, l.s + pa, l.s + pb) * (n - 1);
        l.el.style.setProperty("--pan", pan.toFixed(3));
        $$(".vf__frame", l.el).forEach((f, k) => {
          const d = Math.min(1, Math.abs(k - pan));
          f.style.opacity = (1 - d * 0.7).toFixed(3);
          f.style.setProperty("--d", d.toFixed(3));
        });
        const lbl = $("[data-vf-label]", l.el), labels = vfLabel.get(l.el.dataset.seg);
        if (lbl && labels && lbl.textContent !== labels[Math.round(pan)]) lbl.textContent = labels[Math.round(pan)];
      }
    }
    const cur = segOf.find((s) => g >= s.start && g < s.end) || segOf[segOf.length - 1];
    if (cur.name !== curSeg) {
      curSeg = cur.name;
      navLinks.forEach((a) => a.setAttribute("aria-current", a.getAttribute("href") === "#" + navFor(cur.name)));
      chips.forEach((b) => b.setAttribute("aria-current", b.dataset.go === cur.name));
      setMenuCurrent(cur.name);
    }
    nav.classList.toggle("is-scrolled", g > 0.5);
  }

  function jumpTo(id, instant = false) {
    const el = document.getElementById(id);
    if (!el) return false;
    // "instant", not "auto": "auto" defers to the CSS scroll-behavior (smooth),
    // which would fast-scroll through every transition in between
    const behavior = instant || reduced ? "instant" : "smooth";
    if (!pinned || jumps[id] == null) {
      el.scrollIntoView({ behavior });
      return true;
    }
    const y = flow.offsetTop + jumps[id] * vh;
    if (lenis) lenis.scrollTo(y, instant ? { immediate: true } : { duration: Math.min(2.4, 0.8 + Math.abs(y - scrollY) / vh / 12) });
    else scrollTo({ top: y, behavior });
    return true;
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"], [data-go]');
    if (!a) return;
    const id = a.dataset.go || a.getAttribute("href").slice(1);
    // No hash in the address bar: it made the page reopen mid-way on refresh
    if (id && jumpTo(id)) e.preventDefault();
  });

  /* ---------- phone menu: full-screen overlay to jump between sections ---------- */
  const menu = $("#menu");
  const menuBtn = $("[data-menu-toggle]");
  const menuLabel = $("[data-menu-label]");
  const MENU = [
    { id: "top", label: "Home", seg: "hero" },
    { id: "projects", label: "Projects", seg: "roster", children: S.projects.map((p) => ({ id: "p-" + p.id, label: p.name, seg: "p-" + p.id })) },
    { id: "skills", label: "Skills", seg: "skills" },
    { id: "log", label: "Log", seg: "log" },
    { id: "archive", label: "Archive", seg: "archive" },
    { id: "contact", label: "Contact", seg: "contact" }
  ];
  $("[data-menu-list]").innerHTML = MENU.map((m) => `<li>
      <a class="menu__item" href="#${m.id}" data-menu-go="${m.id}" data-seg-of="${m.seg}">${esc(m.label)}</a>
      ${m.children ? `<ul class="menu__sub">${m.children.map((c) => `<li><a href="#${c.id}" data-menu-go="${c.id}" data-seg-of="${c.seg}">${esc(c.label)}</a></li>`).join("")}</ul>` : ""}
    </li>`).join("");
  const menuLinks = $$("[data-menu-go]", menu);
  let menuOpen = false;

  function setMenuCurrent(segName) {
    menuLinks.forEach((a) => {
      const own = a.dataset.segOf === segName;
      const parent = a.dataset.segOf === "roster" && segName.startsWith("p-");
      a.toggleAttribute("aria-current", own || parent);
      if (own || parent) a.setAttribute("aria-current", own ? "location" : "true");
    });
  }
  function openMenu() {
    menuOpen = true;
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add("is-open"));
    document.documentElement.classList.add("menu-open");
    menuBtn.setAttribute("aria-expanded", "true");
    menuLabel.textContent = "Close";
    (menuLinks.find((a) => a.getAttribute("aria-current") === "location") || menuLinks[0]).focus();
  }
  function closeMenu(returnFocus = true) {
    if (!menuOpen) return;
    menuOpen = false;
    menu.classList.remove("is-open");
    document.documentElement.classList.remove("menu-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuLabel.textContent = "Menu";
    const hide = () => { if (!menuOpen) menu.hidden = true; };
    if (reduced) hide(); else setTimeout(hide, 320);
    if (returnFocus) menuBtn.focus();
  }
  menuBtn.addEventListener("click", () => (menuOpen ? closeMenu() : openMenu()));
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("[data-menu-go]");
    if (!a) {
      // GitHub / Email buttons just close the menu behind them
      if (e.target.closest("a")) closeMenu(false);
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    const id = a.dataset.menuGo;
    closeMenu(false);
    // land straight on the section instead of fast-scrolling through every transition
    jumpTo(id, true);
    menuBtn.focus({ preventScroll: true });
  });
  document.addEventListener("keydown", (e) => {
    if (!menuOpen) return;
    if (e.key === "Escape") { e.preventDefault(); closeMenu(); return; }
    if (e.key === "Tab") {
      // keep keyboard focus inside the menu and its toggle button while open
      const items = [menuBtn, ...$$("a, button", menu)];
      const i = items.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    }
  });
  // the menu is phone-only: close it if the screen grows past the phone breakpoint
  matchMedia("(min-width: 981px)").addEventListener("change", (e) => e.matches && closeMenu(false));

  addEventListener("scroll", update, { passive: true });
  let rt;
  addEventListener("resize", () => {
    // Ignore height-only changes from a phone's address bar sliding in and out
    if (pinned && innerWidth === lastW && Math.abs(innerHeight - vh) < vh * 0.25) return;
    clearTimeout(rt); rt = setTimeout(layout, 150);
  });
  lenisMQ.addEventListener("change", layout);
  pinMQ.addEventListener("change", layout);

  // running timecode like a camera viewfinder
  const tcs = $$("[data-tc]");
  const t0 = performance.now();
  const pad = (v) => String(v).padStart(2, "0");
  setInterval(() => {
    const s = (performance.now() - t0) / 1000;
    const txt = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(Math.floor(s) % 60)}:${pad(Math.floor((s % 1) * 24))}`;
    tcs.forEach((t) => (t.textContent = txt));
  }, reduced ? 1000 : 42);

  /* ---------- loader: the one orchestrated moment ---------- */
  const pct = $(".loader__pct");
  const start = performance.now();
  const minTime = reduced ? 0 : 900;
  let ready = false;
  Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 2500))])
    .then(() => {
      layout();
      ready = true;
      // Start at the top on refresh, back/forward or a restored tab. Only a fresh
      // visit to a shared link like /#skills jumps to that section.
      const navType = (performance.getEntriesByType("navigation")[0] || {}).type;
      const freshVisit = navType === "navigate" || navType === undefined;
      if (location.hash && freshVisit) setTimeout(() => jumpTo(location.hash.slice(1), true), 50);
      else {
        if (location.hash) history.replaceState(null, "", location.pathname + location.search);
        scrollTo({ top: 0, behavior: "instant" });
      }
    });
  (function tick(t) {
    const p = Math.min(ready ? 100 : 90, Math.round(((t - start) / Math.max(minTime, 1)) * 100));
    pct.textContent = p + "%";
    if (p >= 100) {
      document.body.classList.remove("is-loading");
      if (!reduced) requestAnimationFrame(rain);
      return;
    }
    requestAnimationFrame(tick);
  })(start);
})();
