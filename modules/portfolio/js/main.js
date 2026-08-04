/* ============================================
   Portfolio - Main JavaScript
   ECE Diploma Student Portfolio
   (Adapted for Student Hub)
   ============================================ */

(function () {
    'use strict';

    /* ============================
       Configuration Data
       ============================ */
    const PROJECTS = [
        {
            title: 'PocketPilot — Student Budget Tracker',
            desc: 'An offline-first Progressive Web App built specifically for students to manage their monthly allowance, expenses, savings, financial goals, analytics, and reports. Designed with a privacy-first approach using LocalStorage and Service Workers.',
            tech: ['HTML5', 'CSS3', 'JavaScript', 'PWA', 'Service Worker', 'LocalStorage', 'Chart.js', 'jsPDF'],
            category: 'web',
            image: 'assets/images/project-pocketpilot.svg',
            live: 'https://shyam2010-py.github.io/StudentBudgetTracker/index.html',
            repo: 'https://github.com/Shyam2010-Py/StudentBudgetTracker',
            latest: true
        },
        {
            title: 'Logic Lab',
            desc: 'An interactive web tool to explore and experiment with basic digital logic concepts.',
            tech: ['JavaScript', 'HTML5 Canvas'],
            category: 'electronics',
            image: 'assets/images/project6.svg',
            live: 'https://shyam2010-py.github.io/LogicLab/',
            repo: 'https://github.com/Shyam2010-Py/LogicLab'
        },
        {
            title: 'ECE Toolkit',
            desc: 'A web-based collection of tools and references built for Electronics & Communication Engineering students.',
            tech: ['HTML', 'CSS', 'JavaScript'],
            category: 'electronics',
            image: 'assets/images/project1.svg',
            live: 'https://shyam2010-py.github.io/ece-toolkit/',
            repo: 'https://github.com/Shyam2010-Py/ece-toolkit'
        },
        {
            title: 'Microcontroller Hub',
            desc: 'A learning resource covering Arduino, ESP32, and other microcontrollers with code snippets and guides.',
            tech: ['HTML', 'CSS', 'JavaScript'],
            category: 'electronics',
            image: 'assets/images/project3.svg',
            live: 'https://shyam2010-py.github.io/microcontroller-hub/',
            repo: 'https://github.com/Shyam2010-Py/microcontroller-hub'
        },
        {
            title: 'Python for Students',
            desc: 'Beginner-friendly Python learning resources with examples, notes, and practice problems.',
            tech: ['HTML', 'CSS', 'JavaScript'],
            category: 'programming',
            image: 'assets/images/project2.svg',
            live: 'https://shyam2010-py.github.io/python-for-students/',
            repo: 'https://github.com/Shyam2010-Py/python-for-students'
        },
        {
            title: 'C Programming Hub',
            desc: 'Tutorials, examples, and practice exercises for learning C programming fundamentals.',
            tech: ['HTML', 'CSS', 'JavaScript'],
            category: 'programming',
            image: 'assets/images/project4.svg',
            live: 'https://shyam2010-py.github.io/c-programming-hub/',
            repo: 'https://github.com/Shyam2010-Py/c-programming-hub'
        },
        {
            title: 'Attendance Tracker',
            desc: 'A web application to track and manage student attendance with simple reports.',
            tech: ['HTML', 'CSS', 'JavaScript'],
            category: 'web',
            image: 'assets/images/project5.svg',
            live: 'https://shyam2010-py.github.io/Attendance-Tracker/login.html',
            repo: 'https://github.com/Shyam2010-Py/Attendance-Tracker'
        }
    ];

    const CERTIFICATES = []; // Empty for now — section hidden in UI

    /* ============================
       Loader
       ============================ */
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        setTimeout(() => loader.classList.add('hidden'), 500);
    });

    /* ============================
       Theme Toggle
       ============================ */
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        root.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme');
            if (current === 'light') {
                root.removeAttribute('data-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                root.setAttribute('data-theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    /* ============================
       Mobile Menu
       ============================ */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ============================
       Navbar Scroll Effect
       ============================ */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });
    }

    /* ============================
       Active Nav Link on Scroll
       ============================ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', setActiveLink);

    /* ============================
       Typing Animation
       ============================ */
    const typedName = document.getElementById('typedName');
    if (typedName) {
        const nameText = 'Ghanashyam Pabbuleti';
        let charIndex = 0;

        function typeText() {
            if (charIndex < nameText.length) {
                typedName.textContent = nameText.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeText, 100);
            } else {
                const cursor = document.createElement('span');
                cursor.className = 'cursor';
                cursor.textContent = '|';
                typedName.appendChild(cursor);
            }
        }
        setTimeout(typeText, 800);
    }

    /* ============================
       Animated Counters
       ============================ */
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        };
        update();
    };

    if ('IntersectionObserver' in window && counters.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => counterObserver.observe(c));
    }

    /* ============================
       Render Projects
       ============================ */
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        function renderProjects(filter = 'all') {
            projectsGrid.innerHTML = '';
            PROJECTS.forEach((project, idx) => {
                if (filter !== 'all' && project.category !== filter) return;

                const card = document.createElement('div');
                card.className = 'project-card reveal' + (project.latest ? ' is-latest' : '');
                card.style.transitionDelay = `${idx * 0.05}s`;
                card.innerHTML = `
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}" loading="lazy">
                        ${project.latest ? '<span class="latest-badge"><i class="fas fa-star"></i> Latest Project</span>' : ''}
                    </div>
                    <div class="project-content">
                        <div class="project-header">
                            <h3 class="project-title">${project.title}</h3>
                        </div>
                        <p class="project-desc">${project.desc}</p>
                        <div class="project-tech">
                            ${project.tech.map(t => `<span>${t}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            <a href="${project.live}" target="_blank" rel="noopener">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                            <a href="${project.repo}" target="_blank" rel="noopener">
                                <i class="fab fa-github"></i> GitHub
                            </a>
                        </div>
                    </div>
                `;
                projectsGrid.appendChild(card);
                setTimeout(() => card.classList.add('visible'), 50);
            });
        }
        renderProjects();

        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderProjects(btn.getAttribute('data-filter'));
            });
        });
    }

    /* ============================
       Scroll Reveal Animation
       ============================ */
    const revealElements = document.querySelectorAll('.glass, .section-title, .resume-container, .timeline-item, .ideology-card, .about-card, .skill-category, .cert-card');

    revealElements.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('visible'));
    }

    /* ============================
       Back to Top Button
       ============================ */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) backToTop.classList.add('visible');
            else backToTop.classList.remove('visible');
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ============================
       Particles Effect
       ============================ */
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    /* ============================
       Contact Form Handler
       ============================ */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.textContent = '✓ Message sent successfully! I will get back to you soon.';
            formStatus.style.color = 'var(--accent)';
            contactForm.reset();
            setTimeout(() => { formStatus.textContent = ''; }, 5000);
        });
    }

    /* ============================
       Footer Year
       ============================ */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
