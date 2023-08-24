import useSWR from 'swr';
import { Disclosure, Transition } from '@headlessui/react';
import { SlArrowDown } from 'react-icons/sl';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function PurchaseHistory() {
  const { data, error, isLoading } = useSWR('/api/user/Payment/history', fetcher);
  if (error) {
    return <>{error}</>;
  }
  if (isLoading) {
    return <>Loading</>;
  }
  return (
    <div className=' w-full bg-black/30 border border-gray-800 rounded-lg shadow p-4'>
      {data?.map((d) => (
        <div key={d._id} className='flex flex-row justify-between'>
          <div className='w-full  rounded-2xl m-4' key={d._id}>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className='flex w-full justify-between text-sm'>
                    <span className='text-left w-full'>{d.paymentID}</span>
                    <span className='text-center w-full'>{d.totalPrice} $</span>
                    <span className='text-center w-full'>
                      {formatDistanceToNow(new Date(d.createdAt), { addSuffix: true })}
                    </span>
                    <span className='flex text-gray-500'>
                      <span className='mr-2 m-18'>Products</span>
                      <SlArrowDown className={` ${open ? 'rotate-180 transform ' : ''} `} />
                    </span>
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                      {d.products.map((p, index) => (
                        <div
                          key={index}
                          className='flex justify-around bg-white text-black text-base'
                        >
                          <span>{p.name}</span>
                          <span>{p.type}</span>
                        </div>
                      ))}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      ))}
    </div>
  );
}
