# LearningHub

A personal learning workspace and launchpad for ECE studies, programming, electronics tools and student projects — built by **Ghanashyam Pabbuleti**.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Type](https://img.shields.io/badge/type-Learning%20Workspace-62b0ff.svg)
![Static](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-9aa8bd.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

---

## What is LearningHub?

**LearningHub is a central hub.** It is not a code dump. It does **not** copy or duplicate the standalone project applications. Each project — LogicLab, ECE Toolkit, Microcontroller Hub, C Programming Hub, Python for Students, PocketPilot, Attendance Tracker, and the Portfolio — lives and evolves in its **own** repository. LearningHub simply links to the current live version of every project.

If you want to learn, simulate, practice or build — LearningHub is where you start. From there, you jump into the right tool.

---

## ✨ Features (v2.0.0)

- 🧭 **Sticky app header** — LearningHub logo, primary navigation, profile chip, mobile hamburger.
- � **Personal welcome hero** — "Welcome back, Ghanashyam" greeting, headline, lead text and three compact actions.
- 📚 **Continue Learning** — four sample courses (LogicLab, C Programming, Microcontroller Hub, Python for Students) with honest "Demo progress" labelling. Progress values are stored in a single `DEFAULT_PROGRESS` object so they can later be replaced by real tracking.
- 📰 **Latest Updates** — honest, compact notes about real progress in the active projects.
- �️ **Projects & Modules** — three categories (Electronics & ECE, Programming, Projects & Tools). Every project links to its verified external URL.
- 🛣️ **Learning Roadmap** — four numbered stages (Foundation, Programming, Hardware, Build) with a horizontal timeline on desktop and a vertical timeline on mobile.
- 🔁 **How to Use LearningHub** — a four-step practical flow: Study → Simulate → Practice → Build.
- 🧪 **Coming Soon** — only genuinely planned/future modules.
- 🔗 **8 verified project links** — every project opens the correct standalone GitHub Pages URL.
- 📱 **Fully responsive** — tested at 320, 360, 390, 412, 768, 850, 1024 and 1366 px.
- ♿ **Accessible** — semantic HTML, ARIA labels, keyboard support (including Escape to close the mobile menu), visible focus rings.
- 🪟 **PWA-ready** — installable manifest, versioned service worker, offline fallback.
- 🚀 **Deploy-ready** — zero build step, pure static site.

---

## �️ Project Structure

```
learninghub/
├── index.html                 # LearningHub home
├── offline.html               # PWA offline fallback
├── manifest.json              # PWA manifest
├── service-worker.js          # Service worker (versioned cache)
├── README.md
├── GUIDE.md
├── CHANGELOG.md
│
├── css/
│   └── hub.css                # Single design system (design tokens, components, responsive)
│
├── js/
│   └── hub.js                 # Shell logic: mobile menu, scroll state, progress render, year
│
└── assets/
    ├── favicon.svg            # Favicon
    ├── logo.svg               # Wordmark (reserved)
    ├── logo-icon.svg          # Monogram
    ├── icons/                 # SVG icon set
    │   ├── icon-192.svg
    │   ├── icon-512.svg
    │   └── (UI icons)
    └── illustrations/
        └── hero.svg           # Home hero illustration
```

The standalone projects are **not** inside this repository. They live in their own repositories and are linked as external sites.

---

## 🔗 Linked Standalone Projects

| # | Project | URL |
|---|---------|-----|
| 1 | LogicLab | https://shyam2010-py.github.io/LogicLab/ |
| 2 | ECE Toolkit | https://shyam2010-py.github.io/ece-toolkit/ |
| 3 | Microcontroller Hub | https://shyam2010-py.github.io/microcontroller-hub/ |
| 4 | C Programming Hub | https://shyam2010-py.github.io/c-programming-hub/ |
| 5 | Python for Students | https://shyam2010-py.github.io/python-for-students/ |
| 6 | PocketPilot | https://shyam2010-py.github.io/StudentBudgetTracker/ |
| 7 | Attendance Tracker | https://shyam2010-py.github.io/Attendance-Tracker/ |
| 8 | Portfolio | https://shyam2010-py.github.io/Portfolio/ |

LearningHub never replaces or rewrites these projects. It only points at the current live version.

---

## 🎨 Design Tokens (locked)

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#070B16` | Page background base |
| `--bg-2` | `#0B1220` | Gradient background mid |
| `--panel` | `#101827` | Card surfaces |
| `--panel-2` | `#141D30` | Card hover / drawer |
| `--accent` | `#62b0ff` | Primary accent (electric blue) |
| `--accent-2` | `#34d5e8` | Secondary accent (cyan) |
| `--accent-3` | `#7d6cff` | Violet (used sparingly) |
| `--success` | `#42d69b` | Live / active status |
| `--text` | `#f6f8fc` | Primary text |
| `--muted` | `#9aa8bd` | Secondary text |
| `--line` | `#233149` | Borders / dividers |

The visual personality is a **dark navy technology aesthetic** with electric blue and cyan as the primary accents. There is no glow spam, no excessive glassmorphism, and no excessive rounded cards — LearningHub feels like a focused learning workspace, not a generic SaaS landing page.

---

## 🧩 Continue Learning Data

The four Continue Learning cards are rendered from a single `DEFAULT_PROGRESS` object in `js/hub.js`:

```js
const DEFAULT_PROGRESS = {
    logiclab:     { ... percent: 8  },
    cprogramming: { ... percent: 14 },
    microhub:     { ... percent: 6  },
    python:       { ... percent: 22 }
};
```

The card clearly labels the value as **Demo progress · 8%** so it is never mistaken for a real completion number. Replace this object (or wire it to a real data source) when real progress tracking is implemented.

---

## � PWA

- **Manifest** — `name`, `short_name`, `description`, `start_url`, `scope`, `theme_color: #62b0ff`, `background_color: #070B16`, SVG icons (192, 512, maskable).
- **Service worker** (`service-worker.js`) — versioned cache `learninghub-v2.0.0`. Caches only real, existing assets: `index.html`, `offline.html`, `manifest.json`, `css/hub.css`, `js/hub.js`, `assets/favicon.svg`, `assets/logo.svg`, `assets/logo-icon.svg`, `assets/icons/icon-192.svg`, `assets/icons/icon-512.svg`, `assets/illustrations/hero.svg`. Cross-origin requests (the external GitHub Pages projects) are deliberately not cached here — they remain external links.
- **Offline page** — clean, on-brand fallback with Retry and Return Home buttons.

---

## 📱 Responsive

| Width | Layout |
|-------|--------|
| ≥ 1024px | 3-column project grid, 4-column continue + flow grids, 3-column footer |
| 851–1023px | Tablet — 2-column project grid, 2-column continue + flow grids |
| 561–850px | Mobile drawer active, hero collapses, 2-column grids where space allows |
| ≤ 560px | Single column everywhere, roadmap numbers stack vertically, footer stacks |
| ≤ 380px | Hero compresses further; nav remains compact but readable |

---

## � Accessibility

- All interactive elements are real `<a>` or `<button>` elements (no clickable `<div>`s).
- The mobile hamburger has `aria-expanded`, `aria-controls`, and a dynamic `aria-label`.
- Escape closes the mobile menu and returns focus to the button.
- Cards have descriptive `aria-label`s where needed.
- Visible focus rings (`outline: 2px solid var(--accent)`) on every focusable element.
- Minimum 44×44 touch target on the hamburger and primary buttons.
- Color contrast meets WCAG AA on the dark navy palette.

---

## � License

MIT — free to use and modify.

## 📧 Contact

- **Email:** ghanashyampabbuleti7@gmail.com
- **GitHub:** [@Shyam2010-Py](https://github.com/Shyam2010-Py)
- **LinkedIn:** [Ghanashyam Pabbuleti](https://www.linkedin.com/in/ghanashyam-pabbuleti-096781413)
