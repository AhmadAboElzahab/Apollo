import { Boundary } from '../boundary';

export default function AddBeat() {
  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20'>
      <div className='rounded-lg bg-black p-3.5 lg:p-6'>
        <Boundary labels={['Add New Beat']} size='small'>
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
              />
            </div>
            <div className='flex flex-row-reverse p-2'>
              <button className='text-md text-white bg-gray-800 hover:bg-gray-500 px-4 py-2 rounded-md'>
                Add
              </button>
            </div>
          </div>
        </Boundary>
      </div>
    </div>
  );
}
