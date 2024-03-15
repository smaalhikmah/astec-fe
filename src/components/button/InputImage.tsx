/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { Input } from '../ui/input';
import { ACCEPTED_IMAGE_MIME_TYPES } from '@/lib/zod';
import { uploadImage } from '@/lib/utils';
import { Button } from '../ui/button';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

interface InputImageProps {
  form: UseFormReturn<any>;
  field: ControllerRenderProps<any>;
}
export default function InputImage({ form, field }: InputImageProps) {
  const hiddenInputRef = useRef(null as HTMLInputElement | null);
  const preview = form.getValues(field.name);

  return (
    <>
      <Input
        autoFocus
        className='hidden'
        type='file'
        id='fileInput'
        accept={ACCEPTED_IMAGE_MIME_TYPES.join(',')}
        onBlur={field.onBlur}
        name={field.name}
        onChange={async (e) => {
          uploadImage(e.target.files?.[0] as File, form, field.name);
        }}
        ref={(e) => {
          field.ref, (hiddenInputRef.current = e);
        }}
      />
      <Button type='button' onClick={() => hiddenInputRef.current?.click()}>
        {preview.file !== null
          ? 'Change Image'
          : 'Upload Image' ?? 'Upload Image'}
      </Button>
    </>
  );
}
