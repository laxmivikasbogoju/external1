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

// Update storage count display
function updateStorageCount() {
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
    document.getElementById('storageCount').textContent = submissions.length;
}

// Call on page load
updateStorageCount();

// Form Validation
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate single field
function validateField(input) {
    const formGroup = input.closest('.form-group');
    const value = input.value.trim();
    
    // Remove previous states
    formGroup.classList.remove('invalid', 'valid');
    
    // Check if empty
    if (input.hasAttribute('required') && !value) {
        formGroup.classList.add('invalid');
        return false;
    }
    
    // Check email format
    if (input.type === 'email' && value && !emailRegex.test(value)) {
        formGroup.classList.add('invalid');
        return false;
    }
    
    // If valid
    if (value) {
        formGroup.classList.add('valid');
    }
    
    return true;
}

// Real-time validation on blur
form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });

    // Remove error state on input
    input.addEventListener('input', () => {
        const formGroup = input.closest('.form-group');
        if (input.value.trim()) {
            formGroup.classList.remove('invalid');
        }
    });
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    console.log('=== FORM SUBMISSION STARTED ===');
    
    let isValid = true;
    const formData = {};

    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        const fieldValid = validateField(input);
        if (!fieldValid) {
            isValid = false;
        }
        
        // Collect data
        if (input.value.trim()) {
            formData[input.name] = input.value.trim();
        }
    });

    console.log('Form validation result:', isValid);
    console.log('Form data collected:', formData);

    if (isValid) {
        // Add timestamp
        formData.timestamp = new Date().toISOString();
        formData.submittedAt = new Date().toLocaleString();
        
        // Get existing submissions
        let submissions = [];
        try {
            submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
        } catch (error) {
            console.error('Error reading localStorage:', error);
            submissions = [];
        }
        
        // Add new submission
        submissions.push(formData);
        
        // Save to localStorage
        try {
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            console.log('✓ Data saved to localStorage successfully!');
            console.log('Current submission:', formData);
            console.log('All submissions:', submissions);
            console.log('Total submissions:', submissions.length);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
        
        // Update count display
        updateStorageCount();
        
        // Show success message
        successMessage.classList.add('show');
        
        // Reset form
        form.reset();
        
        // Remove valid states
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('valid', 'invalid');
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
        
        console.log('=== FORM SUBMISSION COMPLETED ===');
    } else {
        console.log('❌ Form validation failed - please check all fields');
    }
});

// Log initial state
console.log('=== PAGE LOADED ===');
console.log('Stored submissions:', JSON.parse(localStorage.getItem('contactSubmissions')) || []);
console.log('Total count:', (JSON.parse(localStorage.getItem('contactSubmissions')) || []).length);