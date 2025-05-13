document.addEventListener('DOMContentLoaded', function() {
    // Home section animations
    const homeSection = document.getElementById('home');
    const homeHeading = homeSection.querySelector('h1');
    const homeParagraph = homeSection.querySelector('p');
    
    // Fade-in animation for home section
    setTimeout(() => {
        homeHeading.style.opacity = '1';
        homeHeading.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        homeParagraph.style.opacity = '1';
        homeParagraph.style.transform = 'translateY(0)';
    }, 600);
    
    // Profile image hover effect
    const profileImage = homeSection.querySelector('.profile-image');
    profileImage.addEventListener('mouseenter', () => {
        profileImage.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    });
    
    profileImage.addEventListener('mouseleave', () => {
        profileImage.style.boxShadow = 'none';
    });
});