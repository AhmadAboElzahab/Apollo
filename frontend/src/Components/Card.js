import { FiMusic } from 'react-icons/fi';
export default function Card({ children }) {
  return (
    <div className='card'>
      <div className='card-content'>{children}</div>
    </div>
  );
}
