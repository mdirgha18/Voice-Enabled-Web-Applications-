export function isPointInsideElement(
  x: number,
  y: number,
  element: HTMLElement
): boolean {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}
