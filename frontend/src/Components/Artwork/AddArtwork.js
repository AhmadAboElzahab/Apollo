import { Boundary } from '../boundary';
import { useState } from 'react';

export default function AddArtwork() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);

    try {
      const response = await fetch('/api/admin/Artwork', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
        // Reset form fields and state as needed
      } else {
        console.error('Upload failed:', response.statusText);
        // Handle error as needed
      }
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle error as needed
    }
  };
  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20'>
      <div className='rounded-lg bg-black p-3.5 lg:p-6'>
        <Boundary labels={['Add New Beat']} size='small'>
          <form onSubmit={handleSubmit}>
            <div className='prose prose-sm prose-invert max-w-none'>
              <div className='mb-6'>
                <label className='text-md text-gray-100 m-2' htmlFor='categoryTitle'>
                  Title
                </label>

                <input
                  className='placeholder-gray-500 bg-gray-900 text-md appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
                  type='txt'
                  id='categoryTitle'
                  name='categoryTitle'
                  placeholder='Enter Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className='mb-6'>
                <label className='text-md text-white m-2' htmlFor='file-input'>
                  Beat
                </label>
                <input
                  type='file'
                  name='file-input'
                  id='file-input'
                  className='placeholder-gray-500
              bg-gray-900 text-md appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white 
              file:bg-transparent file:border-0
              file:cursor-pointer	
              file:text-gray-500
              file:placeholder-gray-500'
                  accept='image/*'
                  onChange={handleImageChange}
                />
              </div>

              <div className='mb-6'>
                <label className='text-md text-white m-2' htmlFor='BeatCategory'>
                  Category
                </label>
                <select
                  className='bg-gray-900 text-sm appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
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
                <label className='text-md text-white m-2' htmlFor='Description'>
                  Description
                </label>
                <textarea
                  rows={5}
                  className='bg-gray-900 text-sm appearance-none border-2 border-gray-1100 resize-y rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
                  id='Description'
                  name='Description'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className='mb-6'>
                <label className='text-md text-gray-100 m-2' htmlFor='Price'>
                  Price
                </label>
                <input
                  className='placeholder-gray-500 bg-gray-900 text-md appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
                  type='txt'
                  id='Price'
                  name='Price'
                  placeholder=''
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className='flex flex-row-reverse p-2'>
                <button
                  type='submit'
                  className='text-md text-white bg-gray-800 hover:bg-gray-500 px-4 py-2 rounded-md'
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </Boundary>
      </div>
    </div>
  );
}
