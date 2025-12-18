document.addEventListener('DOMContentLoaded', () => {

    // 1. Animation d'apparition au défilement (Scroll Reveal)
    const observerOptions = {
        threshold: 0.1, // Déclenche l'animation quand 10% de l'élément est visible
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                // Une fois animé, on arrête d'observer l'élément
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // On sélectionne les éléments à animer
    const revealElements = document.querySelectorAll('.card, .profile-card, .contact-card');
    
    revealElements.forEach(el => {
        // État de départ (invisible et décalé vers le bas)
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
        observer.observe(el);
    });

    // 2. Navigation fluide (Smooth Scroll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajustement pour la barre de navigation
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Message de confirmation console (pour vérifier que tout tourne)
    console.log("Portfolio de Widnie Delice : Animations activées.");
});