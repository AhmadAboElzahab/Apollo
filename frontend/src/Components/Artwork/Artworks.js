import { Boundary } from '../boundary';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function Artworks() {
  const { data, error } = useSWR('/api/admin/Artwork', fetcher);

  if (error) {
    return <>{error}</>;
  }
  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20'>
      <div className='rounded-lg bg-black p-3.5 lg:p-6'>
        <Boundary labels={['Artworks']} size='small'>
          <div className='grid lg:grid-cols-2 place-items-center text-white	gap-16 relative top-0 left-0 p-5'>
            {data &&
              data.map((d) => (
                <div class='w-full border border-gray-800 rounded-lg shadow'>
                  <div className='relative'>
                    <img
                      className=' object-cover rounded-t-lg bg-cover h-[300px] w-full absolute z-[9]'
                      src={`http://localhost:4000/artworks/${d.art}`}
                      alt={d.title}
                    />
                    <img
                      className=' object-cover rounded-t-lg bg-cover h-[300px] w-full blur-xl  '
                      src={`http://localhost:4000/artworks/${d.art}`}
                      alt={d.title}
                    />
                  </div>
                  <div class='py-3 px-3 text-sm'>
                    <p>
                      <span className='text-gray-400'>Title : </span>
                      {d.title}
                    </p>
                    <p>
                      <span className='text-gray-400'>Description : </span>
                      {d.description.slice(0, 50) + '...'}
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
              ))}
          </div>
        </Boundary>
      </div>
    </div>
  );
}
