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

    // On applique l'effet à tous les blocs Bento
    document.querySelectorAll('.bento-item').forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "all 0.6s ease-out";
        observer.observe(item);
    });

    // 2. Gestion du formulaire de contact (Simulation d'envoi)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche le rechargement de la page
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            // Simulation d'un chargement
            btn.innerText = "Envoi en cours...";
            btn.disabled = true;

            setTimeout(() => {
                alert("Merci Widnie a bien reçu votre message ! (Ceci est une démo)");
                btn.innerText = originalText;
                btn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }

    // 3. Smooth Scroll pour les liens de navigation
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

});
