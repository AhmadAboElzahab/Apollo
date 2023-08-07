import { Boundary } from '../boundary';
import EditBeat from './EditBeat';
export default function Beats() {
  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20'>
      <div className='rounded-lg bg-black p-3.5 lg:p-6'>
        <Boundary labels={['Categories']} size='small'>
          <div className='prose prose-sm prose-invert max-w-none'>
            <table className='table-auto'>
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
                  <td></td>
                </tr>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>1961</td>
                  <td>
                    <EditBeat />
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>1961</td>
                  <td>
                    <EditBeat />
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Boundary>
      </div>
    </div>
  );
}
