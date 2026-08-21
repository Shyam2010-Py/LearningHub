# LearningHub — Developer Guide

A detailed walkthrough of how LearningHub is built, how the parts fit together, and how to extend it.

---

## 1. Philosophy

LearningHub follows a **launchpad architecture**:

- **The Hub** (`index.html` + `css/hub.css` + `js/hub.js`) is a single static site. It owns navigation, layout, the welcome hero, the Continue Learning list, the Latest Updates, the project grid, the roadmap, the How-to-use flow, the Coming Soon section, and the footer.
- **The projects** are **standalone repositories**. They live outside this codebase. LearningHub only links to their verified GitHub Pages URLs.
- LearningHub **never** copies, bundles or duplicates a project's application code. Each project keeps its own PWA, its own service worker, its own design system and its own release cadence.

This means:

- A change to a project does **not** require touching LearningHub unless a URL changes.
- A broken or offline project does **not** break LearningHub (cross-origin requests are not cached by the Hub's service worker).
- New projects can be added by editing `index.html` only.
- The Continue Learning progress values can later be replaced by real tracking by editing one object in `js/hub.js`.

---

## 2. File Map

```
learninghub/
├── index.html                 # The Hub home — every section
├── offline.html               # PWA offline fallback
├── manifest.json              # PWA manifest
├── service-worker.js          # Versioned service worker
│
├── css/
│   └── hub.css                # Single design system (tokens + components + responsive)
│
├── js/
│   └── hub.js                 # Shell logic + DEFAULT_PROGRESS
│
└── assets/
    ├── favicon.svg
    ├── logo.svg
    ├── logo-icon.svg
    ├── icons/                 # SVG icon set (UI + PWA icons)
    └── illustrations/
        └── hero.svg           # Hero illustration (referenced from index.html)
```

**There is no `modules/` folder.** Standalone projects are not part of this repository.

---

## 3. Design System (`css/hub.css`)

All visual tokens live in `:root`:

```css
--bg:        #070B16;   /* page background */
--bg-2:      #0B1220;   /* gradient mid */
--panel:     #101827;   /* card surface */
--panel-2:   #141D30;   /* card hover / drawer */

--accent:    #62b0ff;   /* primary electric blue */
--accent-2:  #34d5e8;   /* secondary cyan */
--accent-3:  #7d6cff;   /* violet (used sparingly) */
--success:   #42d69b;   /* live status */

--text:      #f6f8fc;
--muted:     #9aa8bd;
--line:      #233149;
```

The aesthetic is deliberately restrained — dark navy, electric blue / cyan accents, minimal gradients, no glow spam, no excessive glassmorphism, no excessive rounding. LearningHub should feel like a focused learning workspace, not a generic SaaS landing page.

### Reusable components

| Class | Purpose |
|-------|---------|
| `.wrap` | Centered container with max width |
| `.nav`, `.navin`, `.brand`, `.nav-links`, `.nav-profile`, `.menu-btn`, `.mobile-menu` | Header |
| `.hero`, `.hero-grid`, `.eyebrow`, `.grad`, `.hero-actions`, `.btn`, `.hero-illu` | Hero |
| `section`, `.section-head`, `.category` | Section framing |
| `.grid`, `.card`, `.icon`, `.status`, `.arrow` | Project cards |
| `.continue-grid`, `.continue-card`, `.progress`, `.progress-bar` | Continue Learning |
| `.updates-list`, `.update-item` | Latest Updates |
| `.roadmap-shell`, `.roadmap-line`, `.roadmap`, `.step`, `.step-num` | Roadmap |
| `.flow-grid`, `.flow` | How to use |
| `.coming-list`, `.coming-item`, `.badge` | Coming Soon |
| `.footer`, `.footer-grid`, `.footer-brand`, `.footer-col`, `.footer-bottom` | Footer |

### Responsive breakpoints

| Width | Behaviour |
|-------|-----------|
| ≥ 1024 px | 3-col project grid, 4-col continue + flow, 3-col footer |
| 851–1023 px | 2-col project grid, 2-col continue + flow, 2-col footer |
| 561–850 px | Mobile drawer active, hero stacks, 2-col grids |
| ≤ 560 px | Single column everywhere, roadmap stacks, footer stacks |
| ≤ 380 px | Hero compresses further |

---

## 4. Home Page (`index.html`)

Sections, in order:

1. **Sticky header** — logo + name + primary nav + profile chip + mobile hamburger.
2. **Mobile drawer** — collapsed by default; opened via `#menuButton`; closes on link click, Escape, or resize past 850 px.
3. **Hero** — eyebrow, gradient headline, lead, three compact actions, hero illustration.
4. **Continue Learning** — rendered by `js/hub.js` from `DEFAULT_PROGRESS`.
5. **Latest Updates** — three honest update cards.
6. **Projects & Modules** — three category rows (Electronics & ECE, Programming, Projects & Tools), eight cards in total, each linking to the verified external GitHub Pages URL.
7. **Learning Roadmap** — four numbered stages with a connecting timeline.
8. **How to Use LearningHub** — four-step flow.
9. **Coming Soon** — three genuinely planned modules.
10. **Footer** — brand + nav columns + identity + year.

The hero references `assets/illustrations/hero.svg` directly.

---

## 5. Shell Logic (`js/hub.js`)

`js/hub.js` is a single IIFE that wires up everything the new page actually needs:

1. **`DEFAULT_PROGRESS`** — a single object holding the four Continue Learning entries. Each entry has `key`, `label`, `desc`, `url`, and `percent`. The card text always says **"Demo progress · N%"** so the value is never mistaken for a real completion number.
2. **`renderContinueGrid()`** — populates `#continueGrid` from `DEFAULT_PROGRESS`. Adds a real `role="progressbar"` with `aria-valuenow/min/max`.
3. **`initMobileMenu()`** — wires `#menuButton` and `#mobileMenu`. Toggles `.open`, updates `aria-expanded` and the button's `aria-label`, closes on link click, closes on Escape (and returns focus to the button), and closes automatically if the viewport grows past 850 px.
4. **`initNavScroll()`** — adds a `.scrolled` class to `#navbar` after 12 px of scroll for a subtle border/shadow change.
5. **`initActiveNav()`** — uses `IntersectionObserver` to add `.active` to the matching `.nav-links a` as sections come into view.
6. **`initYear()`** — fills `#year` with `new Date().getFullYear()`.

No other behaviour is wired up. There are no dead selectors. Every DOM id referenced in the script exists in `index.html`.

---

## 6. PWA Plumbing

### Manifest (`manifest.json`)

- `name` / `short_name`: **LearningHub**
- `start_url`, `scope`: `./`
- `display`: `standalone`
- `theme_color`: `#62b0ff`
- `background_color`: `#070B16`
- Icons: SVG, 192, 512, maskable.

### Service Worker (`service-worker.js`)

- Cache version: `v2.0.0` → `learninghub-static-v2.0.0`, `learninghub-html-v2.0.0`, `learninghub-runtime-v2.0.0`.
- Pre-cache list contains **only files that actually exist** in this repo:
  - `./`
  - `./index.html`
  - `./offline.html`
  - `./manifest.json`
  - `./css/hub.css`
  - `./js/hub.js`
  - `./assets/favicon.svg`
  - `./assets/logo.svg`
  - `./assets/logo-icon.svg`
  - `./assets/icons/icon-192.svg`
  - `./assets/icons/icon-512.svg`
  - `./assets/illustrations/hero.svg`
- Cross-origin requests are explicitly skipped (the external GitHub Pages projects stay external).
- Install: pre-cache, `skipWaiting()`.
- Activate: purge any caches whose name does not match the current versions; `clients.claim()`.
- Fetch:
  - HTML navigations → network-first, then cache, then `./offline.html`.
  - Static same-origin assets → cache-first, with an image fallback for offline use.
- `message` handler accepts `{type: 'SKIP_WAITING'}` from the page.

### Offline page (`offline.html`)

- Branded for LearningHub, uses the same design tokens as `css/hub.css`.
- Offers **Retry** and **Return Home** buttons.

---

## 7. Continue Learning — How to Swap Real Progress

When real progress tracking is added, the only change required is in `js/hub.js`:

```js
const DEFAULT_PROGRESS = {
    logiclab:     { ... url: '...', percent: 0 },
    cprogramming: { ... url: '...', percent: 0 },
    microhub:     { ... url: '...', percent: 0 },
    python:       { ... url: '...', percent: 0 }
};
```

You can replace the object with an async data source — the rendering function (`renderContinueGrid`) will pick up the change automatically. The card text is built from each item's fields, so any additional field (e.g. `category`, `lastOpened`) can be added without touching the markup.

---

## 8. Adding a New Project

To add a new standalone project to the Hub:

1. **Host the project** at its own GitHub Pages URL.
2. **Edit `index.html`** — add a new `.card` inside the right `.grid` block, with the project's verified URL and an inline SVG icon.
3. **(Optional)** add a Continue Learning entry — append a new key to `DEFAULT_PROGRESS` in `js/hub.js`.
4. **(Optional)** add a link inside the footer's Projects column.
5. **Bump `service-worker.js` VERSION** if you want the new pre-cache entries to be picked up.

LearningHub never needs to import or bundle any project code.

---

## 9. Adding a New Section

If you want to add another section to `index.html`:

1. Add the markup following the existing `section` pattern (`<section id="..."><div class="wrap">…</div></section>`).
2. Add a matching `<a href="#...">` inside the desktop `.nav-links` and the mobile `.mobile-menu-inner`.
3. If the section needs custom styles, add them to `css/hub.css` using the locked tokens.
4. If the section needs interactive behaviour, add the handler in `js/hub.js` inside the IIFE and wire it up from `init()`.

---

## 10. Performance Notes

- All visuals are **SVG** — no raster images anywhere.
- Fonts: system stack + Inter via Google Fonts preconnect in `index.html`.
- Service worker: **cache-first** for static assets, **network-first** for HTML.
- Reveal/scroll behaviour uses CSS only (no JS scroll listeners for visual effects).
- `prefers-reduced-motion` is honored.

---

## 11. Accessibility

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- The hamburger has `aria-expanded`, `aria-controls`, and a dynamic `aria-label`.
- Escape closes the mobile menu and returns focus to the trigger.
- `role="progressbar"` on the Continue Learning progress bars with proper `aria-valuenow/min/max`.
- Visible focus rings (`outline: 2px solid var(--accent)`) on every focusable element.
- Minimum **44×44 px** touch targets on hamburger and primary buttons.
- `alt` text on the hero illustration.
- `aria-hidden="true"` on decorative SVGs.
- Color contrast meets WCAG AA on the dark navy palette.

---

## 12. Browser Support

- Chrome / Edge ≥ 90 ✅
- Firefox ≥ 90 ✅
- Safari ≥ 14 ✅
- Samsung Internet ≥ 14 ✅
- iOS Safari — PWA install works via "Add to Home Screen".

---

## 13. Future Ideas

- **Real progress tracking** — replace `DEFAULT_PROGRESS` with a data source (localStorage, a backend, or GitHub repo metadata).
- **Search across projects** — a hero search bar that routes to the correct project based on keywords.
- **Settings panel** — theme toggle, density, default landing module.
- **Cross-module activity feed** — surface recent commits / releases from each project repo.
- **Push notifications** — when a linked project releases a new version.
