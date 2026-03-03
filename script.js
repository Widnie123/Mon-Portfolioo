document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. CHATBOT INTERACTIF (WIDNIE-BOT)
       ========================================== */
    const botTrigger = document.getElementById('bot-trigger');
    const botWindow = document.getElementById('bot-window');
    const botMessages = document.getElementById('bot-messages');
    const botOptions = document.getElementById('bot-options');

    const responses = {
        design: "🎨 Côté Design, Widnie maîtrise Photoshop, Corel, Canva et Figma. Elle crée des logos, des chartes graphiques et des maquettes UI/UX modernes.",
        dev: "💻 Développeuse avancée, elle travaille avec HTML, CSS, JS, PHP et React. Elle intègre aussi des APIs pour des sites dynamiques.",
        marketing: "📈 Experte en Marketing Digital, elle gère vos stratégies de contenu, le SEO et booste votre visibilité sur les réseaux sociaux.",
        tech: "🔧 Technicienne IT, elle assure la maintenance, le diagnostic système, le support technique et la gestion des réseaux.",
        merci: "🙏 Merci de votre intérêt ! Je reste à votre disposition. Utilisez le formulaire pour lui écrire directement !"
    };

    // Ouvrir/Fermer le Chatbot
    if (botTrigger) {
        botTrigger.addEventListener('click', () => {
            botWindow.classList.toggle('bot-hidden');
            if (!botWindow.classList.contains('bot-hidden') && botMessages.innerHTML === "") {
                startBot();
            }
        });
    }

    function startBot() {
        addMessage("Bonjour ! Je suis l'assistant de Widnie. Quel service recherchez-vous ?");
        showOptions();
    }

    function addMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'bot-msg';
        msg.innerText = text;
        botMessages.appendChild(msg);
        botMessages.scrollTop = botMessages.scrollHeight;
    }

    function showOptions() {
        botOptions.innerHTML = `
            <button class="bot-btn" onclick="handleChoice('design')">Graphic Design</button>
            <button class="bot-btn" onclick="handleChoice('dev')">Développement Web</button>
            <button class="bot-btn" onclick="handleChoice('marketing')">Marketing Digital</button>
            <button class="bot-btn" onclick="handleChoice('tech')">Technique IT</button>
        `;
    }

    // Fonction globale pour les boutons du bot
    window.handleChoice = (choice) => {
        botOptions.innerHTML = "";
        addMessage(responses[choice]);
        setTimeout(() => {
            addMessage(responses.merci);
            setTimeout(() => {
                botOptions.innerHTML = `<button class="bot-btn" onclick="startBot()">Poser une autre question</button>`;
            }, 1000);
        }, 1500);
    };

    /* ==========================================
       2. FORMULAIRE FORMSPREE (mzdpyjnj)
       ========================================== */
    const form = document.getElementById("my-form");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const status = document.getElementById("my-form-status");
            const btn = document.getElementById("my-form-button");
            
            btn.disabled = true;
            btn.innerText = "Envoi en cours...";

            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.innerText = "✔ Succès ! Message envoyé.";
                status.style.color = "#4ade80";
                form.reset();
                setTimeout(() => { window.location.href = "merci.html"; }, 2000);
            } else {
                status.innerText = "❌ Erreur lors de l'envoi.";
                btn.disabled = false;
                btn.innerText = "Réessayer";
            }
        });
    }

    /* ==========================================
       3. ANIMATIONS AU SCROLL
       ========================================== */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .project-card, .cert-block').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });
});