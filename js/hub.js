/* ============================================
   LearningHub — Shell logic
   V2.0.0
   ============================================ */
(function () {
    'use strict';

    /* ============================================
       DEFAULT_PROGRESS
       Honest sample values used only for layout.
       Replace with real tracking in a future version.
       ============================================ */
    const DEFAULT_PROGRESS = {
        logiclab: {
            key: 'logiclab',
            label: 'LogicLab',
            desc: 'Number systems & logic gates',
            url: 'https://shyam2010-py.github.io/LogicLab/',
            percent: 8
        },
        cprogramming: {
            key: 'cprogramming',
            label: 'C Programming',
            desc: 'Structured programming fundamentals',
            url: 'https://shyam2010-py.github.io/c-programming-hub/',
            percent: 14
        },
        microhub: {
            key: 'microhub',
            label: 'Microcontroller Hub',
            desc: 'ESP32, sensors & embedded basics',
            url: 'https://shyam2010-py.github.io/microcontroller-hub/',
            percent: 6
        },
        python: {
            key: 'python',
            label: 'Python for Students',
            desc: 'Syntax, loops, functions & projects',
            url: 'https://shyam2010-py.github.io/python-for-students/',
            percent: 22
        }
    };

    /* ============================================
       Render Continue Learning cards
       ============================================ */
    function renderContinueGrid() {
        const grid = document.getElementById('continueGrid');
        if (!grid) return;

        const items = Object.values(DEFAULT_PROGRESS);
        grid.innerHTML = items.map(item => {
            const pct = Math.max(0, Math.min(100, item.percent));
            return `
                <a class="continue-card" href="${item.url}" target="_blank" rel="noopener" aria-label="Open ${item.label}">
                    <span class="label">${item.label}</span>
                    <h3>${item.desc}</h3>
                    <p class="desc">Demo progress · ${pct}%</p>
                    <div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${item.label} progress">
                        <div class="progress-bar" style="width:${pct}%"></div>
                    </div>
                    <div class="pct"><span>Sample progress</span><b>${pct}%</b></div>
                    <span class="continue-link">Continue →</span>
                </a>
            `;
        }).join('');
    }

    /* ============================================
       Mobile menu (drawer-style expand)
       ============================================ */
    function initMobileMenu() {
        const button = document.getElementById('menuButton');
        const menu = document.getElementById('mobileMenu');
        if (!button || !menu) return;

        function setOpen(open) {
            menu.classList.toggle('open', open);
            button.setAttribute('aria-expanded', String(open));
            button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        }

        button.addEventListener('click', function () {
            setOpen(!menu.classList.contains('open'));
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                setOpen(false);
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && menu.classList.contains('open')) {
                setOpen(false);
                button.focus();
            }
        });

        // Close menu when window grows past mobile breakpoint
        const mq = window.matchMedia('(min-width: 851px)');
        const onChange = function () {
            if (mq.matches && menu.classList.contains('open')) setOpen(false);
        };
        if (mq.addEventListener) mq.addEventListener('change', onChange);
        else if (mq.addListener) mq.addListener(onChange);
    }

    /* ============================================
       Navbar scroll state
       ============================================ */
    function initNavScroll() {
        const nav = document.getElementById('navbar');
        if (!nav) return;
        const onScroll = function () {
            nav.classList.toggle('scrolled', window.scrollY > 12);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ============================================
       Active link state (section-aware)
       ============================================ */
    function initActiveNav() {
        const links = document.querySelectorAll('.nav-links a[href^="#"]');
        if (!links.length) return;

        const targets = Array.from(links)
            .map(a => {
                const id = a.getAttribute('href').slice(1);
                const el = document.getElementById(id);
                return el ? { link: a, el: el } : null;
            })
            .filter(Boolean);

        if (!targets.length) return;

        const setActive = function (id) => {
            links.forEach(a => {
                if (a.getAttribute('href') === '#' + id) a.classList.add('active');
                else a.classList.remove('active');
            });
        };

        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
            targets.forEach(function (t) { io.observe(t.el); });
        }
    }

    /* ============================================
       Footer year
       ============================================ */
    function initYear() {
        const el = document.getElementById('year');
        if (el) el.textContent = new Date().getFullYear();
    }

    /* ============================================
       Boot
       ============================================ */
    function init() {
        renderContinueGrid();
        initMobileMenu();
        initNavScroll();
        initActiveNav();
        initYear();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
