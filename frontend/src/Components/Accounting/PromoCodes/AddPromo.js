import React, { useState } from 'react';
import { mutate } from 'swr';
import { Boundary } from '../../boundary';
import { toast } from 'react-toastify';

export default function AddPromo() {
  const [value, setValue] = useState('');

  const addCode = async () => {
    if (value == '') {
      toast.error('Value Should not Be Empty !');
    } else if (Number(value) >= 100) {
      toast.error('Value Should be less or Equall to 100 !');
      setValue('');
    } else {
      try {
        const response = await fetch('/api/admin/promo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value: value }),
        });

        if (response.ok) {
          mutate('/api/admin/promo');
          setValue('');
          toast.success('New Promo Code Added');
        } else {
          console.error('Failed to add code:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20'>
      <div className='rounded-lg bg-black p-3.5 lg:p-6'>
        <Boundary labels={['Add New Code']} size='small'>
          <div className='prose prose-sm prose-invert max-w-none'>
            <div className='mb-6'>
              <label className='text-md text-gray-100 m-2' htmlFor='Amount'>
                Amount
              </label>
              <input
                className='bg-gray-900 text-md appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
                type='text'
                id='Amount'
                name='Amount'
                placeholder='Enter Amount in %'
                onChange={(e) => {
                  const regex = /^\d+(\.\d{0,2})?$/;

                  if (regex.test(e.target.value) || e.target.value === '') {
                    setValue(e.target.value);
                  }
                }}
                value={value}
              />
            </div>
            <div className='flex flex-row-reverse p-2'>
              <button
                className='text-md text-white bg-gray-800 hover:bg-gray-500 px-4 py-2 rounded-md'
                onClick={addCode}
              >
                Add Code
              </button>
            </div>
          </div>
        </Boundary>
      </div>
    </div>
  );
}
