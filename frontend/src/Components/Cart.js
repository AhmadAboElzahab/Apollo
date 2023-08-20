import { BsCart } from 'react-icons/bs';
export default function Cart() {
  return (
    <div>
      <button className='fixed bottom-0 flex flex-row justify-center left-0  w-screen lg:w-72 p-5 '>
        <BsCart size={40} className='mr-3' />
      </button>
    </div>
  );
}
