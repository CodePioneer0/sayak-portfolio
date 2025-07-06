import { useCallback } from "react";

export function useSmoothScroll() {
  const scrollTo = useCallback((targetId: string) => {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
      
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }, []);

  return scrollTo;
}
