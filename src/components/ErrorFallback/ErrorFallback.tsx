import { FC } from 'react';
import { FallbackProps, getErrorMessage } from 'react-error-boundary';
import styles from './ErrorFallback.module.scss';

const ErrorFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className={styles.errorFallback}>
      <div className={styles.content} role="alert">
        <h1 className={styles.title}>Something went wrong:</h1>
        <p className={styles.message}>
          {getErrorMessage(error) || 'An unexpected error occurred.'}
        </p>
        <button className={styles.retryButton} onClick={resetErrorBoundary}>
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
