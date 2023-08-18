import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';

export default function () {
  return (
    <div className='text-white h-screen'>
      <Navbar />
      <Outlet />
    </div>
  );
}
