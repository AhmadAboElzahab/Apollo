import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload.name, role: action.payload.role };
    case 'LOGOUT':
      return { user: null, role: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    role: null,
  });

  useEffect(() => {
    const userData = sessionStorage.getItem('userData');

    if (userData) {
      const { user, role } = JSON.parse(userData);
      dispatch({ type: 'LOGIN', payload: { user, role } });
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('userData', JSON.stringify({ user: state.user, role: state.role }));
  }, [state.user, state.role]);

  console.log('AuthContext state:', state);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
