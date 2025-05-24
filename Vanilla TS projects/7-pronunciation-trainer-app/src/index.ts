const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Dictionary of 20 complex words
const dictionary = [
  "synecdoche",
  "onomatopoeia",
  "concatenate",
  "quixotic",
  "anachronistic",
  "ephemeral",
  "serendipity",
  "paradigm",
  "ubiquitous",
  "antediluvian",
  "convoluted",
  "juxtaposition",
  "idiosyncrasy",
  "labyrinthine",
  "magnanimous",
  "soliloquy",
  "plethora",
  "gregarious",
  "perfunctory",
  "vociferous",
];

let currentWord = "";

const targetPhraseElement = document.getElementById("target-phrase")!;
const listenBtn = document.getElementById("listen-btn") as HTMLButtonElement;
const repeatBtn = document.getElementById("repeat-btn") as HTMLButtonElement;
const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;
const userSaidSpan = document.querySelector("#user-said span")!;
const confidenceSpan = document.querySelector("#confidence span")!;

// Load new random word
function setNewWord() {
  const randomIndex = Math.floor(Math.random() * dictionary.length);
  currentWord = dictionary[randomIndex];
  targetPhraseElement.textContent = currentWord;
  userSaidSpan.textContent = "-";
  confidenceSpan.textContent = "--%";
  confidenceSpan.className = "";
}
setNewWord(); // Initialize

listenBtn.addEventListener("click", () => {
  const utterance = new SpeechSynthesisUtterance(currentWord);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
});

repeatBtn.addEventListener("click", () => {
  recognition.start();
});

nextBtn.addEventListener("click", () => {
  setNewWord();
});

recognition.addEventListener("result", (event: SpeechRecognitionEvent) => {
  const userSpeech = event.results[0][0].transcript.toLowerCase();
  const confidence = calculateSimilarity(userSpeech, currentWord.toLowerCase());

  userSaidSpan.textContent = userSpeech;
  confidenceSpan.textContent = `${confidence}%`;

  if (confidence >= 80) {
    confidenceSpan.className = "high";
  } else if (confidence >= 50) {
    confidenceSpan.className = "medium";
  } else {
    confidenceSpan.className = "low";
  }
});

// Simple similarity score
function calculateSimilarity(s1: string, s2: string): number {
  const match = s1 === s2;
  return match
    ? 100
    : Math.round(
        100 - (levenshtein(s1, s2) / Math.max(s1.length, s2.length)) * 100
      );
}

// Basic Levenshtein distance for string similarity
function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}
