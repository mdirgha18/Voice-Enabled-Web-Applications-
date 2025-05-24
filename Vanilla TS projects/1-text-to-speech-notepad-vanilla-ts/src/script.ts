import "./styles.css";

// Type definitions for Web Speech API
const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Your browser does not support Speech Recognition.");
  throw new Error("Speech Recognition not supported");
}

// Create a new recognition instance
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";

const startBtn = document.getElementById("startBtn") as HTMLButtonElement;
const stopBtn = document.getElementById("stopBtn") as HTMLButtonElement;
const notepad = document.getElementById("notepad") as HTMLTextAreaElement;

// Append results to the notepad
recognition.onresult = (event: SpeechRecognitionEvent) => {
  const transcript = Array.from(event.results)
    .map((result) => result[0].transcript)
    .join("");
  notepad.value = transcript;
};

// Start recognition
startBtn.addEventListener("click", () => {
  recognition.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

// Stop recognition
stopBtn.addEventListener("click", () => {
  recognition.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

// Initialize button state
stopBtn.disabled = true;
