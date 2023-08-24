import { createContext, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useState } from 'react';
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload.name,
        role: action.payload.role,
        UserId: action.payload.UserId,
      };
    case 'LOGOUT':
      return { user: null, role: null, UserId: null };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    role: null,
    UserId: null,
  });
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    const userCookie = Cookies.get('Apollo-User');
    if (userCookie && userCookie !== 'undefined') {
      try {
        const user = JSON.parse(userCookie);
        dispatch({ type: 'LOGIN', payload: user });
      } catch (error) {
        console.error('Error parsing user cookie:', error);
      }
    }
    setIsLoading(false);
  }, []);

  console.log('AuthContext state:', state);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
