import useSWR from 'swr';
import { Link } from 'react-router-dom';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import {useParams} from 'react-router-dom'

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function ShopLyricsCategory() {
  const { category } = useParams();

  const { data, error } = useSWR(`/api/shop/lyrics/${category}`, fetcher);
  if (error) {
    console.warn(error);
    return <>{error}</>;
  }

  if (!data) {
    return <>Loading...</>;
  }

  if (!Array.isArray(data)) {
    return <>Invalid data format</>;
  }

  return (
    <div className='grid lg:grid-cols-3 place-items-center text-white	gap-16 relative top-0 left-0 p-5'>
      {data &&
        data.map((d) => (
          <div class='w-full border border-gray-800 rounded-lg shadow bg-black'>
            <pre className='text-center py-5 border-b border-gray-800 '>
              {d.lyrics.slice(0, 150) + '...'}
            </pre>
            <div class='py-3 px-3 text-sm flex flex-row'>
              <div>
                <p>
                  <span className='text-gray-400'>Title : </span>
                  {d.title}
                </p>
                <p>
                  <span className='text-gray-400'>Price : </span>
                  {d.price}
                </p>
                <p>
                  <span className='text-gray-400'>Category : </span>
                  {d.category}
                </p>
                <br />
                <p className='hover:underline cursor-pointer'>
                <Link to={d._id}>Check</Link>
                </p>
              </div>
              <div className=' ml-[auto] flex items-center justify-center  w-28'>
                {true ? (
                  <GoHeartFill className='text-red-500' size={30} />
                ) : (
                  <GoHeart className='text-gray-800' size={30} />
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
