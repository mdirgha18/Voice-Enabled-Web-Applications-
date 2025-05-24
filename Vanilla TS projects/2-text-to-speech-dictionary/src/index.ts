const wordInput = document.getElementById("wordInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
const speakBtn = document.getElementById("speakBtn") as HTMLButtonElement;
const definitionArea = document.getElementById(
  "definitionArea"
) as HTMLDivElement;

searchBtn.addEventListener("click", async () => {
  const word = wordInput.value.trim();
  if (!word) {
    definitionArea.textContent = "Please enter a word.";
    speakBtn.disabled = true;
    return;
  }

  definitionArea.textContent = "Searching...";

  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!res.ok) throw new Error("Definition not found");

    const data = await res.json();
    const definitions = data[0]?.meanings[0]?.definitions[0]?.definition;

    if (definitions) {
      definitionArea.innerHTML = `<strong>${word}</strong>: ${definitions}`;
      speakBtn.disabled = false;
    } else {
      definitionArea.textContent = "No definition found.";
      speakBtn.disabled = true;
    }
  } catch (err) {
    definitionArea.textContent = "Error retrieving definition.";
    speakBtn.disabled = true;
  }
});

speakBtn.addEventListener("click", () => {
  const word = wordInput.value.trim();
  if (!word) return;

  const utterance = new SpeechSynthesisUtterance(word);
  speechSynthesis.speak(utterance);
});
