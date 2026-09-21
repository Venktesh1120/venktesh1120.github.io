async function loadContent() {
  const res = await fetch("content.json");
  if (!res.ok) throw new Error("Could not load content.json");
  return res.json();
}

function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  if (opts.className) node.className = opts.className;
  if (opts.text) node.textContent = opts.text;
  if (opts.html) node.innerHTML = opts.html;
  if (opts.href) node.href = opts.href;
  if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => node.setAttribute(k, v));
  children.forEach((c) => c && node.appendChild(c));
  return node;
}

function renderFooter(profile) {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  const row = el("div", { className: "contact-row" }, [
    el("a", { href: `mailto:${profile.email}`, text: profile.email }),
    profile.phone ? el("a", { href: `tel:${profile.phone}`, text: profile.phone }) : null,
    profile.linkedin ? el("a", { href: profile.linkedin, text: "LinkedIn" }) : null,
  ]);
  mount.appendChild(row);
  mount.appendChild(el("div", { text: `${profile.location || ""}` }));
  if (profile.openTo) {
    mount.appendChild(el("div", { className: "open-to", text: profile.openTo }));
  }
}

function renderStatRow(mount, stats) {
  if (!mount || !stats || stats.length === 0) return;
  stats.forEach((s) => {
    mount.appendChild(
      el("div", { className: "stat" }, [
        el("div", { className: "stat-value", text: s.value }),
        el("div", { className: "stat-label", text: s.label }),
      ])
    );
  });
}

function resumeDownloadName(resumeFile) {
  const parts = String(resumeFile).split("/").filter(Boolean);
  return parts[parts.length - 1] || "resume.pdf";
}

function renderHero(profile) {
  const mount = document.getElementById("hero");
  if (!mount) return;
  mount.appendChild(el("h1", { text: profile.name }));
  mount.appendChild(el("div", { className: "role", text: profile.title }));
  mount.appendChild(el("p", { className: "tagline", text: profile.tagline }));
  mount.appendChild(el("p", { text: profile.summary }));
}

function renderCtas(profile) {
  const mount = document.getElementById("cta-row");
  if (!mount) return;
  if (profile.resumeFile) {
    mount.appendChild(
      el("a", {
        className: "btn primary",
        href: profile.resumeFile,
        text: "Download Resume",
        attrs: { download: resumeDownloadName(profile.resumeFile) },
      })
    );
  }
  mount.appendChild(
    el("a", {
      className: profile.resumeFile ? "btn secondary" : "btn primary",
      href: "case-studies.html",
      text: "View Case Studies",
    })
  );
  mount.appendChild(el("a", { className: "btn secondary", href: "projects.html", text: "View Projects / MVPs" }));
}

function renderHeroStats(profile) {
  const mount = document.getElementById("hero-stats");
  renderStatRow(mount, profile.stats);
}

function renderPhilosophy(philosophy) {
  const mount = document.getElementById("philosophy");
  const section = document.getElementById("philosophy-section");
  if (!mount) return;
  if (!philosophy) {
    if (section) section.style.display = "none";
    return;
  }
  const heading = document.getElementById("philosophy-heading");
  if (heading && philosophy.heading) heading.textContent = philosophy.heading;
  if (philosophy.statement) {
    mount.appendChild(el("p", { className: "philosophy-statement", text: philosophy.statement }));
  }
  if (philosophy.pipeline && philosophy.pipeline.length > 0) {
    const row = el("div", { className: "pipeline-row" });
    philosophy.pipeline.forEach((step, i) => {
      row.appendChild(el("div", { className: "pipeline-step", text: step }));
      if (i < philosophy.pipeline.length - 1) {
        row.appendChild(el("div", { className: "pipeline-arrow", text: "→" }));
      }
    });
    mount.appendChild(row);
  }
}

function renderExperienceIntro(intro) {
  const mount = document.getElementById("experience-intro");
  if (!mount) return;
  if (!intro) {
    mount.style.display = "none";
    return;
  }
  mount.textContent = intro;
}

function renderSkills(skills) {
  const mount = document.getElementById("skills");
  if (!mount) return;
  const grid = el("div", { className: "skills-grid" });
  Object.entries(skills).forEach(([cat, items]) => {
    const chipRow = el("div", { className: "chip-row" }, items.map((i) => el("span", { className: "chip", text: i })));
    grid.appendChild(el("div", { className: "skill-cat" }, [el("h3", { text: cat }), chipRow]));
  });
  mount.appendChild(grid);
}

