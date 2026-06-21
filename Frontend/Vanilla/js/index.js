// =============================
// TABS
// =============================
const triagemContent = document.getElementById("triagemContent");
const diagnosticoContent = document.getElementById("diagnosticoContent");

document.querySelectorAll("[data-tab-trigger]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-trigger")
      .forEach((b) => b.classList.remove("tab-trigger-active"));

    btn.classList.add("tab-trigger-active");

    const tab = btn.dataset.tabTrigger;
    triagemContent.classList.toggle("hidden", tab !== "triagem");
    diagnosticoContent.classList.toggle("hidden", tab !== "diagnostico");
  });
});

// =============================
// TRIAGEM — UPLOAD + PREVIEW
// =============================
const fileInput = document.getElementById("fileInput");
const fileLabel = document.getElementById("fileLabel");
const previewContainer = document.getElementById("imagePreviewContainer");
const previewImage = document.getElementById("previewImage");

const changeBtn = document.getElementById("changeImageBtn");
const analyzeBtn = document.getElementById("analyzeBtn");
const resetBtn = document.getElementById("resetBtn");
const loadingContainer = document.getElementById("loadingContainer");

let currentFile = null;

// ---------- abrir seletor ----------
fileLabel.addEventListener("click", () => fileInput.click());
changeBtn.addEventListener("click", () => fileInput.click());

// ---------- ler imagem ----------
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Selecione apenas imagens.");
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    alert("Imagem maior que 10MB.");
    return;
  }

  currentFile = file;

  const reader = new FileReader();
  reader.onload = (ev) => {
    previewImage.src = ev.target.result;
    fileLabel.classList.add("hidden");
    previewContainer.classList.remove("hidden");
    previewContainer.classList.add("flex");
  };
  reader.readAsDataURL(file);
});

// =============================
// DRAG & DROP
// =============================
fileLabel.addEventListener("dragover", (e) => {
  e.preventDefault();
  fileLabel.classList.add("border-blue-500");
});

fileLabel.addEventListener("dragleave", () => {
  fileLabel.classList.remove("border-blue-500");
});

fileLabel.addEventListener("drop", (e) => {
  e.preventDefault();
  fileLabel.classList.remove("border-blue-500");

  const file = e.dataTransfer.files[0];
  if (!file) return;

  fileInput.files = e.dataTransfer.files;
  fileInput.dispatchEvent(new Event("change"));
});

// =============================
// ANALISAR (SIMULA IA)
// =============================
analyzeBtn.addEventListener("click", () => {
  if (!currentFile) return;

  previewContainer.classList.add("hidden");
  loadingContainer.classList.remove("hidden");

  // simulação processamento
  setTimeout(() => {
    loadingContainer.classList.add("hidden");

    previewContainer.classList.remove("hidden");
    resetBtn.classList.remove("hidden");

    analyzeBtn.textContent = "Analisado ✓";
    analyzeBtn.disabled = true;
    analyzeBtn.classList.remove("bg-green-600", "hover:bg-green-700");
    analyzeBtn.classList.add("bg-gray-400");

    alert("Análise concluída (simulada).");
  }, 2500);
});

// =============================
// RESET
// =============================
resetBtn.addEventListener("click", () => {
  currentFile = null;
  fileInput.value = "";

  previewImage.src = "";
  previewContainer.classList.add("hidden");
  fileLabel.classList.remove("hidden");

  resetBtn.classList.add("hidden");

  analyzeBtn.disabled = false;
  analyzeBtn.textContent = "Analisar";
  analyzeBtn.classList.remove("bg-gray-400");
  analyzeBtn.classList.add("bg-green-600", "hover:bg-green-700");
});

// =============================
// TOGGLE (substituto Radix)
// =============================
document.querySelectorAll("[data-toggle]").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("bg-blue-600");
    btn.classList.toggle("text-white");
  });
});

// =============================
// SLIDER (simples, substituto Radix)
// =============================
const sliderTrack = document.getElementById("sliderTrack");
const sliderRange = document.getElementById("sliderRange");
const sliderThumb = document.getElementById("sliderThumb");

let isDragging = false;
let sliderValue = 50; // valor inicial 0-100

function updateSlider(posX) {
  const rect = sliderTrack.getBoundingClientRect();
  let percent = (posX - rect.left) / rect.width;
  percent = Math.max(0, Math.min(1, percent));
  sliderValue = Math.round(percent * 100);

  sliderThumb.style.left = `calc(${sliderValue}% - 0.625rem)`; // 0.625rem = 5px/2
  sliderRange.style.width = `${sliderValue}%`;
}

sliderThumb.addEventListener("mousedown", () => (isDragging = true));
document.addEventListener("mouseup", () => (isDragging = false));
document.addEventListener("mousemove", (e) => {
  if (isDragging) updateSlider(e.clientX);
});

// clicar diretamente no track
sliderTrack.addEventListener("click", (e) => updateSlider(e.clientX));

document.querySelectorAll("[data-toggle-group]").forEach((group) => {
  group.querySelectorAll("[data-value]").forEach((btn) => {
    btn.addEventListener("click", () => {
      group.querySelectorAll("[data-value]").forEach((b) => {
        b.classList.remove("bg-blue-600", "text-white");
      });
      btn.classList.add("bg-blue-600", "text-white");
    });
  });
});
