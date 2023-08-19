import useSWR from 'swr';
import OptimizedImage from '../../Components/OptimizedImage';
const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function ShopArtworks() {
  const { data, error } = useSWR('/api/admin/Artwork', fetcher);

  if (error) {
    return <>{error}</>;
  }
  return (
    <div className='grid lg:grid-cols-3 place-items-center text-white	gap-16 relative top-0 left-0 p-5'>
      {data &&
        data.map((d) => (
          <div class='w-full bg-black border border-gray-800 rounded-lg shadow'>
            <div
              className='flex flex-row flex-wrap gap-x-[10px] gap-y-[2em] visible'
              style={{ contentVisibility: 'visible' }}
            >
              <OptimizedImage
                src={`http://localhost:4000/artworks/${d.art}`}
                blurHash={d.blurHash}
              />
            </div>
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
                  {' '}
                  <span className='text-gray-400'>Price : </span>
                  {d.price}
                </p>
                <p>
                  <span className='text-gray-400'>Category : </span>
                  {d.category}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
