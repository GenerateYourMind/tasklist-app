import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import App from './components/App';
import { TaskContextProvider } from './context/TaskContext';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <TaskContextProvider>
        <App />
      </TaskContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
