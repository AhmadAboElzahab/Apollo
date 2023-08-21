import useSWR from 'swr';
import WavesurferComponent from '../../../Components/WavesurferComponent';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AddToCart from '../../../Components/AddToCart';

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function ShopBeatsCategory() {
  const { category } = useParams();

  const { data, error } = useSWR(`/api/shop/getProducts/Beats/${category}`, fetcher);

  const likePost = async (id) => {
    try {
      const response = await fetch('/api/user/likes/like', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          postId: id,
          UserId: '64c24a4681de7bcef0bad344',
        }),
      });

      const result = await response.json();
    } catch (err) {}
  };

  const unlikePost = async (id) => {
    try {
      const response = await fetch('/api/user/likes/unlike', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          postId: id,
          UserId: '64c24a4681de7bcef0bad344',
        }),
      });

      const result = await response.json();
    } catch (err) {}
  };
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
                  {category}
                </p>
                <br />
                <p className='hover:underline cursor-pointer'>
                  <Link to={d._id}>Check</Link>
                </p>
              </div>
              <div className=' ml-[auto] flex flex-col items-center justify-between w-28'>
                <div>
                  {d.likes &&
                  d.likes.some(
                    (likedUserId) => likedUserId === String('64c24a4681de7bcef0bad344'),
                  ) ? (
                    <div className='flex items-center'>
                      <GoHeartFill
                        className='text-red-500 cursor-pointer'
                        size={30}
                        onClick={() => {
                          unlikePost(d._id);
                        }}
                      />
                    </div>
                  ) : (
                    <div className='flex items-center'>
                      <GoHeart
                        className='text-gray-800 cursor-pointer'
                        size={30}
                        onClick={() => {
                          likePost(d._id);
                        }}
                      />
                    </div>
                  )}
                  <p className='text-center'> {d.likes?.length}</p>
                </div>
                <AddToCart id={d._id} name={d.title} price={d.price} type='Beat' />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
