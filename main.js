/* ==========================================================================
   Dylan Dreis — Personal Portfolio
   Edit the EXPERIENCE and PROJECTS arrays below to update site content.
   No build step needed — just save and refresh index.html.
   ========================================================================== */

/* -----------------------------------------------------------------------
   EXPERIENCE — one object per role, most recent first (by end date).
   Add a new role by copying an existing object and editing the fields.

   Note on the CLA deal services role: it starts September 2026, so its
   `dates` read "Starting September 2026" rather than a range. Once you
   actually start, change this to "September 2026 – Present" and swap the
   bullet for real accomplishments.
   ----------------------------------------------------------------------- */
const EXPERIENCE = [
  {
    role: "Deal Services Associate",
    company: "CliftonLarsonAllen",
    location: "Boston, Massachusetts",
    dates: "Starting September 2026",
    bullets: [
      "Incoming associate in CLA's deal services practice, returning to the firm after a 2025 summer internship in tax."
    ]
  },
  {
    role: "Co-Founder / Head of Finance",
    company: "Career Exposure Club",
    location: "Tucson, Arizona",
    dates: "February 2024 – May 2026",
    bullets: [
      "Led budgeting, fundraising, and sponsorship, securing $5,000+ in funding from the University of Arizona.",
      "Built the club's financial strategy with cost-effective initiatives that maximized resource allocation.",
      "Cultivated a cross-industry professional network for workshops, guest lectures, and mentorship."
    ]
  },
  {
    role: "Accounting / Gameday Operations Intern",
    company: "Barstool Sports Arizona Bowl",
    location: "Tucson, Arizona",
    dates: "September 2022 – December 2025",
    bullets: [
      "Coordinated financial data across event management and marketing to help execute the football bowl game.",
      "Supported compliance and internal auditing — verifying transactions and assisting with financial statement prep.",
      "Communicated across three teams to facilitate events leading up to the bowl game."
    ]
  },
  {
    role: "Summer Tax Intern",
    company: "CliftonLarsonAllen",
    location: "Phoenix, Arizona",
    dates: "June 2025 – August 2025",
    bullets: [
      "Reconciled $10M+ in client financial data and conducted tax research on 20+ cases to optimize deductions and credits.",
      "Prepared and reviewed federal and state tax returns for individuals, corporations, and partnerships, ensuring accuracy and compliance.",
      "Streamlined workflows in CCH Axcess and Excel, reducing preparation time by 15% and delivering projects ahead of deadlines."
    ]
  }
];

/* -----------------------------------------------------------------------
   PROJECTS — TODO: swap these placeholders for your real AI projects.
   liveUrl / repoUrl can be set to "#" if a link doesn't exist yet.
   ----------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: "Tax document summarizer", // TODO: replace with real project
    description: "An AI tool that reads tax documents (W-2s, 1099s, K-1s) and produces a plain-English summary of key figures and flags for review, cutting first-pass review time.",
    tags: ["Python", "OpenAI API", "PDF parsing"],
    liveUrl: "#",
    repoUrl: "#",
    placeholder: true
  },
  {
    title: "Excel financial-modeling copilot", // TODO: replace with real project
    description: "A copilot that sits alongside Excel financial models, explaining formulas, flagging circular references, and suggesting sensitivity scenarios for valuation work.",
    tags: ["JavaScript", "Office Scripts", "LLM prompting"],
    liveUrl: "#",
    repoUrl: "#",
    placeholder: true
  },
  {
    title: "Reconciliation automation tool", // TODO: replace with real project
    description: "Automates matching of transactions across bank statements and ledgers, surfacing discrepancies above a configurable threshold for accountant review.",
    tags: ["Python", "Pandas", "Automation"],
    liveUrl: "#",
    repoUrl: "#",
    placeholder: true
  }
];

/* -----------------------------------------------------------------------
   GitHub feed configuration
   ----------------------------------------------------------------------- */
const GITHUB_USERNAME = "ddreis2003-glitch";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;

/* -----------------------------------------------------------------------
   Rendering
   ----------------------------------------------------------------------- */
function renderExperience() {
  const list = document.getElementById("timelineList");
  list.innerHTML = EXPERIENCE.map(job => `
    <li class="timeline-item">
      <h3 class="timeline-role">${job.role}</h3>
      <p class="timeline-meta"><span class="company">${job.company}</span> — ${job.location} · ${job.dates}</p>
      <ul class="timeline-bullets">
        ${job.bullets.map(b => `<li>${b}</li>`).join("")}
      </ul>
    </li>
  `).join("");
}

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = PROJECTS.map(project => `
    <article class="card">
      ${project.placeholder ? '<span class="card-badge">Placeholder — TODO</span>' : ""}
      <h3 class="card-title">${project.title}</h3>
      <p class="card-desc">${project.description}</p>
      <div class="card-tags">
        ${project.tags.map(tag => `<span class="card-tag">${tag}</span>`).join("")}
      </div>
      <div class="card-links">
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live demo</a>
        <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">GitHub repo</a>
      </div>
    </article>
  `).join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

