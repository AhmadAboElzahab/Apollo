import { useState } from 'react';
import { useLogin } from '../Hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form className='w-full max-w-xs mx-auto mt-8' onSubmit={handleSubmit}>
      <h3 className='text-2xl font-semibold mb-4 text-white'>Log In</h3>

      <label className='block mb-2 text-white'>Email address:</label>
      <input
        className='w-full border rounded py-2 px-3 mb-4'
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label className='block mb-2 text-white'>Password:</label>
      <input
        className='w-full border rounded py-2 px-3 mb-4'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button
        className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded focus:outline-none'
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Log in'}
      </button>

      {error && <div className='text-red-500 mt-2'>{error}</div>}
    </form>
  );
};

export default Login;
