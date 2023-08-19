import React, { useState, useEffect } from 'react';
import apollo from '../assets/apollo.png';
import ShopMain from './ShopMain';

export default function Home() {
  return (
    <div className='cn'>
      <div className='h-screen m-0 relative overflow-hidden  sec'>
        <div className='flex flex-col items-center justify-center text-6xl text-center mt-[100px]'>
          <h1 className='bounce-in-left text-white'> All Assets </h1>

          <h2 className='bounce-in-right font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
            in One Place
          </h2>
        </div>
        <div className='p-0 flex flex-col justify-center items-center text-white'>
          <div className='absolute bottom-0'>
            <img
              src={apollo}
              alt=''
              className='h-auto main_image max-w-full w-[80%] sm:w-[500px] md:w-[500px] lg:w-[600px]'
            />
          </div>
        </div>
      </div>

      <div className='h-screen  m-0 sec pt-20'>
        <ShopMain />
      </div>
      <div className='h-screen  m-0 sec pt-20'></div>
    </div>
  );
}
