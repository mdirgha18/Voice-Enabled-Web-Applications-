import React, { useEffect, useRef } from "react";
import { getLineHeightOfFirstLine } from "./utils";

export default function App() {
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (paraRef.current) {
      const height = getLineHeightOfFirstLine(paraRef.current);
      console.log("First line height:", height);
    }
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <p ref={paraRef} style={{ fontSize: "18px", lineHeight: "1.5" }}>
        This is the first line. <br />
        This is the second line.
      </p>
    </div>
  );
}
