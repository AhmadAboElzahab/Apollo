import { Boundary } from '../../boundary';

export default function AddPromo() {
  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20'>
      <div className='rounded-lg bg-black p-3.5 lg:p-6'>
        <Boundary labels={['Add New Code']} size='small'>
          <div className='prose prose-sm prose-invert max-w-none'>
            <div className='mb-6'>
              <label className='text-md text-gray-100 m-2' htmlFor='categoryTitle'>
                Amount in %
              </label>
              <input
                className='bg-gray-900 text-md appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
                type='txt'
                id='categoryTitle'
                name='categoryTitle'
                placeholder='Enter Title'
              />
            </div>
            <div className='flex flex-row-reverse p-2'>
              <button className='text-md text-white bg-gray-800 hover:bg-gray-500 px-4 py-2 rounded-md'>
                Add Code
              </button>
            </div>
          </div>
        </Boundary>
      </div>
    </div>
  );
}
