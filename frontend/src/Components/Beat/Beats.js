import { Boundary } from '../boundary';
import EditBeat from './EditBeat';
import DeleteBeat from './DeleteBeat';
export default function Beats() {
  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20'>
      <div className='rounded-lg bg-black p-3.5 lg:p-6'>
        <Boundary labels={['Categories']} size='small'>
          <div className='prose prose-sm prose-invert max-w-none'>
            <table class='table-auto'>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>1961</td>
                  <td>
                    <EditBeat />
                  </td>
                  <td>
                    <DeleteBeat />
                  </td>
                </tr>{' '}
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>1961</td>
                  <td>
                    <EditBeat />
                  </td>
                  <td>
                    <DeleteBeat />
                  </td>
                </tr>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>1961</td>
                  <td>
                    <EditBeat />
                  </td>
                  <td>
                    <DeleteBeat />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Boundary>
      </div>
    </div>
  );
}
