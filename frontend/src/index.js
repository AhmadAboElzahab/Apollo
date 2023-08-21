import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { CartContextProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <App />
        <ToastContainer
          position='bottom-right'
          newestOnTop
          hideProgressBar
          rtl={false}
          autoClose={2000}
          draggable={false}
          theme='colored'
        />
      </CartContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
