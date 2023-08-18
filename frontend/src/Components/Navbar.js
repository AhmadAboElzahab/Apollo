import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
export default function Navbar() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div
      className={`sticky top-0 z-50 overflow-hidden  ${
        scrolling ? 'backdrop-filter backdrop-blur border-b border-gray-800' : ''
      } text-white`}
    >
      <header>
        <div className='relative '>
          <div className='px-6 lg:container md:px-12 lg:mx-auto lg:px-6 lg:py-4'>
            <div className='flex items-center justify-between'>
              <div className='relative z-30 '>
                <div className='glitch z-10' data-text='Apollo'>
                  Apollo
                </div>
              </div>

              <div className='flex items-center justify-end '>
                <input
                  type='checkbox'
                  name='hamburger'
                  id='hamburger'
                  className='peer invisible'
                  hidden
                />
                <label
                  htmlFor='hamburger'
                  className='peer-checked:hamburger relative z-10 -mr-6 block cursor-pointer p-6 lg:hidden'
                >
                  <div
                    aria-hidden='true'
                    className='m-auto h-0.5 w-6 rounded bg-glitch-white transition duration-300'
                  ></div>
                  <div
                    aria-hidden='true'
                    className='m-auto mt-2 h-0.5 w-6 rounded bg-glitch-white transition duration-300'
                  ></div>
                </label>

                <div className='fixed inset-0 w-h translate-x-[-100%]  backdrop-blur-xl bg-black/50 lg:backdrop-blur-0 lg:bg-transparent	  transition duration-300 peer-checked:translate-x-0 lg:static lg:w-auto lg:translate-x-0 lg:border-r-0 '>
                  <div className='flex h-full flex-col justify-between lg:flex-row lg:items-center'>
                    <ul className='space-y-8 px-6 pt-32  md:px-12 lg:flex lg:space-x-4 lg:space-y-0 lg:pt-0 '>
                      <li>
                        <Link to='/' className='group relative  before:inset-x-0 before:bottom-0 '>
                          <span className='relative text-glitch-white text-xl'>Home</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='/shop'
                          className='group relative  before:inset-x-0 before:bottom-0 '
                        >
                          <span className='relative text-glitch-white text-xl'>Shop</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='/login'
                          className='group relative  before:inset-x-0 before:bottom-0 '
                        >
                          <span className='relative text-glitch-white text-xl'>Log in</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
