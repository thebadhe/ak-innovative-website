// ==========================================
// AK INNOVATIVE ENTERPRISES - Main JavaScript
// Navigation, Form Handling, and Utilities
// ==========================================

// ==========================================
// MOBILE NAVIGATION
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }

    // ==========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // ACTIVE NAVIGATION STATE
    // ==========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav__link');
    navLinksAll.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // ==========================================
    // CONTACT FORM HANDLING
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Clear previous errors
            const formGroups = this.querySelectorAll('.form-group');
            formGroups.forEach(group => group.classList.remove('error'));

            // Validate form
            let isValid = true;
            const formData = {
                name: document.getElementById('name').value.trim(),
                company: document.getElementById('company').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim(),
                timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
            };

            // Validate each field
            if (!formData.name) {
                showError('name', 'Please enter your name');
                isValid = false;
            }

            if (!formData.company) {
                showError('company', 'Please enter your company name');
                isValid = false;
            }

            if (!formData.phone || !validatePhone(formData.phone)) {
                showError('phone', 'Please enter a valid phone number');
                isValid = false;
            }

            if (!formData.email || !validateEmail(formData.email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            if (!formData.message) {
                showError('message', 'Please enter your message');
                isValid = false;
            }

            if (!isValid) {
                return;
            }

            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            try {
                // Submit to Google Sheets
                await submitToGoogleSheets(formData);

                // Show success message
                showFormStatus('success', 'Thank you! Your message has been sent successfully. We will get back to you soon.');

                // Reset form
                contactForm.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                showFormStatus('error', 'Sorry, there was an error sending your message. Please try again or contact us directly at thebadhe3p@gmail.com');
            } finally {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // ==========================================
    // FORM VALIDATION HELPERS
    // ==========================================
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        const errorElement = formGroup.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[0-9+\-\s()]{10,}$/;
        return re.test(phone);
    }

    function showFormStatus(type, message) {
        const statusElement = document.getElementById('formStatus');
        if (statusElement) {
            statusElement.style.display = 'block';
            statusElement.style.padding = 'var(--space-4)';
            statusElement.style.borderRadius = 'var(--border-radius-md)';
            statusElement.style.fontWeight = 'var(--font-weight-medium)';

            if (type === 'success') {
                statusElement.style.backgroundColor = '#d1fae5';
                statusElement.style.color = '#065f46';
                statusElement.style.border = '2px solid #10b981';
            } else {
                statusElement.style.backgroundColor = '#fee2e2';
                statusElement.style.color = '#991b1b';
                statusElement.style.border = '2px solid #dc2626';
            }

            statusElement.textContent = message;

            // Auto-hide success message after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    statusElement.style.display = 'none';
                }, 5000);
            }
        }
    }

    // ==========================================
    // GOOGLE SHEETS INTEGRATION
    // ==========================================
    async function submitToGoogleSheets(formData) {
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxpXfZgjT73nKfLWUBHxfosxHI3kZePTVKiOuNcRRO1JkdEhXwm5ox0PlL1V2YF60vqLQ/exec';

        // Submit to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Note: With 'no-cors' mode, we can't read the response
        // but the data will still be submitted to Google Sheets
        return { success: true };
    }
});
