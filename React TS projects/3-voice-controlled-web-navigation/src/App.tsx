import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./styles.css";

type PageProps = { title: string };

const Page: React.FC<PageProps> = ({ title }) => (
  <div className="page">
    <h2>{title}</h2>
  </div>
);

const VoiceNavigator: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[event.results.length - 1][0].transcript
        .toLowerCase()
        .trim();
      console.log("Heard:", transcript);

      if (transcript.includes("home")) navigate("/");
      else if (transcript.includes("about")) navigate("/about");
      else if (transcript.includes("contact")) navigate("/contact");
    };

    recognition.onerror = (e) => console.error("Speech error", e);

    recognition.start();

    return () => recognition.stop();
  }, [navigate]);

  return (
    <p className="voice-hint">
      🎤 Say: "Go to home", "Open about", "Contact page"
    </p>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <h1>🎙️ Voice Navigation</h1>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <VoiceNavigator />

        <Routes>
          <Route path="/" element={<Page title="🏠 Home Page" />} />
          <Route path="/about" element={<Page title="ℹ️ About Page" />} />
          <Route path="/contact" element={<Page title="📞 Contact Page" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
