import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './i18n';
import AppRoutes from './routes/AppRoutes';
import { AppProvider } from './Context';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </React.StrictMode>
  );
} else {
  console.error("Elemento 'root' não encontrado no documento.");
}