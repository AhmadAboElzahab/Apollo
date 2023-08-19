import { Outlet } from 'react-router-dom';
import ShopNavbar from '../Components/ShopNavbar';
import ShopHeader from '../Components/ShopHeader';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function ShopLayout() {
  return (
    <nav className='bg-black fixed top-16 lg:top-20 pt-2 border-r border-gray-900 w-screen lg:w-[30vh]'>
      <div className='mx-auto flex items-center justify-between '>
        <input
          type='text'
          placeholder='Search'
          className='px-2 py-3 bg-black mx-3 w-full text-white border-gray-900 rounded outline-none focus:ring-0 '
        />
        <label
          htmlFor='shopHamburger'
          className='peer-checked:shopHamburger relative z-10  block cursor-pointer lg:hidden text-white text-center'
        >
          <BsThreeDotsVertical size={30} className='mr-4' />
        </label>
      </div>
      <input
        type='checkbox'
        name='shopHamburger'
        id='shopHamburger'
        className='peer invisible'
        hidden
      />

      <div className='peer-checked:block hidden  lg:block lg:h-full'>
        <div className='h-screen flex flex-col px-3 p-5'>
          <a href='#' className='text-white'>
            Home
          </a>
          <a href='#' className='text-white'>
            About
          </a>
          <a href='#' className='text-white'>
            Services
          </a>
          <a href='#' className='text-white'>
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
