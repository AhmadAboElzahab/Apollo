import useSWR from 'swr';
import CardAction from '../../../Components/CardAction';
import { useParams } from 'react-router-dom';
import AddToCart from '../../../Components/AddToCart';
const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function ShopLyric() {
  const { product, category } = useParams();
  const { data, error } = useSWR(`/api/shop/lyric/${product}`, fetcher);
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
    return <>{error}</>;
  }
  return (
    <>
      {data && (
        <div className='flex flex-col  gap-3 text-white	relative top-0 left-0 p-5 '>
          <div className='h-full w-full bg-black/30 border border-gray-800 rounded-lg shadow'>
            <pre className='text-center py-5 border-b border-gray-800 '>{data.lyrics}</pre>
          </div>

          <div className='py-3 px-3 text-sm flex flex-row  h-full  bg-black border border-gray-800 rounded-lg shadow z-50'>
            <div>
              <p>
                <span className='text-gray-400'>Title : </span>
                {data.title}
              </p>
              <p>
                <span className='text-gray-400'>Description : </span>
                {data.description}
              </p>
              <p>
                <span className='text-gray-400'>Price : </span>
                {data.price}
              </p>
              <p>
                <span className='text-gray-400'>Category : </span>
                {category}
              </p>
              <br />
            </div>
            <div className=' ml-[auto] flex flex-col items-center justify-between w-28'>
              <div>
                <CardAction d={data} type='Lyrics' url={`/api/shop/lyric/${product}`} />
                <p className='text-center'> {data.likes.length}</p>
              </div>
              <AddToCart id={data._id} name={data.title} price={data.price} type='Lyric' />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
