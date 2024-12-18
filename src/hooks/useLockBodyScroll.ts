import { useEffect } from 'react';

export const useLockBodyScroll = (): void => {
  useEffect(() => {
    const scrollbarWidth: number =
      window.innerWidth - document.documentElement.clientWidth;
    const bodyStyle = document.body.style;

    bodyStyle.overflow = 'hidden';
    bodyStyle.paddingRight = `${scrollbarWidth}px`;

    return () => {
      bodyStyle.overflow = '';
      bodyStyle.paddingRight = '';
    };
  }, []);
};
