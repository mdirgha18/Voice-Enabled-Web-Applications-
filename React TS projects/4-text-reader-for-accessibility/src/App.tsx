import React from "react";
import "./styles.css";

const App: React.FC = () => {
  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const handleReadAll = () => {
    const content = document.getElementById("readable-content")?.innerText;
    if (content) speakText(content);
  };

  return (
    <div className="container">
      <h1>🗣️ Text Reader Accessibility Demo</h1>

      <button className="read-btn" onClick={handleReadAll}>
        🔊 Read Entire Page
      </button>

      <div id="readable-content" className="content">
        <p onClick={() => speakText("Welcome to our accessibility demo.")}>
          Welcome to our accessibility demo.
        </p>
        <p
          onClick={() =>
            speakText("Click any paragraph to hear it read aloud.")
          }
        >
          Click any paragraph to hear it read aloud.
        </p>
        <p
          onClick={() =>
            speakText(
              "This helps users with visual impairments access content more easily."
            )
          }
        >
          This helps users with visual impairments access content more easily.
        </p>
      </div>

      <p className="hint">
        💡 Try clicking a paragraph or press "Read Entire Page".
      </p>
    </div>
  );
};

export default App;
