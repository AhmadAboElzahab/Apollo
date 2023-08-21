import { BsCart } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { Fragment } from 'react';
import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useCart } from '../Hooks/useCart';
export default function Cart() {
  let [open, setOpen] = useState(false);
  const { Cart, dispatch, calculateTotalPrice } = useCart();
  console.log(Cart);

  return (
    <div>
      <button className='fixed bottom-0 flex flex-row justify-center left-0   w-screen lg:w-72 p-5 '>
        <BsCart size={40} onClick={() => setOpen(true)} className='mr-3' />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          static
          className='fixed inset-0 overflow-hidden z-50 '
          open={open}
          onClose={setOpen}
        >
          <div className='absolute inset-0 overflow-hidden'>
            <Transition.Child
              as={Fragment}
              enter='ease-in-out duration-500'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in-out duration-500'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div
                className='fixed inset-0 backdrop-blur-sm bg-black/30 '
                onClick={() => setOpen(false)}
                aria-hidden='true'
              />
            </Transition.Child>

            <div className='fixed inset-y-0 right-0 pl-10 max-w-full flex'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <div className='relative w-screen max-w-md'>
                  <div className='h-full flex flex-col bg-white shadow-xl overflow-y-scroll'>
                    <div className='fixed w-full bg-white p-4 z-30 shadow '>
                      <Dialog.Title className='   text-lg font-medium text-gray-900 flex flex-row justify-between'>
                        <RxCross2
                          size={30}
                          className='cursor-pointer'
                          onClick={() => setOpen(false)}
                        />
                        <p className='text-center flex-grow text-2xl'>Cart</p>
                      </Dialog.Title>
                    </div>
                    <div className='mt-20 relative flex-1 px-4 sm:px-6'>
                      <div>
                        {Cart?.some((c) => c.type === 'Artwork') && (
                          <p className='text-xl text-center mb-4'>Artwork</p>
                        )}
                        {Cart?.map((c) =>
                          c.type === 'Artwork' ? (
                            <div className='flex flex-row justify-between' key={c.id}>
                              <p className='text-center w-full'>{c.name}</p>
                              <p className='text-center w-full'>{c.price} $</p>
                              <p className='text-center w-full text-red-400 hover:text-red-500 cursor-pointer font-extrabold'>
                                Remove
                              </p>
                            </div>
                          ) : (
                            ''
                          ),
                        )}

                        {Cart?.some((c) => c.type === 'Beat') && (
                          <p className='text-xl text-center mb-4'>Beats</p>
                        )}
                        {Cart?.map((c) =>
                          c.type === 'Beat' ? (
                            <div className='flex flex-row justify-between' key={c.id}>
                              <p className='text-center w-full'>{c.name}</p>
                              <p className='text-center w-full'>{c.price} $</p>
                              <p className='text-center w-full text-red-400 hover:text-red-500 cursor-pointer font-extrabold'>
                                Remove
                              </p>
                            </div>
                          ) : (
                            ''
                          ),
                        )}

                        {Cart?.some((c) => c.type === 'Lyric') && (
                          <p className='text-xl text-center mb-4'>Lyrics</p>
                        )}
                        {Cart?.map((c) =>
                          c.type === 'Lyric' ? (
                            <div className='flex flex-row justify-between' key={c.id}>
                              <p className='text-center w-full'>{c.name}</p>
                              <p className='text-center w-full'>{c.price} $</p>
                              <p className='text-center w-full text-red-400 hover:text-red-500 cursor-pointer font-extrabold'>
                                Remove
                              </p>
                            </div>
                          ) : (
                            ''
                          ),
                        )}
                      </div>
                    </div>
                    <div className='fixed bg-white w-full bottom-0 px-6 py-5 border-t border-gray-200'>
                      <p className='text-xl'> Total : {calculateTotalPrice()} $ </p>
                      <div className='flex'>
                        <input
                          type='txt'
                          placeholder='Add Promo Code'
                          className='border border-gray-200 w-full rounded-md mt-4 px-4 py-2'
                        />
                        <button className='rounded-md mt-4 px-4 py-2 bg-black text-white ml-2 cursor-pointer hover:bg-zinc-600'>
                          Add
                        </button>
                      </div>
                      <button className='rounded-md w-full mt-4 px-4 py-2 bg-black text-white cursor-pointer hover:bg-zinc-600'>
                        Check Out
                      </button>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
