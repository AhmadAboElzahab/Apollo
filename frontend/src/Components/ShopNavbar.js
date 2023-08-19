import { BsThreeDotsVertical, BsSoundwave } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function ShopNavbar() {
  return (
    <nav className='bg-black/20 fixed top-[60px] lg:top-20  py-2 lg:border-r lg:backdrop-blur-0 backdrop-blur-sm border-b border-gray-900 w-screen lg:w-[30vh]'>
      <div className='mx-auto flex items-center justify-between '>
        <div className='relative  w-full px-2 '>
          <div className='absolute inset-y-0 left-6 flex items-center  pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500 '
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>

          <input
            type='text'
            placeholder='Search'
            className='block w-full pl-10  py-3 bg-black  text-white border-gray-900 rounded'
          />
        </div>
        <label
          htmlFor='shopHamburger'
          className='peer-checked:shopHamburger relative z-10  block cursor-pointer lg:hidden text-white text-center'
        >
          <BsThreeDotsVertical size={30} className='mr-4 text-gray-800 hover:text-white' />
        </label>
      </div>
      <input
        type='checkbox'
        name='shopHamburger'
        id='shopHamburger'
        className='peer invisible absolute'
        hidden
      />

      <div className='peer-checked:block hidden lg:block lg:h-full'>
        <div className='h-screen  px-3 p-5'>
          <ul className='text-gray-500 font-light ml-4 '>
            <li className='text-3xl mb-5 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-yellow-200'>
              Artwork
            </li>

            <li>
              <Link>BsSoundwave</Link>
            </li>
            <li>
              <Link>BsSoundwave</Link>
            </li>
            <li>
              <Link>BsSoundwave</Link>
            </li>
            <li>
              <Link>BsSoundwave</Link>
            </li>
            <li className='text-3xl text-transparent my-5 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500'>
              Beats
            </li>
            <li>
              <Link>BsSoundwave</Link>
            </li>
            <li>
              <Link>BsSoundwave</Link>
            </li>
            <li className='text-3xl my-5 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500'>
              Lyrics
            </li>
            <li>
              <Link>BsSoundwave</Link>
            </li>
            <li>
              <Link>BsSoundwave</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
