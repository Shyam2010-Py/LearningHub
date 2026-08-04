# Student Hub

A unified Progressive Web App (PWA) that brings together every student-focused project under one polished interface. Built as the single home for **Ghanashyam Pabbuleti's** portfolio, learning tools, and productivity apps.

![Version](https://img.shields.io/badge/version-1.1.2-blue.svg)
![PWA](https://img.shields.io/badge/PWA-installable-00E676.svg)
![Offline](https://img.shields.io/badge/offline-ready-00D4FF.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ What's Inside (v1.1.2)

- 🏠 **Modern dashboard home** with welcome, search, six module cards, recent activity, continue learning, **Coming Soon**, quick access, and today's tip
- 🧠 **Accurate Continue Learning** — only live modules (Portfolio, Logic Lab) with real progress bars; upcoming modules live in a dedicated **Coming Soon** section
- 🎨 **Dark theme** with cyan / indigo / green accents, glassmorphism, soft shadows, and smooth animations
- 🧭 **Sticky top navigation**, hamburger drawer, search, settings, and profile chip
- 👤 **Portfolio module** (live) — full personal profile, projects, skills, journey, and contact
- ⚡ **Logic Lab module** (live) — Digital Electronics: 17+ learning pages, 7 interactive simulators, 110+ quiz questions, conversion calculators, flip-flop play, more
- 📦 **Modular architecture** — every module lives in its own folder; new modules plug in without changing the shell
- 🔗 **Shared shell bridge** — Student Hub navbar + footer appear on every module page; consistent theme, spacing, and accessibility
- 🪟 **PWA-ready** — manifest, service worker, offline page, install prompt, update prompt at both hub and module level
- 🌐 **Works offline** after the first visit (cache-first for assets, network-first for HTML)
- 📲 **Installable** on Android, iOS, desktop, and Chromebook
- ♿ **Accessible** — semantic HTML, ARIA labels, reduced-motion support, keyboard nav
- ⚡ **Fast** — SVG-only assets, lazy loading, preconnect hints, no raster images
- 🚀 **Deploy-ready** — static, no build step; works on GitHub Pages / Cloudflare Pages

## 🗂️ Project Structure

```
student-hub/
├── index.html                 # Student Hub home (dashboard)
├── offline.html               # Hub PWA offline fallback
├── manifest.json              # Hub PWA manifest
├── service-worker.js          # Hub service worker
├── README.md
├── GUIDE.md
├── CHANGELOG.md
│
├── css/
│   └── hub.css                # Shared hub design system
│
├── js/
│   └── hub.js                 # Shared hub logic (drawer, PWA, search, reveals)
│
├── assets/
│   ├── favicon.svg            # Hub favicon
│   ├── logo.svg               # Hub horizontal logo
│   ├── logo-icon.svg          # Hub monogram
│   ├── icons/                 # SVG icon set (search, settings, modules, social)
│   └── illustrations/
│       └── hero.svg           # Home hero illustration
│
└── modules/
    ├── portfolio/             # Module 1 (live)
    │   ├── index.html
    │   ├── offline.html
    │   ├── manifest.json
    │   ├── service-worker.js
    │   ├── css/style.css
    │   ├── js/main.js
    │   └── assets/
    │
    └── LogicLab-1.0.2/        # Module 2 (live) — Digital Electronics
        ├── index.html         # Logic Lab home
        ├── gates.html         # 7 logic gate simulators
        ├── truth-tables.html
        ├── arithmetic.html    # Binary addition / subtraction / etc.
        ├── complements.html
        ├── half-adder.html
        ├── full-adder.html
        ├── flipflops.html
        ├── multiplexer.html
        ├── demultiplexer.html
        ├── encoder.html
        ├── decoder.html
        ├── formulas.html
        ├── quiz.html          # 110+ question quiz
        ├── notes.html
        ├── about.html
        ├── changelog.html
        ├── offline.html
        ├── manifest.json
        ├── sw.js
        ├── css/
        │   ├── style.css
        │   ├── responsive.css
        │   ├── extra.css
        │   └── hub-bridge.css    # ← Integration bridge
        ├── js/
        │   ├── components.js    # Sidebar + topbar + bottom nav + footer
        │   ├── main.js
        │   ├── converter.js
        │   ├── gates.js
        │   ├── arithmetic.js
        │   ├── quiz.js
        │   ├── search.js
        │   ├── pwa.js
        │   └── hub-bridge.js    # ← Injects Hub nav + footer
        └── assets/              # icon-192.png, icon-512.png
```

## 🧩 Modules

| # | Module | Status | Path | Category |
|---|--------|--------|------|----------|
| 1 | Portfolio | ✅ Live | `modules/portfolio/` | Profile |
| 2 | ECE Toolkit | ⏳ Coming soon | `modules/ece-toolkit/` | Electronics |
| 3 | **Logic Lab** | ✅ **Live** | `modules/LogicLab-1.0.2/` | **Digital Electronics** |
| 4 | Python Hub | ⏳ Coming soon | `modules/python/` | Programming |
| 5 | C Programming Hub | ⏳ Coming soon | `modules/c-programming/` | Programming |
| 6 | Student Budget Tracker | ⏳ Coming soon | `modules/student-budget-tracker/` | Productivity |

> 📝 The Logic Lab module currently uses the folder name `LogicLab-1.0.2` (kept from upstream to preserve its SW cache version and manifest). A `logic-lab` alias may be introduced in a future release — the integration is identical regardless of folder name.

## 🚀 Quick Start

1. **Open locally** — open `index.html` in any modern browser, or serve the root with any static server (`python3 -m http.server 8000`).
2. **Try the modules** — click **Portfolio** for profile & projects, or **Logic Lab** for digital-electronics learning.
3. **Install as PWA** — in Chrome/Edge, an "Install Student Hub" toast appears at the bottom → click **Install**.
4. **Test offline** — toggle DevTools → Network → Offline, then reload. The hub shell + Portfolio + Logic Lab are all cached locally.

## 🌐 Deploy

### Cloudflare Pages / GitHub Pages / Netlify / Vercel

- **Build command:** *(leave empty)*
- **Build output:** `/` (root)
- Service workers require HTTPS — all major static hosts provide it automatically.

## 🎨 Design Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--primary` | `#00D4FF` | Brand cyan |
| `--secondary` | `#4F46E5` | Brand indigo |
| `--accent` | `#00E676` | Success / live states |
| `--bg` | `#0B1020` | Page background |
| `--bg-elev` | `#141B2D` | Cards, modals |
| `--text` | `#E6ECFF` | Primary text |
| `--radius` | `16px` | Default rounding |
| `--radius-lg` | `22px` | Card rounding |

## ➕ Adding a New Module

The architecture is fully modular. To add a new module:

1. Create `modules/<your-module>/` with its own `index.html`, `css/`, `js/`, `assets/`, `manifest.json`, `service-worker.js`.
2. (Optional) Add a `hub-bridge.js` file that injects the Hub shell into every page — see `modules/LogicLab-1.0.2/js/hub-bridge.js` for a working example.
3. Add a module card in the home page's `modules-grid` section in `index.html`.
4. Add the entry in the drawer's `<nav class="drawer-body">` (and remove the `disabled` styling for live modules).
5. Pre-cache the module entry in the hub's `service-worker.js` → `STATIC_ASSETS` list.

That's it — no shell changes required. ECE Toolkit, Python Hub, C Programming Hub, and Student Budget Tracker can all be added this way.

## 🔗 Hub ↔ Module Integration

Student Hub uses a **bridging model** so modules keep their full identity while still feeling part of the Hub:

- A **Hub top bar** (`.hub-bar`) appears at the top of every module page with the Hub logo + a "Back to Hub" link.
- A **Hub footer** (`.hub-footer`) appears at the bottom of every module page.
- Each module keeps its **own** sidebar, top bar, bottom nav, and theme — none of its features are replaced.
- The Hub shell is injected by a small `js/hub-bridge.js` using `insertBefore(document.body.firstChild)` and `appendChild(document.body)`. Non-destructive, no rewriting of the module's own DOM.

## 📜 License

MIT License — Free to use and modify.

## 📧 Contact

- **Email:** ghanashyampabbuleti7@gmail.com
- **GitHub:** [@Shyam2010-Py](https://github.com/Shyam2010-Py)
- **LinkedIn:** [Ghanashyam Pabbuleti](https://www.linkedin.com/in/ghanashyam-pabbuleti-096781413)
