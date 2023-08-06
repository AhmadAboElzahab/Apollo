import { AiOutlinePlus } from 'react-icons/ai';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { mutate } from 'swr';

export default function AddLyrics() {
  let [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <button
        className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-0 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium absolute -top-6 p-1 rounded-full text-4xl left-[90%] md:left-[93%] lg:left-[97%]'
        onClick={openModal}
      >
        <AiOutlinePlus />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-60' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-xlg font-medium leading-6 text-gray-900'>
                    Add New Lyrics
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500 mb-2'>You Are Trying to Add new Lyrics</p>

                    <div className='mb-6'>
                      <label className='text-sm text-gray-500' htmlFor='value'>
                        Title
                      </label>
                      <input
                        id='value'
                        name='value'
                        className='bg-gray-300 appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-300'
                        type='txt'
                      />
                    </div>

                    <div className='mb-6'>
                      <label className='text-sm text-gray-500' htmlFor='value'>
                        Category
                      </label>
                      <select
                        className='bg-gray-300 appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-300 '
                        id='BeatCategory'
                        name='BeatCategory'
                      >
                        <option value=''>Please Select</option>
                        <option value='Lyrics'>Lyrics</option>
                        <option value='Beats'>Beats</option>
                        <option value='Artworks'>Artworks</option>
                      </select>
                    </div>
                    <div className='mb-6'>
                      <label className='text-sm text-gray-500' htmlFor='value'>
                        Lyrics
                      </label>
                      <textarea
                        rows={5}
                        className='bg-gray-300 appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-300 row-4 resize-y'
                        id='Description'
                        name='Description'
                      />
                    </div>

                    <div className='mb-6'>
                      <label className='text-sm text-gray-500' htmlFor='value'>
                        Price
                      </label>
                      <input
                        id='value'
                        name='value'
                        className='bg-gray-300 appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-300'
                        type='txt'
                      />
                    </div>
                  </div>

                  <div className='flex flex-row-reverse mt-8 gap-5'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={openModal}
                    >
                      Proceed
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
