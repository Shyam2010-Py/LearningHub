/* ============================================
   Student Hub — Shared Shell Logic
   V1.0.0
   - Drawer toggle
   - Search
   - PWA install + update
   - Service worker registration
   - Reveal animations
   ============================================ */

(function () {
    'use strict';

    /* ============================
       Drawer (mobile / hamburger)
       ============================ */
    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('drawer');
    const drawerClose = document.getElementById('drawerClose');
    const drawerOverlay = document.getElementById('drawerOverlay');

    function openDrawer() {
        if (!drawer) return;
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
        if (!drawer) return;
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (hamburger) hamburger.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    document.querySelectorAll('.drawer-link').forEach(link => {
        link.addEventListener('click', () => {
            // close drawer only for non-disabled links
            if (!link.classList.contains('disabled')) closeDrawer();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) closeDrawer();
    });

    /* ============================
       Navbar scroll effect
       ============================ */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const onScroll = () => {
            if (window.scrollY > 16) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ============================
       Global search (basic — works on home)
       ============================ */
    const heroSearch = document.getElementById('heroSearch');
    if (heroSearch) {
        heroSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const q = heroSearch.value.trim().toLowerCase();
                if (q) {
                    // Build a small module index — keywords → selectors / URLs
                    const moduleIndex = [
                        { keys: ['portfolio', 'profile', 'about', 'project', 'skill'], url: 'modules/portfolio/' },
                        { keys: ['logic', 'gate', 'digital', 'circuit', 'flip', 'flipflop', 'adder', 'multiplexer', 'decoder', 'encoder', 'binary', 'boolean', 'truth', 'complement', 'arithmetic', 'karnaugh', 'kmap', 'quiz'], url: 'modules/LogicLab-1.0.2/' },
                        { keys: ['ece', 'toolkit', 'calculator'], url: '#modules' },
                        { keys: ['python', 'py', 'script'], url: '#modules' },
                        { keys: ['c programming', 'clang', 'pointer', 'memory'], url: '#modules' },
                        { keys: ['budget', 'expense', 'money', 'finance', 'tracker'], url: '#modules' }
                    ];
                    const match = moduleIndex.find(m => m.keys.some(k => q.includes(k)));
                    if (match) {
                        if (match.url.startsWith('#')) {
                            // Coming-soon module — scroll to modules grid
                            const sec = document.getElementById('modules');
                            if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            window.location.href = match.url;
                            return;
                        }
                    }
                    // Default: scroll to module grid
                    const sec = document.getElementById('modules');
                    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    /* ============================
       Reveal on scroll
       ============================ */
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('visible'));
    }

    /* ============================
       Service Worker
       ============================ */
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js')
                .then((reg) => {
                    // Listen for updates
                    reg.addEventListener('updatefound', () => {
                        const newWorker = reg.installing;
                        if (!newWorker) return;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                showUpdateToast();
                            }
                        });
                    });
                })
                .catch((err) => console.warn('[SW] registration failed:', err));
        });

        // ============================================
        // Force-reload on new SW activation
        // When a new SW takes over (via skipWaiting),
        // reload the page once so users see the latest code
        // without needing to click the Update toast.
        // Guard: skip the very first load (no prior controller).
        // ============================================
        if (!window.__hubSWControllerLogged) {
            window.__hubSWControllerLogged = true;
            // Track whether a previous controller existed
            window.__hubHadController = !!navigator.serviceWorker.controller;
        }

        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (refreshing) return;
            // If the very first load had no controller, this is the
            // initial registration — don't reload.
            if (!window.__hubHadController) {
                window.__hubHadController = true;
                return;
            }
            refreshing = true;
            window.location.reload();
        });
    }

    function showUpdateToast() {
        const toast = document.getElementById('updateToast');
        if (!toast) return;
        toast.hidden = false;
        requestAnimationFrame(() => toast.classList.add('show'));
        const btn = document.getElementById('updateBtn');
        const later = document.getElementById('updateLater');
        if (btn) btn.addEventListener('click', () => {
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
            }
        }, { once: true });
        if (later) later.addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => { toast.hidden = true; }, 400);
        }, { once: true });
    }

    /* ============================
       PWA install prompt
       ============================ */
    let deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallToast();
    });

    function showInstallToast() {
        const toast = document.getElementById('installToast');
        if (!toast) return;
        toast.hidden = false;
        requestAnimationFrame(() => toast.classList.add('show'));
        const btn = document.getElementById('installBtn');
        const dismiss = document.getElementById('installDismiss');
        if (btn) btn.addEventListener('click', async () => {
            toast.classList.remove('show');
            setTimeout(() => { toast.hidden = true; }, 400);
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            const choice = await deferredPrompt.userChoice;
            deferredPrompt = null;
            console.log('[PWA] install choice:', choice.outcome);
        }, { once: true });
        if (dismiss) dismiss.addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => { toast.hidden = true; }, 400);
        }, { once: true });
    }

    // Hide install toast if app is already installed
    window.addEventListener('appinstalled', () => {
        const toast = document.getElementById('installToast');
        if (toast) { toast.classList.remove('show'); setTimeout(() => { toast.hidden = true; }, 400); }
    });

    /* ============================
       Footer year
       ============================ */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ============================
       Active drawer link based on path
       ============================ */
    const path = window.location.pathname;
    document.querySelectorAll('.drawer-link[data-match]').forEach(link => {
        const match = link.getAttribute('data-match');
        if (match && path.includes(match)) link.classList.add('active');
    });

})();
