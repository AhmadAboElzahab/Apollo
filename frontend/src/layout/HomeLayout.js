import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
export default function HomeLayout() {
  return (
    <div className='mx-auto flex flex-col justify-between'>
      <Navbar />

      <Outlet />
    </div>
  );
}
