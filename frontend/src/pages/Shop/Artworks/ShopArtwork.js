import useSWR from 'swr';
import OptimizedImage from '../../../Components/OptimizedImage';
import CardAction from '../../../Components/CardAction';
import { useParams } from 'react-router-dom';
import AddToCart from '../../../Components/AddToCart';

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function ShopArtwork() {
  const { product, category } = useParams();
  const { data, error } = useSWR(`/api/shop/artwork/${product}`, fetcher);

  if (error) {
    return <>{error}</>;
  }
  return (
    <>
      {data && (
        <div className='flex flex-col  lg:flex-row gap-3 text-white	relative top-0 left-0 p-5 '>
          <div className='h-[80vh] w-full bg-black/30 border border-gray-800 rounded-lg shadow'>
            <OptimizedImage
              src={`http://localhost:4000/artworks/${data.art}`}
              blurHash={data.blurHash}
              styleName='BigImage'
              rounded='rounded-b-lg'
            />
          </div>

          <div className='py-3 px-3 text-sm flex flex-row lg:w-[50vh] h-full  bg-black border border-gray-800 rounded-lg shadow z-50'>
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
                <CardAction d={data} type='Artwork' url={`/api/shop/artwork/${product}`} />
                <p className='text-center'> {data.likes.length}</p>
              </div>
              <AddToCart id={data._id} name={data.title} price={data.price} type='Artwork' />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
