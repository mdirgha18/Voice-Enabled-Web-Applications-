const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const status = document.getElementById("status") as HTMLParagraphElement;
const startVoiceBtn = document.getElementById(
  "start-voice"
) as HTMLButtonElement;
let utterance: SpeechSynthesisUtterance | null = null;

// Read selected text aloud
document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  if (selection && selection.toString().trim() !== "") {
    const text = selection.toString().trim();
    speak(text);
    highlightSelectedText();
  }
});

function speak(text: string) {
  speechSynthesis.cancel(); // Cancel existing
  utterance = new SpeechSynthesisUtterance(text);
  utterance.onend = clearHighlights;
  speechSynthesis.speak(utterance);
}

// Highlight selection
function highlightSelectedText() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const span = document.createElement("span");
  span.className = "highlight";
  span.appendChild(range.extractContents());
  range.insertNode(span);
}

// Clear highlights
function clearHighlights() {
  document.querySelectorAll(".highlight").forEach((el) => {
    const parent = el.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(el.textContent || ""), el);
    }
  });
}

// Voice commands
recognition.addEventListener("result", (event: SpeechRecognitionEvent) => {
  const command = event.results[0][0].transcript.toLowerCase();
  status.textContent = `Heard: "${command}"`;

  if (command.includes("pause")) {
    speechSynthesis.pause();
  } else if (command.includes("resume")) {
    speechSynthesis.resume();
  } else if (command.includes("stop")) {
    speechSynthesis.cancel();
    clearHighlights();
  } else {
    const fallback = new SpeechSynthesisUtterance(
      "Sorry, I didn't understand that command."
    );
    speechSynthesis.speak(fallback);
  }
});

recognition.addEventListener("end", () => {
  status.textContent += " (Click again to speak)";
});

startVoiceBtn.addEventListener("click", () => {
  recognition.start();
  status.textContent = "Listening...";
});
