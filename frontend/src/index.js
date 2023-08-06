import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer
      position='bottom-right'
      newestOnTop
      hideProgressBar
      rtl={false}
      autoClose={2000}
      draggable={false}
      theme='colored'
    />
    <App />
  </React.StrictMode>,
);
