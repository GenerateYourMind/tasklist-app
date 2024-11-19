import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { TodoContextProvider } from './context/TodoContext.tsx';
import './index.scss';
// import './styles/themes.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </React.StrictMode>
);
