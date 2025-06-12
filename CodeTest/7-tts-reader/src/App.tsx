import React from "react";
import { readTextAloud, pauseTTS, resumeTTS, cancelTTS } from "./readTextAloud";

const TTSControls = () => {
  return (
    <div>
      <button
        onClick={() =>
          readTextAloud("Hello! This is a test of the Web Speech API.")
        }
      >
        🔊 Read Aloud
      </button>
      <button onClick={pauseTTS}>⏸ Pause</button>
      <button onClick={resumeTTS}>▶ Resume</button>
      <button onClick={cancelTTS}>🛑 Cancel</button>
    </div>
  );
};

export default TTSControls;
