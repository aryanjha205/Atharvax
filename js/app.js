document.addEventListener('DOMContentLoaded', () => {
    // 1. Handle Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        // Initial check on page load
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        }
    }

    // 2. Mobile Hamburger Menu Toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-toggle';
    mobileMenuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
    `;
    
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    if (navContainer && navLinks) {
        // Insert before navLinks
        navContainer.insertBefore(mobileMenuBtn, navLinks);
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            // Toggle hamburger icon state
            if (navLinks.classList.contains('open')) {
                mobileMenuBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                `;
            } else {
                mobileMenuBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                `;
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navContainer.contains(e.target) && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                mobileMenuBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                `;
            }
        });
    }

    // 3. Add Theme Toggler
    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme-toggle-btn';
    themeBtn.setAttribute('aria-label', 'Toggle Light/Dark Theme');
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6.36 6.36 0 0 0-3.4 9 6.36 6.36 0 0 0 9.25 3.5A9.18 9.18 0 1 1 12 3z"/></svg>
            `;
        } else {
            themeBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            `;
        }
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    if (navLinks) {
        // Add theme toggler to menu bar
        const li = document.createElement('li');
        li.appendChild(themeBtn);
        navLinks.appendChild(li);
    }

    // 4. Portfolio Filters
    const tabBtns = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (tabBtns.length > 0 && projectCards.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active classes
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        // Add fade anim
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 5. Contact Lead Form submission (Mock validation and response)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            // Basic animation feedback
            submitBtn.disabled = true;
            submitBtn.innerText = 'Transmitting Message...';

            setTimeout(() => {
                // Success modal/feedback replacement
                contactForm.innerHTML = `
                    <div class="text-center" style="padding: 2rem 0; animation: fadeIn 0.5s ease;">
                        <div style="width: 70px; height: 70px; background: var(--color-primary-alpha); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--color-primary);">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem;">Transmission Successful!</h3>
                        <p style="color: var(--color-text-muted); max-width: 400px; margin: 0 auto 1.5rem;">
                            Your enterprise software inquiry has been encrypted and sent to our team. A senior partner will contact you within 6 business hours.
                        </p>
                        <button class="btn btn-primary" onclick="window.location.reload()">Send Another Message</button>
                    </div>
                `;
            }, 1800);
        });
    }

    // 6. Modal Open/Close Controls for Quick Apply
    const modalTriggerBtns = document.querySelectorAll('[data-open-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalCloseBtns = document.querySelectorAll('.modal-close');

    if (modalTriggerBtns.length > 0 && modals.length > 0) {
        modalTriggerBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = btn.getAttribute('data-open-modal');
                const targetModal = document.getElementById(modalId);
                if (targetModal) {
                    targetModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        modalCloseBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modals.forEach(modal => modal.classList.remove('active'));
                document.body.style.overflow = '';
            });
        });

        // Close on escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modals.forEach(modal => modal.classList.remove('active'));
                document.body.style.overflow = '';
            }
        });
    }

    // 7. Interactive Job Application Form Submission
    const jobForm = document.getElementById('jobForm');
    if (jobForm) {
        jobForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = jobForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerText = 'Submitting Application...';

            setTimeout(() => {
                jobForm.innerHTML = `
                    <div class="text-center" style="padding: 1.5rem 0; animation: fadeIn 0.5s ease;">
                        <div style="width: 60px; height: 60px; background: var(--color-primary-alpha); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: var(--color-primary);">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <h4 style="font-size: 1.4rem; margin-bottom: 0.5rem;">Application Received!</h4>
                        <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
                            Thank you for applying. Our talent acquisition division will review your details and reach out within 48 hours.
                        </p>
                        <button class="btn btn-outline btn-sm" onclick="document.querySelector('.modal').classList.remove('active'); document.body.style.overflow = ''; window.location.reload();">Close Window</button>
                    </div>
                `;
            }, 1500);
        });
    }

    // 8. PWA Service Worker Registration
    // 8. PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }

    // 9. Mobile Bottom Navigation Injected Dynamically
    const bottomNav = document.createElement('div');
    bottomNav.className = 'mobile-bottom-nav';
    bottomNav.innerHTML = `
        <a href="/" class="mobile-bottom-nav-item" data-tab="home">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
        </a>
        <a href="/services" class="mobile-bottom-nav-item" data-tab="services">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Services</span>
        </a>
        <a href="/portfolio" class="mobile-bottom-nav-item" data-tab="portfolio">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>Portfolio</span>
        </a>
        <a href="/products" class="mobile-bottom-nav-item" data-tab="products">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>SaaS</span>
        </a>
        <a href="/contact" class="mobile-bottom-nav-item" data-tab="contact">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Contact</span>
        </a>
    `;
    document.body.appendChild(bottomNav);

    // Highlight current active bottom navigation tab
    const highlightActiveTab = () => {
        const path = window.location.pathname;
        const tabs = bottomNav.querySelectorAll('.mobile-bottom-nav-item');
        tabs.forEach(tab => tab.classList.remove('active'));

        if (path === '/' || path === '/index.html' || path === '') {
            const homeTab = bottomNav.querySelector('[data-tab="home"]');
            if (homeTab) homeTab.classList.add('active');
        } else if (path.includes('/services')) {
            const servicesTab = bottomNav.querySelector('[data-tab="services"]');
            if (servicesTab) servicesTab.classList.add('active');
        } else if (path.includes('/portfolio')) {
            const portfolioTab = bottomNav.querySelector('[data-tab="portfolio"]');
            if (portfolioTab) portfolioTab.classList.add('active');
        } else if (path.includes('/products')) {
            const productsTab = bottomNav.querySelector('[data-tab="products"]');
            if (productsTab) productsTab.classList.add('active');
        } else if (path.includes('/contact')) {
            const contactTab = bottomNav.querySelector('[data-tab="contact"]');
            if (contactTab) contactTab.classList.add('active');
        }
    };
    highlightActiveTab();

    // 10. Custom PWA Install Banner & Trigger
    let deferredPrompt;
    const installBanner = document.createElement('div');
    installBanner.className = 'pwa-install-banner';
    installBanner.innerHTML = `
        <div class="pwa-install-content">
            <img src="/assets/icon-192-maskable.png" alt="Atharvax App Icon" class="pwa-install-icon">
            <div class="pwa-install-text">
                <h4>Install Atharvax</h4>
                <p>Add to home screen for offline access</p>
            </div>
        </div>
        <div class="pwa-install-actions">
            <button class="btn-install-confirm" id="btnInstallConfirm">Install</button>
            <button class="btn-install-close" id="btnInstallClose" aria-label="Close Install Prompt">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    `;
    document.body.appendChild(installBanner);

    const btnInstallConfirm = document.getElementById('btnInstallConfirm');
    const btnInstallClose = document.getElementById('btnInstallClose');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        const isDismissed = localStorage.getItem('pwa-prompt-dismissed');
        const dismissTimestamp = localStorage.getItem('pwa-prompt-dismiss-time');
        const now = Date.now();
        
        if (!isDismissed || (dismissTimestamp && (now - parseInt(dismissTimestamp)) > 3 * 24 * 60 * 60 * 1000)) {
            setTimeout(() => {
                installBanner.classList.add('show');
            }, 3000);
        }
    });

    btnInstallConfirm.addEventListener('click', () => {
        if (!deferredPrompt) return;
        installBanner.classList.remove('show');
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    });

    btnInstallClose.addEventListener('click', () => {
        installBanner.classList.remove('show');
        localStorage.setItem('pwa-prompt-dismissed', 'true');
        localStorage.setItem('pwa-prompt-dismiss-time', Date.now().toString());
    });

    // 11. iOS Share Instruction Tooltip (iOS PWA Help)
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;

    if (isIOS && !isStandalone) {
        const iosTooltip = document.createElement('div');
        iosTooltip.className = 'ios-install-tooltip';
        iosTooltip.innerHTML = `
            <div class="ios-install-header">
                <h4>Install Atharvax App</h4>
                <button class="btn-install-close" id="btnIosTooltipClose" style="padding:0;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="ios-install-body">
                <p>Install this web app on your iOS device for an immersive experience:</p>
                <ol>
                    <li>Tap Safari's share button <span class="ios-icon-inline"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg></span>.</li>
                    <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                </ol>
            </div>
        `;
        document.body.appendChild(iosTooltip);

        const btnIosTooltipClose = document.getElementById('btnIosTooltipClose');
        btnIosTooltipClose.addEventListener('click', () => {
            iosTooltip.classList.remove('show');
            localStorage.setItem('ios-prompt-dismissed', 'true');
            localStorage.setItem('ios-prompt-dismiss-time', Date.now().toString());
        });

        const isIosDismissed = localStorage.getItem('ios-prompt-dismissed');
        const iosDismissTimestamp = localStorage.getItem('ios-prompt-dismiss-time');
        const now = Date.now();

        if (!isIosDismissed || (iosDismissTimestamp && (now - parseInt(iosDismissTimestamp)) > 5 * 24 * 60 * 60 * 1000)) {
            setTimeout(() => {
                iosTooltip.classList.add('show');
                setTimeout(() => {
                    iosTooltip.classList.remove('show');
                }, 12000);
            }, 4000);
        }
    }
});
