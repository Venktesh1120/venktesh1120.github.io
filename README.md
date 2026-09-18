# Portfolio Site

A static, multi-page Product Management portfolio. No build step, no framework, no paid hosting.

## Structure

- `index.html` — landing page (bio, skills, experience, education, certifications)
- `case-studies.html` — case study write-ups
- `projects.html` — MVPs / side projects
- `content.json` — **all editable content lives here**. Edit this file to update any page; the HTML/JS never needs to change for a content update.
- `css/style.css` — styling
- `js/render.js` — reads `content.json` and renders it into each page

## Updating content

Open `content.json` and edit the relevant section:

- `profile` — name, title, tagline, summary, contact info, LinkedIn URL (replace the placeholder!)
- `skills` — grouped skill chips
- `experience` — work history bullets
- `caseStudies` — each entry has `problem` / `approach` / `actions` / `result`. Remove the `"draft": true` field once you've replaced the placeholder text with real details. Remove the `note` field too.
- `projects` — currently empty; add `{ "name", "tags", "description", "link" }` objects as you build things

No coding needed for text updates — just edit the JSON and save.

## Previewing locally

Because the pages fetch `content.json` via JavaScript, opening `index.html` directly by double-clicking it won't work in most browsers (blocked by CORS on `file://`). Run a tiny local server instead:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Deploying for free — GitHub Pages

1. Create a new **public** GitHub repository (e.g. `portfolio-site`, or name it `<your-username>.github.io` if you want it at the root of your GitHub domain).
2. Push this folder to that repository.
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. Save. GitHub gives you a live URL within a minute or two (`https://<username>.github.io/<repo>/` or `https://<username>.github.io/` for a user site).

No payment, no card, no subscription required — this is free for public repositories indefinitely.

## Adding a resume download (optional)

Drop your resume PDF into an `assets/` folder, set `"resumeFile": "assets/resume.pdf"` in `content.json`, and add a download link in `index.html`/`js/render.js` if you want a direct download button.
