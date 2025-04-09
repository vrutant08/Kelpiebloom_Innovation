document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links ul li a');
    
    // Scroll event for header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Fertilizer Chart is now an image, no need for chart.js here
    
    // Environmental Impact Chart removed to fix scrolling issue
    
    // Scroll Animations with IntersectionObserver
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    // Apply animation classes to elements
    document.querySelectorAll('.section-header').forEach(section => {
        section.classList.add('fade-in');
        appearOnScroll.observe(section);
    });
    
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index % 2 === 0) {
            step.classList.add('slide-in-left');
        } else {
            step.classList.add('slide-in-right');
        }
        appearOnScroll.observe(step);
    });
    
    document.querySelectorAll('.material-item, .impact-stat, .impact-card, .kelp-card, .data-visualization, .team-member, .contact-form').forEach(element => {
        element.classList.add('fade-in');
        appearOnScroll.observe(element);
    });
    
    // Contact form submission has been removed as requested
});
