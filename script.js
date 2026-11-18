(function () {
  "use strict";

  /* ---- EDIT HERE: add your GitHub repo and demo-video links per project. Empty = button hidden. ---- */
  var LINKS = {
    can:    { repo: "", demo: "" },
    energy: { repo: "", demo: "" },
    cpp:    { repo: "", demo: "" },
    lpc:    { repo: "", demo: "" }
  };
  var EMAIL = "pravinspatil9579@outlook.com";
  /* ------------------------------------------------------------------------------------------------ */

  var root = document.documentElement;
  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* theme toggle */
  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  function syncMeta() {
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", currentTheme() === "light" ? "#f4f1e7" : "#0a0e0d");
  }
  var tbtn = document.getElementById("theme");
  if (tbtn) {
    tbtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncMeta();
    });
  }
  syncMeta();

  /* project links (hidden until you fill LINKS above) */
  var projects = document.querySelectorAll("[data-project]");
  Array.prototype.forEach.call(projects, function (el) {
    var cfg = LINKS[el.getAttribute("data-project")] || {};
    var box = el.querySelector("[data-links]");
    if (!box) return;
    function add(href, label, cls) {
      if (!href) return;
      var a = document.createElement("a");
      a.className = "btn small " + cls;
      a.href = href; a.target = "_blank"; a.rel = "noopener";
      a.textContent = label;
      box.appendChild(a);
    }
    add(cfg.repo, "Source on GitHub", "ghost");
    add(cfg.demo, "Watch the demo", "primary");
    if (!box.children.length) box.parentNode.removeChild(box);
  });

  /* hero: UART frame for 'P' (0x50): idle, start, D0..D7 (LSB first), stop, idle */
  var BITS = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1];
  var LAB = ["IDL", "STA", "D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "STP", "IDL"];
  var svg = document.getElementById("wave");
  var list = document.getElementById("bits");
  if (svg && list) {
    var NS = "http://www.w3.org/2000/svg", W = 50, H = 150, HI = 38, LO = 112, i;
    var mk = function (name, attrs) {
      var e = document.createElementNS(NS, name);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    };
    for (i = 0; i <= BITS.length; i++) svg.appendChild(mk("line", { x1: i * W, y1: 8, x2: i * W, y2: H - 8, "class": "g" }));
    svg.appendChild(mk("line", { x1: 0, y1: HI, x2: 600, y2: HI, "class": "gh" }));
    svg.appendChild(mk("line", { x1: 0, y1: LO, x2: 600, y2: LO, "class": "gh" }));
    var yv = function (b) { return b ? HI : LO; };
    var d = "M0 " + yv(BITS[0]) + " H" + W;
    for (i = 1; i < BITS.length; i++) d += " V" + yv(BITS[i]) + " H" + (i + 1) * W;
    svg.appendChild(mk("path", { d: d, "class": "sig" }));
    var cursor = mk("line", { x1: 0, y1: 6, x2: 0, y2: H - 6, "class": "cur" });
    cursor.style.display = "none";
    svg.appendChild(cursor);

    var cells = BITS.map(function (b, k) {
      var li = document.createElement("li"), s = document.createElement("span"), v = document.createElement("b");
      s.textContent = LAB[k]; v.textContent = b;
      li.appendChild(s); li.appendChild(v); list.appendChild(li);
      return li;
    });

    if (!reduce) {
      var idx = 0, timer = null, total = BITS.length + 3;
      var tick = function () {
        cells.forEach(function (c, k) { c.classList.toggle("on", k === idx); });
        if (idx < BITS.length) {
          var x = idx * W + W / 2;
          cursor.setAttribute("x1", x); cursor.setAttribute("x2", x); cursor.style.display = "";
        } else { cursor.style.display = "none"; }
        idx = (idx + 1) % total;
      };
      var start = function () { if (!timer) { tick(); timer = setInterval(tick, 520); } };
      var stop = function () { clearInterval(timer); timer = null; };
      start();
      document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
    }
  }

  /* copy email */
  var cb = document.getElementById("copy");
  if (cb) {
    cb.addEventListener("click", function () {
      var original = cb.textContent;
      var show = function (text, ms) { cb.textContent = text; setTimeout(function () { cb.textContent = original; }, ms); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(function () { show("Copied", 1800); }, function () { show(EMAIL, 4000); });
      } else { show(EMAIL, 4000); }
    });
  }

  /* reveal on scroll, with a safety net so content can never stay hidden */
  var items = document.querySelectorAll(".reveal");
  var showAll = function () { Array.prototype.forEach.call(items, function (n) { n.classList.add("in"); }); };
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    Array.prototype.forEach.call(items, function (n) { io.observe(n); });
    setTimeout(showAll, 4000);
  } else { showAll(); }
})();
