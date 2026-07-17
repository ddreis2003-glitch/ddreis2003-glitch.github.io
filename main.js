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
  initScrollSpy();
  document.getElementById("year").textContent = new Date().getFullYear();
});
