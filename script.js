/**
 * ============================================
 * SCRIPTS PARA PORTAFOLIO PERSONAL
 * ============================================
 */

document.addEventListener("DOMContentLoaded", function () {
  // Inicializar todas las funcionalidades
  initSmoothScrolling();
  initThemeManager();
  initContactForm();

  console.log("✅ Portafolio iniciado correctamente");
});

// ============================================
// NAVEGACIÓN SUAVE (SMOOTH SCROLLING)
// ============================================
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// ============================================
// GESTIÓN DE TEMA OSCURO/CLARO
// ============================================
function initThemeManager() {
  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.setAttribute("aria-label", "Cambiar tema");
  document.body.appendChild(themeToggle);

  const savedTheme = localStorage.getItem("theme-preference");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let isDark = savedTheme ? savedTheme === "dark" : prefersDark;

  const applyTheme = (dark) => {
    document.documentElement.classList.toggle("dark-theme", dark);
    themeToggle.innerHTML = dark ? "☀️" : "🌙";
    localStorage.setItem("theme-preference", dark ? "dark" : "light");
  };

  themeToggle.addEventListener("click", () => {
    isDark = !isDark;
    applyTheme(isDark);
  });

  applyTheme(isDark);
}

// ============================================
// FORMULARIO DE CONTACTO FUNCIONAL
// ============================================
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", handleFormSubmission);
}

async function handleFormSubmission(e) {
  e.preventDefault();
  const form = e.target;
  const formMessage = document.getElementById("formMessage");
  const submitBtn = form.querySelector(".submit-btn");
  const originalBtnHTML = submitBtn.innerHTML;

  // Validación simple
  if (!form.checkValidity()) {
    showFormMessage(
      "Por favor completa todos los campos requeridos.",
      "error",
      formMessage
    );
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = "Enviando...";

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      showFormMessage(
        "¡Mensaje enviado! Gracias por contactarme.",
        "success",
        formMessage
      );
      form.reset();
    } else {
      const data = await response.json();
      const errorMessage = data.errors
        ? data.errors.map((err) => err.message).join(", ")
        : "Ocurrió un error. Inténtalo de nuevo.";
      throw new Error(errorMessage);
    }
  } catch (error) {
    showFormMessage(`Error: ${error.message}`, "error", formMessage);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHTML;
    setTimeout(() => {
      formMessage.style.display = "none";
    }, 5000);
  }
}

function showFormMessage(text, type, element) {
  element.textContent = text;
  element.className = `form-message ${type}`;
  element.style.display = "block";
  element.scrollIntoView({ behavior: "smooth", block: "center" });
}
