import React, { useState } from "react";

const DictionaryApp: React.FC = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDefinition = async () => {
    if (!word.trim()) return;

    setLoading(true);
    setError("");
    setDefinition("");

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) throw new Error("Word not found");
      const data = await response.json();
      const meaning = data[0]?.meanings[0]?.definitions[0]?.definition;
      if (meaning) {
        setDefinition(meaning);
      } else {
        setError("Definition not available.");
      }
    } catch (err) {
      setError("Failed to fetch definition.");
    } finally {
      setLoading(false);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.cancel(); // Stop any ongoing speech
    speechSynthesis.speak(utterance);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📖 Text-to-Speech Dictionary</h2>
      <input
        type="text"
        placeholder="Enter a word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        style={styles.input}
      />
      <button onClick={fetchDefinition} style={styles.button}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {definition && (
        <div style={styles.result}>
          <h3>{word}</h3>
          <p>{definition}</p>
          <button onClick={() => speak(word)} style={styles.speakBtn}>
            🔊 Speak Word
          </button>
          <button onClick={() => speak(definition)} style={styles.speakBtn}>
            📢 Speak Definition
          </button>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  result: {
    backgroundColor: "#f9f9f9",
    padding: "16px",
    borderRadius: "6px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  speakBtn: {
    marginTop: "10px",
    marginRight: "10px",
    padding: "8px 14px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#10b981",
    color: "white",
    cursor: "pointer",
  },
  error: {
    color: "#ef4444",
  },
};

export default DictionaryApp;
