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
    
    // Fertilizer Chart
    const fertilizerCtx = document.getElementById('fertilizerChart').getContext('2d');
    const fertilizerChart = new Chart(fertilizerCtx, {
        type: 'doughnut',
        data: {
            labels: ['Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)', 'Magnesium (Mg)', 'Calcium (Ca)', 'Iron (Fe)', 'Trace Minerals'],
            datasets: [{
                data: [5, 2, 3, 1, 1, 0.1, 0.1],
                backgroundColor: [
                    '#3366CC', // Blue for Nitrogen
                    '#FFD700', // Yellow for Phosphorus
                    '#9370DB', // Purple for Potassium
                    '#C0C0C0', // Silver for Magnesium
                    '#DC143C', // Red for Calcium
                    '#90EE90', // Light Green for Iron
                    '#87CEEB'  // Sky Blue for Trace Minerals
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#05445E',
                        font: {
                            family: "'Raleway', sans-serif",
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
    
    // Environmental Impact Chart
    const impactCtx = document.getElementById('impactChart').getContext('2d');
    const impactChart = new Chart(impactCtx, {
        type: 'bar',
        data: {
            labels: ['Current Global CO₂ Emissions', 'Potential Annual Reduction with 1,000 Kelp Farms', 'Potential Annual Reduction with 10,000 Kelp Farms'],
            datasets: [{
                label: 'Metric Tons of CO₂',
                data: [37410000000, 400000, 4000000],
                backgroundColor: [
                    '#DC143C', // Red for current emissions
                    '#3CB371', // Green for small reduction
                    '#32CD32'  // Lime Green for large reduction
                ],
                borderColor: [
                    '#B22222',
                    '#2E8B57',
                    '#228B22'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Metric Tons of CO₂ (Log Scale)',
                        color: '#05445E',
                        font: {
                            family: "'Montserrat', sans-serif",
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            if (value === 10000000000) return '10B';
                            if (value === 1000000000) return '1B';
                            if (value === 100000000) return '100M';
                            if (value === 10000000) return '10M';
                            if (value === 1000000) return '1M';
                            if (value === 100000) return '100K';
                            if (value === 10000) return '10K';
                            return value;
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: "'Raleway', sans-serif"
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let value = context.raw;
                            if (value >= 1000000000) {
                                return (value / 1000000000).toFixed(1) + ' billion metric tons of CO₂';
                            } else if (value >= 1000000) {
                                return (value / 1000000).toFixed(1) + ' million metric tons of CO₂';
                            } else if (value >= 1000) {
                                return (value / 1000).toFixed(1) + ' thousand metric tons of CO₂';
                            } else {
                                return value + ' metric tons of CO₂';
                            }
                        }
                    }
                }
            }
        }
    });
    
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
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send this data to a server
            // For now, we'll just show an alert
            alert(`Thank you for your message, ${name}! We'll get back to you at ${email} soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
});
