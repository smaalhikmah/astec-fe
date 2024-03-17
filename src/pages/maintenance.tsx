import Image from 'next/image';
import React from 'react';

export default function maintenance() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center hero'>
      <div className='-mb-10'>
        <Image
          src='/images/logonobg.png'
          alt='hero'
          width={300}
          height={300}
          className='-mb-8'
        />
      </div>
      <p className='h1 text-white animate-pulse'>Coming Soon</p>
      <p className='text-white mb-8 h3'>
        We're working hard to bring you something amazing. Stay tuned!
      </p>
    </div>
  );
}
