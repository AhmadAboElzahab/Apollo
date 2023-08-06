import { Boundary } from '../boundary';

import useSWR from 'swr';
import DeleteLyrics from './DeleteLyrics';
import AddLyrics from './AddLyrics';
import ViewLyrics from './ViewLyrics';
import EditLyrics from './EditLyrics';
const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function LyricsComponent() {
  const { data, error } = useSWR('/api/admin/Lyrics', fetcher);

  if (error) {
    return <>{error}</>;
  }
  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20 relative'>
      <AddLyrics />
      <div className='rounded-lg bg-black  p-3.5 pt-8 lg:p-6'>
        <Boundary labels={['Lyrics']} size='small'>
          <div className='prose prose-sm prose-invert max-w-none'>
            <table className='table-auto'>
              <thead>
                <tr>
                  <th>Lyrics</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>View</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((d) => (
                    <tr key={d._id}>
                      <td>{d.title}</td>
                      <td>{d.category}</td>
                      <td>{d.price}</td>
                      <td>
                        <ViewLyrics l={d} />
                      </td>
                      <td>
                        <EditLyrics l={d} />
                      </td>
                      <td>
                        <DeleteLyrics LyricId={d._id} />
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
