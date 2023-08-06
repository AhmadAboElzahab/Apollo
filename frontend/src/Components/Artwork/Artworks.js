import { Boundary } from '../boundary';

export default function Artworks() {
  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20'>
      <div className='rounded-lg bg-black p-3.5 lg:p-6'>
        <Boundary labels={['Artworks']} size='small'>
          <div className='prose prose-sm prose-invert max-w-none'>
            <table className='table-auto'>
              <thead>
                <tr>
                  <th>Artwork</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>1961</td>
                </tr>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>1961</td>
                </tr>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>1961</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Boundary>
      </div>
    </div>
  );
}
