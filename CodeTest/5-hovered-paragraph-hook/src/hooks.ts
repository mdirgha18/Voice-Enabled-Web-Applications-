import { useState, useRef, useEffect } from "react";

export function useHoveredParagraphCoordinate() {
  const [hovered, setHovered] = useState<{
    element: HTMLElement | null;
    rect: DOMRect | null;
  }>({
    element: null,
    rect: null,
  });

  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === "P") {
        const rect = target.getBoundingClientRect();
        setHovered({ element: target, rect });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // Delay so you can move into the button without flicker
      hoverTimeout.current = setTimeout(() => {
        setHovered({ element: null, rect: null });
      }, 200);
    };

    const paragraphs = document.querySelectorAll("p");
    paragraphs.forEach((p) => {
      p.addEventListener("mouseenter", handleMouseEnter);
      p.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      paragraphs.forEach((p) => {
        p.removeEventListener("mouseenter", handleMouseEnter);
        p.removeEventListener("mouseleave", handleMouseLeave);
      });
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);

  return hovered;
}
