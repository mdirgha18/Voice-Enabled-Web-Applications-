import React from "react";
import { useHoveredParagraphCoordinate } from "./hooks";

export default function App() {
  const { element, rect } = useHoveredParagraphCoordinate();

  return (
    <div style={{ padding: "2rem" }}>
      <p>This is the first paragraph.</p>
      <p>This is the second paragraph.</p>
      <p>This is the third paragraph.</p>

      {rect && (
        <div
          style={{
            position: "absolute",
            left: rect.right + 8,
            top: rect.top,
            background: "#333",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
          onMouseEnter={() => {
            // Optional: prevent flicker
          }}
          onMouseLeave={() => {
            // Optional: hide on leave
          }}
        >
          ▶ Play
        </div>
      )}
    </div>
  );
}
