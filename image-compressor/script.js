//If you find this useful, please star the repo and follow me on github: https://github.com/jovdim/Micro-Projects-Collection 

const uploadArea = document.getElementById("upload-area");
const fileInput = document.getElementById("file-input");
const compressSection = document.getElementById("compress-section");
const previewImage = document.getElementById("preview-image");
const qualityInput = document.getElementById("quality");
const qualityValue = document.getElementById("quality-value");
const compressBtn = document.getElementById("compress-btn");
const downloadBtn = document.getElementById("download-btn");
const feedback = document.getElementById("feedback");
const resizeToggle = document.getElementById("resize-toggle");
const resizeWidth = document.getElementById("resize-width");

let originalImage = null;
let originalFileSize = 0;

function handleFileUpload(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.src = e.target.result;
    compressSection.classList.remove("hidden");
    originalImage = new Image();
    originalImage.src = e.target.result;
    originalImage.onload = () => {
      originalFileSize = file.size / 1024; // Convert size to KB
    };
  };
  reader.readAsDataURL(file);
}

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    handleFileUpload(file);
  }
});

uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadArea.style.background = "rgba(0, 0, 0, 0.1)";
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.style.background = "transparent";
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadArea.style.background = "transparent";
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    handleFileUpload(file);
  }
});

qualityInput.addEventListener("input", () => {
  qualityValue.textContent = `${qualityInput.value}%`;
});

resizeToggle.addEventListener("change", () => {
  resizeWidth.disabled = !resizeToggle.checked;
});

compressBtn.addEventListener("click", () => {
  if (!originalImage) return;

  feedback.textContent = "Compressing image... Please wait.";
  feedback.style.color = "blue";

  setTimeout(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const targetWidth = resizeToggle.checked ? parseInt(resizeWidth.value, 10) || originalImage.width : originalImage.width;
    const targetHeight = (targetWidth / originalImage.width) * originalImage.height;

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

    const compressedData = canvas.toDataURL("image/jpeg", qualityInput.value / 100);
    const compressedSize = (compressedData.length * 3) / 4 / 1024; // Approximate size in KB

    previewImage.src = compressedData;

    feedback.textContent = `Original Size: ${originalFileSize.toFixed(2)} KB | Compressed Size: ${compressedSize.toFixed(2)} KB`;
    feedback.style.color = "green";

    downloadBtn.href = compressedData;
    downloadBtn.download = "compressed-image.jpg";
    downloadBtn.classList.remove("hidden");
  }, 1000);
});
