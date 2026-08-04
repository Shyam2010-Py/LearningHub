# Changelog

All notable changes to **Student Hub** are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.1] — 2026-08-04

### 🔀 Reordered modules

- Reordered modules so Logic Lab appears before ECE Toolkit to reflect the current release sequence.

The new module order on every surface is:

1. Portfolio (Live)
2. Logic Lab (Live)
3. ECE Toolkit (Coming soon)
4. Python Hub (Coming soon)
5. C Programming Hub (Coming soon)
6. Student Budget Tracker (Coming soon)

**Where the order was updated (visual only — no URLs, no functionality changed):**

- **Home dashboard — Modules grid**: Logic Lab card now sits between Portfolio and ECE Toolkit.
- **Home dashboard — Continue Learning**: added an "ECE Toolkit — Coming soon" entry between Logic Lab and Python Hub to mirror the new module order.
- **Drawer navigation**: "Learning" section now lists Logic Lab first, then ECE Toolkit, then Python Hub, then C Programming.
- **Footer modules list**: Portfolio → Logic Lab → ECE Toolkit → Python Hub → C Programming → Budget Tracker.
- **Hero search keyword index** (`js/hub.js`): already reflected the new order (Portfolio → Logic Lab → ECE Toolkit); order preserved.
- **Quick Access** and **Recent Activity**: not module-order-dependent, but their contents still align with the current live modules.

**Preserved unchanged:** all CSS theme tokens, hover effects, gradients, badges, animations, responsive breakpoints, SVG icons, route URLs, and PWA behavior.

---

## [1.1.0] — 2026-08-04

### 🚀 Major — Logic Lab module is now LIVE

Student Hub now ships with **two live modules** integrated: **Portfolio** and **Logic Lab**. Logic Lab's 17+ learning pages, 7 simulators, 110+ quiz questions, conversion calculators, and complete notes are all reachable directly from the Hub home.

### ✨ Added

#### Logic Lab integration (`modules/LogicLab-1.0.2/`)

- **Integrated Logic Lab as the second live module**:
  - Number System Converter (Binary/Octal/Decimal/Hex)
  - Logic Gates Simulator (AND, OR, NOT, NAND, NOR, XOR, XNOR) with SVG visualizations
  - Truth Table Generator with CSV export
  - Binary Arithmetic (Addition, Subtraction, Multiplication, Division)
  - 1's and 2's Complement Calculator
  - Half & Full Adder interactive simulators
  - Flip-Flops (SR, JK, D, T) with state log
  - Multiplexer / Demultiplexer (2:1, 4:1)
  - Encoder / Decoder (4-to-2, 8-to-3 priority, BCD-to-7-seg)
  - Comprehensive Formula Sheet
  - Concise Study Notes
  - Quiz System with 110+ randomized questions across 9 categories
  - About page, Changelog, Offline fallback
  - Original PWA (manifest + service worker) preserved

- **Hub ↔ Module integration bridge**:
  - New file `modules/LogicLab-1.0.2/css/hub-bridge.css` — Hub top bar + footer styles
  - New file `modules/LogicLab-1.0.2/js/hub-bridge.js` — non-destructively injects Hub shell into every Logic Lab page (top bar at top of body, footer at end of body)
  - Hub top bar contains "Student Hub / Logic Lab" breadcrumb + "Back to Hub" button
  - Hub footer contains brand + module links + connect links + module identification
  - All 20 Logic Lab pages updated to load the bridge — preserves every existing feature

- **Logic Lab Sidebar / Topbar / Bottom Nav preserved**:
  - Original sidebar (desktop) and bottom nav (mobile) remain in place
  - Hub bar sits cleanly **above** the existing Logiclab topbar
  - Hub footer sits **below** the existing Logiclab footer
  - Light/Dark theme toggle inside Logiclab still works exactly as before

- **Logic Lab service worker updated**:
  - Bumped cache version to `logiclab-v1.1.0` so existing installs receive the new files
  - Added `hub-bridge.css`, `hub-bridge.js` to the pre-cache list
  - Footer version label updated from `v1.0.0` to `v1.1.0`
  - Added "← Back to Student Hub" link inside the Logiclab footer

- **Hub home updates**:
  - Logic Lab card upgraded from "Coming soon" → Live with **● Live** status
  - Added **Digital Electronics** category badge to Logic Lab card
  - Logic Lab added to **Continue Learning** list (linked to converter page)
  - Logic Lab added to **Quick Access** grid (Logic Gates + Logic Quiz tiles)
  - Logic Lab added to **Recent Activity** list
  - Drawer: Logic Lab entry activated (no more "Soon" badge)
  - Footer module list: Logic Lab now a working link
  - Hub drawer version updated to v1.1.0
  - Recent Activity copy updated to reflect "2 modules live"

- **Global search** (`js/hub.js`):
  - Expanded keyword index so searching for "logic", "gates", "digital", "circuit", "flip-flop", "adder", "multiplexer", "decoder", "encoder", "binary", "boolean", "truth", "complement", "kmap", "quiz", etc. now opens the Logic Lab module
  - Portfolio and other future-module keywords preserved

- **New utility CSS class** in `css/hub.css`:
  - `.module-card .badge-category` — pill-shaped category badge for module cards (used by Logic Lab)

### 📦 Architecture note

- LogicLab is kept at `modules/LogicLab-1.0.2/` (its original folder name) to preserve its SW cache key and manifest identity. The same integration works at any path because both the Hub link and bridge paths use **relative** URLs.
- The bridge model — inject-only — means future modules (ECE Toolkit, Python Hub, C Programming Hub, Student Budget Tracker) can adopt the same pattern: add `hub-bridge.css` + `hub-bridge.js` and a card on the home.

### 📖 Documentation
- README.md updated to v1.1.0 — full project structure, module table, integration notes
- GUIDE.md updated — new "Adding a Module" section with the hub-bridge pattern

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
