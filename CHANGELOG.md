# Changelog

All notable changes to **Student Hub** are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.1] — 2026-08-04

### 🔄 Update flow polish

- **Hardened `controllerchange` handler** in `js/hub.js`:
  - Guards against reloading on the very first page load (when no previous service worker existed).
  - On any subsequent SW activation, automatically reloads the page once — users get the latest code without needing to click the "Update" toast.
- **Bumped service worker cache version** to `v1.0.1` so the browser detects the new SW on next visit and triggers the update flow.

---

## [1.0.0] — 2026-08-04

### 🎉 Initial Release — The Hub Shell

The first public release of **Student Hub** — a unified PWA home for the portfolio, learning tools, and productivity apps.

### ✨ Added
- **Hub home dashboard** (`index.html`) with:
  - Welcome message, gradient headline, and lead
  - Hero search bar with `kbd` Enter hint
  - Six module feature cards (1 live, 5 "coming soon")
  - Recent Activity panel
  - Continue Learning panel with per-module progress bars
  - Quick Access grid (6 icon tiles linking to portfolio sections)
  - Today's Tip callout
  - Hero SVG illustration
- **Sticky top navigation** with brand, search, settings, and profile chip
- **Hamburger drawer** with Home, Portfolio (live), and disabled placeholders for ECE Toolkit, Logic Lab, Python Hub, C Programming Hub, and Budget Tracker; plus Account links
- **Shared footer** — 4-column grid: brand, modules, resources, connect; copyright and socials row
- **Design system** (`css/hub.css`) with full token set (colors, surfaces, typography, spacing, gradients, glassmorphism, animations, responsive breakpoints)
- **Module card theming** — 6 distinct color themes: cyan, indigo, green, orange, pink, violet
- **Shared JavaScript** (`js/hub.js`):
  - Drawer toggle (button, close, overlay, ESC)
  - Scroll-driven navbar styling
  - Hero search with "Enter" interaction
  - IntersectionObserver-based reveal-on-scroll
  - Service worker registration with update detection
  - `beforeinstallprompt` install toast
  - `appinstalled` listener
  - SKIP_WAITING messaging
  - Footer year injection
  - Active drawer link based on path
- **PWA plumbing**:
  - `manifest.json` — standalone display, cyan theme color, SVG icons (192, 512, maskable)
  - `service-worker.js` — versioned caches, install pre-cache, activate cleanup, network-first HTML, cache-first assets
  - `offline.html` — branded fallback with Retry and Return Home
  - Install toast UI
  - Update toast UI
- **SVG asset library**:
  - Hub logo (full-color wordmark), monogram icon, favicon
  - PWA icons at 192×192 and 512×512
  - 14+ UI icons (search, menu, settings, modules, social, etc.)
  - Home hero illustration (laptop + chip + brackets + bulb)
- **Portfolio module** (`modules/portfolio/`) — fully self-contained, live module:
  - All original portfolio sections preserved (Home, About, Skills, Projects, Resume, Ideology, Journey, Contact)
  - Original portfolio CSS, JS, project data
  - Original portfolio PWA (manifest, service worker, offline page)
  - Hub top-bar injection — sticky breadcrumb with "Back to Hub" button
  - 7 project SVG thumbnails
  - Original portfolio logo, favicon, monogram (rebuilt as SVG)

### 🎨 Design
- **Color tokens**: `#0B1020` background, `#141B2D` cards, `#00D4FF` primary cyan, `#4F46E5` secondary indigo, `#00E676` accent green.
- **Glassmorphism** with `backdrop-filter: blur(20px)` and subtle borders.
- **Rounded corners** — 16px / 22px / 28px radius scale.
- **Soft shadows** + accent glows.
- **Smooth animations** — reveal on scroll, hover lift, drawer slide, toast slide-up.
- **No emojis** — all icons are inline SVGs.
- **No raster images** — fully SVG-based for performance.

### ♿ Accessibility
- Semantic HTML5 throughout
- ARIA labels on all interactive elements
- `aria-hidden` on decorative SVGs
- `prefers-reduced-motion` honored
- Keyboard support (drawer ESC close, focus states, button focus rings)
- Color contrast meets WCAG AA

### 📱 Responsive
- 3-col modules grid on desktop, 2-col on tablet, 1-col on mobile
- 6-col quick access grid → 4 → 3 → 2 cols
- Hero collapses to single column on mobile
- Drawer becomes primary navigation on mobile
- Profile chip collapses to avatar-only on small screens

### ⚡ Performance
- Cache-first for static assets, network-first for HTML
- SVG-only assets
- `loading="lazy"` on images
- Font preconnect hints
- Minimal JS (no frameworks)
- `content-visibility` and `font-display: swap` ready

### 🛠 Technical
- Zero build step — pure HTML / CSS / JS
- Zero dependencies
- Static-host ready (Cloudflare Pages, GitHub Pages, Netlify, Vercel)
- HTTPS-required for service worker (all major hosts provide this)

### 🔮 Reserved for Future Versions
- ECE Toolkit module
- Logic Lab module
- Python Hub module
- C Programming Hub module
- Student Budget Tracker module
- Cross-module search
- Settings panel (theme, density, default module)
- Light theme toggle
- Push notifications
- Background sync
