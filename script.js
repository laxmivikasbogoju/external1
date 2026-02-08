 // Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Header Scroll Effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Form Validation
        const form = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const formData = {};

            // Get all form inputs
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                const formGroup = input.closest('.form-group');
                
                // Reset previous validation state
                formGroup.classList.remove('invalid');
                
                // Validate required fields
                if (input.hasAttribute('required') && !input.value.trim()) {
                    formGroup.classList.add('invalid');
                    isValid = false;
                }
                
                // Validate email format
                if (input.type === 'email' && input.value.trim()) {
                    if (!emailRegex.test(input.value.trim())) {
                        formGroup.classList.add('invalid');
                        isValid = false;
                    }
                }
                
                // Store form data
                if (input.value.trim()) {
                    formData[input.name] = input.value.trim();
                }
            });

            if (isValid) {
                // Add timestamp
                formData.timestamp = new Date().toISOString();
                
                // Get existing submissions from localStorage
                let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
                
                // Add new submission
                submissions.push(formData);
                
                // Store in localStorage
                localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
                
                // Show success message
                successMessage.style.display = 'block';
                
                // Reset form
                form.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
                
                console.log('Form submitted successfully:', formData);
                console.log('All submissions:', submissions);
            }
        });

        // Real-time validation on input
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => {
                const formGroup = input.closest('.form-group');
                
                // Remove invalid class first
                formGroup.classList.remove('invalid');
                
                // Check if required field is empty
                if (input.hasAttribute('required') && !input.value.trim()) {
                    formGroup.classList.add('invalid');
                }
                
                // Check email format
                if (input.type === 'email' && input.value.trim() && !emailRegex.test(input.value.trim())) {
                    formGroup.classList.add('invalid');
                }
            });

            // Remove error on typing
            input.addEventListener('input', () => {
                const formGroup = input.closest('.form-group');
                if (input.value.trim()) {
                    formGroup.classList.remove('invalid');
                }
            });
        });

        // Log localStorage data on page load (for debugging)
        console.log('Stored contact submissions:', JSON.parse(localStorage.getItem('contactSubmissions')) || []);
    