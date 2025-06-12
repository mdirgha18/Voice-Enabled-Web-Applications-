import React, { useEffect } from "react";
import { getTopLevelReadableElements } from "./utils";

export default function App() {
  useEffect(() => {
    const elements = getTopLevelReadableElements(["#ignore", "nav"]);
    console.log("Top-level readable elements:", elements);
  }, []);

  return (
    <div>
      <h1>Visible Title</h1>
      <p>This is a paragraph that should be detected ✅</p>

      <div>
        <blockquote>This is wrapped text</blockquote>
      </div>

      <div id="ignore">
        <p>This paragraph should be ignored ❌</p>
      </div>
    </div>
  );
}
