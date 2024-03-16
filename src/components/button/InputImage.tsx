/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { Input } from '../ui/input';
import { ACCEPTED_IMAGE_MIME_TYPES } from '@/lib/zod';
import { uploadImage } from '@/lib/utils';
import { Button } from '../ui/button';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { ImSpinner8 } from 'react-icons/im';

interface InputImageProps {
  form: UseFormReturn<any>;
  field: ControllerRenderProps<any>;
}
export default function InputImage({ form, field }: InputImageProps) {
  const hiddenInputRef = useRef(null as HTMLInputElement | null);
  const preview = form.getValues(field.name);
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      {/* <FormLabel>Surat Rekomendasi </FormLabel>
      {form.getValues('suratRekomendasi.file') ? (
        <ImagePreview
          url={URL.createObjectURL(
            form.getValues('suratRekomendasi.file') as File,
          )}
          onDelete={() => deleteImage('suratRekomendasi', form)}
        />
      ) : (
        <div className='flex items-center justify-between'>
          <div className='p-3 bg-slate-200  justify-center items-center flex'>
            <FaImage size={40} />
          </div>
        </div>
      )} */}
      <Input
        autoFocus
        className='hidden'
        type='file'
        id='fileInput'
        accept={ACCEPTED_IMAGE_MIME_TYPES.join(',')}
        onBlur={field.onBlur}
        name={field.name}
        onChange={async (e) => {
          uploadImage(
            e.target.files?.[0] as File,
            form,
            field.name,
            setLoading,
          );
        }}
        ref={(e) => {
          field.ref, (hiddenInputRef.current = e);
        }}
      />
      <p className='text-gray-500 italic text-xs'>File Maksimal 1MB</p>
      <Button
        disabled={loading}
        type='button'
        onClick={() => hiddenInputRef.current?.click()}
      >
        {!loading ? (
          preview.file !== null ? (
            'Change Image'
          ) : (
            'Upload Image'
          )
        ) : (
          <ImSpinner8 className='animate-spin' />
        )}
      </Button>
    </>
  );
}
