import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import { BiLogoTelegram } from 'react-icons/bi';

export default function ShareToTelegram({ type, id }) {
  const url = `/api/admin/Telegram/${type}/${id}`;
  const [isLoading, setIsLoading] = useState(false);

  const Share = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: 'POST',
      });

      if (response.ok) {
        toast.success('Shared Successfully');
        closeModal();
      } else {
        const errMessage = await response.text();
        toast.error(errMessage ? errMessage : 'Unable to Share');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div>
        <button type='button' className='text-sky-500 hover:text-sky-400' onClick={openModal}>
          <BiLogoTelegram />
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
                  <Dialog.Title as='h3' className='text-xlg font-medium leading-6 text-gray-900'>
                    Share To Telegram
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-600'>Are You Sure You Want To Share</p>
                  </div>

                  <div className='flex flex-row-reverse mt-8 gap-5'>
                    <button
                      type='button'
                      className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium ${
                        isLoading
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-blue-100 hover:bg-blue-200'
                      }`}
                      onClick={Share}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sharing...' : 'Proceed'}
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
