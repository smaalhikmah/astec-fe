import Image from 'next/image';
import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import NextJsImage from '../form/NextJsImage';

interface ImagePreviewProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  url: string;
}
function ImagePreview({ url }: ImagePreviewProps) {
  const [openLightbox, setOpenLightbox] = React.useState(false);
  return (
    <>
      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
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
        onClick={() => setOpenLightbox(true)}
        className='cursor-pointer'
      />
    </>
  );
}

export default ImagePreview;
