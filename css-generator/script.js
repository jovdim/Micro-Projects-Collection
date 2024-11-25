
const gradientType = document.getElementById("gradient-type");
const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const angle = document.getElementById("angle");
const angleValue = document.getElementById("angle-value");
const gradientPreview = document.getElementById("gradient-preview");
const gradientCode = document.getElementById("gradient-code");
const copyGradientCode = document.getElementById("copy-gradient-code");

function updateGradient() {
  const type = gradientType.value;
  const colorStart = color1.value;
  const colorEnd = color2.value;
  const gradientAngle = type === "linear" ? `${angle.value}deg` : "circle";

  const gradient = `${type}-gradient(${gradientAngle}, ${colorStart}, ${colorEnd})`;
  gradientPreview.style.background = gradient;
  gradientCode.value = `background: ${gradient};`;
  angleValue.textContent = `${angle.value}°`;
}

[gradientType, color1, color2, angle].forEach(input =>
  input.addEventListener("input", updateGradient)
);

copyGradientCode.addEventListener("click", () => {
  navigator.clipboard.writeText(gradientCode.value);
  alert("Gradient CSS copied!");
});

// Box Shadow Generator
const hOffset = document.getElementById("h-offset");
const vOffset = document.getElementById("v-offset");
const blurRadius = document.getElementById("blur-radius");
const spreadRadius = document.getElementById("spread-radius");
const shadowColor = document.getElementById("shadow-color");
const shadowPreview = document.getElementById("shadow-preview");
const shadowCode = document.getElementById("shadow-code");
const copyShadowCode = document.getElementById("copy-shadow-code");

function updateShadow() {
  const h = hOffset.value;
  const v = vOffset.value;
  const blur = blurRadius.value;
  const spread = spreadRadius.value;
  const color = shadowColor.value;

  const boxShadow = `${h}px ${v}px ${blur}px ${spread}px ${color}`;
  shadowPreview.style.boxShadow = boxShadow;
  shadowCode.value = `box-shadow: ${boxShadow};`;
}

[hOffset, vOffset, blurRadius, spreadRadius, shadowColor].forEach(input =>
  input.addEventListener("input", updateShadow)
);

copyShadowCode.addEventListener("click", () => {
  navigator.clipboard.writeText(shadowCode.value);
  alert("Box Shadow CSS copied!");
});
