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
}

function renderHero(profile) {
  const mount = document.getElementById("hero");
  if (!mount) return;
  mount.appendChild(el("h1", { text: profile.name }));
  mount.appendChild(el("div", { className: "role", text: profile.title }));
  mount.appendChild(el("p", { className: "tagline", text: profile.tagline }));
  mount.appendChild(el("p", { text: profile.summary }));
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
    const card = el("div", { className: "case-study-card" }, [
      titleRow,
      el("div", { className: "cs-company", text: `${cs.company} · ${(cs.tags || []).join(", ")}` }),
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
    renderSkills(data.skills);
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
