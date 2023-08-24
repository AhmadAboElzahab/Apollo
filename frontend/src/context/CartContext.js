import React, { createContext, useEffect, useReducer, useState } from 'react';

export const CartContext = createContext();

export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return {
        Cart: action.payload,
      };
    case 'ADD':
      const existingItem = state.Cart.find((item) => item.id === action.payload.id);

      if (existingItem) {
        return state;
      }

      const newState = {
        ...state,
        Cart: [...state.Cart, action.payload],
      };

      localStorage.setItem('cart', JSON.stringify(newState.Cart));
      return newState;

    case 'DELETE':
      const updatedCartAfterDelete = state.Cart.filter((item) => item.id !== action.payload.id);

      localStorage.setItem('cart', JSON.stringify(updatedCartAfterDelete));
      return {
        Cart: updatedCartAfterDelete,
      };

    case 'CLEAR':
      localStorage.removeItem('cart');
      return {
        Cart: [],
      };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, {
    Cart: [],
  });

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      dispatch({ type: 'SET', payload: JSON.parse(storedCart) });
    }
  }, []);
  const [open, setOpen] = useState(false);

  const calculateTotalPrice = () => {
    const totalPrice = state.Cart.reduce((total, item) => {
      return total + item.price;
    }, 0);
    return totalPrice;
  };
  const openCart = () => {
    setOpen(true);
  };

  const closeCart = () => {
    setOpen(false);
  };
  return (
    <CartContext.Provider
      value={{ ...state, open, openCart, closeCart, dispatch, calculateTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
