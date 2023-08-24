import useSWR from 'swr';
import PageHeader from '../../../Components/PageHeader';
import { Boundary } from '../../../Components/boundary';
import { Disclosure, Transition } from '@headlessui/react';
import { SlArrowDown } from 'react-icons/sl';
export default function History() {
  const fetcher = (...args) => fetch(...args).then((response) => response.json());

  const { data, error, isLoading } = useSWR(`/api/admin/accounting/`, fetcher);

  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <PageHeader title='Payment History' />
      <div className=' my-5 w-full flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0 gap-4 '>
        <div className='w-full'>
          <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20'>
            <div className='rounded-lg bg-black p-3.5 lg:p-6'>
              <Boundary labels={['History']} size='small'>
                <div className='prose prose-sm prose-invert max-w-none'>
                  {data.map((yearData) => (
                    <div key={yearData.year}>
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className='flex w-full justify-between text-sm'>
                              <span className='text-left w-full'> {yearData.year}</span>
                              <span className='text-left w-full'> {yearData.total}</span>

                              <span className='flex text-gray-500'>
                                <span className='mr-2 m-18'>Details</span>
                                <SlArrowDown
                                  className={` ${open ? 'rotate-180 transform ' : ''} `}
                                />
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
                                {yearData.months.map((monthData) => (
                                  <div key={monthData.name} className='flex justify-between'>
                                    <span>{monthData.name}</span>
                                    <span>{monthData.total} $</span>
                                  </div>
                                ))}
                              </Disclosure.Panel>
                            </Transition>
                          </>
                        )}
                      </Disclosure>
                    </div>
                  ))}
                </div>
              </Boundary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
