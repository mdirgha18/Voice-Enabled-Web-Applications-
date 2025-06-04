// TextToSpeechNotepad.tsx
import React, { useState } from "react";

const TextToSpeechNotepad: React.FC = () => {
  const [text, setText] = useState<string>("");

  const handleSpeak = () => {
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🗣️ Text-to-Speech Notepad</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something here..."
        style={styles.textarea}
      />
      <div>
        <button onClick={handleSpeak} style={styles.button}>
          🔊 Speak
        </button>
        <button
          onClick={handleStop}
          style={{ ...styles.button, backgroundColor: "#ef4444" }}
        >
          🛑 Stop
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "30px",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "sans-serif",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "16px",
  },
  textarea: {
    width: "100%",
    height: "200px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "16px",
  },
  button: {
    padding: "10px 20px",
    marginRight: "10px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default TextToSpeechNotepad;
