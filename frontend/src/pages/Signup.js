import { useState } from 'react';
import { useSignup } from '../Hooks/useSignup';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signup, error, isLoading, message } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message) {
      toast.success('Good To Have You Please Head to log in page');
      setEmail('');
      setName('');
      setPassword('');
    }

    await signup(email, password, name);
  };

  return (
    <div className=' rounded-lg flex items-center mt-[10%]  justify-center'>
      <form className=' w-80 mt-8 mx-auto ' onSubmit={handleSubmit}>
        <img src={logo} alt='logo' className='w-[200px] mx-auto mb-10  wobble' />

        <label className='block mb-2 text-glitch-white'>Name :</label>
        <input
          className='w-full border bg-glitch-white rounded py-2 px-3 mb-4'
          type='txt'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label className='block mb-2 text-glitch-white'>Email address:</label>
        <input
          className='w-full border bg-glitch-white rounded py-2 px-3 mb-4'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label className='block mb-2 text-glitch-white'>Password:</label>
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
          Sign up
        </button>

        <div className='text-red-500 mt-2 h-20'> {error && error}</div>
      </form>
    </div>
  );
};
export default Signup;
