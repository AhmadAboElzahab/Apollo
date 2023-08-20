import { Blurhash } from 'react-blurhash';
import { useState } from 'react';

export default function OptimizedImage({ src, blurHash,styleName ,rounded }) {
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
          className={` object-cover rounded-t-lg bg-cover w-full absolute z-[9] ${styleName} ${rounded} `}
          src={src}
          style={{ display: !loaded ? 'none' : 'block' }}
          alt={''}
          onLoad={() => setLoaded(true)}
        />
        <img
          className={` object-cover rounded-t-lg bg-cover  w-full blur-xl ${styleName}`}
          style={{ display: !loaded ? 'none' : 'block' }}
          src={src}
          alt={''}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
