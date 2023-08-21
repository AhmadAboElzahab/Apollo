import useSWR from 'swr';
import OptimizedImage from '../../../Components/OptimizedImage';
import { Link } from 'react-router-dom';
import AddToCart from '../../../Components/AddToCart';
import CardAction from '../../../Components/CardAction';

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function ShopArtworks() {
  const { data, error, isLoading } = useSWR('/api/shop/Artwork', fetcher);

  if (isLoading) {
    return <div className='text-6xl text-white'>Loading </div>;
  }
  if (error) {
    return <>{error}</>;
  }
  return (
    <div className='grid lg:grid-cols-3 place-items-center text-white	gap-16 relative top-0 left-0 p-5'>
      {data &&
        data.map((d, index) => (
          <div className='w-full bg-black border border-gray-800 rounded-lg shadow' key={index}>
            <div
              className='flex flex-row flex-wrap gap-x-[10px] gap-y-[2em] visible'
              style={{ contentVisibility: 'visible' }}
            >
              <OptimizedImage
                src={`http://localhost:4000/artworks/${d.art}`}
                blurHash={d.blurHash}
                styleName='image'
              />
            </div>
            <div className='py-3 px-3 text-sm flex flex-row'>
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
                  <Link to={`${encodeURIComponent(d.category.replace(/\s+/g, '-'))}/${d._id}`}>
                    Check
                  </Link>
                </p>
              </div>
              <div className=' ml-[auto] flex flex-col items-center justify-between w-28'>
                <div>
                  <CardAction d={d} type='Artwork' url='/api/shop/Artwork' />
                  <p className='text-center'> {d.likes.length}</p>
                </div>
                <AddToCart id={d._id} name={d.title} price={d.price} type='Artwork' />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
