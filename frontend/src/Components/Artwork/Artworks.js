import { Boundary } from '../boundary';
import { Popover, Transition } from '@headlessui/react';
import EditArtwork from './EditArtwork';
import { FiChevronDown } from 'react-icons/fi';

import useSWR from 'swr';
import DeleteItem from '../DeleteItem';
import OptimizedImage from '../OptimizedImage';
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
                    <div className=' ml-[auto]'>
                      <Popover>
                        <Popover.Button className='flex '>
                          <span>Options</span>

                          <FiChevronDown className='text-xl' />
                        </Popover.Button>

                        <Popover.Panel>
                          <DeleteItem Id={d._id} URL='/api/admin/Artwork' />
                          <EditArtwork a={d} />
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Boundary>
      </div>
    </div>
  );
}
