// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Check if skill bars are in view
function checkSkillsInView() {
    const skillsSection = document.getElementById('skills');
    const skillsPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (skillsPosition < screenPosition) {
        animateSkillBars();
        // Remove the event listener after animation runs
        window.removeEventListener('scroll', checkSkillsInView);
    }
}

window.addEventListener('scroll', checkSkillsInView);