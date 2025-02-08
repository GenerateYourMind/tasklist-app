import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { TaskContextProvider } from './context/TaskContext';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TaskContextProvider>
      <App />
    </TaskContextProvider>
  </React.StrictMode>
);
