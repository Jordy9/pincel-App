import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { PincelApp } from './Pincel-App';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode></React.StrictMode>
    <Provider store={store}>
      <PincelApp />
    </Provider>
);