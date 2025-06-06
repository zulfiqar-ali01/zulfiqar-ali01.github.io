// Helper to initialize navigation events after dynamic load
function initNavigationEvents() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        document.querySelectorAll('#mobile-menu a').forEach(item => {
            item.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Load navigation
fetch('sections/navigation.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('main-nav').innerHTML = data;
        initNavigationEvents(); // Ensure toggle works after load
        // Make navigation bar sticky/floating
        const nav = document.querySelector('header.fixed');
        if (nav) {
            nav.classList.add('backdrop-blur-md', 'bg-white/80', 'shadow-lg');
            nav.style.transition = 'box-shadow 0.3s, background 0.3s';
            nav.style.height = 'auto';
            nav.style.padding = '0';
            nav.style.fontSize = '1rem';
            nav.style.lineHeight = '1.5';
            nav.style.marginBottom = '0'; // Remove extra bottom margin
            nav.style.boxShadow = '0 2px 8px 0 rgba(0,0,0,0.07)'; // Subtle shadow only
            window.addEventListener('scroll', () => {
                if (window.scrollY > 10) {
                    nav.classList.add('shadow-xl', 'bg-white/90');
                } else {
                    nav.classList.remove('shadow-xl', 'bg-white/90');
                }
            });
        }
    });


// Load all sections in the correct order and prevent duplicate appends
const sections = ['home','experience', 'projects', 'publications', 'skills',  'contact'];
const contentDiv = document.getElementById('content');

(async function loadSections() {
    for (const section of sections) {
        const response = await fetch(`sections/${section}.html`);
        const data = await response.text();
        // Remove any existing section with the same id to prevent duplicates
        const oldSection = document.getElementById(section);
        if (oldSection) oldSection.remove();
        const sectionDiv = document.createElement('div');
        sectionDiv.id = section;
        sectionDiv.className = 'section';
        sectionDiv.innerHTML = data;
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = `css/${section}.css`;
        document.head.appendChild(cssLink);
        contentDiv.appendChild(sectionDiv);
    }
})();

// Navigation active state
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});






