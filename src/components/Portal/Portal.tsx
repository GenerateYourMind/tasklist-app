import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  targetId?: string;
}

const Portal: FC<PortalProps> = ({ children, targetId = 'portal' }) => {
  const targetElement = document.getElementById(targetId);

  if (!targetElement) {
    console.error(`[Portal]: Target element "#${targetId}" was not found.`);
    return null;
  }

  return createPortal(children, targetElement);
};

export default Portal;
