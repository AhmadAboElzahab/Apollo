import AddBeat from '../../../Components/Beat/AddBeat';
import Beats from '../../../Components/Beat/Beats';
import PageHeader from '../../../Components/PageHeader';

export default function Beat() {
  return (
    <>
      <PageHeader title='Beat' />
      <div className=' my-5 w-full flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0 gap-4 '>
        <div className=' order-2  lg:w-2/3  lg:order-1'>
          <Beats />
        </div>

        <div className='order-1  lg:w-1/3  lg:order-2'>
          <AddBeat />
        </div>
      </div>
    </>
  );
}
