import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  const handleCheckboxChange = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className='fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-gray-800'>
      <div className='flex h-14 items-center px-4 py-4 lg:h-auto'>
        <NavLink href='/' className='group flex w-full items-center gap-x-2.5' onClick={close}>
          <div className='relative z-30 '>
            <div class='glitch z-10 text-xl' data-text='Apollo'>
              Apollo
            </div>
          </div>
        </NavLink>

        <input
          type='checkbox'
          name='hamburger'
          id='hamburger'
          className='peer invisible'
          hidden
          checked={isOpen}
          onChange={handleCheckboxChange}
        />
        <label
          for='hamburger'
          className='peer-checked:hamburger relative z-10 -mr-6 block cursor-pointer p-6 lg:hidden'
        >
          <div
            aria-hidden='true'
            className='m-auto h-0.5 w-6 rounded bg-white transition duration-300'
          ></div>
          <div
            aria-hidden='true'
            className='m-auto mt-2 h-0.5 w-6 rounded bg-white transition duration-300'
          ></div>
        </label>
      </div>
      <div
        className={clsx('overflow-y-auto lg:static lg:block', {
          'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className='space-y-6 px-2 py-5'>
          <div>
            <div className='mb-2 px-3 text-xs font-semibold   tracking-wider text-gray-400/80'>
              <div>General</div>
            </div>
            <NavLink end onClick={close} to='' className='link_style'>
              Home
            </NavLink>
            <NavLink onClick={close} to='Category' className='link_style'>
              Category
            </NavLink>
            <br />
            <div className='mb-2 px-3 text-xs font-semibold   tracking-wider text-gray-400/80'>
              <div>Products</div>
            </div>
            <NavLink onClick={close} to='Beat' className='link_style'>
              Beats
            </NavLink>
            <NavLink onClick={close} to='Lyrics' className='link_style'>
              Lyrics
            </NavLink>
            <NavLink onClick={close} to='Artwork' className='link_style'>
              Artworks
            </NavLink>
            <br />
            <div className='mb-2 px-3 text-xs font-semibold   tracking-wider text-gray-400/80'>
              <div>Accounting</div>
            </div>
            <NavLink onClick={close} to='Category' className='link_style'>
              Prediction
            </NavLink>
            <NavLink onClick={close} to='Category' className='link_style'>
              History
            </NavLink>
            <NavLink onClick={close} to='Category' className='link_style'>
              Promo Codes
            </NavLink>
            <br />
            <div className='mb-2 px-3 text-xs font-semibold   tracking-wider text-gray-400/80'>
              <div>Social Media</div>
            </div>
            <NavLink onClick={close} to='Category' className='link_style'>
              Instagram
            </NavLink>

            <br />
            <div className='mb-2 px-3 text-xs font-semibold  tracking-wider text-gray-400/80'>
              <div>Settings</div>
            </div>
            <NavLink onClick={close} to='Category' className='link_style'>
              Account
            </NavLink>
            <NavLink onClick={close} to='Category' className='link_style'>
              Log out
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}
