import { Boundary } from '../../boundary';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then((response) => response.json());
export default function Codes() {
  const { data, error } = useSWR('/api/admin/promo', fetcher);
  console.log(data);

  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20'>
      <div className='rounded-lg bg-black p-3.5 lg:p-6'>
        <Boundary labels={['Promo Codes']} size='small'>
          <div className='prose prose-sm prose-invert max-w-none'>
            <table className='table-auto'>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Value</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((d) => (
                    <tr>
                      <td>{d.code}</td>
                      <td>{d.value}</td>
                      <th>Edit</th>
                      <th>Delete</th>
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
