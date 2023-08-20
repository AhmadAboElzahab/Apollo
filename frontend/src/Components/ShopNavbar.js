import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((response) => response.json());
export default function ShopNavbar() {
  const { data, error, isLoading } = useSWR('/api/shop/categories', fetcher);
  return (
    <nav className='fixed top-[60px] z-[10] w-screen border-b  border-gray-900 bg-black/90 lg:bg-black/20 py-2 lg:top-20 lg:w-[30vh] lg:border-r '>
      <div className='mx-auto flex items-center justify-between '>
        <div className='relative  w-full px-2 '>
          <div className='pointer-events-none absolute inset-y-0 left-6 flex  items-center'>
            <svg
              className='h-4 w-4 text-gray-500 '
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>

          <input
            type='text'
            placeholder='Search'
            className='block w-full rounded  border-gray-900 bg-black  py-3 pl-10 text-white'
          />
        </div>
        <label
          htmlFor='shopHamburger'
          className='peer-checked:shopHamburger relative z-10  block cursor-pointer text-center text-white lg:hidden'
        >
          <BsThreeDotsVertical size={30} className='mr-4 text-white' />
        </label>
      </div>
      <input
        type='checkbox'
        name='shopHamburger'
        id='shopHamburger'
        className='peer invisible absolute'
        hidden
      />

      <div className='hidden peer-checked:block lg:block lg:h-full'>
        <div className='h-screen  p-5 px-3'>
          <ul className='ml-4 font-light text-gray-500 '>
            <Link to='artworks'>
              <li className='mb-5 bg-gradient-to-r from-teal-400 to-yellow-200 bg-clip-text text-3xl text-transparent'>
                Artwork
              </li>
            </Link>
            {data?.map((d) =>
              d.type === 'Artworks' ? (
                <li key={d.id}>
                  <Link to={`artworks/${encodeURIComponent(d.title.replace(/\s+/g, '-'))}`}>
                    {d.title}
                  </Link>
                </li>
              ) : null,
            )}
            <Link to='beats'>
              <li className='my-5 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-3xl text-transparent'>
                Beats
              </li>
            </Link>
            {data?.map((d) =>
              d.type === 'Beats' ? (
                <li key={d.id}>
                  <Link to={`beats/${encodeURIComponent(d.title.replace(/\s+/g, '-'))}`}>
                    {d.title}
                  </Link>
                </li>
              ) : null,
            )}
            <Link to='lyrics'>
              <li className='my-5 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-3xl text-transparent'>
                Lyrics
              </li>
            </Link>
            {data?.map((d) =>
              d.type === 'Lyrics' ? (
                <li key={d.id}>
                  <Link to={`lyrics/${encodeURIComponent(d.title.replace(/\s+/g, '-'))}`}>
                    {d.title}
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
