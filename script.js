document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. LOGIQUE DU CHATBOT (WIDNIE-BOT)
       ========================================== */
    const botTrigger = document.getElementById('bot-trigger');
    const botWindow = document.getElementById('bot-window');
    const botMessages = document.getElementById('bot-messages');
    const botOptions = document.getElementById('bot-options');

    // Messages personnalisés selon tes services
    const botResponses = {
        design: "🎨 En Graphic Design, Widnie maîtrise la suite Adobe (Photoshop), Canva, CorelDraw et Figma. Elle crée des identités visuelles uniques.",
        dev: "💻 Widnie est développeuse avancée : HTML, CSS, JS, PHP, React et intégration d'APIs. Elle bâtit des solutions robustes.",
        marketing: "📈 Experte en Marketing Digital, elle gère vos stratégies de contenu et l'optimisation de votre visibilité en ligne.",
        tech: "🔧 En tant que Technicienne IT, elle assure la maintenance, le support système et la gestion de vos réseaux informatiques.",
        merci: "🙏 Merci de votre intérêt ! Je reste à votre disposition. N'hésitez pas à envoyer un message direct via le formulaire."
    };

    // Ouvrir/Fermer le Chatbot
    botTrigger.addEventListener('click', () => {
        botWindow.classList.toggle('bot-hidden');
        if (!botWindow.classList.contains('bot-hidden') && botMessages.innerHTML === "") {
            startBot();
        }
    });

    function startBot() {
        addMessage("Bonjour ! Je suis l'assistant de Widnie. Quel service recherchez-vous ?");
        showOptions();
    }

    function addMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'bot-msg';
        msgDiv.innerText = text;
        botMessages.appendChild(msgDiv);
        botMessages.scrollTop = botMessages.scrollHeight;
    }

    function showOptions() {
        botOptions.innerHTML = `
            <button class="bot-btn" onclick="handleBotChoice('design')">Graphic Design</button>
            <button class="bot-btn" onclick="handleBotChoice('dev')">Développement Web</button>
            <button class="bot-btn" onclick="handleBotChoice('marketing')">Marketing Digital</button>
            <button class="bot-btn" onclick="handleBotChoice('tech')">Support Technique</button>
        `;
    }

    window.handleBotChoice = function(choice) {
        botOptions.innerHTML = ""; // Vide les options
        addMessage(botResponses[choice]);
        
        setTimeout(() => {
            addMessage(botResponses.merci);
            // Proposer de recommencer après un court délai
            setTimeout(() => {
                botOptions.innerHTML = `<button class="bot-btn" onclick="startBot()">Poser une autre question</button>`;
            }, 1000);
        }, 1500);
    };


    /* ==========================================
       2. FORMULAIRE FORMSPREE (ID: mzdpyjnj)
       ========================================== */
    const form = document.getElementById("my-form");
    const status = document.getElementById("my-form-status");
    const button = document.getElementById("my-form-button");

    if (form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault();
            const data = new FormData(form);
            
            button.disabled = true;
            button.innerText = "Envoi en cours...";
            status.innerText = "Traitement de votre message...";

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    status.innerHTML = "✔ Succès ! Merci Widnie a bien reçu votre message.";
                    status.style.color = "#4ade80";
                    form.reset();
                    // Redirection vers ta page merci.html après 2 secondes
                    setTimeout(() => {
                        window.location.href = "merci.html";
                    }, 2000);
                } else {
                    status.innerHTML = "Oups ! Il y a eu un problème lors de l'envoi.";
                    status.style.color = "#f87171";
                    button.disabled = false;
                    button.innerText = "Réessayer";
                }
            } catch (error) {
                status.innerHTML = "Erreur de connexion au serveur.";
                status.style.color = "#f87171";
                button.disabled = false;
            }
        });
    }

    /* ==========================================
       3. ANIMATION SUBTILE AU SCROLL
       ========================================== */
    const revealElements = document.querySelectorAll('.card, .cert-block, .service-row');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });

});