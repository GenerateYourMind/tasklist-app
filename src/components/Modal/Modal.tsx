import { FC, MouseEvent, ReactNode, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FocusTrap } from 'focus-trap-react';
import { MdClose } from 'react-icons/md';
import { portal } from '@utils/portal';
import { useLockBodyScroll } from '@hooks/useLockBodyScroll';
import styles from './Modal.module.scss';

// Use prop title for both simple and complex content.
// Use prop message for simple text content.
// Use prop children for complex content like forms and so on.
interface ModalProps {
  onClose: () => void;
  title?: string;
  message?: string;
  children?: ReactNode;
}

const Modal: FC<ModalProps> = ({ onClose, title, message, children }) => {
  const titleId = useId();
  const messageId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const mouseDownTargetRef = useRef<EventTarget | null>(null);

  useLockBodyScroll();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>): void => {
    mouseDownTargetRef.current = event.target;
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>): void => {
    const isBackdropClick =
      mouseDownTargetRef.current === event.currentTarget &&
      event.target === event.currentTarget;

    if (isBackdropClick) {
      onClose();
    }
  };

  return createPortal(
    <FocusTrap
      focusTrapOptions={{
        escapeDeactivates: false,
        initialFocus: () => modalRef.current,
        returnFocusOnDeactivate: true,
      }}
    >
      <div
        className={styles.backdrop}
        onMouseDown={handleBackdropMouseDown}
        onClick={handleBackdropClick}
      >
        <div
          className={styles.modal}
          ref={modalRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={message ? messageId : undefined}
        >
          <div className={styles.header}>
            {title && (
              <h2 className={styles.title} id={titleId}>
                {title}
              </h2>
            )}
            <button
              className={styles.closeButton}
              aria-label="Close"
              onClick={onClose}
            >
              <MdClose />
            </button>
          </div>

          <div className={styles.content}>
            {message && (
              <p className={styles.message} id={messageId}>
                {message}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </FocusTrap>,
    portal
  );
};

export default Modal;
