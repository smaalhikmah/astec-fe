import Image from 'next/image';
import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import NextJsImage from './NextJsImage';
import { Trash2Icon } from 'lucide-react';
import Tippy from '../button/Tippy';

interface ImagePreviewProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  url: string;
  onDelete: () => void;
}
function ImagePreview({ url, onDelete }: ImagePreviewProps) {
  const [openLightbox, setOpenLightbox] = React.useState(false);
  return (
    <>
      <Lightbox
        controller={{
          closeOnBackdropClick: true,
        }}
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
      <div className='relative w-fit'>
        <Image
          src={url}
          alt='bukti transfer'
          width={200}
          height={200}
          onClick={() => setOpenLightbox(true)}
          className='cursor-pointer'
        />
        <Tippy text='Hapus gambar'>
          <Trash2Icon
            className='cursor-pointer absolute top-0 right-0 text-red-600'
            onClick={onDelete}
          />
        </Tippy>
      </div>
    </>
  );
}

export default ImagePreview;
