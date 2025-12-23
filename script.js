document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Animation d'apparition au défilement (Scroll Reveal) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
        observer.observe(el);
    });

    // --- 2. Navigation fluide (Smooth Scroll) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. GESTION DU FORMULAIRE VIA AJAX (NOUVEAU) ---
    const form = document.getElementById("my-form");
    const status = document.getElementById("my-form-status");
    const button = document.getElementById("my-form-button");

    if (form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault(); // Empêche la redirection vers Formspree

            const data = new FormData(event.target);
            
            // Animation du bouton pendant l'envoi
            button.disabled = true;
            button.innerText = "ENVOI EN COURS...";
            status.innerText = "Traitement du message...";
            status.style.color = "white";

            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // SUCCÈS
                    status.innerHTML = "✅ Merci ! Votre message a été envoyé avec succès.";
                    status.style.color = "#00ff88"; // Vert brillant
                    form.reset(); // Vide le formulaire
                    button.innerText = "ENVOYER LE MESSAGE";
                    button.disabled = false;
                } else {
                    // ERREUR SERVEUR
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            status.innerHTML = "❌ Oups ! Un problème est survenu.";
                        }
                    });
                    status.style.color = "#ff4d4d";
                    button.disabled = false;
                    button.innerText = "RÉESSAYER";
                }
            }).catch(error => {
                // ERREUR CONNEXION
                status.innerHTML = "❌ Impossible de se connecter au serveur.";
                status.style.color = "#ff4d4d";
                button.disabled = false;
                button.innerText = "RÉESSAYER";
            });
        });
    }

    console.log("Portfolio de Widnie Delice : Animations et Formulaire AJAX activés.");
});
