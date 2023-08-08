import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { BsPause, BsPlay } from 'react-icons/bs';

const WavesurferComponent = ({ audioUrl }) => {
  const wavesurferRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const wavesurferInstance = WaveSurfer.create({
        container: containerRef.current,
        responsive: true,
        waveColor: '#a21caf',
        progressColor: '#4a044e',
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
        height: '70',
      });

      wavesurferInstance.load(audioUrl);

      wavesurferRef.current = wavesurferInstance;

      wavesurferInstance.on('play', () => {
        setIsPlaying(true);
      });

      wavesurferInstance.on('pause', () => {
        setIsPlaying(false);
      });

      return () => {
        wavesurferInstance.destroy();
      };
    }
  }, [audioUrl]);

  const togglePlayback = (e) => {
    e.preventDefault();
    const wavesurferInstance = wavesurferRef.current;

    if (!isPlaying) {
      wavesurferInstance.play();
    } else {
      wavesurferInstance.pause();
    }
  };

  return (
    <>
      <div className='relative'>
        <div className='wavesurfer-container p-8 w-full m-auto'>
          <div ref={containerRef} className='w-full h-full p-0' id='waveform' />
        </div>
        <div className='bg-gradient-to-r from-fuchsia-800 to-fuchsia-500 absolute w-[80%] left-[10%] h-[20%] top-[35%]  blur-3xl '></div>
        <button
          className='text-white bg-black hover:bg-zinc-900 p-2 text-3xl  rounded-full absolute left-[35%] top-[35%] z-[5] md:left-[45%] lg:left-[45%]'
          onClick={togglePlayback}
        >
          {isPlaying ? <BsPause /> : <BsPlay className='pl-1' />}
        </button>
      </div>
    </>
  );
};

export default WavesurferComponent;
