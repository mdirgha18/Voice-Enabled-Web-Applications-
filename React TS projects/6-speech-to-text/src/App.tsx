import React, { useState, useEffect, useRef } from "react";

const SpeechToTextNotes: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition API is not supported in this browser.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setTranscript(finalTranscript + interimTranscript);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsListening(false);
  };

  const saveNote = () => {
    if (transcript.trim().length === 0) return;
    setSavedNotes((prev) => [...prev, transcript.trim()]);
    setTranscript("");
  };

  const clearNotes = () => {
    setSavedNotes([]);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
      }}
    >
      <h1>Speech-to-Text Notes</h1>

      <div style={{ marginBottom: 10 }}>
        {!isListening && (
          <button onClick={startListening} style={{ marginRight: 10 }}>
            🎤 Start Listening
          </button>
        )}
        {isListening && (
          <button
            onClick={stopListening}
            style={{ marginRight: 10, color: "red" }}
          >
            ⏹ Stop Listening
          </button>
        )}
        <button onClick={saveNote} disabled={transcript.trim().length === 0}>
          💾 Save Note
        </button>
      </div>

      <textarea
        style={{ width: "100%", height: 100, padding: 10, fontSize: 16 }}
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Your speech will appear here..."
      />

      <hr style={{ margin: "20px 0" }} />

      <h2>Saved Notes</h2>
      {savedNotes.length === 0 && <p>No notes saved yet.</p>}
      <ul>
        {savedNotes.map((note, index) => (
          <li key={index} style={{ marginBottom: 10, whiteSpace: "pre-wrap" }}>
            {note}
          </li>
        ))}
      </ul>

      {savedNotes.length > 0 && (
        <button onClick={clearNotes} style={{ marginTop: 10, color: "red" }}>
          🗑️ Clear All Notes
        </button>
      )}
    </div>
  );
};

export default SpeechToTextNotes;
