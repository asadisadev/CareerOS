import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './lib/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './app';
import './styles.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);