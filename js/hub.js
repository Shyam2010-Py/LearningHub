/* LearningHub — shared shell logic v2.0.0 */
(function () {
    'use strict';

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
            if (!link.classList.contains('disabled')) closeDrawer();
        });
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && drawer?.classList.contains('open')) closeDrawer();
    });

    const navbar = document.getElementById('navbar');
    if (navbar) {
        const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 16);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // Search now points only to current standalone projects.
    const heroSearch = document.getElementById('heroSearch');
    if (heroSearch) {
        heroSearch.addEventListener('keydown', e => {
            if (e.key !== 'Enter') return;
            const q = heroSearch.value.trim().toLowerCase();
            if (!q) return;
            const projects = [
                { keys: ['portfolio', 'profile', 'about', 'project', 'skill'], url: 'https://shyam2010-py.github.io/Portfolio/' },
                { keys: ['logic', 'gate', 'digital', 'circuit', 'flip', 'flipflop', 'adder', 'multiplexer', 'decoder', 'encoder', 'binary', 'boolean', 'truth', 'complement', 'arithmetic', 'karnaugh', 'kmap', 'quiz'], url: 'https://shyam2010-py.github.io/LogicLab/' },
                { keys: ['ece', 'toolkit', 'calculator'], url: 'https://shyam2010-py.github.io/ece-toolkit/' },
                { keys: ['microcontroller', 'esp32', 'sensor', 'embedded', 'arduino'], url: 'https://shyam2010-py.github.io/microcontroller-hub/' },
                { keys: ['python', 'py', 'script'], url: 'https://shyam2010-py.github.io/python-for-students/' },
                { keys: ['c programming', 'clang', 'pointer', 'memory'], url: 'https://shyam2010-py.github.io/c-programming-hub/' },
                { keys: ['budget', 'expense', 'money', 'finance', 'tracker', 'pocketpilot'], url: 'https://shyam2010-py.github.io/StudentBudgetTracker/' },
                { keys: ['attendance', 'present', 'absence'], url: 'https://shyam2010-py.github.io/Attendance-Tracker/' }
            ];
            const match = projects.find(project => project.keys.some(key => q.includes(key)));
            if (match) {
                window.location.href = match.url;
                return;
            }
            document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => io.observe(el));
    } else revealEls.forEach(el => el.classList.add('visible'));

    // Footer year only; LearningHub itself does not depend on an embedded module.
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
