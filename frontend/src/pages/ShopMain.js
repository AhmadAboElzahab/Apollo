import { useEffect } from 'react';
import Card from '../Components/Card';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { BsSoundwave } from 'react-icons/bs';
import { LuListMusic } from 'react-icons/lu';
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

    const cardsElement = document.getElementById('cards');
    if (cardsElement) {
      cardsElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (cardsElement) {
        cardsElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div id='cards' className='flex flex-wrap gap-4 w-full place-content-center mx-auto p-10  '>
      <Card>
        <BsSoundwave className='text-gray-400 mx-auto' size='200' />
        <h1 className='text-5xl mx-auto text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
          Beats
        </h1>
        <p className='mx-auto text-center mt-10'>
          Get The Latest and Most Amazing
          <br /> Beats Here..
        </p>
      </Card>
      <Card>
        <HiOutlinePhoto className='text-gray-400 mx-auto' size='200' />
        <h1 className='text-5xl mx-auto text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-yellow-200'>
          Artwork
        </h1>
        <p className='mx-auto text-center mt-10'>
          Get The Latest and Most Amazing
          <br /> Artworks Here..
        </p>
      </Card>
      <Card>
        <LuListMusic className='text-gray-400 mx-auto' size='200' />
        <h1 className='text-5xl mx-auto text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500'>
          Lyrics
        </h1>
        <p className='mx-auto text-center mt-10'>
          Get The Latest and Most Amazing
          <br /> Lyrics Here..
        </p>
      </Card>
    </div>
  );
}
