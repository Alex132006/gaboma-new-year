// Initialisation d'EmailJS
(function () {
  emailjs.init("9ESKhIvGP_ouNuglQ"); // Remplacez par votre clé publique EmailJS
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

// Gestion du paiement
const form = document.getElementById("paymentForm");
const payButton = document.getElementById("payButton");
const confirmation = document.getElementById("confirmation");
const closeConfirmation = document.getElementById("closeConfirmation");
const loading = document.getElementById("loading");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const cardNumber = document
    .getElementById("cardNumber")
    .value.replace(/\s/g, "");
  const expiry = document.getElementById("expiry").value;
  const cvv = document.getElementById("cvv").value;
  const cardName = document.getElementById("cardName").value;

  // Validation basique
  if (!cardNumber || !expiry || !cvv || !cardName) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
    alert("Numéro de carte invalide");
    return;
  }

  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    alert("Date d'expiration invalide (MM/AA)");
    return;
  }

  if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
    alert("CVV invalide");
    return;
  }

  // Afficher l'indicateur de chargement
  loading.style.display = "block";
  payButton.disabled = true;

  // Délai simulé pour le traitement
  setTimeout(() => {
    // Récupérer les données utilisateur depuis les cookies
    const userReservation = getCookie("userReservation");
    if (userReservation) {
      const userData = JSON.parse(userReservation);

      // Mettre à jour le statut
      userData.status = "paid";
      userData.paymentDate = new Date().toISOString();
      setCookie("userReservation", JSON.stringify(userData), 30);

      // Préparer les paramètres pour EmailJS
      const templateParams = {
        from_name: `${userData.firstname} ${userData.lastname}`,
        from_email: userData.email,
        to_name: "Client",
        message: `Cher ${userData.firstname} ${
          userData.lastname
        },\n\nVotre paiement de 50 000 FCFA pour le billet VIP du Gala Gaboma a été confirmé.\n\nDétails:\n- Type: ${
          userData.ticketType
        }\n- Date de réservation: ${new Date(
          userData.reservationDate
        ).toLocaleDateString(
          "fr-FR"
        )}\n- Date de paiement: ${new Date().toLocaleDateString(
          "fr-FR"
        )}\n\nVotre billet est maintenant actif.\n\nCordialement,\nAESGFR`,
        date: new Date().toLocaleString("fr-FR"),
      };

      // Envoyer l'email via EmailJS
      emailjs
        .send("essongapea.b.a@gmail.com", "template_ry3tfbo", templateParams)
        .then(
          function (response) {
            console.log(
              "Email de confirmation envoyé!",
              response.status,
              response.text
            );
          },
          function (error) {
            console.log("Erreur lors de l'envoi de l'email:", error);
          }
        );
    }

    // Animation du bouton
    payButton.classList.add("reserved");

    // Cacher l'indicateur de chargement
    loading.style.display = "none";

    // Affichage de la confirmation après un délai
    setTimeout(() => {
      confirmation.classList.add("show");
    }, 500);
  }, 2000);
});

// Fermeture de la confirmation
closeConfirmation.addEventListener("click", function () {
  // Redirection ou action après paiement
  window.location.href = "inscripvip.html"; // Ou une page de téléchargement
});

// Fermeture de la confirmation en cliquant en dehors
window.addEventListener("click", function (e) {
  if (e.target === confirmation) {
    confirmation.classList.remove("show");
  }
});

// Animation d'entrée pour les éléments
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.querySelector(".header").style.animation = "fadeIn 0.8s ease-out";
  }, 300);
});
