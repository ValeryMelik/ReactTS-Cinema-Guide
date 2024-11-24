import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App/';

import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './API/_queryClient';

import { Provider } from 'react-redux';
import store from './store';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
