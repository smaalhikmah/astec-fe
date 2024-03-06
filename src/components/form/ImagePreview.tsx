import Image from 'next/image';
import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import NextJsImage from './NextJsImage';

interface ImagePreviewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  url: string;
}
function ImagePreview({ open, setOpen, url }: ImagePreviewProps) {
  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          {
            src: url,
            width: 3840,
            height: 5760,
          },
        ]}
        render={{ slide: NextJsImage }}
      />
      <Image
        src={url}
        alt='bukti transfer'
        width={200}
        height={200}
        onClick={() => setOpen(true)}
        className='cursor-pointer'
      />
    </>
  );
}

export default ImagePreview;
