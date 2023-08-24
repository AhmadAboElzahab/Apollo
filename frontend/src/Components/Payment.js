import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import CryptoJS from 'crypto-js';
import { useCart } from '../Hooks/useCart';

export default function Payment({ products, price }) {
  const addPayment = async () => {
    const response = await fetch('/api/user/Payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify({
        products,
        totalPrice: price,
      }),
    });
  };

  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const { dispatch, closeCart } = useCart();
  function encrypt(data) {
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encryptedData;
  }
  const handlePaymentMessage = (event) => {
    if (event.data.paymentApproved) {
      closeModal();
      addPayment();
      toast.success('Payment was successful!');
      closeCart();
      dispatch({ type: 'CLEAR' });

      window.removeEventListener('message', handlePaymentMessage);
      console.log('Event listener removed.');
    }
  };
  const handlePaymentMethod = async (amount) => {
    const id = '64e775bbe7b9da76e2ee6bda';
    const name = 'Apollo';
    const hashedId = encrypt(id);
    const hashedName = encrypt(name);
    const hashedPrice = encrypt(price.toString());

    const url = `http://localhost:3009/requestpayment?id=${encodeURIComponent(
      hashedId,
    )}&p=${encodeURIComponent(hashedPrice)}&name=${encodeURIComponent(hashedName)}`;
    const windowWidth = 800;
    const windowHeight = 600;
    const left = window.screen.width / 2 - windowWidth / 2;
    const top = window.screen.height / 2 - windowHeight / 2;
    const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${left},top=${top}`;

    const paymentWindow = window.open(url, '_blank', windowFeatures);
    console.log('Event listener add.');

    window.addEventListener('message', handlePaymentMessage);
  };

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    if (products.length === 0) {
      toast.warn('Cart Is Empty');
      return;
    } else {
      setIsOpen(true);
    }
  }
  return (
    <>
      <div>
        <button
          type='button'
          onClick={openModal}
          className='rounded-md w-full mt-4 px-4 py-2 bg-black text-white cursor-pointer hover:bg-zinc-600'
        >
          Check Out
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-[3333333333333]' onClose={closeModal}>
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
                  <Dialog.Title as='h3' className='text-xl font-medium leading-6 text-gray-900'>
                    You Are Checking Out And Will Pay {price}
                    <hr />
                  </Dialog.Title>
                  <div className='my-5'>
                    <div className='flex flex-row justify-between my-2'>
                      <p className='text-left w-full '>Name</p>
                      <p className='text-center w-full '>Type</p>
                      <p className='text-center w-full '>Price</p>
                    </div>
                    {products.map((p) => (
                      <div key={p.id} className='flex flex-row justify-between my-2'>
                        <p className='text-left w-full '>{p.name}</p>
                        <p className='text-center w-full '>{p.type}</p>
                        <p className='text-center w-full '>{p.price}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handlePaymentMethod(price)}
                    className='bg-fuchsia-700 text-white hover:bg-fuchsia-900 w-full text-xl py-2 rounded'
                  >
                    Pay with CashMate
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
