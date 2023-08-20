import { NavLink } from 'react-router-dom';
import { TbError404 } from 'react-icons/tb';
export default function ErrorPage() {
  return (
    <div className='text-2xl  text-white w-screen h-screen flex flex-col items-center justify-center'>
      <TbError404 size={300} />
      <h1>404 - Page not found</h1>
      <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
      <NavLink end to='/' className='underline'>
        Go back to home
      </NavLink>
    </div>
  );
}
