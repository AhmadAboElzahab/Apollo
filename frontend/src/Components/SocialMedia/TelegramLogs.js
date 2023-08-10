import { Boundary } from '../boundary';

import useSWR from 'swr';
import DeleteItem from '../DeleteItem';

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function LyricsComponent() {
  const { data, error } = useSWR('/api/admin/Telegram', fetcher);

  if (error) {
    return <>{error}</>;
  }
  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20 '>
      <div className='rounded-lg bg-black  p-3.5 pt-8 lg:p-6'>
        <Boundary labels={['Lyrics']} size='small'>
          <div className='prose prose-sm prose-invert max-w-none'>
            <table className='table-auto'>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Body</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((d) => (
                    <tr key={d._id}>
                      <td>
                        <div
                          className={(() => {
                            switch (d.type) {
                              case 'promo':
                                return 'text-xs text-center uppercase px-2 py-1 bg-purple-800/25 text-purple-800 rounded-full';
                              case 'Lyrics':
                                return 'text-xs text-center uppercase px-2 py-1 bg-yellow-700/25 text-orange-800 rounded-full';
                              case 'Beat':
                                return 'text-xs text-center uppercase px-2 py-1 bg-red-800/25 text-red-800 rounded-full';
                              case 'Artwork':
                                return 'text-xs text-center uppercase px-2 py-1 bg-blue-800/25 text-blue-800 rounded-full';
                              default:
                                return 'text-xs text-center uppercase px-2 py-1 bg-purple-800/25 text-purple-800 rounded-full';
                            }
                          })()}
                        >
                          {d.type}
                        </div>
                      </td>
                      <td>{d.body}</td>
                      <td>
                        <DeleteItem Id={d._id} URL='/api/admin/Telegram' />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Boundary>
      </div>
    </div>
  );
}
