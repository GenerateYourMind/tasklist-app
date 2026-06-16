import { useEffect } from 'react';

export const useWindowResize = (onResize: () => void, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [onResize, enabled]);
};
