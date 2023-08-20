import React from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

export default function Logout({ type }) {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    const response = await fetch('/api/auth/logout');
    if (response.ok) {
      dispatch({ type: 'LOGOUT' });

      document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      navigate('/');
    } else {
    }
  };

  return (
    <>
      {type === 'admin' ? (
        <p onClick={logout} className='link_style cursor-pointer'>
          Log out
        </p>
      ) : (
        <p
          onClick={logout}
          className='group relative  cursor-pointer before:inset-x-0 before:bottom-0 '
        >
          <span className='relative text-white text-xl'>Log out</span>
        </p>
      )}
    </>
  );
}
