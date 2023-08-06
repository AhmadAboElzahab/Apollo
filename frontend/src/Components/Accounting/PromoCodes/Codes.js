import { Boundary } from '../../boundary';
import useSWR from 'swr';

export default function Codes() {
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
                <tr>
                  <th>Code</th>
                  <th>Value</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </tbody>
            </table>
          </div>
        </Boundary>
      </div>
    </div>
  );
}
