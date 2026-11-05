import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import setupStore from './redux/store';
import routerFuture from './routerFuture';
import './index.css';

const store = setupStore();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter future={routerFuture}>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);
