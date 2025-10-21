import { useState, useEffect, useMemo } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
} as const;

export const useBreakpoints = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  const updateWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const isSm = useMemo(() => windowWidth >= breakpoints.sm, [windowWidth]);
  const isMd = useMemo(() => windowWidth >= breakpoints.md, [windowWidth]);
  const isLg = useMemo(() => windowWidth >= breakpoints.lg, [windowWidth]);

  return {
    windowWidth,
    isSm,
    isMd,
    isLg,
  };
};
