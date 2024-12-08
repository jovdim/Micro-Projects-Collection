const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let drawing = false;
let brushColor = "#000000";
let brushSize = 5;
let history = [];
let redoStack = [];

// Update brush color
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", (e) => {
  brushColor = e.target.value;
});

// Update brush size
const brushSizeInput = document.getElementById("brushSize");
brushSizeInput.addEventListener("input", (e) => {
  brushSize = e.target.value;
});

// Clear canvas
const clearCanvasButton = document.getElementById("clearCanvas");
clearCanvasButton.addEventListener("click", () => {
  saveState();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Undo functionality
const undoButton = document.createElement("button");
undoButton.textContent = "Undo";
undoButton.addEventListener("click", undo);
document.querySelector(".controls").appendChild(undoButton);

// Redo functionality
const redoButton = document.createElement("button");
redoButton.textContent = "Redo";
redoButton.addEventListener("click", redo);
document.querySelector(".controls").appendChild(redoButton);

function saveState() {
  if (history.length === 10) history.shift(); // Limit history size to 10
  history.push(canvas.toDataURL());
  redoStack = []; // Clear redo stack on new action
}

function undo() {
  if (history.length === 0) return;
  redoStack.push(canvas.toDataURL());
  const lastState = history.pop();
  const img = new Image();
  img.src = lastState;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
}

function redo() {
  if (redoStack.length === 0) return;
  history.push(canvas.toDataURL());
  const nextState = redoStack.pop();
  const img = new Image();
  img.src = nextState;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
}

// Draw on canvas
canvas.addEventListener("mousedown", (e) => {
  saveState();
  drawing = true;
  draw(e);
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener("mouseleave", () => {
  drawing = false;
  ctx.beginPath();
});

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = brushColor;

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Add emoji functionality
const emojiButton = document.getElementById("emojiButton");
emojiButton.addEventListener("click", () => {
  saveState();
  const emojis = ["😀", "🎨", "✨", "🌟", "🌈", "💖", "🎉", "🔥"];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  const x = Math.random() * (canvas.width - 50) + 25;
  const y = Math.random() * (canvas.height - 50) + 25;
  ctx.font = "30px Arial";
  ctx.fillText(randomEmoji, x, y);
});
