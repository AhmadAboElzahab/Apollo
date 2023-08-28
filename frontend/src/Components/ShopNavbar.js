import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import Cart from './Cart';
import { useAuthContext } from '../Hooks/useAuthContext';
const fetcher = (...args) => fetch(...args).then((response) => response.json());
export default function ShopNavbar() {
  const { user } = useAuthContext();
  const { data } = useSWR('/api/shop/categories', fetcher);
  return (
    <nav className='fixed top-[60px] z-[10] w-screen border-b  border-gray-900 bg-black/90 lg:bg-black/20 py-2 lg:top-20 lg:w-72 lg:border-r '>
      <div className='mx-auto flex items-center justify-between '>
        <label
          htmlFor='shopHamburger'
          className='peer-checked:shopHamburger relative z-10  block cursor-pointer text-center text-white lg:hidden ml-auto'
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
                <li key={d._id}>
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
                <li key={d._id}>
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
                <li key={d._id}>
                  <Link to={`lyrics/${encodeURIComponent(d.title.replace(/\s+/g, '-'))}`}>
                    {d.title}
                  </Link>
                </li>
              ) : null,
            )}
            {user ? (
              <Link to='History'>
                <li className='mt-10 text-xl hover:underline hover:text-white'>Purchase History</li>
              </Link>
            ) : (
              ''
            )}
          </ul>
          <Cart />
        </div>
      </div>
    </nav>
  );
}
