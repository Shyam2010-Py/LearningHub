# Changelog

All notable changes to **LearningHub** are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] — 2026-08-21

### 🎯 Rebrand — From Student Hub to LearningHub

LearningHub is now positioned as a **central learning workspace and launchpad**. Each project remains a standalone repository; LearningHub only links to the verified live version.

### ✨ Added

- **New locked design system** in `css/hub.css`:
  - Dark navy technology aesthetic (`#070B16` base, `#101827` panels, `#233149` lines).
  - Electric blue (`#62b0ff`), cyan (`#34d5e8`) and sparingly used violet (`#7d6cff`) accents.
  - Minimal gradients, no glow spam, no excessive glassmorphism.
  - Strong hierarchy, professional typography, consistent spacing.
- **Sticky app header** — LearningHub logo, name, primary navigation, profile chip and a mobile hamburger.
- **Mobile drawer-style menu** — collapses the navigation into a panel under the header; opens via `#menuButton`, closes on link click or Escape.
- **Personal welcome hero** — "Welcome back, Ghanashyam" eyebrow, "Keep learning. Keep building." headline, lead text, three compact actions (`Continue Learning →`, `Explore Projects`, `View Roadmap`), and the `assets/illustrations/hero.svg` illustration (max ~220px on mobile).
- **Continue Learning** section — four cards (LogicLab, C Programming, Microcontroller Hub, Python for Students), each clearly labelled **"Demo progress · N%"** and rendered from a single `DEFAULT_PROGRESS` object in `js/hub.js`. Replace this object when real progress tracking is added.
- **Latest Updates** — compact three-card row with honest notes (LogicLab improvements, new modules live, LearningHub redesign).
- **Projects & Modules** — three categories (Electronics & ECE, Programming, Projects & Tools) listing the eight real, verified projects with their external GitHub Pages URLs.
- **Learning Roadmap** — four numbered stages (Foundation, Programming, Hardware, Build). Horizontal timeline on desktop, vertical timeline on mobile with the connector line shifting to a left-side vertical gradient.
- **How to Use LearningHub** — four-step practical flow (Study → Simulate → Practice → Build).
- **Coming Soon** — only genuinely planned future modules (Study Planner, Lab Notebook, Circuit Snippets).
- **Compact footer** — LearningHub brand, project links, full student identity (Ghanashyam Pabbuleti, ECE Diploma, SV Government Polytechnic College, Tirupati) and current year.

### 🧹 Removed

- All references to "Student Hub" — naming, descriptions and metadata now consistently use **LearningHub**.
- All references to local `modules/`, `modules/portfolio/`, and `modules/LogicLab-1.0.2/` directories. Standalone projects are now external links.
- The old `manifest.json` ("Student Hub" branding, indigo `#00D4FF` theme) has been replaced.
- The old service worker pre-cache list (phantom `modules/...` paths). The service worker now only caches files that actually exist.
- Dead JavaScript selectors (`#hamburger`, `#drawer`, `#drawerClose`, `#drawerOverlay`, `#heroSearch`, `#navbar` non-existent styles) that referenced elements which were not in the new page.

### 🔧 Changed

- `manifest.json`:
  - `name`: `LearningHub`
  - `short_name`: `LearningHub`
  - `description`: rewritten for the current Hub.
  - `theme_color`: `#62b0ff`
  - `background_color`: `#070B16`
  - `categories`: trimmed to `education`, `productivity`.
- `service-worker.js`:
  - Versioned cache: `learninghub-static-v2.0.0`, `learninghub-html-v2.0.0`, `learninghub-runtime-v2.0.0`.
  - Pre-cache list contains only files that exist: `index.html`, `offline.html`, `manifest.json`, `css/hub.css`, `js/hub.js`, `assets/favicon.svg`, `assets/logo.svg`, `assets/logo-icon.svg`, `assets/icons/icon-192.svg`, `assets/icons/icon-512.svg`, `assets/illustrations/hero.svg`.
  - Cross-origin requests (the external GitHub Pages projects) are explicitly skipped.
  - Install / activate / fetch handlers preserved and hardened; offline fallback still works.
- `offline.html` — updated branding to **LearningHub**, aligned styling with the new design system, removed "Student Hub" wording.
- `README.md`, `GUIDE.md`, `CHANGELOG.md` — all rewritten to describe the **current** LearningHub. Removed every reference to "Student Hub", `modules/`, old LogicLab versioned folder names, and the old module-bridge architecture.

### 🧠 Architecture

- LearningHub is a **single static site** (`index.html` + `css/hub.css` + `js/hub.js` + `assets/`).
- All standalone projects are **external** GitHub Pages URLs.
- No project application code is duplicated inside LearningHub.
- The Continue Learning card grid is driven by a single `DEFAULT_PROGRESS` object so it can later be replaced by real progress tracking without touching `index.html`.

### 📱 Responsive

- Test widths: **320, 360, 390, 412, 768, 850, 1024, 1366 px**.
- Breakpoints: **850px**, **700px**, **560px**, plus 1024px and 380px helpers.
- Desktop → tablet → mobile grids: 3-col → 2-col → 1-col where appropriate.
- Mobile hero illustration max ~220px; no horizontal scroll.
- Footer stacks on small screens.
- Minimum 44px touch targets on hamburger and primary buttons.

### ♿ Accessibility

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- `aria-expanded`, `aria-controls`, dynamic `aria-label` on the hamburger.
- `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` on the Continue Learning progress bars.
- `aria-label` on the hero illustration.
- Visible focus rings on every focusable element.
- Escape closes the mobile menu and returns focus to the button.
- `prefers-reduced-motion` honored.

---

## [1.1.2] and earlier — Student Hub

Historical Student Hub versions have been removed from this changelog because the project has been repositioned as LearningHub. The relevant project files are preserved in the git history of the Student Hub repository.
