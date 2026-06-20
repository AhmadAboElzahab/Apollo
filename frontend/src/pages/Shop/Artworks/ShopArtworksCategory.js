import useSWR from 'swr';
import AddToCart from '../../../Components/AddToCart';
import OptimizedImage from '../../../Components/OptimizedImage';
import CardAction from '../../../Components/CardAction';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { apiUrl, assetsUrl } from '../../../api';
const fetcher = (url) => fetch(url, { credentials: 'include' }).then((response) => response.json());
export default function ShopArtworksCategory() {
  const { category } = useParams();
  const { data, error } = useSWR(apiUrl(`/api/shop/getProducts/Artworks/${category}`), fetcher);

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
                src={assetsUrl(d.art)}
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
                  {category}
                </p>
                <br />
                <p className='hover:underline cursor-pointer'>
                  <Link to={d.id}>Check</Link>
                </p>
              </div>

              <div className=' ml-[auto] flex flex-col items-center justify-between w-28'>
                <div>
                  <CardAction
                    d={d}
                    type='Artwork'
                    url={apiUrl(`/api/shop/getProducts/Artworks/${category}`)}
                  />
                  <p className='text-center'> {d.likes?.length}</p>
                </div>
                <AddToCart id={d.id} name={d.title} price={d.price} type='Artwork' />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
