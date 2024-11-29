//If you find this useful, please star the repo and follow me on github: https://github.com/jovdim/Micro-Projects-Collection

const imageUpload = document.getElementById('imageUpload');
const previewCanvas = document.getElementById('previewCanvas');
const downloadButton = document.getElementById('downloadButton');
const layoutOptions = document.getElementsByName('layout');
const ctx = previewCanvas.getContext('2d');

let images = [];
let layout = 'horizontal';
const PADDING = 10;
const SCALING_FACTOR = 0.5;

// Listen for layout changes
document.querySelectorAll('[name="layout"]').forEach(option => {
    option.addEventListener('change', () => {
        layout = option.value;
        renderPreview();
    });
});

// Listen for image uploads
imageUpload.addEventListener('change', async (event) => {
    images = [];
    for (const file of event.target.files) {
        const img = await loadImage(file);
        images.push(img);
    }
    renderPreview();
    downloadButton.disabled = images.length === 0;
});

// Load an image from a file
function loadImage(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}

// Render the preview canvas
function renderPreview() {
    if (images.length === 0) return;

    // Calculate canvas dimensions
    const widths = images.map(img => img.width * SCALING_FACTOR);
    const heights = images.map(img => img.height * SCALING_FACTOR);

    if (layout === 'horizontal') {
        previewCanvas.width = widths.reduce((a, b) => a + b + PADDING, -PADDING);
        previewCanvas.height = Math.max(...heights);
    } else {
        previewCanvas.width = Math.max(...widths);
        previewCanvas.height = heights.reduce((a, b) => a + b + PADDING, -PADDING);
    }

    // Draw images on the canvas
    ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    let offsetX = 0;
    let offsetY = 0;

    for (const img of images) {
        const scaledWidth = img.width * SCALING_FACTOR;
        const scaledHeight = img.height * SCALING_FACTOR;
        ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

        if (layout === 'horizontal') {
            offsetX += scaledWidth + PADDING;
        } else {
            offsetY += scaledHeight + PADDING;
        }
    }
}

// Download the combined image
downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'combined-image.png';
    link.href = previewCanvas.toDataURL();
    link.click();
});
