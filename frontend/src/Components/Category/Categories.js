import DeleteItem from '../DeleteItem';
import { Boundary } from '../boundary';
import EditCategory from './EditCategory';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function Categories() {
  const { data, error } = useSWR('/api/admin/Category', fetcher);

  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20'>
      <div className='rounded-lg bg-black p-3.5 lg:p-6'>
        <Boundary labels={['Categories']} size='small'>
          <div className='prose prose-sm prose-invert max-w-none'>
            <table className='table-auto'>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((d) => (
                    <tr key={d._id}>
                      <td>{d.title}</td>
                      <td>{d.type}</td>
                      <td>
                        <EditCategory
                          categoryId={d._id}
                          categoryTitle={d.title}
                          categoryType={d.type}
                        />
                      </td>
                      <td>
                        <DeleteItem
                          Id={d._id}
                          URL='/api/admin/Category'
                          errMessage='Category Holds Items'
                        />
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
