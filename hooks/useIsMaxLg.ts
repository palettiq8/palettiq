import { useEffect, useState } from "react";

export function useIsMaxLg() {
  const [isMaxLg, setIsMaxLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMaxLg(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMaxLg(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMaxLg;
}
