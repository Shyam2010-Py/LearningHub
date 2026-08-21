/* ============================================
   LearningHub — Shell logic + motion + account
   V2.2.1
   ============================================ */
(function () {
    'use strict';

    const DEFAULT_PROGRESS = {
        logiclab: { label: 'LogicLab', desc: 'Number systems & logic gates', url: 'https://shyam2010-py.github.io/LogicLab/', percent: 8 },
        cprogramming: { label: 'C Programming', desc: 'Structured programming fundamentals', url: 'https://shyam2010-py.github.io/c-programming-hub/', percent: 14 },
        microhub: { label: 'Microcontroller Hub', desc: 'ESP32, sensors & embedded basics', url: 'https://shyam2010-py.github.io/microcontroller-hub/', percent: 6 },
        python: { label: 'Python for Students', desc: 'Syntax, loops, functions & projects', url: 'https://shyam2010-py.github.io/python-for-students/', percent: 22 }
    };

    function renderContinueGrid() {
        const grid = document.getElementById('continueGrid');
        if (!grid) return;
        grid.innerHTML = Object.values(DEFAULT_PROGRESS).map(item => {
            const pct = Math.max(0, Math.min(100, Number(item.percent) || 0));
            return `<a class="continue-card" href="${item.url}" target="_blank" rel="noopener" aria-label="Open ${item.label}"><span class="label">${item.label}</span><h3>${item.desc}</h3><p class="desc">Demo progress · ${pct}%</p><div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${item.label} sample progress"><div class="progress-bar" data-progress="${pct}" style="width:0%"></div></div><div class="pct"><span>Sample progress</span><b>${pct}%</b></div><span class="continue-link">Continue →</span></a>`;
        }).join('');
    }

    function initMobileMenu() {
        const button = document.getElementById('menuButton');
        const menu = document.getElementById('mobileMenu');
        if (!button || !menu) return;
        function setOpen(open) {
            menu.classList.toggle('open', open);
            button.classList.toggle('is-open', open);
            button.setAttribute('aria-expanded', String(open));
            button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        }
        button.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
        menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); button.focus(); }
        });
        const mq = window.matchMedia('(min-width: 851px)');
        const onChange = () => { if (mq.matches) setOpen(false); };
        if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
    }

    function initNavScroll() {
        const nav = document.getElementById('navbar');
        if (!nav) return;
        const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    function initActiveNav() {
        const links = document.querySelectorAll('.nav-links a[href^="#"]');
        if (!links.length || !('IntersectionObserver' in window)) return;
        const targets = Array.from(links).map(link => {
            const element = document.getElementById(link.getAttribute('href').slice(1));
            return element ? { link, element } : null;
        }).filter(Boolean);
        if (!targets.length) return;
        const setActive = id => links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
        const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-42% 0px -50% 0px', threshold: 0 });
        targets.forEach(target => observer.observe(target.element));
    }

    function initYear() {
        const year = document.getElementById('year');
        if (year) year.textContent = String(new Date().getFullYear());
    }

    function injectMotionStyles() {
        if (document.getElementById('learninghub-motion-styles')) return;
        const style = document.createElement('style');
        style.id = 'learninghub-motion-styles';
        style.textContent = `
            .hero-text,.hero-illu,.section-head,.continue-card,.update-item,.card,.step,.flow,.coming-item,.footer-grid,.footer-bottom{animation:lh-rise .7s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--lh-delay,0ms)}
            .hero-text{--lh-delay:80ms}.hero-illu{--lh-delay:180ms}
            .continue-card:nth-child(2),.card:nth-child(2),.update-item:nth-child(2),.flow:nth-child(2),.coming-item:nth-child(2),.step:nth-child(2){--lh-delay:90ms}
            .continue-card:nth-child(3),.card:nth-child(3),.update-item:nth-child(3),.flow:nth-child(3),.coming-item:nth-child(3),.step:nth-child(3){--lh-delay:180ms}
            .continue-card:nth-child(4),.step:nth-child(4){--lh-delay:270ms}
            .hero-illu img{animation:lh-float 6s ease-in-out infinite;will-change:transform}
            .card,.continue-card,.update-item,.flow,.coming-item,.step{will-change:transform}
            .card:hover,.continue-card:hover{transform:translateY(-4px)}
            .card .icon,.continue-card .label{transition:transform .25s ease,color .25s ease}
            .card:hover .icon{transform:translateY(-2px) scale(1.04);color:var(--accent-2)}
            .card:hover .arrow,.continue-card:hover .continue-link{transform:translateX(4px)}
            .arrow,.continue-link{display:inline-block;transition:transform .25s ease,color .25s ease}
            .progress-bar{transition:width 1s cubic-bezier(.22,1,.36,1)}
            .roadmap-line{transform-origin:left center;transition:transform 1.1s cubic-bezier(.22,1,.36,1)}
            .roadmap-shell:not(.lh-visible) .roadmap-line{transform:scaleX(0)}
            .roadmap-shell.lh-visible .roadmap-line{transform:scaleX(1)}
            .step-num{transition:transform .35s ease,box-shadow .35s ease,border-color .35s ease}
            .roadmap-shell.lh-visible .step-num{transform:scale(1.06);box-shadow:0 0 0 5px rgba(98,176,255,.06);border-color:#62b0ff}
            .menu-btn svg{transition:transform .25s ease}.menu-btn.is-open svg{transform:rotate(90deg)}
            .mobile-menu{overflow:hidden;animation:lh-menu .22s ease both}
            .nav-links a{position:relative}.nav-links a::after{content:"";position:absolute;left:11px;right:11px;bottom:5px;height:2px;border-radius:2px;background:linear-gradient(90deg,var(--accent),var(--accent-2));transform:scaleX(0);transform-origin:center;transition:transform .25s ease}
            .nav-links a.active::after,.nav-links a:hover::after{transform:scaleX(1)}
            @keyframes lh-rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
            @keyframes lh-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
            @keyframes lh-menu{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
            @media (max-width:700px){.roadmap-line{transform-origin:center top}.roadmap-shell:not(.lh-visible) .roadmap-line{transform:scaleY(0)}.roadmap-shell.lh-visible .roadmap-line{transform:scaleY(1)}}
            @media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}.hero-illu img{animation:none!important}.roadmap-line{transform:none!important}.progress-bar{transition:none!important}}
        `;
        document.head.appendChild(style);
    }

    function initMotion() {
        injectMotionStyles();
        const revealTargets = document.querySelectorAll('.section-head,.continue-card,.update-item,.card,.step,.flow,.coming-item,.footer-grid,.footer-bottom');
        const roadmap = document.querySelector('.roadmap-shell');
        const progressBars = document.querySelectorAll('.progress-bar[data-progress]');
        if (!('IntersectionObserver' in window)) {
            progressBars.forEach(bar => bar.style.width = bar.dataset.progress + '%');
            if (roadmap) roadmap.classList.add('lh-visible');
            return;
        }
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('lh-visible');
                if (entry.target.classList.contains('roadmap-shell')) entry.target.querySelectorAll('.progress-bar[data-progress]').forEach(bar => bar.style.width = bar.dataset.progress + '%');
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        revealTargets.forEach(element => observer.observe(element));
        if (roadmap) observer.observe(roadmap);
        progressBars.forEach(bar => observer.observe(bar));
    }

    function registerServiceWorker() {
        if (!('serviceWorker' in navigator)) return;
        window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(error => console.warn('[LearningHub] Service worker registration failed:', error)));
    }

    async function initAccount() {
        try {
            const { supabase } = await import('./supabase.js');
            const profile = document.querySelector('.nav-profile');
            const mobileMenu = document.getElementById('mobileMenu');
            if (!profile) return;

            let mobileAuth = mobileMenu?.querySelector('.mobile-auth-slot');
            if (mobileMenu && !mobileAuth) {
                mobileAuth = document.createElement('div');
                mobileAuth.className = 'mobile-auth-slot';
                mobileMenu.querySelector('.mobile-menu-inner')?.appendChild(mobileAuth);
            }

            const renderAccount = session => {
                const user = session?.user;
                if (!user) {
                    profile.innerHTML = '<span class="avatar" aria-hidden="true">?</span><span class="who">Guest<small>LearningHub</small></span><a class="nav-auth-link" href="./auth.html">Sign in</a>';
                    if (mobileAuth) mobileAuth.innerHTML = '<a href="./auth.html">Sign in to LearningHub →</a>';
                    return;
                }
                const name = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Student';
                const initials = name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase();
                profile.innerHTML = `<span class="avatar" aria-hidden="true">${initials}</span><span class="who">${name}<small>Signed in</small></span><button class="nav-auth-link" id="logoutButton" type="button">Log out</button>`;
                document.getElementById('logoutButton')?.addEventListener('click', async () => { await supabase.auth.signOut(); window.location.reload(); });
                if (mobileAuth) {
                    mobileAuth.innerHTML = '<button class="mobile-auth-button" id="mobileLogout" type="button">Log out</button>';
                    document.getElementById('mobileLogout')?.addEventListener('click', async () => { await supabase.auth.signOut(); window.location.reload(); });
                }
            };

            const { data } = await supabase.auth.getSession();
            renderAccount(data.session);
            supabase.auth.onAuthStateChange((_event, session) => renderAccount(session));

            const user = data.session?.user;
            if (user) {
                await supabase.from('activity_events').insert({ user_id: user.id, event_type: 'page_view', page_path: window.location.pathname });
                document.querySelectorAll('a[href^="https://shyam2010-py.github.io/"]').forEach(link => {
                    link.addEventListener('click', () => {
                        const url = new URL(link.href);
                        const projectKey = url.pathname.replace(/^\/+|\/+$/g, '').split('/')[0] || 'project';
                        supabase.from('project_visits').insert({ user_id: user.id, project_key: projectKey }).catch(() => {});
                        supabase.from('activity_events').insert({ user_id: user.id, event_type: 'project_open', project_key: projectKey, page_path: window.location.pathname }).catch(() => {});
                    });
                });
            }
        } catch (error) {
            console.warn('[LearningHub] Account integration unavailable:', error);
        }
    }

    function init() {
        renderContinueGrid();
        initMobileMenu();
        initNavScroll();
        initActiveNav();
        initYear();
        initMotion();
        registerServiceWorker();
        initAccount();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
