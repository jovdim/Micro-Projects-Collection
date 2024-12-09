// If you find this project and comments useful, please give it a star and follow us on GitHub : https://github.com/jovdim/Micro-Projects-Collection

const textInput = document.getElementById("textInput");
const voiceSelect = document.getElementById("voiceSelect");
const rate = document.getElementById("rate");
const rateValue = document.getElementById("rateValue");
const speakButton = document.getElementById("speakButton");
const stopButton = document.getElementById("stopButton");

// Speech Synthesis
const synth = window.speechSynthesis;
let voices = [];

// Load Voices
function loadVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = voices
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
}

// Set Rate Value
rate.addEventListener("input", () => {
  rateValue.textContent = rate.value;
});

// Speak Function
function speak() {
  if (synth.speaking) {
    synth.cancel();
  }

  const text = textInput.value;
  if (text.trim() === "") {
    alert("Please enter some text to speak!");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate.value;

  const selectedVoiceName = voiceSelect.value;
  utterance.voice = voices.find((voice) => voice.name === selectedVoiceName);

  synth.speak(utterance);
}

// Stop Function
function stop() {
  if (synth.speaking) {
    synth.cancel();
  }
}

// Event Listeners
speakButton.addEventListener("click", speak);
stopButton.addEventListener("click", stop);

// Populate Voices on Page Load
window.addEventListener("load", () => {
  loadVoices();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
  }
});
