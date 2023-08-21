import { Boundary } from '../boundary';
import { Popover, Transition } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';
import useSWR from 'swr';
import EditBeat from './EditBeat';
import WavesurferComponent from '../WavesurferComponent';
import DeleteItem from '../DeleteItem';
import ShareToTelegram from '../SocialMedia/ShareToTelegram';

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function Beats() {
  const { data, error } = useSWR('/api/admin/audio', fetcher);
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
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20'>
      <div className='rounded-lg bg-black p-3.5 lg:p-6'>
        <Boundary labels={['Beats']} size='small'>
          <div className='grid lg:grid-cols-2 place-items-center text-white	gap-16 relative top-0 left-0 p-5'>
            {data &&
              data.map((d) => (
                <div className='w-full border border-gray-800 rounded-lg shadow'>
                  <WavesurferComponent audioUrl={`/audio/${d.Audio}`} />
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
                          <DeleteItem Id={d._id} URL='/api/admin/audio' />
                          <EditBeat a={d} />
                          <ShareToTelegram type='shareaudio' id={d._id} />
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
