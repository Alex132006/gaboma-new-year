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
  setTimeout(() => {
    const elements = document.querySelectorAll(".header, .btn");
    elements.forEach((el, index) => {
      el.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
      el.style.opacity = "0";
    });
  }, 300);
});

// PROTECTIONS RENFORCÉES CONTRE L'INSPECTION
// Prévention du clic droit
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  return false;
});

// Prévention du glisser-déposer
document.addEventListener("dragstart", function (e) {
  e.preventDefault();
  return false;
});

// Prévention de la sélection de texte
document.addEventListener("selectstart", function (e) {
  e.preventDefault();
  return false;
});

// Détection des tentatives d'inspection
document.addEventListener("keydown", function (e) {
  // Désactiver F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+U, Ctrl+Shift+J
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && e.key === "I") ||
    (e.ctrlKey && e.shiftKey && e.key === "C") ||
    (e.ctrlKey && e.shiftKey && e.key === "J") ||
    (e.ctrlKey && e.key === "u") ||
    (e.key === "I" && e.shiftKey && e.altKey)
  ) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
});

// Détection de l'ouverture des outils développeurs
let devToolsOpen = false;

// Vérification périodique de la taille de la fenêtre
setInterval(function () {
  const widthThreshold = window.outerWidth - window.innerWidth > 160;
  const heightThreshold = window.outerHeight - window.innerHeight > 160;

  if ((widthThreshold || heightThreshold) && !devToolsOpen) {
    devToolsOpen = true;
    // Redirection ou action lorsque les outils sont détectés
    document.body.innerHTML =
      '<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:Arial,sans-serif;">L\'inspection du site est désactivée.</div>';
  }
}, 1000);

// Détection du débogage
(function () {
  const debuggerDetector = function () {};
  debuggerDetector.prototype.toString = function () {
    // Action lorsque le débogueur est détecté
    document.body.innerHTML =
      '<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:Arial,sans-serif;">Accès aux outils développeurs non autorisé.</div>';
    return "";
  };

  // Surveillance des appels console
  const originalConsole = console;
  console.log = function () {
    // Empêcher l'affichage dans la console
    return false;
  };
  console.warn = function () {
    return false;
  };
  console.error = function () {
    return false;
  };
  console.info = function () {
    return false;
  };
})();

// Empêcher l'accès via le menu navigateur
document.onkeypress = function (e) {
  if (e.keyCode === 123) {
    // F12
    return false;
  }
};

// Protection supplémentaire contre l'inspection des éléments
document.addEventListener("DOMNodeInserted", function (e) {
  if (
    e.relatedNode &&
    e.relatedNode.classList &&
    e.relatedNode.classList.contains("particle")
  ) {
    // Empêcher l'inspection des particules
    e.stopPropagation();
  }
});
