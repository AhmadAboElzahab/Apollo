import { useContext } from 'react';
import { useCart } from '../Hooks/useCart'; // Import your CartContext
export default function AddToCart({ id, name, price, type }) {
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
    <button onClick={handleAddToCart} className='hover:underline'>
      Add to Cart
    </button>
  );
}
