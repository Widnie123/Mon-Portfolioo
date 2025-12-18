// Attendre que le contenu soit chargé
document.addEventListener('DOMContentLoaded', () => {

    // 1. Animation d'apparition au défilement (Scroll Reveal)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // On applique l'effet aux cartes et à la section profil
    const elementsToAnimate = document.querySelectorAll('.card, .profile-desc, .contact-card');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });

    // 2. Navigation fluide pour les liens du menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Effet subtil sur le bouton CV au survol
    const btnCv = document.querySelector('.btn-cv');
    if (btnCv) {
        btnCv.addEventListener('mouseover', () => {
            btnCv.style.letterSpacing = "2px";
        });
        btnCv.addEventListener('mouseout', () => {
            btnCv.style.letterSpacing = "normal";
        });
    }

    console.log("Le portfolio de Widnie est prêt et animé !");
});