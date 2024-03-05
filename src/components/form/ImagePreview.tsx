import Image from 'next/image';
import React from 'react';

interface imagePreview {
  image: Blob | MediaSource;
}
export default function ImagePreview({ image }: imagePreview) {
  return (
    <div className='md:max-w-[200px]'>
      <Image
        src={URL.createObjectURL(image)}
        alt='Selected'
        width={100}
        height={100}
      />
    </div>
  );
}
