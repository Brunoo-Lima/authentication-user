import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './global.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* <Providers> */}
        <App />
        {/* </Providers> */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
