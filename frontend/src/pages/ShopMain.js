import { useEffect } from 'react';
import Card from '../Components/Card';
export default function ShopMain() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    document.getElementById('cards').addEventListener('mousemove', handleMouseMove);

    return () => {
      document.getElementById('cards').removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <div id='cards' className='flex flex-wrap gap-1 w-full place-content-center mx-auto p-10'>
      <Card />
      <Card />
      <Card />
    </div>
  );
}
