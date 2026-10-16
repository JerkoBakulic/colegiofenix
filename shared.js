/* Colegio Fénix — datos y comportamiento compartidos por las 3 variantes.
   Cada página solo necesita usar los mismos id/clases: #nav #burger #menu #docs #q #empty #gal .video[data-vid] .maptabs #map .rv */
(function () {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  /* ---------- Barra para cambiar de variante ---------- */
  const VERSIONS = [["index.html", "01", "Institucional"], ["v2.html", "02", "Moderna"], ["v3.html", "03", "Dinámica"]];
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const st = document.createElement("style");
  st.textContent = `
  .fx-switch{position:sticky;top:0;z-index:9999;height:40px;display:flex;align-items:center;justify-content:center;gap:14px;background:#070b1f;color:#9aa3c7;
    font:500 11px/1 "DM Sans","Inter",system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase}
  .fx-switch nav{display:flex;gap:3px;background:rgba(255,255,255,.07);padding:3px;border-radius:99px}
  .fx-switch a{display:flex;gap:7px;align-items:center;padding:7px 13px;border-radius:99px;color:#cdd3ee;text-decoration:none;transition:background .2s,color .2s}
  .fx-switch a b{color:#f2c414;font-weight:700}
  .fx-switch a:hover{color:#fff}
  .fx-switch a.on{background:#fff;color:#0c1842}
  @media(max-width:600px){.fx-switch>span{display:none}.fx-switch a span{display:none}.fx-switch a{padding:7px 14px}}
  .fx-lb{position:fixed;inset:0;z-index:10000;background:rgba(6,10,30,.94);display:none;align-items:center;justify-content:center;padding:60px 16px}
  .fx-lb.on{display:flex}
  .fx-lb img{max-height:82vh;max-width:min(1100px,94vw);border-radius:14px}
  .fx-lb p{position:absolute;bottom:20px;left:0;right:0;text-align:center;color:#fff;font:600 15px system-ui,sans-serif}
  .fx-lb button{position:absolute;width:52px;height:52px;border-radius:50%;border:0;background:rgba(255,255,255,.12);color:#fff;font-size:26px;cursor:pointer}
  .fx-lb button:hover{background:#f2c414;color:#0c1842}
  .fx-lb .x{top:16px;right:16px}.fx-lb .pv{left:12px;top:50%}.fx-lb .nx{right:12px;top:50%}
  .video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}`;
  document.head.appendChild(st);
  const bar = document.createElement("div");
  bar.className = "fx-switch";
  bar.innerHTML = `<span>Propuesta de rediseño</span><nav>${VERSIONS.map(([f, n, t]) => `<a href="${f}" class="${f === here ? "on" : ""}"><b>${n}</b><span>${t}</span></a>`).join("")}</nav>`;
  document.body.prepend(bar);

  /* ---------- Documentos oficiales (PDF publicados por el colegio) ---------- */
  const BASE = "https://colegiofenix.cl/wp-content/uploads/2024/09/";
  const DOCS = [
    ["Protocolo de acoso escolar (bullying)", "PROTOCOLO_ACOSO-ESCOLAR_BULLING.pdf"],
    ["Protocolo de prevención y abordaje del ciberbullying", "PROTOCOLO-PREVENCION-Y-ABORDAJE_CIBERBULLYING.pdf"],
    ["Protocolo de maltrato", "Protocolo-Maltrato-Modificado_Ciangarotti.pdf"],
    ["Protocolo de vulneración de derechos", "Protc_VULNERACION-DE-DERECHOS.pdf"],
    ["Protocolo ante situaciones de abuso sexual y hechos de connotación sexual", "PROTOCOLO-SITUACIONES-DE-ABUSO-SEXUAL-Y-HECHOS-DE-CONNOTACION-SEXUAL_2022.pdf"],
    ["Protocolo de detección, intento y consumación de suicidio", "PROTOCOLO_DETECCION-INTENTO-Y-CONSUMACION-DE-SUICIDIO.pdf"],
    ["Protocolo de prevención de drogas y alcohol", "PROTOCOLO_PREVENCION_DROGAS-Y-ALCOHOL.pdf"],
    ["Protocolo de accidentes escolares", "PROTOCOLO_ACCIDENTES-ESCOLARES.pdf"],
    ["Protocolo de emergencias en caso de terremoto", "PROTOCOLO-DE-EMERGENCIAS-EN-CASO-DE-TERREMOTO.pdf"],
    ["Protocolo de fuga del colegio", "Protocolo_Fuga_colegio.pdf"],
    ["Protocolo de desaparición de un alumno al interior del colegio", "PROTOCOLO_DESAPARICION_-ALUMNO-AL-INTERIOR-DEL-COLEGIO.pdf"],
    ["Protocolo de salidas pedagógicas", "PROTOCOLO-DE-SALIDAS-PEDAGOGICAS.pdf"],
    ["Protocolo de alumnas embarazadas", "PROTOCOLO-ALUMNAS-EMBARAZADAS.pdf"],
    ["Protocolo de retiro de celulares", "PROTOCOLO-DE-RETIRO-DE-CELULARES-VIERNES-16-DE-JUNIO.pdf"]
  ];
  const strip = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const ALIAS = { sismo: "terremoto", temblor: "terremoto", bulling: "bullying", celular: "celulares", embarazo: "embarazadas" };
  const DL = `<svg class="dl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>`;
  function renderDocs(q = "") {
    let t = strip(q.trim());
    Object.keys(ALIAS).forEach(k => { t = t.replace(k, ALIAS[k]); });
    const list = DOCS.filter(([n]) => !t || t.split(/\s+/).every(w => strip(n).includes(w)));
    $("#docs").innerHTML = list.map(([n, f]) => `<li><a href="${BASE + f}" target="_blank" rel="noopener"><span class="pdf">PDF</span><b>${n}</b>${DL}</a></li>`).join("");
    if ($("#empty")) $("#empty").style.display = list.length ? "none" : "block";
  }
  if ($("#docs")) { renderDocs(); $("#q") && $("#q").addEventListener("input", e => renderDocs(e.target.value)); }
  $$("[data-doc-count]").forEach(el => el.textContent = DOCS.length);

  /* ---------- Galería + visor ---------- */
  const GAL = [
    ["basquet-damas", "Básquetbol damas"], ["teleton-grupo", "Campaña Teletón"], ["estandarte", "Estandarte del colegio"], ["comunidad-frontis", "Nuestra comunidad"],
    ["premiacion", "Ceremonia de premiación"], ["globos", "Celebración"], ["teleton-entrega", "Teletón"], ["acto-alumnas", "Acto oficial"],
    ["basquet-varones", "Básquetbol varones"], ["teleton-acto", "Acto solidario"], ["simulacro-sala", "Simulacro de emergencia"], ["curso-sala", "Vida en el aula"]
  ];
  const lb = document.createElement("div");
  lb.className = "fx-lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
  lb.innerHTML = `<button class="x" aria-label="Cerrar">×</button><button class="pv" aria-label="Anterior">‹</button><button class="nx" aria-label="Siguiente">›</button><img alt=""><p></p>`;
  document.body.appendChild(lb);
  let cur = 0;
  const show = i => { cur = (i + GAL.length) % GAL.length; lb.querySelector("img").src = `img/${GAL[cur][0]}.jpg`; lb.querySelector("p").textContent = GAL[cur][1]; };
  const gal = $("#gal");
  if (gal) {
    gal.innerHTML = GAL.map(([f, t], i) => `<button data-i="${i}" class="rv"><img src="img/${f}.jpg" alt="${t}" loading="lazy"><span>${t}</span></button>`).join("");
    gal.addEventListener("click", e => { const b = e.target.closest("button"); if (b && !gal.dataset.dragged) { show(+b.dataset.i); lb.classList.add("on"); } });
  }
  lb.querySelector(".x").onclick = () => lb.classList.remove("on");
  lb.querySelector(".pv").onclick = () => show(cur - 1);
  lb.querySelector(".nx").onclick = () => show(cur + 1);
  lb.addEventListener("click", e => { if (e.target === lb) lb.classList.remove("on"); });
  addEventListener("keydown", e => {
    if (!lb.classList.contains("on")) return;
    if (e.key === "Escape") lb.classList.remove("on");
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });

  /* ---------- Videos: YouTube se carga solo al hacer clic ---------- */
  $$(".video[data-vid]").forEach(v => {
    const play = () => { v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.vid}?autoplay=1&rel=0" title="Video Colegio Fénix" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`; };
    v.addEventListener("click", play, { once: true });
    v.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); } });
  });

  /* ---------- Mapa por sede ---------- */
  $$(".maptabs button[data-q]").forEach(b => b.onclick = () => {
    $$(".maptabs button").forEach(x => x.classList.toggle("on", x === b));
    $("#map").src = "https://www.google.com/maps?q=" + encodeURIComponent(b.dataset.q) + "&output=embed";
  });

  /* ---------- Menú móvil, nav y animaciones ---------- */
  $("#burger") && ($("#burger").onclick = () => document.body.classList.toggle("open"));
  $$("#menu a").forEach(a => a.addEventListener("click", () => document.body.classList.remove("open")));
  const nav = $("#nav");
  if (nav) { const f = () => nav.classList.toggle("solid", scrollY > 50); addEventListener("scroll", f, { passive: true }); f(); }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .1 });
  $$(".rv").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + "ms"; io.observe(el); });

  /* Galería horizontal (variante 3): arrastrar con el mouse */
  if (gal && gal.dataset.drag !== undefined) {
    let down = false, x0 = 0, s0 = 0;
    gal.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") return; down = true; x0 = e.clientX; s0 = gal.scrollLeft; delete gal.dataset.dragged; });
    addEventListener("pointermove", e => { if (!down) return; const d = e.clientX - x0; if (Math.abs(d) > 6) gal.dataset.dragged = "1"; gal.scrollLeft = s0 - d; });
    addEventListener("pointerup", () => { down = false; setTimeout(() => delete gal.dataset.dragged, 0); });
  }
})();
