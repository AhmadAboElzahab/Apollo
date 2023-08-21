import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw Error('useCartHook must be used inside an CartContext');
  }

  return context;
};
