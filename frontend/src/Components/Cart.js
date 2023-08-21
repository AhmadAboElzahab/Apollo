import { BsCart } from 'react-icons/bs';
import { Fragment } from 'react';
import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
export default function Cart() {
  let [open, setOpen] = useState(false);

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
                  <div className='h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll'>
                    <div className='px-4 sm:px-6'>
                      <Dialog.Title className='text-lg font-medium text-gray-900'>
                        sex{' '}
                      </Dialog.Title>
                    </div>
                    <div className='mt-6 relative flex-1 px-4 sm:px-6'>sexy</div>
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
