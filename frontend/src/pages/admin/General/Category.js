import AddCategory from '../../../Components/Category/AddCategory';
import Categories from '../../../Components/Category/Categories';
import PageHeader from '../../../Components/PageHeader';
import { useDocumentTitle } from '../../../Hooks/useDocumentTitle';

export default function Category() {
  const [documentTitle, setDoucmentTitle] = useDocumentTitle('Category');

  return (
    <>
      <PageHeader title='Category' />
      <div className=' my-5 w-full flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0 gap-4 '>
        <div className=' order-2  lg:w-2/3  lg:order-1'>
          <Categories />
        </div>

        <div className='order-1  lg:w-1/3  lg:order-2'>
          <AddCategory />
        </div>
      </div>
    </>
  );
}
