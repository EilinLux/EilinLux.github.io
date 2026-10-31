// Shared runtime for the digital-assembly-line slides animations.
//   Plays once, then shows a play button (bottom right) to watch it again
//   Space = pause / resume (replay once ended) · R = restart · page.html#t=0.3 = freeze at 30%
//   ← / → (or PageUp / PageDown) = previous / next slide
//   H = hide / show the on-screen controls (slide number, play button), remembered across slides
//   click the slide number = jump to any slide
const frame = document.querySelector(".frame");

// Slide order: add new pages here
const slides = [
  "01-cover.html",
  "02-what-we-do.html",
  "03-how.html",
  "04-who-am-i.html",
  "05-icebreaker-1.html",
  "06-adk.html",
  "07-icebreaker-2.html",
  "08-not-a-test.html",
  "09-bring-to-table.html",
  "10-graveyard.html",
  "11-avoid-all-this.html",
  "12-assembly-line.html",
  "13-example.html",
  "14-requirements.html",
  "15-worst-scenario.html",
  "16-single-agent.html",
  "17-structured-workflow.html",
  "18-one-task-one-agent.html",
  "19-llmagent.html",
  "20-tool.html",
  "21-sub-agents.html",
  "22-demo-1.html",
  "23-context-question.html",
  "24-naive-memory.html",
  "25-structured-handoffs.html",
  "26-session-state.html",
  "27-state-layers.html",
  "28-typed-contracts.html",
  "29-demo-2.html",
  "30-decouple-question.html",
  "31-subagents-vs-tools.html",
  "32-heterogeneity.html",
  "33-mcp-and-a2a.html",
  "34-mcp.html",
  "35-a2a.html",
  "36-mcp-server.html",
  "37-mcp-client.html",
  "38-a2a-code.html",
  "39-demo-3.html",
  "40-evaluating.html",
  "41-eval-metrics.html",
  "42-eval-best-practice.html",
  "43-adk-eval.html",
  "44-in-the-end.html",
  "45b-final-architecture.html",
  "46-final-thought.html",
  "47-qa.html",
];

const file = location.pathname.split("/").pop();
const go = (step) => {
  let i = slides.indexOf(file);
  if (i === -1) {
    if (file === "45-final-architecture.html" || file === "46b-final-architecture.html") {
      i = slides.indexOf("45b-final-architecture.html");
    }
  }
  const next = slides[i + step];
  if (i !== -1 && next) location.href = next;
};

// Scale the frame to fit the window while maintaining 1920x1080 aspect ratio
const fit = () => {
  const s = Math.min(innerWidth / 1920, innerHeight / 1080);
  frame.style.top = `${innerHeight / 2}px`;
  frame.style.transform = `translate(-50%, -50%) scale(${s})`;
};
addEventListener("resize", fit);
fit();

const animations = () => frame.getAnimations({ subtree: true });
const loop = parseFloat(getComputedStyle(frame).getPropertyValue("--loop")) * 1000;

// Each page plays once and stops at END of its loop: from 96% on the pages fade out
// to restart, so 94% is the last frame with everything on screen.
const END = 0.94;
let ended = false;

const seek = (time) => animations().forEach((a) => { a.currentTime = time; a.pause(); });
const togglePause = () => {
  const running = animations().some((a) => a.playState === "running");
  animations().forEach((a) => (running ? a.pause() : a.play()));
};

const replay = document.createElement("button");
replay.className = "replay";
replay.setAttribute("aria-label", "Play again");
replay.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg>';
document.body.append(replay);

const restart = () => {
  ended = false;
  replay.classList.remove("show");
  animations().forEach((a) => { a.currentTime = 0; a.play(); });
};
replay.addEventListener("click", restart);

// Links marked data-next (e.g. the cover's Start button) open the next slide in the deck
const nextSlide = slides[slides.indexOf(file) + 1];
if (nextSlide) document.querySelectorAll("[data-next]").forEach((a) => (a.href = nextSlide));

// Slide number, bottom left: "05e · 12 / 15" (the file prefix, then the position in the deck).
// Clicking it opens the slide list, as tall as the window.
const prefix = (f) => f.split("-")[0];
const dock = document.createElement("div");
dock.className = "dock";
const badge = document.createElement("button");
badge.className = "slide-id";
badge.setAttribute("aria-label", "Go to slide");
const index = slides.indexOf(file);
badge.textContent = prefix(file) + (index === -1 ? "" : ` · ${index + 1} / ${slides.length}`);
dock.append(badge);

const menu = document.createElement("nav");
menu.className = "slide-menu";
const slideTitle = (f) => f.replace(/^[^-]+-/, "").replace(/\.html$/, "").replaceAll("-", " ");
menu.innerHTML = slides
  .map((f) => `<a href="${f}"${f === file ? ' class="current" aria-current="page"' : ""}><code>${prefix(f)}</code><span>${slideTitle(f)}</span></a>`)
  .join("");
const openMenu = (on) => {
  menu.classList.toggle("open", on);
  if (on) menu.querySelector(".current")?.scrollIntoView({ block: "center" });
};
badge.addEventListener("click", (e) => {
  e.stopPropagation();
  badge.blur();
  openMenu(!menu.classList.contains("open"));
});
addEventListener("click", (e) => { if (!menu.contains(e.target)) openMenu(false); });

document.body.append(menu, dock);
try { localStorage.removeItem("anim-notes"); } catch {}
document.documentElement.classList.remove("notes-open");

// H hides the controls; the choice is remembered so it stays off while recording the whole deck
const BARE = "anim-bare";
const setBare = (on) => {
  document.documentElement.classList.toggle("bare", on);
  try { on ? localStorage.setItem(BARE, "1") : localStorage.removeItem(BARE); } catch {}
};
try { setBare(localStorage.getItem(BARE) === "1"); } catch {}

const watch = () => {
  const now = Math.max(0, ...animations().map((a) => a.currentTime ?? 0));
  if (!ended && now >= END * loop) {
    ended = true;
    seek(END * loop);
    replay.classList.add("show");
  }
  requestAnimationFrame(watch);
};
requestAnimationFrame(watch);

addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    ended ? restart() : togglePause();
  } else if (e.key === "Escape") {
    openMenu(false);
  } else if (e.key === "r" || e.key === "R") {
    restart();
  } else if (e.key === "h" || e.key === "H") {
    setBare(!document.documentElement.classList.contains("bare"));
  } else if (e.key === "ArrowRight" || e.key === "PageDown") {
    e.preventDefault();
    go(1);
  } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
    e.preventDefault();
    go(-1);
  }
});

const t = Number(new URLSearchParams(location.hash.slice(1)).get("t"));
if (t) seek(t * loop);
