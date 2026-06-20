import useSWR from 'swr';
import WavesurferComponent from '../../../Components/WavesurferComponent';
import CardAction from '../../../Components/CardAction';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AddToCart from '../../../Components/AddToCart';
import { apiUrl, assetsUrl } from '../../../api';

const fetcher = (url) => fetch(url, { credentials: 'include' }).then((response) => response.json());

export default function ShopBeatsCategory() {
  const { category } = useParams();

  const { data, error } = useSWR(apiUrl(`/api/shop/getProducts/Beats/${category}`), fetcher);
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
          <div className='w-full border border-gray-800 rounded-lg shadow bg-black' key={d.id}>
            <WavesurferComponent audioUrl={assetsUrl(d.Audio)} />
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
                  <CardAction d={d} type='Audio' url={apiUrl(`/api/shop/getProducts/Beats/${category}`)} />
                  <p className='text-center'> {d.likes?.length}</p>
                </div>
                <AddToCart id={d.id} name={d.title} price={d.price} type='Beat' />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
