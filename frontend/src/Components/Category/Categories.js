import { Boundary } from '../boundary';
import DeleteCategory from './DeleteCategory';
import EditCategory from './EditCategory';

export default function Categories() {
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
                    <EditCategory />
                  </td>
                  <td>
                    <DeleteCategory />
                  </td>
                </tr>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>1961</td>
                  <td>
                    <EditCategory />
                  </td>
                  <td>
                    <DeleteCategory />
                  </td>
                </tr>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>1961</td>
                  <td>
                    <EditCategory />
                  </td>
                  <td>
                    <DeleteCategory />
                  </td>
                </tr>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>1961</td>
                  <td>
                    <EditCategory />
                  </td>
                  <td>
                    <DeleteCategory />
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
