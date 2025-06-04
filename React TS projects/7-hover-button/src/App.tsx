import React, { useState, useEffect, useRef } from "react";

const App: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [selectedParagraph, setSelectedParagraph] = useState<string>("");

  const buttonRef = useRef<HTMLButtonElement>(null);

  // Show the speak button when user selects text
  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Find the closest paragraph element containing the selection
        let node = selection.anchorNode;
        while (node && node.nodeName !== "P") {
          node = node.parentNode;
        }

        if (node && node.nodeName === "P") {
          setSelectedParagraph(node.textContent || "");
          setButtonPosition({
            top: rect.top + window.scrollY - 40, // above selection
            left: rect.left + window.scrollX,
          });
          setShowButton(true);
          return;
        }
      }
      setShowButton(false);
      setSelectedParagraph("");
    };

    document.addEventListener("mouseup", handleMouseUp);
    // Hide button on scroll or click outside
    document.addEventListener("scroll", () => setShowButton(false));
    document.addEventListener("mousedown", (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setShowButton(false);
      }
    });

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("scroll", () => setShowButton(false));
      document.removeEventListener("mousedown", () => setShowButton(false));
    };
  }, []);

  // Speech function to read the paragraph
  const speakParagraph = () => {
    if (!selectedParagraph) return;
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(selectedParagraph);
    window.speechSynthesis.speak(utterance);
    setShowButton(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 800, margin: "auto" }}>
      <h1>Hover Speak Button on Selected Text</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        imperdiet suscipit erat, in malesuada justo mattis eget.
      </p>
      <p>
        Curabitur at pulvinar orci, a tincidunt metus. Vivamus volutpat lectus
        at vehicula condimentum.
      </p>
      <p>
        Sed egestas erat in nibh dictum, nec pretium erat sagittis. Donec
        vulputate risus sed leo dapibus, sed vehicula turpis facilisis.
      </p>

      {showButton && (
        <button
          ref={buttonRef}
          onClick={speakParagraph}
          style={{
            position: "absolute",
            top: buttonPosition.top,
            left: buttonPosition.left,
            zIndex: 1000,
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "6px 10px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          🔊 Speak
        </button>
      )}
    </div>
  );
};

export default App;
