import { Outlet } from 'react-router-dom';
import ShopNavbar from '../Components/ShopNavbar';

export default function ShopLayout() {
  return (
    <div className='text-white'>
      <ShopNavbar />
      <div className='p-2 lg:pl-72 '>
        <div className='mx-auto max-w-8xl pt-40 lg:pt-55   lg:py-20 space-y-8 px-2  lg:px-8 '>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
