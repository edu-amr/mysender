import { useEffect, useState } from "react";

export function useMedia(mobileWidth: number) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${mobileWidth - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < mobileWidth);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < mobileWidth);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
