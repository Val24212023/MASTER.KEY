const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    menuButton.textContent = isOpen ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });
}

// Panel de ayuda: preguntas frecuentes locales, sin simular un chat humano.
const helpLauncher = document.querySelector("#helpLauncher");
const helpPanel = document.querySelector("#helpPanel");
const helpClose = document.querySelector("#helpClose");

function setHelpOpen(open) {
  if (!helpLauncher || !helpPanel) return;
  helpPanel.hidden = !open;
  helpLauncher.setAttribute("aria-expanded", String(open));
  if (open) helpClose?.focus();
  else helpLauncher.focus();
}

helpLauncher?.addEventListener("click", () => {
  setHelpOpen(helpPanel.hidden);
});
helpClose?.addEventListener("click", () => setHelpOpen(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && helpPanel && !helpPanel.hidden) {
    setHelpOpen(false);
  }
});

// Los botones de servicio llevan al formulario y seleccionan el servicio elegido.
document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => {
    const select = document.querySelector("#tipo_proyecto");
    if (select) {
      const requested = button.dataset.service;
      const matchingOption = [...select.options].find((option) =>
        option.textContent.trim() === requested
      );
      if (matchingOption) select.value = matchingOption.value;
    }
    document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
    document.querySelector("#nombre")?.focus({ preventScroll: true });
  });
});

// Contador de caracteres del mensaje.
const messageField = document.querySelector("#mensaje");
const messageCount = document.querySelector("#messageCount");
function updateMessageCount() {
  if (messageField && messageCount) {
    messageCount.textContent = `${messageField.value.length}/2000`;
  }
}
messageField?.addEventListener("input", updateMessageCount);
updateMessageCount();

// Animaciones discretas al entrar en pantalla.
const revealTargets = document.querySelectorAll(
  ".section-heading, .service-card, .project, .about-copy, .team-grid article, .contact-copy, .contact-form"
);
revealTargets.forEach((element) => element.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

// Botón para volver al inicio.
const backToTop = document.querySelector("#backToTop");
window.addEventListener("scroll", () => {
  backToTop?.classList.toggle("visible", window.scrollY > 500);
}, { passive: true });
backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
