import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { mutate } from 'swr';
import { toast } from 'react-toastify';

export default function EditCategory({ categoryId, categoryTitle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(categoryTitle);
  }, [categoryTitle]);

  const EditCode = async () => {
    if (!title) {
      toast.error('Title Should not Be Empty !');
    } else {
      try {
        const response = await fetch(`/api/admin/Category/${categoryId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });

        if (response.ok) {
          mutate('/api/admin/Category');
          closeModal();
          toast.success('Title Updated');
        } else {
          console.error('Failed to edit Title:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div>
        <button type='button' onClick={openModal}>
          <span className='text-blue-500 hover:text-blue-400'>Edit</span>
        </button>
      </div>

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
                  <Dialog.Title as='h3' className='text-xl font-medium leading-6 text-gray-900 '>
                    Edit
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500 mb-2'>
                      You Are Trying to Edit a Category Title
                    </p>
                    <label className='text-sm text-gray-500' htmlFor='value'>
                      Value
                    </label>
                    <input
                      id='value'
                      name='value'
                      className='bg-gray-300 appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-300     '
                      type='txt'
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      value={title}
                    />
                  </div>

                  <div className='flex flex-row-reverse mt-8 gap-5'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={EditCode}
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
