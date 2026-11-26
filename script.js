const menuButton = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute("aria-label", open ? "Abrir menú" : "Cerrar menú");
  menu.classList.toggle("open", !open);
  document.body.classList.toggle("menu-open", !open);
});

menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    menu.classList.remove("open");
    document.body.classList.remove("menu-open");
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  status.classList.remove("error");

  if (!form.reportValidity()) {
    status.classList.add("error");
    status.textContent = "Revisa los campos obligatorios y acepta la política de privacidad.";
    return;
  }

  status.textContent = "El formulario está listo visualmente, pero aún requiere configurar un endpoint real (por ejemplo, Formspree, Google Sheets o un backend) para recibir las respuestas.";
});
