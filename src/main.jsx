import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App.jsx';
import { enText, mlText } from './lang';
import ConfigProvider from './context/ConfigContext';
import { AuthProvider } from './context/authContext.jsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: enText,
    },
    ml: {
      translation: mlText,
    },
  },
  lng: JSON.parse(localStorage.getItem('lng')) || 'en',
  interpolation: {
    escapeValue: false,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ConfigProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
);