async function renderGithubRepos() {
  const grid = document.getElementById("repoGrid");
  const status = document.getElementById("repoStatus");

  try {
    const response = await fetch(GITHUB_API_URL);

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      status.textContent = "No public repositories found yet.";
      return;
    }

    grid.innerHTML = repos.map(repo => `
      <article class="card">
        <h3 class="card-title">
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${escapeHtml(repo.name)}</a>
        </h3>
        <p class="card-desc">${repo.description ? escapeHtml(repo.description) : "No description provided."}</p>
        <div class="repo-meta">
          <span>${repo.language ? escapeHtml(repo.language) : "—"}</span>
          <span class="repo-stars">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9L5.7 21l1.7-7-5.4-4.7 7.1-.6L12 2z"/></svg>
            ${repo.stargazers_count}
          </span>
        </div>
      </article>
    `).join("");
  } catch (error) {
    status.textContent = "Couldn't load GitHub repositories right now (the API may be rate-limited). Please check back later.";
    console.error("GitHub feed error:", error);
  }
}

/* -----------------------------------------------------------------------
   Hero background animation

   A slow field of drifting dots, linked by faint lines when they come
   close, that gently leans toward the cursor. Deliberately understated —
   it must never compete with the hero text sitting on top of it.

   Guardrails worth keeping if you edit this:
   - Particle alpha stays low. The white hero text must stay legible.
   - Honours prefers-reduced-motion: draws ONE static frame, never animates.
   - Pauses when the tab is hidden or the hero scrolls out of view, so it
     costs nothing while you're reading the rest of the page.
   - Particle count scales with area and is capped, so phones stay smooth.
   ----------------------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const DOT_RGB = "143, 180, 217"; // --accent-on-dark
  const DOT_ALPHA = 0.5;
  const LINE_ALPHA = 0.14;         // keep low: lines cross the headline
  const PULL_RADIUS = 140;

  let width = 0;
  let height = 0;
  let particles = [];
  let rafId = null;
  let visible = true;

  const pointer = { x: 0, y: 0, active: false };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap: retina phones
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seed() {
    // Density follows area, floor for tiny screens, ceiling for big ones.
    const target = Math.round((width * height) / 16000);
    const count = Math.max(24, Math.min(80, target));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.3 + 0.7
      });
    }
  }

  function linkDistance() {
    return Math.max(90, Math.min(150, width / 9));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const link = linkDistance();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < link * link) {
          const alpha = (1 - Math.sqrt(d2) / link) * LINE_ALPHA;
          ctx.strokeStyle = `rgba(${DOT_RGB}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    ctx.fillStyle = `rgba(${DOT_RGB}, ${DOT_ALPHA})`;
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function step() {
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (pointer.active) {
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < PULL_RADIUS && d > 0.5) {
          const pull = (1 - d / PULL_RADIUS) * 0.4;
          p.x += (dx / d) * pull;
          p.y += (dy / d) * pull;
        }
      }

      // Wrap around the edges so the field never thins out.
      if (p.x < -20) p.x = width + 20;
      else if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      else if (p.y > height + 20) p.y = -20;
    }

    draw();
    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (rafId !== null || prefersReducedMotion) return;
    rafId = requestAnimationFrame(step);
  }

  function stop() {
    if (rafId === null) return;
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  function rebuild() {
    resize();
    seed();
    draw(); // paint immediately, so there's never an empty frame
  }

  rebuild();

  if (prefersReducedMotion) {
    // Static field only. Still redraw on resize so it never looks stretched.
    window.addEventListener("resize", rebuild);
    return;
  }

  if (canHover) {
    canvas.parentElement.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    });
    canvas.parentElement.addEventListener("mouseleave", () => {
      pointer.active = false;
    });
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(rebuild, 150);
  });

  // Don't burn frames on a hidden tab.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else if (visible) start();
  });

  // Don't burn frames once the hero is scrolled past.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    }, { threshold: 0 }).observe(canvas);
  } else {
    start();
  }
}

/* -----------------------------------------------------------------------
   Nav scroll-spy — highlights the nav link for the section in view.

   Deliberately NOT using IntersectionObserver: its enter/leave events
   batch unpredictably on fast jumps, which left the wrong link lit.
   Reading positions on scroll is deterministic — whichever section
   straddles a line just below the sticky nav is the active one.
   Throttled through requestAnimationFrame, so it stays cheap.
   ----------------------------------------------------------------------- */
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const pairs = links
    .map((link) => ({ link, section: document.getElementById(link.getAttribute("href").slice(1)) }))
    .filter((pair) => pair.section);

  if (!pairs.length) return;

  const LINE = 100; // just below the 64px sticky nav
  let current = null;
  let ticking = false;

  function update() {
    ticking = false;

    let active = null;

    // At the very bottom, light the last link (Contact). The footer is too
    // short to ever reach the detection line, so it would never activate.
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) {
      active = pairs[pairs.length - 1].link;
    } else {
      for (const { link, section } of pairs) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= LINE && rect.bottom > LINE) active = link;
      }

      // Nothing straddles the line (e.g. between sections): fall back to the
      // last section that starts above it.
      if (!active) {
        for (const { link, section } of pairs) {
          if (section.getBoundingClientRect().top <= LINE) active = link;
        }
      }
    }

    if (active !== current) {
      links.forEach((l) => l.classList.remove("is-active"));
      if (active) active.classList.add("is-active");
      current = active;
    }
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });

  window.addEventListener("resize", update);
  update();
}

/* -----------------------------------------------------------------------
   Mobile nav toggle
   ----------------------------------------------------------------------- */
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* -----------------------------------------------------------------------
   Init
   ----------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderExperience();
  renderProjects();
  renderGithubRepos();
  initNavToggle();
  initHeroCanvas();
  initScrollSpy();
  document.getElementById("year").textContent = new Date().getFullYear();
});
