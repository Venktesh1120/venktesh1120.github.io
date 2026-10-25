# Portfolio Site

Product Manager portfolio, built with Jekyll so that GitHub Pages renders it with no build step on your side.
Every project and every learning note is **one Markdown file**. Add a file, push, and it appears on the
site, in the Work or Learnings list, and in the home page "GenAI Evidence" map.

## Where things live

| What | Where |
|---|---|
| Name, tagline, summary, contact, hero stats, philosophy | `_data/profile.yml` |
| Work history | `_data/experience.yml` |
| Skills, education, certifications | `_data/skills.yml`, `_data/education.yml`, `_data/certifications.yml` |
| GenAI concept vocabulary (for tagging) | `_data/genai_concepts.yml` |
| Project types shown on the Work page | `_data/project_types.yml` |
| Case studies, GenAI builds, teardowns | `_projects/<slug>.md` → `/work/<slug>/` |
| Learning notes | `_learnings/<slug>.md` → `/learnings/<slug>/` |
| Templates to copy | `templates/project.md`, `templates/learning.md` (not published) |
| Layouts and styling | `_layouts/`, `_includes/`, `css/style.css` |

## Adding a project

1. Copy `templates/project.md` to `_projects/<short-slug>.md`.
2. Fill in the front matter (type, status, role, metrics, `concepts`) and each section of the body.
3. Leave `published: false` while it's a draft. Unpublished files are never built, so nothing half-done goes live.
4. When it's ready, delete the `published: false` line (or set it to `true`) and push.

`type` decides which group it appears under on the Work page (`genai-build`, `case-study`, `teardown`).
`featured: true` puts it on the home page (up to 4). `concepts` links it to the GenAI Evidence map.

## Adding a learning note

Copy `templates/learning.md` to `_learnings/<short-slug>.md` and follow the same steps.
Use `applied_in: [project-slug]` to link a note to the project where you used it.
The Learnings nav link appears automatically once the first note is published.

## How the GenAI Evidence map works

The home page lists each concept from `_data/genai_concepts.yml` that is tagged on at least one published
project or learning, with links to that work. A concept with nothing behind it is not shown, so the site
never claims a skill you haven't demonstrated. Tag honestly: only add a concept if the write-up shows it.

## Previewing locally

Pushing to `main` is enough; GitHub Pages builds the site in about a minute. To preview first:

```bash
gem install jekyll -v 3.10.0 kramdown-parser-gfm webrick
jekyll serve              # http://localhost:4000
jekyll serve --unpublished   # also shows drafts with published: false
```

## Hidden notes

Text inside `{% comment %} ... {% endcomment %}` in a Markdown file is never rendered.
The two existing case studies use this to list what's still missing.
