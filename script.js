// Compteurs compétences avec pourcentage centré
document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill-progress");

  skills.forEach(skill => {
    const progress = parseInt(skill.getAttribute("data-progress")); // 90, 85...
    const percent = skill.querySelector(".skill-percent");
    
    let count = 0;
    skill.style.width = "0%";

    const interval = setInterval(() => {
      if(count <= progress){
        skill.style.width = count + "%";
        percent.textContent = count + "%"; // affiche le pourcentage
        count++;
      } else {
        clearInterval(interval);
      }
    }, 20); // vitesse de l'animation
  });
});

// Alerte téléchargement CV
document.querySelector(".cv-btn a").addEventListener("click", () => {
  alert("Merci d’avoir téléchargé mon CV !");
});

// Validation formulaire contact
document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault(); // empêche le rechargement de la page
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if(name && email && message){
    alert(`Merci ${name} ! Votre message a été envoyé.`);
    this.reset(); // réinitialise le formulaire
  } else {
    alert("Veuillez remplir tous les champs !");
  }
});
