import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { TaskContextProvider } from './context/TaskContext.tsx';
import './index.scss';
// import './styles/themes.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TaskContextProvider>
      <App />
    </TaskContextProvider>
  </React.StrictMode>
);
