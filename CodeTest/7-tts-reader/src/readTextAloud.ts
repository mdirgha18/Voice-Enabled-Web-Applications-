// readTextAloud.ts

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function readTextAloud(text: string) {
  // Cancel current speech if speaking
  window.speechSynthesis.cancel();

  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = "en-US";

  // Optionally handle end/cancel events
  currentUtterance.onend = () => {
    currentUtterance = null;
  };
  currentUtterance.onerror = (e) => {
    console.error("TTS error:", e.error);
    currentUtterance = null;
  };

  window.speechSynthesis.speak(currentUtterance);
}

export function pauseTTS() {
  if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
    window.speechSynthesis.pause();
  }
}

export function resumeTTS() {
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
}

export function cancelTTS() {
  window.speechSynthesis.cancel();
  currentUtterance = null;
}
