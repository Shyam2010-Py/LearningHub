# Student Hub — Developer Guide

A detailed walkthrough of how Student Hub is built, how its parts fit together, and how to extend it with new modules.

---

## 1. Philosophy

Student Hub is a **shell + modules** architecture:

- The **shell** (`index.html`, `css/hub.css`, `js/hub.js`) provides navigation, layout, PWA plumbing, and the home dashboard.
- Each **module** lives in `modules/<name>/` and is fully self-contained — its own HTML, CSS, JS, manifest, service worker, and assets.

This means:
- You can drop in a new module folder and link to it from the home page — nothing else has to change.
- A broken or offline module never breaks the hub shell (different service workers scope themselves per module).
- Modules can be deployed independently (or as part of the same site).

---

## 2. File Map

```
index.html              ← Hub home dashboard
offline.html            ← PWA offline fallback (hub)
manifest.json           ← PWA manifest (hub)
service-worker.js       ← Service worker (hub scope)
css/hub.css             ← All hub styles (design system)
js/hub.js               ← Hub logic: drawer, PWA, search, reveals

assets/                 ← Shared assets (icons, illustrations, hub logo)
  icons/                ← SVG icon set
  illustrations/        ← Home hero illustration
  favicon.svg           ← Hub favicon
  logo.svg              ← Hub logo
  logo-icon.svg         ← Hub monogram

modules/                ← Per-module folders
  portfolio/            ← Live module
    index.html          ← Portfolio page (with hub top bar)
    offline.html
    manifest.json
    service-worker.js
    css/style.css
    js/main.js
    assets/             ← Portfolio's own assets
```

---

## 3. Design System (`css/hub.css`)

All shared design tokens live in `:root`:

```css
--primary: #00D4FF;       /* cyan   */
--secondary: #4F46E5;     /* indigo */
--accent: #00E676;        /* success / live */
--bg: #0B1020;            /* page bg */
--bg-elev: #141B2D;       /* card bg */
--text: #E6ECFF;          /* primary text */
--text-soft: #A8B2D1;     /* secondary text */
--radius: 16px;
--radius-lg: 22px;
--grad-primary: linear-gradient(135deg, #00D4FF 0%, #4F46E5 100%);
```

### Reusable components

- `.glass` — glassmorphism card
- `.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost`, `.btn-icon`
- `.module-card[data-theme="cyan|indigo|green|orange|pink|violet"]` — colored module cards
- `.section-head` — section heading with "more" link
- `.panel` — panel inside a 2-col grid
- `.progress`, `.progress-bar` — progress bar
- `.quick-grid` + `.quick-item` — 6-col quick access grid
- `.tip-card` — highlighted tip card
- `.drawer`, `.drawer-panel`, `.drawer-link` — slide-in nav

---

## 4. Home Dashboard (`index.html`)

Sections (in order):

1. **Navbar** — sticky, contains: hamburger, brand, search input, settings icon, profile chip.
2. **Drawer** — slide-in from the left; lists Home, Portfolio, and disabled placeholders for future modules.
3. **Hero** — welcome chip, headline, lead paragraph, hero search, two CTA buttons, and the hero SVG illustration.
4. **Modules** — six module cards (1 live + 5 "coming soon"). Cards have hover lift, color glow, and a status badge.
5. **Recent Activity + Continue Learning** — two-column glass panels. Recent activity is dynamic; Continue learning shows progress bars per module.
6. **Quick Access** — six icon tiles (About, Projects, Skills, Contact, Journey, Ideology), each linking to the corresponding portfolio section.
7. **Today's Tip** — a single highlighted callout.
8. **Footer** — 4-column grid: brand, modules, resources, connect; plus a copyright + socials row.
9. **PWA toasts** — install and update toasts, hidden by default, shown on the appropriate browser event.

---

## 5. Hub Logic (`js/hub.js`)

Runs once after page load. It:

1. Wires up the **drawer** toggle (hamburger, close, overlay, ESC key).
2. Adds **scroll-driven navbar** styling (`.scrolled` class after 16px).
3. Wires the **hero search** to highlight the Portfolio card (placeholder for future cross-module search).
4. Sets up **reveal-on-scroll** for any element with `.reveal` via `IntersectionObserver`.
5. Registers the **service worker** and listens for `updatefound` → shows the update toast; on `controllerchange`, reloads the page to apply the new SW.
6. Listens for `beforeinstallprompt` → shows the install toast; on click, calls `prompt()` and stores the user's choice.
7. Sets the **footer year**.
8. Highlights the active link in the drawer based on the current path.

---

## 6. PWA Plumbing

### Manifest (`manifest.json`)

- `start_url`, `scope` → `./`
- `display: standalone` (no browser chrome when installed)
- `theme_color: #00D4FF`, `background_color: #0B1020`
- SVG-only icons (192, 512, any-purpose + maskable)

### Service Worker (`service-worker.js`)

