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
          <div className='grid lg:grid-cols-2 place-items-center text-white	gap-7'>
            {data &&
              data.map((d) => (
                <div class='w-full border border-gray-800 rounded-lg shadow'>
                  <img
                    className=' object-cover rounded-t-lg bg-cover h-[300px] w-full '
                    src={`http://localhost:4000/artworks/${d.art}`}
                    alt={d.title}
                  />

                  <div class='py-3 px-3 text-sm'>
                    <p>
                      <span className='text-gray-400'>Title : </span>
                      {d.title}
                    </p>
                    <p> Title : {d.description}</p>
                    <p> Title : {d.price}</p>
                    <p> Title : {d.category}</p>
                  </div>
                </div>
              ))}
          </div>
        </Boundary>
      </div>
    </div>
  );
}
