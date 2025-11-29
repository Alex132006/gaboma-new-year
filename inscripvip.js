// Initialisation d'EmailJS
(function () {
  emailjs.init("MO8gsdk3f4VCj7E0Z"); // Votre clé publique EmailJS
})();

// Création de particules animées
const particlesContainer = document.getElementById("particles");
const particleCount = 20;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  // Position et taille aléatoires
  const size = Math.random() * 8 + 2;
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  const animationDelay = Math.random() * 5;

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${posX}%`;
  particle.style.top = `${posY}%`;
  particle.style.animationDelay = `${animationDelay}s`;
  particle.style.opacity = Math.random() * 0.5 + 0.1;

  particlesContainer.appendChild(particle);
}

// Gestion de la réservation
const form = document.getElementById("reservationForm");
const reserveButton = document.getElementById("reserveButton");
const confirmation = document.getElementById("confirmation");
const closeConfirmation = document.getElementById("closeConfirmation");
const loading = document.getElementById("loading");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const lastname = document.getElementById("lastname").value;
  const firstname = document.getElementById("firstname").value;
  const email = document.getElementById("email").value;

  // Validation basique
  if (!lastname || !firstname || !email) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  // Afficher l'indicateur de chargement
  loading.style.display = "block";
  reserveButton.disabled = true;

  // Préparer les paramètres pour EmailJS
  const templateParams = {
    from_name: `${firstname} ${lastname}`,
    from_email: email,
    to_name: "AESGFR",
    message: `Nouvelle réservation pour le Gala Gaboma \Billet VIP\n\nNom: ${lastname}\nPrénom: ${firstname}\nEmail: ${email}`,
    date: new Date().toLocaleString("fr-FR"),
  };

  // Envoyer l'email via EmailJS avec vos identifiants
  emailjs.send("service_inhthwd", "template_dghagh5", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);

      // Animation du bouton
      reserveButton.classList.add("reserved");

      // Cacher l'indicateur de chargement
      loading.style.display = "none";

      // Affichage de la confirmation après un délai
      setTimeout(() => {
        confirmation.classList.add("show");
      }, 1000);
    },
    function (error) {
      console.log("FAILED...", error);
      alert("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.");

      // Cacher l'indicateur de chargement et réactiver le bouton
      loading.style.display = "none";
      reserveButton.disabled = false;
    }
  );
});

// Fermeture de la confirmation et redirection vers la page de paiement
closeConfirmation.addEventListener("click", function () {
  // URL de la page de paiement (à remplacer par votre URL réelle)
  const paymentPageUrl = "payevip.html";

  // Redirection vers la page de paiement
  window.location.href = paymentPageUrl;
});

// Fermeture de la confirmation en cliquant en dehors
window.addEventListener("click", function (e) {
  if (e.target === confirmation) {
    confirmation.classList.remove("show");

    // Réinitialisation du formulaire
    form.reset();

    // Réinitialisation du bouton après un délai
    setTimeout(() => {
      reserveButton.classList.remove("reserved");
      reserveButton.disabled = false;
    }, 500);
  }
});

// Animation d'entrée pour les éléments
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.querySelector(".header").style.animation = "fadeIn 0.8s ease-out";
  }, 300);
});
