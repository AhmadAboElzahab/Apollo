import { useState } from 'react';
import { Boundary } from '../boundary';
import { mutate } from 'swr';
import { toast } from 'react-toastify';

export default function AddCategory() {
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');

  const addCategory = async () => {
    if (!type || !title) {
      toast.error('All Field mus be filled');
    } else {
      try {
        const response = await fetch('/api/admin/Category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, type }),
        });
        const output=await response.json()
        if (response.ok) {
          mutate('/api/admin/Category');
          setTitle('');
          setType('');
          toast.success('New Category Added');
        } else {
          toast.error(output.error);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20'>
      <div className='rounded-lg bg-black p-3.5 lg:p-6'>
        <Boundary labels={['Add Category']} size='small'>
          <div className='prose prose-sm prose-invert max-w-none'>
            <div className='mb-6'>
              <label className='text-md text-gray-100 m-2' htmlFor='categoryTitle'>
                Title
              </label>
              <input
                className='bg-gray-900 text-md appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
                type='txt'
                id='categoryTitle'
                name='categoryTitle'
                placeholder='Enter Title'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            <div className='mb-6'>
              <label className='text-md text-white m-2' htmlFor='ForProduct'>
                For
              </label>
              <select
                className='bg-gray-900 text-sm appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
                id='ForProduct'
                name='ForProduct'
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value=''>Please Select</option>
                <option value='Lyrics'>Lyrics</option>
                <option value='Beats'>Beats</option>
                <option value='Artworks'>Artworks</option>
              </select>
            </div>

            <div className='flex flex-row-reverse p-2'>
              <button
                className='text-md text-white bg-gray-800 hover:bg-gray-500 px-4 py-2 rounded-md'
                onClick={addCategory}
              >
                Add
              </button>
            </div>
          </div>
        </Boundary>
      </div>
    </div>
  );
}
