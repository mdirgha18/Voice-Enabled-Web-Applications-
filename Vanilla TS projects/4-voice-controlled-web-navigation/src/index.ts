const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
if (!SpeechRecognition) {
  alert("SpeechRecognition is not supported in this browser.");
}

const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const startBtn = document.getElementById("startBtn") as HTMLButtonElement;
const status = document.getElementById("status") as HTMLParagraphElement;

const navItems = {
  home: document.getElementById("nav-home") as HTMLLIElement,
  about: document.getElementById("nav-about") as HTMLLIElement,
  services: document.getElementById("nav-services") as HTMLLIElement,
  contact: document.getElementById("nav-contact") as HTMLLIElement,
};

const sections = {
  home: document.getElementById("home") as HTMLElement,
  about: document.getElementById("about") as HTMLElement,
  services: document.getElementById("services") as HTMLElement,
  contact: document.getElementById("contact") as HTMLElement,
};

function clearHighlights() {
  Object.values(navItems).forEach((item) => item.classList.remove("highlight"));
  Object.values(sections).forEach((section) =>
    section.classList.remove("active")
  );
}

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

function navigateTo(sectionKey: keyof typeof navItems) {
  clearHighlights();
  navItems[sectionKey].classList.add("highlight");
  sections[sectionKey].classList.add("active");
  speak(`Navigating to ${sectionKey}`);
  status.textContent = `Navigated to ${
    sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)
  }`;
}

startBtn.addEventListener("click", () => {
  recognition.start();
  status.textContent = "Listening...";
});

recognition.addEventListener("result", (event: SpeechRecognitionEvent) => {
  const transcript = event.results[0][0].transcript.toLowerCase().trim();
  status.textContent = `Heard: "${transcript}"`;

  // Basic command parsing
  if (transcript.includes("home")) {
    navigateTo("home");
  } else if (transcript.includes("about")) {
    navigateTo("about");
  } else if (transcript.includes("services")) {
    navigateTo("services");
  } else if (transcript.includes("contact")) {
    navigateTo("contact");
  } else {
    status.textContent = `Command not recognized: "${transcript}"`;
    speak("Sorry, I didn't understand that command.");
  }
});

recognition.addEventListener("end", () => {
  status.textContent += " (click Start Listening to speak again)";
});
