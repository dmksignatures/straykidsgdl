/* =========================================================================
   CONFIGURACIÓN — cambia este valor antes de publicar el sitio
   ========================================================================= */

// 1) Formspree: crea una cuenta gratis en https://formspree.io, crea un
//    formulario apuntando a mateogalvez5995@gmail.com y pega aquí su ID
//    (la URL que te da Formspree se ve como https://formspree.io/f/xxxxabcd)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnpqjjjk";

const GOAL = 1000;
const START_VALUE = 753;
const STORAGE_COUNT = "skgdl_count";

/* ========================================================================= */

const $ = (sel) => document.querySelector(sel);

const gate = $("#gate");
const gateForm = $("#gate-form");
const emailInput = $("#email");
const gateSubmit = $("#gate-submit");
const gateError = $("#gate-error");
const gateLoading = $("#gate-loading");

const petition = $("#petition");
const countEl = $("#count");
const remainingEl = $("#remaining");
const meterFill = $("#meter-fill");
const meterTrack = $("#meter-track");
const signBtn = $("#sign-btn");
const signMsg = $("#sign-msg");

const STORAGE_EMAIL = "skgdl_email";
const STORAGE_SIGNED = "skgdl_signed";

/* ---------------------- Utilidades de UI de la meta ---------------------- */

function renderCount(value) {
  const clamped = Math.min(value, GOAL);
  countEl.textContent = clamped.toLocaleString("es-MX");
  const pct = Math.min(100, (clamped / GOAL) * 100);
  meterFill.style.width = pct + "%";
  meterTrack.setAttribute("aria-valuenow", String(clamped));
  const remaining = Math.max(0, GOAL - clamped);
  remainingEl.textContent = remaining.toLocaleString("es-MX");

  if (remaining === 0) {
    $("#meter-hint").innerHTML = "¡Llegamos a la meta! Gracias por firmar 🎉";
  }
}

function markAlreadySigned() {
  signBtn.disabled = true;
  signBtn.querySelector(".btn-label").textContent = "Ya firmaste, ¡gracias!";
  signMsg.textContent = "Tu firma ya cuenta. Comparte esta página para sumar más.";
}

/* ---------------------- Contador propio (sin servicios externos) --------- */

function getCount() {
  const stored = localStorage.getItem(STORAGE_COUNT);
  if (stored !== null) return Number(stored);
  localStorage.setItem(STORAGE_COUNT, String(START_VALUE));
  return START_VALUE;
}

function incrementCount() {
  const next = getCount() + 1;
  localStorage.setItem(STORAGE_COUNT, String(next));
  return next;
}

function initPetitionScreen() {
  renderCount(getCount());

  if (localStorage.getItem(STORAGE_SIGNED) === "true") {
    markAlreadySigned();
  }
}

/* ---------------------- Paso 1: registro con correo ----------------------- */

function showPetition() {
  gate.classList.add("hidden");
  petition.classList.remove("hidden");
  initPetitionScreen();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

gateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  gateError.textContent = "";

  if (!isValidEmail(email)) {
    gateError.textContent = "Escribe un correo válido para continuar.";
    return;
  }

  gateSubmit.disabled = true;
  gateLoading.classList.add("active");

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        mensaje: "Nuevo registro para la petición Stray Kids Guadalajara",
      }),
    });

    if (!res.ok) throw new Error("Formspree respondió con error");

    localStorage.setItem(STORAGE_EMAIL, email);
    showPetition();
  } catch (err) {
    console.error(err);
    gateError.textContent =
      "No se pudo enviar tu correo. Revisa tu conexión e inténtalo de nuevo.";
  } finally {
    gateSubmit.disabled = false;
    gateLoading.classList.remove("active");
  }
});

/* ---------------------- Paso 2: firmar la petición ------------------------ */

signBtn.addEventListener("click", () => {
  if (localStorage.getItem(STORAGE_SIGNED) === "true") return;

  const newValue = incrementCount();
  renderCount(newValue);

  localStorage.setItem(STORAGE_SIGNED, "true");
  markAlreadySigned();
  signMsg.textContent = "¡Gracias! Tu firma ya es parte de la meta.";
});

/* ---------------------- Si ya se registró antes --------------------------- */

if (localStorage.getItem(STORAGE_EMAIL)) {
  showPetition();
}
