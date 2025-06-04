import React, { useState, useRef } from "react";

const wordsToPractice = [
  "hello",
  "pronunciation",
  "accessibility",
  "react",
  "typescript",
  "communication",
];

const PronunciationTrainer: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [recording, setRecording] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  // Play the correct pronunciation using Web Speech API
  const playCorrectPronunciation = () => {
    const utterance = new SpeechSynthesisUtterance(
      wordsToPractice[currentWordIndex]
    );
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support audio recording");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        setRecording(audioBlob);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      alert("Failed to access microphone: " + error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const playRecording = () => {
    if (!recording) return;
    const url = URL.createObjectURL(recording);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.src = url;
      audioPlayerRef.current.play();
    }
  };

  const nextWord = () => {
    setRecording(null);
    setCurrentWordIndex((prev) => (prev + 1) % wordsToPractice.length);
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
      <h1>Pronunciation Trainer</h1>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        {wordsToPractice[currentWordIndex]}
      </p>

      <button onClick={playCorrectPronunciation}>
        ▶️ Play Correct Pronunciation
      </button>

      <div style={{ marginTop: 20 }}>
        {!isRecording && (
          <button onClick={startRecording} style={{ marginRight: 10 }}>
            🎙️ Start Recording
          </button>
        )}
        {isRecording && (
          <button
            onClick={stopRecording}
            style={{ marginRight: 10, color: "red" }}
          >
            ⏹ Stop Recording
          </button>
        )}
        <button onClick={playRecording} disabled={!recording}>
          🔊 Play Your Recording
        </button>
      </div>

      <audio ref={audioPlayerRef} hidden />

      <div style={{ marginTop: 30 }}>
        <button onClick={nextWord}>Next Word</button>
      </div>
    </div>
  );
};

export default PronunciationTrainer;
