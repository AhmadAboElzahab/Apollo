import React, { createContext, useEffect, useReducer } from 'react';

export const CartContext = createContext();

export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return {
        Cart: action.payload,
      };
    case 'ADD':
      const updatedCart = state.Cart.map((item) => {
        if (item.name === action.payload.name) {
          return {
            ...item,
            quantity: item.quantity + action.payload.quantity,
          };
        }
        return item;
      });

      const existingDish = state.Cart.find((item) => item.name === action.payload.name);
      if (existingDish) {
        const newState = {
          ...state,
          Cart: updatedCart,
        };

        localStorage.setItem('cart', JSON.stringify(newState.Cart));
        return newState;
      }

      const newState = {
        ...state,
        Cart: [...state.Cart, action.payload],
      };

      localStorage.setItem('cart', JSON.stringify(newState.Cart));
      return newState;
    case 'UPDATE_COUNT':
      const updatedCartCount = state.Cart.map((item) => {
        if (item.name === action.payload.name) {
          return {
            ...item,
            quantity: action.payload.quantity,
          };
        }
        return item;
      });

      localStorage.setItem('cart', JSON.stringify(updatedCartCount));
      return {
        Cart: updatedCartCount,
      };
    case 'DELETE_ITEM':
      const updatedCartAfterDelete = state.Cart.filter((item) => item.name !== action.payload.name);

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

  return <CartContext.Provider value={{ ...state, dispatch }}>{children}</CartContext.Provider>;
};
