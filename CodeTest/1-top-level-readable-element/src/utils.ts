// utils.ts
export function getTopLevelReadableElements(
  ignoreList: string[] = []
): HTMLElement[] {
  const body = document.body;
  const candidates: Set<HTMLElement> = new Set();

  function isInIgnoreList(el: HTMLElement): boolean {
    return ignoreList.some((selector) => el.matches(selector));
  }

  function hasVisibleText(el: HTMLElement): boolean {
    const text = el.textContent?.trim();
    const style = window.getComputedStyle(el);
    return !!text && style.display !== "none" && style.visibility !== "hidden";
  }

  function isWrappedInSingleChildContainers(el: HTMLElement): boolean {
    let parent = el.parentElement;
    while (parent && parent !== document.body) {
      if (parent.children.length === 1) {
        el = parent;
        parent = parent.parentElement;
      } else {
        break;
      }
    }
    return el !== el.parentElement;
  }

  function walk(el: HTMLElement) {
    for (const child of Array.from(el.children)) {
      const htmlEl = child as HTMLElement;

      if (isInIgnoreList(htmlEl)) continue;
      if (!hasVisibleText(htmlEl)) {
        walk(htmlEl);
        continue;
      }

      if (!isWrappedInSingleChildContainers(htmlEl)) {
        candidates.add(htmlEl);
      }

      walk(htmlEl);
    }
  }

  walk(body);

  const result: HTMLElement[] = Array.from(candidates).filter(
    (el) =>
      !Array.from(candidates).some(
        (other) => other !== el && other.contains(el)
      )
  );

  return result;
}
