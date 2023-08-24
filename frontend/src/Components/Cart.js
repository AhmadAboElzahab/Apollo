import { BsCart } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { Fragment } from 'react';
import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useCart } from '../Hooks/useCart';
import Payment from './Payment';
import { useAuthContext } from '../Hooks/useAuthContext';
import { Link } from 'react-router-dom';
export default function Cart() {
  const { user } = useAuthContext();
  let [open, setOpen] = useState(false);
  const [newTotal, setNewTotal] = useState('');
  const [Loading, setLoading] = useState(false);
  const [promo, setPromo] = useState('');
  const [promoError, setPromoError] = useState('');
  const { Cart, dispatch, calculateTotalPrice } = useCart();

  const checkTotal = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/shop/newTotal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: calculateTotalPrice(),
          code: promo,
        }),
      });

      const json = await response.json();
      if (response.ok) {
        setLoading(false);
        setNewTotal(json.price);
        setPromoError('');
      } else {
        setLoading(false);
        setPromoError(json.error);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const remove = (id) => {
    dispatch({
      type: 'DELETE',
      payload: {
        id,
      },
    });
  };
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
                          <p className='text-xl text-center text-glitch-pink py-1 rounded-lg bg-black my-4'>
                            Artwork
                          </p>
                        )}
                        {Cart?.map((c) =>
                          c.type === 'Artwork' ? (
                            <div className='flex flex-row justify-between' key={c.id}>
                              <p className='text-left w-full'>{c.name}</p>
                              <p className='text-center w-full'>{c.price} $</p>
                              <p
                                onClick={() => {
                                  remove(c.id);
                                }}
                                className='text-right w-full hover:underline text-red-400 hover:text-red-500 cursor-pointer font-extrabold'
                              >
                                Remove
                              </p>
                            </div>
                          ) : (
                            ''
                          ),
                        )}

                        {Cart?.some((c) => c.type === 'Beat') && (
                          <p className='text-xl text-center text-glitch-cyan bg-black py-1 rounded-lg my-4'>
                            Beats
                          </p>
                        )}
                        {Cart?.map((c) =>
                          c.type === 'Beat' ? (
                            <div className='flex flex-row justify-between' key={c.id}>
                              <p className='text-left w-full'>{c.name}</p>
                              <p className='text-center w-full'>{c.price} $</p>
                              <p
                                onClick={() => {
                                  remove(c.id);
                                }}
                                className='text-right w-full hover:underline text-red-400 hover:text-red-500 cursor-pointer font-extrabold'
                              >
                                Remove
                              </p>
                            </div>
                          ) : (
                            ''
                          ),
                        )}

                        {Cart?.some((c) => c.type === 'Lyric') && (
                          <p className='text-xl text-glitch-yellow  text-center bg-black py-1 rounded-lg my-4'>
                            Lyrics
                          </p>
                        )}
                        {Cart?.map((c) =>
                          c.type === 'Lyric' ? (
                            <div className='flex flex-row justify-between' key={c.id}>
                              <p className='text-left w-full'>{c.name}</p>
                              <p className='text-center w-full'>{c.price} $</p>
                              <p
                                onClick={() => {
                                  remove(c.id);
                                }}
                                className='text-right w-full hover:underline text-red-400 hover:text-red-500 cursor-pointer font-extrabold'
                              >
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
                      <p className={`text-xl ${newTotal ? 'line-through	' : ''}  `}>
                        Total : {calculateTotalPrice()} $
                      </p>
                      {newTotal && <p className={`text-xl`}>New Total : {newTotal} $</p>}

                      <div className='flex'>
                        <input
                          type='txt'
                          placeholder='Add Promo Code'
                          className='border border-gray-200 w-full rounded-md mt-4 px-4 py-2'
                          value={promo}
                          onChange={(e) => {
                            setPromo(e.target.value);
                          }}
                        />

                        <button
                          onClick={checkTotal}
                          className={`rounded-md mt-4 px-4 py-2  text-white ml-2 cursor-pointer
                          ${Loading ? 'bg-gray-300 cursor-wait' : 'bg-black hover:bg-zinc-600'}
                          
                          `}
                          disabled={Loading}
                        >
                          Add
                        </button>
                      </div>
                      {newTotal && (
                        <p
                          className='text-sm text-blue-500 hover:underline cursor-pointer'
                          onClick={() => {
                            setNewTotal('');
                          }}
                        >
                          Remove Promo
                        </p>
                      )}
                      {promoError && <p className='text-sm text-red-500 '>{promoError}</p>}
                      {user ? (
                        <Payment
                          products={Cart}
                          price={newTotal ? newTotal : calculateTotalPrice()}
                        />
                      ) : (
                        <Link className='text-blue-600 hover:underline' to='/login'>
                          You Need To login to Check out
                        </Link>
                      )}
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
