import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const WavesurferComponent = ({ audioUrl }) => {
  const wavesurferRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const ctx = document.createElement('canvas').getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 150);
  gradient.addColorStop(0, 'rgb(200, 0, 200)');
  gradient.addColorStop(0.7, 'rgb(100, 0, 100)');
  gradient.addColorStop(1, 'rgb(100, 100, 0)');
  useEffect(() => {
    if (containerRef.current) {
      const wavesurferInstance = WaveSurfer.create({
        container: containerRef.current,
        responsive: true,
        height: 150,
        waveColor: gradient,
        progressColor: 'paleturquoise',
        cursorColor: '#57BAB6',
        cursorWidth: 4,
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
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

  const togglePlayback = () => {
    const wavesurferInstance = wavesurferRef.current;

    if (!isPlaying) {
      wavesurferInstance.play();
    } else {
      wavesurferInstance.pause();
    }
  };

  return (
    <>
      <div className='wavesurfer-container p-8 relative'>
        <div ref={containerRef} id='waveform' />
      </div>
      <button
        className='bg-white text-black text-4xl px-4 py-2 rounded-md'
        onClick={togglePlayback}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </>
  );
};

export default WavesurferComponent;
