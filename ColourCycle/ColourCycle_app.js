const redInput = document.getElementById("red");
const greenInput = document.getElementById("green");
const blueInput = document.getElementById("blue");
const incRedInput = document.getElementById("incRed");
const incGreenInput = document.getElementById("incGreen");
const incBlueInput = document.getElementById("incBlue");
const colorBox = document.getElementById("colorBox");
const warning = document.getElementById("warning");
const toggleBtn = document.getElementById("toggleBtn");

let intervalId = null;
let running = false;

function isHex(value) {
  return /^[0-9A-Fa-f]{2}$/.test(value);
}

function updateBoxColor(r, g, b) {
  const color = `#${r}${g}${b}`;
  colorBox.style.backgroundColor = color;
}

function startCycle() {
  // Validate inputs
  const r = redInput.value;
  const g = greenInput.value;
  const b = blueInput.value;

  if (!isHex(r) || !isHex(g) || !isHex(b)) {
    warning.textContent = "⚠️ Please enter valid 2-digit hex values (00-FF).";
    return;
  }
  warning.textContent = "";

  // Lock inputs
  [redInput, greenInput, blueInput,
   incRedInput, incGreenInput, incBlueInput].forEach(i => i.disabled = true);

  running = true;
  toggleBtn.textContent = "Stop";

  let rVal = parseInt(r, 16);
  let gVal = parseInt(g, 16);
  let bVal = parseInt(b, 16);

  const rInc = parseInt(incRedInput.value, 16);
  const gInc = parseInt(incGreenInput.value, 16);
  const bInc = parseInt(incBlueInput.value, 16);

  intervalId = setInterval(() => {
    rVal = (rVal + rInc) % 256;
    gVal = (gVal + gInc) % 256;
    bVal = (bVal + bInc) % 256;

    const rHex = rVal.toString(16).padStart(2, "0").toUpperCase();
    const gHex = gVal.toString(16).padStart(2, "0").toUpperCase();
    const bHex = bVal.toString(16).padStart(2, "0").toUpperCase();

    updateBoxColor(rHex, gHex, bHex);
  }, 250);
}

function stopCycle() {
  clearInterval(intervalId);
  intervalId = null;
  running = false;
  toggleBtn.textContent = "Start";

  // Unlock inputs
  [redInput, greenInput, blueInput,
   incRedInput, incGreenInput, incBlueInput].forEach(i => i.disabled = false);
}

toggleBtn.addEventListener("click", () => {
  if (running) {
    stopCycle();
  } else {
    startCycle();
  }
});

// Initialize default box
updateBoxColor(redInput.value, greenInput.value, blueInput.value);
