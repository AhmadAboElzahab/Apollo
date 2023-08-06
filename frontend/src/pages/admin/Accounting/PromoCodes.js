import { useDocumentTitle } from '../../../Hooks/useDocumentTitle';
import PageHeader from '../../../Components/PageHeader';
import AddPromo from '../../../Components/Accounting/PromoCodes/AddPromo';
import Codes from '../../../Components/Accounting/PromoCodes/Codes';
export default function PromoCodes() {
  const [documentTitle, setDoucmentTitle] = useDocumentTitle('Promo Codes');

  return (
    <>
      <PageHeader title='Promo Codes' />
      <div className=' my-5 w-full flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0 gap-4 '>
        <div className=' order-2  lg:w-2/3  lg:order-1'>
          <Codes />
        </div>

        <div className='order-1  lg:w-1/3  lg:order-2'>
          <AddPromo />
        </div>
      </div>
    </>
  );
}
