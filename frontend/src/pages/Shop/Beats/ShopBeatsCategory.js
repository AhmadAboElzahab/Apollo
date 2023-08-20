import useSWR from 'swr';
import WavesurferComponent from '../../../Components/WavesurferComponent';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom'

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function ShopBeatsCategory() {
  const { category } = useParams();

  const { data, error } = useSWR(`/api/shop/Beats/${category}`, fetcher);
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
            <WavesurferComponent audioUrl={`/audio/${d.Audio}`} />
            <div class='py-3 px-3 text-sm flex flex-row'>
              <div>
                <p>
                  <span className='text-gray-400'>Title : </span>
                  {d.title}
                </p>
                <p>
                  <span className='text-gray-400'>Description : </span>
                  {d.description.slice(0, 20) + '...'}
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
