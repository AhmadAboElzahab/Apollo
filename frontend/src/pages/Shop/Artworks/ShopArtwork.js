import useSWR from 'swr';
import OptimizedImage from '../../../Components/OptimizedImage';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { Link,useParams } from 'react-router-dom';

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function ShopArtwork() {
  const { product,category } = useParams();
  const { data, error } = useSWR(`/api/shop/artwork/${product}`, fetcher);
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
    {data &&
    <div className='flex flex-col  lg:flex-row gap-3 text-white	relative top-0 left-0 p-5 '>
      
     
          <div className='w-full lg:col-span-2 bg-black/30 border border-gray-800 rounded-lg shadow' >
              <OptimizedImage
                src={`http://localhost:4000/artworks/${data.art}`}
                blurHash={data.blurHash}
                styleName='BigImage'
                rounded='rounded-b-lg'
              />
          </div>


          <div className='py-3 px-3 text-sm flex flex-row lg:w-[50vh] h-full mt-[50vh] lg:mt-[0vh] bg-black border border-gray-800 rounded-lg shadow z-50'>
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

              <div className=' ml-[auto] flex flex-col items-center justify-center w-28 '>
                {data.likes &&
                data.likes.some(
                  (likedUserId) => likedUserId === String('64c24a4681de7bcef0bad344'),
                ) ? (
                  <div className='flex items-center'>
                    <GoHeartFill
                      className='text-red-500 cursor-pointer'
                      size={30}
                      onClick={() => {
                        unlikePost(data._id);
                      }}
                    />
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <GoHeart
                      className='text-gray-800 cursor-pointer'
                      size={30}
                      onClick={() => {
                        likePost(data._id);
                      }}
                    />
                  </div>
                )}

              </div>
            </div>
        
    </div>}</>
  );
}
