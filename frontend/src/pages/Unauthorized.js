import { NavLink } from 'react-router-dom';
import { AiOutlineStop } from 'react-icons/ai';
export default function Unauthorized() {
  return (
    <div className='text-2xl  text-white w-screen h-screen flex flex-col items-center justify-center'>
      <AiOutlineStop size={300} />
      <h1>401 - Unauthorized</h1>
      <p>You Need to be Authorized to Have Access to this Page</p>
      <NavLink end to='/' className='underline'>
        Go back to home
      </NavLink>
    </div>
  );
}
