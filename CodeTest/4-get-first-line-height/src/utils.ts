export function getLineHeightOfFirstLine(element: HTMLElement): number {
  if (!element || !element.firstChild) return 0;

  const range = document.createRange();
  const firstTextNode = element.firstChild;

  range.setStart(firstTextNode, 0);
  range.setEnd(firstTextNode, 1);

  const rects = range.getClientRects();
  if (!rects || rects.length === 0) return 0;

  return rects[0].height;
}
