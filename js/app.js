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
    const savedTheme = localStorage.getItem('theme') || 'dark';
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
});
