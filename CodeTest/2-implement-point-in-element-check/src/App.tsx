import React, { useEffect, useRef } from "react";
import { isPointInsideElement } from "./utils";

export default function App() {
  const boxRef = useRef<HTMLDivElement>(null);

  const [isInside, setIsInside] = React.useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const inside = boxRef.current
        ? isPointInsideElement(e.clientX, e.clientY, boxRef.current)
        : false;

      setIsInside(inside);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const inside = boxRef.current
        ? isPointInsideElement(e.clientX, e.clientY, boxRef.current)
        : false;

      console.log("Clicked inside box?", inside);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <div
        ref={boxRef}
        style={{
          width: "200px",
          height: "100px",
          background: "skyblue",
          border: "2px solid navy",
        }}
      >
        Click inside me!
      </div>
    </div>
  );
}
