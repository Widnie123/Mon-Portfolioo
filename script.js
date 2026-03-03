document.addEventListener("DOMContentLoaded", function () {

  const botTrigger = document.getElementById("bot-trigger");
  const botWindow = document.getElementById("bot-window");
  const botMessages = document.getElementById("bot-messages");
  const botOptions = document.getElementById("bot-options");

  let botOpened = false;

  /* ===============================
     OPEN / CLOSE BOT
  ================================ */
  botTrigger.addEventListener("click", () => {
    if (!botOpened) {
      botWindow.style.display = "flex";
      startConversation();
      botOpened = true;
    } else {
      botWindow.style.display = "none";
      botOpened = false;
    }
  });

  /* ===============================
     START CONVERSATION
  ================================ */
  function startConversation() {
    botMessages.innerHTML = "";
    botOptions.innerHTML = "";

    addMessage("Bonjour 👋 Je suis Widnie-Bot. Que recherchez-vous aujourd’hui ?");

    createOption("🎨 Graphic Design", () => serviceResponse("design"));
    createOption("💻 Développement Web", () => serviceResponse("dev"));
    createOption("📊 Marketing Digital", () => serviceResponse("marketing"));
    createOption("🛠️ Support IT", () => serviceResponse("tech"));
  }

  /* ===============================
     SERVICE RESPONSES
  ================================ */
  function serviceResponse(service) {
    botOptions.innerHTML = "";

    const services = {
      design: "Je conçois des identités visuelles stratégiques : logos, branding, supports marketing. Outils maîtrisés : Canva, Photoshop, Figma, CorelDraw, Affinity.",
      dev: "Je développe des sites et applications performantes : HTML, CSS, JavaScript, PHP, React et intégration d’API.",
      marketing: "Je structure votre visibilité digitale avec une stratégie de contenu, funnel marketing et analyse de performance.",
      tech: "Diagnostic, maintenance système, réseaux et optimisation d’infrastructure informatique."
    };

    addMessage(services[service]);

    createOption("👉 Aller au formulaire de contact", () => {
      window.location.href = "contact.html";
    });

    createOption("🔙 Retour", () => {
      startConversation();
    });
  }

  /* ===============================
     ADD MESSAGE
  ================================ */
  function addMessage(text) {
    const message = document.createElement("div");
    message.style.marginBottom = "10px";
    message.innerText = text;
    botMessages.appendChild(message);
    botMessages.scrollTop = botMessages.scrollHeight;
  }

  /* ===============================
     CREATE BUTTON OPTION
  ================================ */
  function createOption(text, callback) {
    const button = document.createElement("button");
    button.innerText = text;
    button.addEventListener("click", callback);
    botOptions.appendChild(button);
  }

});