- **Install** — pre-caches all critical assets (HTML, CSS, JS, SVGs, the Portfolio entry).
- **Activate** — purges any caches whose name doesn't match the current version.
- **Fetch**:
  - HTML navigations → network-first; falls back to the cached version, then to `offline.html`.
  - Same-origin static assets → cache-first; on miss, fetches and caches.
  - Cross-origin (fonts, FontAwesome) → bypassed (not cached).
- **Messages** — page can call `postMessage({type:'SKIP_WAITING'})` to force-activate a new worker.

### Offline page (`offline.html`)

- Standalone, self-styled (reuses the hub design system via `hub.css`).
- Offers **Retry** and **Return Home** buttons.

### Install / Update toasts

Both toasts use the same `.pwa-toast` styling but are controlled independently:

- **Install** — shown on `beforeinstallprompt`, hidden on `appinstalled`.
- **Update** — shown when a new SW reaches `installed` state while a previous worker controls the page. The Update button posts `SKIP_WAITING`; the SW then activates and the page reloads.

---

## 7. Module Integration: Portfolio

The Portfolio module is **fully self-contained** and lives at `modules/portfolio/`. To fit it into the hub:

- A **hub top bar** is injected at the top of the portfolio's `index.html` (a 44px sticky strip with the hub mark, breadcrumb, and a "Back to Hub" button).
- The portfolio's own PWA (manifest + service worker + offline page) is preserved — the portfolio still installs as a standalone PWA.
- The portfolio's existing navbar is offset 44px down so it doesn't overlap the hub bar.
- The hub's home page links to `modules/portfolio/` and the drawer's Portfolio entry also points there.
- All of the portfolio's SVG assets (logo, favicon, project thumbnails) are recreated inside `modules/portfolio/assets/` so the module is independent of the hub.

---

## 8. Adding a New Module

### Step 1 — Create the folder

```
modules/<name>/
├── index.html
├── css/style.css
├── js/main.js
├── manifest.json
├── service-worker.js
├── offline.html
└── assets/
```

### Step 2 — Add a card on the home page

In `index.html`, find the `.modules-grid` and add a new card:

```html
<a href="modules/<name>/" class="module-card reveal" data-theme="green" data-key="<name>">
    <div class="module-icon">
        <svg viewBox="0 0 24 24" ...>...</svg>
    </div>
    <h3>Module Name</h3>
    <p>Short description.</p>
    <div class="module-meta">
        <span class="status status-live">● Live</span>
        <span class="arrow">→</span>
    </div>
</a>
```

Pick a `data-theme` from: `cyan`, `indigo`, `green`, `orange`, `pink`, `violet`.

### Step 3 — Enable the drawer's link

In `index.html`'s drawer, change the corresponding `<span class="drawer-link disabled">` to an `<a href="modules/<name>/" class="drawer-link">`.

### Step 4 — Pre-cache in the hub service worker

In `service-worker.js` → `STATIC_ASSETS`, add:

```js
'./modules/<name>/index.html',
'./modules/<name>/manifest.json',
'./modules/<name>/css/style.css',
'./modules/<name>/js/main.js',
'./modules/<name>/service-worker.js',
```

Bump the `VERSION` constant to force a fresh cache.

### Step 5 — Add a Continue Learning card (optional)

In `index.html`, add a `.continue-item` to the Continue Learning panel.

That's it — the module is now reachable from the hub home, the drawer, and once visited, it works offline.

---

## 9. Performance Notes

- All images are **SVG** — no raster files anywhere in the build.
- The home page uses **lazy loading** (`loading="lazy"`) on icons and project thumbnails.
- **Font preconnect** hints reduce font load time.
- Service worker uses **cache-first for static assets** and **network-first for HTML** — best balance between speed and freshness.
- Reveal animations are CSS-driven and only run on supported browsers (via `IntersectionObserver`).
- `prefers-reduced-motion` is honored — animations are effectively disabled when the user opts out.

---

## 10. Accessibility

- Semantic HTML (`<nav>`, `<main>`, `<footer>`, `<section>`, `<aside>`).
- ARIA labels on icon-only buttons and the drawer dialog.
- Sufficient color contrast for all text (WCAG AA).
- `aria-hidden` on decorative SVGs.
- Keyboard-friendly drawer (ESC to close).

---

## 11. Browser Support

- Chrome / Edge ≥ 90 ✅
- Firefox ≥ 90 ✅
- Safari ≥ 14 ✅
- Samsung Internet ≥ 14 ✅
- iOS Safari — PWA install works via "Add to Home Screen" (manifest is honored)

---

## 12. Future Ideas

- **Cross-module search** — index content from all modules and search from the hub.
- **Per-user dashboard** — persist "Recent Activity" and "Continue Learning" via `localStorage`.
- **Settings panel** — theme toggle, density, default landing module.
- **Attendance Tracker**, **Scientific Calculator**, **Microcontroller Hub**, **AI Assistant** — all slot into `modules/` with no shell changes.
- **Push notifications** — when a module is updated.
- **Background sync** — sync portfolio form submissions when the user comes back online.
