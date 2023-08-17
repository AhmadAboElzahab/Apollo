import { useState } from 'react';
import { useLogin } from '../Hooks/useLogin';
import logo from '../assets/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className='h-screen w-screen rounded-lg flex items-center lg:z-[99]  justify-center'>
      <form className=' w-80 mt-8 mx-auto ' onSubmit={handleSubmit}>
        <img src={logo} alt='logo' className='w-[200px] mx-auto mb-10  wobble' />

        <label className='block mb-2 text-white'>Email address:</label>
        <input
          className='w-full border bg-glitch-white rounded py-2 px-3 mb-4'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label className='block mb-2 text-white'>Password:</label>
        <input
          className='w-full border bg-glitch-white rounded py-2 px-3 mb-4'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button
          className='w-full bg-zinc-800 lg:bg-black border-b-2 border-b-glitch-pink  text-white py-2 rounded focus:outline-none'
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>

        {error && <div className='text-red-500 mt-2'>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
