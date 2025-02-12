import { FC, MouseEvent, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import { useLockBodyScroll } from '@hooks/useLockBodyScroll';

// Use prop title for both simple and complex content.
// Use prop message for simple text content.
// Use prop children for complex content like forms and so on.
interface ModalProps {
  onClose: () => void;
  title?: string;
  message?: string;
  children?: ReactNode;
}

const portal = document.getElementById('portal')!;

const Modal: FC<ModalProps> = ({ onClose, title, message, children }) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (backdropRef.current === (event.target as HTMLElement)) {
      onClose();
    }
  };

  return createPortal(
    <div className="backdrop" ref={backdropRef} onClick={handleBackdropClick}>
      <div className="modal">
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button
            className="modal-close-btn"
            aria-label="Close"
            onClick={onClose}
          >
            <MdClose />
          </button>
        </div>
        <div className="modal-content">
          {message && <p className="modal-message">{message}</p>}
          {children}
        </div>
      </div>
    </div>,
    portal
  );
};

export default Modal;
