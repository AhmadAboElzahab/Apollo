import { Boundary } from '../../boundary';
import useSWR from 'swr';
import { apiUrl } from '../../../api';
import DeleteItem from '../../DeleteItem';
import EditPromo from './EditPromo';
import ShareToTelegram from '../../SocialMedia/ShareToTelegram';
const fetcher = (url) => fetch(url, { credentials: 'include' }).then((r) => r.json());
export default function Codes() {
  const { data, error } = useSWR(apiUrl('/api/admin/Promo'), fetcher);

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
                  <th className='text-center'>Share</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((d) => (
                    <tr key={d._id}>
                      <td>{d.code}</td>
                      <td>{d.value}</td>
                      <td>
                        <EditPromo codeId={d._id} codeValue={d.value} />
                      </td>
                      <td>
                        <DeleteItem URL={apiUrl('/api/admin/Promo')} Id={d._id} />
                      </td>
                      <td className='text-center'>
                        <ShareToTelegram type='SharePromo' id={d._id} />
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
