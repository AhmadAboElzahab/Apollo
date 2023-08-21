import { useContext } from 'react';
import { useCart } from '../Hooks/useCart'; // Import your CartContext
export default function AddToCart({ id, name, price }) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD',
      payload: {
        id,
        name,
        price,
        type,
      },
    });
  };
  return (
    <button onClick={handleAddToCart} className='bg-red-500'>
      Add to Cart
    </button>
  );
}
