document.addEventListener('DOMContentLoaded', () => {

    // ===============================
    // 1. Animation subtile au scroll
    // ===============================

    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.card, .profile-card, .contact-card');

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });

    // ===============================
    // 2. Navigation fluide
    // ===============================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===============================
    // 3. Gestion professionnelle du formulaire
    // ===============================

    const form = document.getElementById("my-form");
    const status = document.getElementById("my-form-status");
    const button = document.getElementById("my-form-button");

    if (form && button) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault();

            const data = new FormData(form);

            button.disabled = true;
            button.innerText = "Envoi en cours...";
            status.innerText = "Traitement du message...";
            status.style.color = "#1E293B";

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    status.innerHTML = "✔ Message envoyé avec succès.";
                    status.style.color = "#16A34A";
                    form.reset();
                    button.innerText = "Envoyer";
                } else {
                    status.innerHTML = "Une erreur est survenue. Veuillez réessayer.";
                    status.style.color = "#DC2626";
                    button.innerText = "Réessayer";
                }

            } catch (error) {
                status.innerHTML = "Impossible de contacter le serveur.";
                status.style.color = "#DC2626";
                button.innerText = "Réessayer";
            }

            button.disabled = false;
        });
    }

    console.log("Portfolio – Animations et formulaire activés.");
});