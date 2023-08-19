import { Outlet } from 'react-router-dom';
import ShopNavbar from '../Components/ShopNavbar';
import ShopHeader from '../Components/ShopHeader';

export default function () {
  return (
    <nav className='bg-black fixed top-16 lg:top-20 py-5 border-r border-gray-900 w-screen lg:w-[30vh]'>
      <div className='mx-auto flex items-center justify-between '>
        <input
          type='text'
          placeholder='Search'
          className='px-2 py-3 bg-black mx-3 w-full text-white border-gray-900 rounded outline-none focus:ring-0 '
        />

        <button className='text-white lg:hidden mr-5'>
          <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16m-4 6h4'
            ></path>
          </svg>
        </button>
      </div>
      <div className='md:block lg:block lg:h-full' >
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
