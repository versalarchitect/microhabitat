import { useCallback } from "react";

interface UseSmoothScrollOptions {
  yOffset?: number;
}

export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const { yOffset = -80 } = options;

  const scrollToElement = useCallback(
    (elementId: string) => {
      const section = document.getElementById(elementId);
      if (!section) return;

      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [yOffset]
  );

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      if (!href) return;

      const targetId = href.startsWith("#") ? href.substring(1) : href;
      scrollToElement(targetId);
    },
    [scrollToElement]
  );

  return { scrollToElement, handleAnchorClick };
}
