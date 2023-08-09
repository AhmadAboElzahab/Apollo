import { Blurhash } from 'react-blurhash';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function OptimizedImage({ src, blurHash }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className='blurhash-wrapper'>
      {loaded ? null : (
        <>
          <Blurhash hash={blurHash} width='100%' height='100%' />
        </>
      )}

      <div className='relative'>
        <img
          className=' object-cover rounded-t-lg bg-cover h-[300px] w-full absolute z-[9] image'
          src={src}
          style={{ display: !loaded ? 'none' : 'block' }}
          alt={''}
          loading='lazy'
          onLoad={() => setLoaded(true)}
        />
        <img
          className=' object-cover rounded-t-lg bg-cover h-[300px] w-full blur-xl image  '
          style={{ display: !loaded ? 'none' : 'block' }}
          src={src}
          alt={''}
          loading='lazy'
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
