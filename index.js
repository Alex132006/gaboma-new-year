// Création de particules animées
const particlesContainer = document.getElementById("particles");
const particleCount = 40;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  // Position et taille aléatoires
  const size = Math.random() * 10 + 2;
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  const animationDelay = Math.random() * 5;
  const hue = Math.floor(Math.random() * 360);

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${posX}%`;
  particle.style.top = `${posY}%`;
  particle.style.animationDelay = `${animationDelay}s`;
  particle.style.opacity = Math.random() * 0.5 + 0.1;
  particle.style.background = `hsla(${hue}, 70%, 60%, 0.2)`;
  particle.style.boxShadow = `0 0 15px hsla(${hue}, 70%, 60%, 0.5)`;
  particlesContainer.appendChild(particle);
}

// Gestion des boutons
const btnInfo = document.getElementById("btnInfo");
const infoModal = document.getElementById("infoModal");
const closeModal = document.getElementById("closeModal");

// Bouton Informations - Fonctionnalité restaurée
btnInfo.addEventListener("click", function () {
  infoModal.classList.add("show");
});

// Fermeture de la modal
closeModal.addEventListener("click", function () {
  infoModal.classList.remove("show");
});

// Fermeture de la modal en cliquant en dehors
window.addEventListener("click", function (e) {
  if (e.target === infoModal) {
    infoModal.classList.remove("show");
  }
});

// Animation d'entrée pour les éléments
document.addEventListener("DOMContentLoaded", function () {
  // Show welcome message every time
  const welcomeMessage = document.getElementById("welcomeMessage");
  welcomeMessage.style.display = "block";
  setTimeout(() => {
    welcomeMessage.style.opacity = "1";
    welcomeMessage.style.visibility = "visible";
    // Trigger fireworks within the welcome message
    const rect = welcomeMessage.getBoundingClientRect();
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        createFirework(x, y);
      }, i * 200);
    }
  }, 100);
  setTimeout(() => {
    welcomeMessage.style.opacity = "0";
    welcomeMessage.style.visibility = "hidden";
    setTimeout(() => {
      welcomeMessage.style.display = "none";
    }, 400);
  }, 4000);

  // Trigger fireworks on load
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      createFirework(x, y);
    }, i * 500);
  }

  setTimeout(() => {
    const elements = document.querySelectorAll(".header, .btn");
    elements.forEach((el, index) => {
      el.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
      el.style.opacity = "0";
    });
  }, 300);
});

// Prévention du clic droit
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// Prévention du glisser-déposer
document.addEventListener("dragstart", function (e) {
  e.preventDefault();
});

// Détection des tentatives d'inspection
document.addEventListener("keydown", function (e) {
  // Désactiver F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+U
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && e.key === "I") ||
    (e.ctrlKey && e.shiftKey && e.key === "C") ||
    (e.ctrlKey && e.key === "u")
  ) {
    e.preventDefault();
  }
});

function createFirework(x, y) {
  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
  ];
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "firework";

    const angle = (Math.PI * 2 * i) / particleCount;
    const distance = 50 + Math.random() * 100;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.setProperty("--x", "0px");
    particle.style.setProperty("--y", "0px");
    particle.style.setProperty(
      "--particle-x",
      `${Math.cos(angle) * distance}px`
    );
    particle.style.setProperty(
      "--particle-y",
      `${Math.sin(angle) * distance}px`
    );
    particle.style.background = color;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    document.body.appendChild(particle);

    // Supprimer l'élément après l'animation
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

// Feux d'artifice automatiques
setInterval(() => {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  createFirework(x, y);
}, 2000);

// Navigation select
document.getElementById("choix").addEventListener("change", function () {
  const targetId = this.value;
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: "smooth",
    });
  }
});

// Cookie Consent Banner Functionality
document.addEventListener("DOMContentLoaded", function () {
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const declineBtn = document.getElementById("decline-cookies");

  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem("cookieConsent");

  if (cookieChoice === "accepted" || cookieChoice === "declined") {
    // Hide banner if choice already made
    cookieBanner.style.display = "none";
  } else {
    // Show banner if no choice made
    cookieBanner.style.display = "flex";
  }

  // Accept cookies
  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted");
    cookieBanner.style.display = "none";
    // Here you can add code to enable cookies/analytics if needed
  });

  // Decline cookies
  declineBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "declined");
    cookieBanner.style.display = "none";
    // Here you can add code to disable non-essential cookies
  });
});
