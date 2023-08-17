import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
export default function HomeLayout() {
  return (
    <div className='background'>
      <pre></pre>
      <pre></pre>
      <pre></pre>

      <div className='mx-auto w-screen h-screen flex flex-col justify-between'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}