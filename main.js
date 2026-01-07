// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Simple animation on scroll (only if user doesn't prefer reduced motion)
if (!prefersReducedMotion) {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Only animate cards and section headings (not all paragraphs - causes jitter on mobile)
    document.querySelectorAll('.card, .section h2').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        el.style.willChange = 'opacity, transform';
        observer.observe(el);
    });
}

// Header Scroll Effect - use passive listener for better scroll performance
const header = document.querySelector('.main-nav');
const scrollThreshold = 50;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Customer.io Initialization
const siteId = import.meta.env.VITE_CUSTOMER_IO_SITE_ID;
if (siteId) {
    window._cio = window._cio || [];
    (function () {
        var a, b, c; a = function (f) {
            return function () {
                window._cio.push([f].
                    concat(Array.prototype.slice.call(arguments, 0)))
            }
        }; b = ["load", "identify",
            "sidentify", "track", "page"]; for (c = 0; c < b.length; c++) { window._cio[b[c]] = a(b[c]) };
        var t = document.createElement('script'),
            s = document.getElementsByTagName('script')[0];
        t.async = true;
        t.id = 'cio-tracker';
        t.setAttribute('data-site-id', siteId);
        t.src = 'https://assets.customer.io/assets/track.js';
        s.parentNode.insertBefore(t, s);
    })();
} else {
    console.warn('VITE_CUSTOMER_IO_SITE_ID not set. Tracking disabled.');
}

// Waitlist Form Handling
function setupWaitlistForm(formId, messageId) {
    const form = document.getElementById(formId);
    const message = document.getElementById(messageId);

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                // Send to Customer.io
                if (typeof _cio !== 'undefined') {
                    _cio.identify({
                        id: email,
                        email: email,
                        created_at: Math.floor(Date.now() / 1000),
                        lead_magnet: 'people-coach-waitlist'
                    });
                } else {
                    console.log('Customer.io not loaded, would send:', email);
                }

                // Show success UI
                form.style.display = 'none';
                if (message) {
                    message.classList.add('success');
                }
            }
        });
    }
}

// Initialize forms
document.addEventListener('DOMContentLoaded', () => {
    setupWaitlistForm('hero-waitlist-form', 'hero-form-message');
    setupWaitlistForm('footer-waitlist-form', 'footer-form-message');
});