function renderExperience(experience) {
  const mount = document.getElementById("experience");
  if (!mount) return;
  experience.forEach((exp) => {
    const head = el("div", { className: "exp-head" }, [
      el("div", {}, [el("span", { className: "company", text: exp.company }), document.createTextNode(" — "), el("span", { className: "role", text: exp.role })]),
      el("div", { className: "meta", text: `${exp.location} | ${exp.dates}` }),
    ]);
    const list = el("ul", {}, exp.bullets.map((b) => el("li", { text: b })));
    mount.appendChild(el("div", { className: "exp-item" }, [head, list]));
  });
}

function renderEducation(education) {
  const mount = document.getElementById("education");
  if (!mount) return;
  education.forEach((e) => {
    mount.appendChild(
      el("div", { className: "edu-item" }, [
        el("div", { className: "exp-head" }, [
          el("span", { className: "company", text: e.school }),
          el("span", { className: "meta", text: `${e.location} | ${e.dates}` }),
        ]),
        el("div", { text: e.degree }),
      ])
    );
  });
}

function renderCertifications(certifications) {
  const mount = document.getElementById("certifications");
  if (!mount) return;
  certifications.forEach((c) => {
    mount.appendChild(
      el("div", { className: "cert-item" }, [
        el("div", { className: "exp-head" }, [
          el("span", { className: "company", text: c.name }),
          el("span", { className: "meta", text: c.year }),
        ]),
        el("div", { text: c.issuer }),
      ])
    );
  });
}

function renderCaseStudies(caseStudies) {
  const mount = document.getElementById("case-studies");
  if (!mount) return;
  if (!caseStudies || caseStudies.length === 0) {
    mount.appendChild(
      el("div", { className: "empty-state", html: "No case studies yet. Add entries to the <code>caseStudies</code> array in <code>content.json</code>." })
    );
    return;
  }
  caseStudies.forEach((cs) => {
    const titleRow = el("h3", {}, [
      document.createTextNode(cs.title),
      cs.draft ? el("span", { className: "draft-badge", text: "DRAFT" }) : null,
    ]);
    const metricsRow = el("div", { className: "stat-row" });
    renderStatRow(metricsRow, cs.metrics);
    const card = el("div", { className: "case-study-card" }, [
      titleRow,
      el("div", { className: "cs-company", text: `${cs.company} · ${(cs.tags || []).join(", ")}` }),
      cs.metrics && cs.metrics.length > 0 ? metricsRow : null,
      el("h4", { text: "Problem" }),
      el("p", { text: cs.problem }),
      el("h4", { text: "Approach" }),
      el("p", { text: cs.approach }),
      el("h4", { text: "Actions" }),
      el("ul", {}, (cs.actions || []).map((a) => el("li", { text: a }))),
      el("h4", { text: "Result" }),
      el("ul", {}, (cs.result || []).map((r) => el("li", { text: r }))),
      cs.note ? el("div", { className: "cs-note", text: cs.note }) : null,
    ]);
    mount.appendChild(card);
  });
}

function renderProjects(projects) {
  const mount = document.getElementById("projects");
  if (!mount) return;
  if (!projects || projects.length === 0) {
    mount.appendChild(
      el("div", { className: "empty-state", html: "No projects added yet. Add entries to the <code>projects</code> array in <code>content.json</code> — each with a name, problem solved, tools used, and an outcome or link." })
    );
    return;
  }
  projects.forEach((p) => {
    const card = el("div", { className: "case-study-card" }, [
      el("h3", { text: p.name }),
      p.tags ? el("div", { className: "cs-company", text: p.tags.join(", ") }) : null,
      el("p", { text: p.description }),
      p.link ? el("a", { className: "btn secondary", href: p.link, text: "View project" }) : null,
    ]);
    mount.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await loadContent();
    renderHero(data.profile);
    renderCtas(data.profile);
    renderHeroStats(data.profile);
    renderPhilosophy(data.philosophy);
    renderSkills(data.skills);
    renderExperienceIntro(data.experienceIntro);
    renderExperience(data.experience);
    renderEducation(data.education);
    renderCertifications(data.certifications);
    renderCaseStudies(data.caseStudies);
    renderProjects(data.projects);
    renderFooter(data.profile);
    document.title = data.profile.name ? `${data.profile.name} — ${document.title}` : document.title;
  } catch (err) {
    console.error(err);
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="wrap"><p style="color:red">Failed to load content.json: ${err.message}</p></div>`
    );
  }
});
