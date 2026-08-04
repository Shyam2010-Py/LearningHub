# Student Hub

A unified Progressive Web App (PWA) that brings together every student-focused project under one polished interface. Built as the single home for **Ghanashyam Pabbuleti's** portfolio, learning tools, and productivity apps.

![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)
![PWA](https://img.shields.io/badge/PWA-installable-00E676.svg)
![Offline](https://img.shields.io/badge/offline-ready-00D4FF.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ What's Inside (V1.0.0)

- 🏠 **Modern dashboard home** with welcome, search, six module cards, recent activity, continue learning, quick access, and today's tip
- 🎨 **Dark theme** with cyan / indigo / green accents, glassmorphism, soft shadows, and smooth animations
- 🧭 **Sticky top navigation**, hamburger drawer, search, settings, and profile chip
- 👤 **Portfolio module** (live) — full integration of the existing Portfolio as the first module
- 📦 **Modular architecture** — every module lives in its own folder; new modules plug in without changing the shell
- 🪟 **PWA-ready** — manifest, service worker, offline page, install prompt, update prompt
- 🌐 **Works offline** after the first visit (cache-first for assets, network-first for HTML)
- 📲 **Installable** on Android, iOS, desktop, and Chromebook
- ♿ **Accessible** — semantic HTML, ARIA labels, reduced-motion support
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
    └── portfolio/             # First module (live) — fully self-contained
        ├── index.html         # Portfolio page (with hub top bar)
        ├── offline.html
        ├── manifest.json
        ├── service-worker.js
        ├── css/style.css
        ├── js/main.js
        └── assets/            # Portfolio's own logo, favicon, project images
```

## 🧩 Modules

| # | Module | Status | Path |
|---|--------|--------|------|
| 1 | Portfolio | ✅ Live | `modules/portfolio/` |
| 2 | ECE Toolkit | ⏳ Coming soon | `modules/ece-toolkit/` |
| 3 | Logic Lab | ⏳ Coming soon | `modules/logic-lab/` |
| 4 | Python Hub | ⏳ Coming soon | `modules/python/` |
| 5 | C Programming Hub | ⏳ Coming soon | `modules/c-programming/` |
| 6 | Student Budget Tracker | ⏳ Coming soon | `modules/student-budget-tracker/` |

## 🚀 Quick Start

1. **Open locally** — open `index.html` in any modern browser, or serve the root with any static server (`python3 -m http.server 8000`).
2. **Try the Portfolio** — click the first module card (or open `modules/portfolio/`).
3. **Install as PWA** — in Chrome/Edge, an "Install Student Hub" toast appears at the bottom → click **Install**.
4. **Test offline** — toggle DevTools → Network → Offline, then reload. The hub shell + portfolio are fully cached.

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

1. Create `modules/<your-module>/` with its own `index.html`, `css/`, `js/`, `assets/`, `manifest.json`, `service-worker.js`.
2. Add a module card in the home page's `modules-grid` section in `index.html`.
3. Add the entry in the drawer's `<nav class="drawer-body">` (and remove the `disabled` styling for live modules).
4. Pre-cache the module entry in the hub's `service-worker.js` → `STATIC_ASSETS` list.

That's it — no shell changes required.

## 📜 License

MIT License — Free to use and modify.

## 📧 Contact

- **Email:** ghanashyampabbuleti7@gmail.com
- **GitHub:** [@Shyam2010-Py](https://github.com/Shyam2010-Py)
- **LinkedIn:** [Ghanashyam Pabbuleti](https://www.linkedin.com/in/ghanashyam-pabbuleti-096781413)
# LearningHub
# LearningHub
# LearningHub
