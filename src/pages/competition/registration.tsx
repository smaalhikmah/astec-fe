import Layout from '@/components/layout/Layout';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaImage } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { step1 } from '@/lib/zod';
import useFormStore from '@/store/useFormStore';
import { useRouter } from 'next/router';
import { StepOneData } from '@/types/form';
import ImagePreview from '@/components/form/ImagePreview';
import withAuth from '@/components/hoc/withAuth';
import Seo from '@/components/Seo';

export default withAuth(Registration, 'optional');
function Registration() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    scan: null as File | null,
    foto: null as File | null,
  });

  const router = useRouter();
  const { stepOne, setData } = useFormStore();
  const form = useForm<StepOneData>({
    mode: 'onTouched',
    resolver: zodResolver(step1),
    defaultValues: {
      namaLengkapKetua: stepOne?.namaLengkapKetua || '',
      noTelponKetua: stepOne?.noTelponKetua || '',
      emailKetua: stepOne?.emailKetua || '',
      provinsiSekolah: stepOne?.provinsiSekolah || '',
      asalSekolah: stepOne?.asalSekolah || '',
      scanKartuPelajarKetua:
        stepOne?.scanKartuPelajarKetua ||
        (null as unknown as FileList | undefined),
      fotoKetua:
        stepOne?.fotoKetua || (null as unknown as FileList | undefined),
    },
  });
  function onSubmit(data: StepOneData) {
    setData({ step: 1, data });
    router.push('/competition/registration/step-2');
  }
  useEffect(() => {
    if (stepOne) {
      setSelectedImage({
        scan: stepOne.scanKartuPelajarKetua?.[0] as File,
        foto: stepOne.fotoKetua?.[0] as File,
      });
      form.setValue('scanKartuPelajarKetua', stepOne.scanKartuPelajarKetua);
      form.setValue('fotoKetua', stepOne.fotoKetua);
    }
  }, [form, stepOne]);

  return (
    <Layout header='sticky'>
      <Seo templateTitle='Pendaftaran' />
      <div className='layout w-full flex justify-center items-center flex-col'>
        <div>
          <p className='h1 '>Daftar Ketua</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-1/3 space-y-2'
          >
            <FormField
              control={form.control}
              name='namaLengkapKetua'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Nama...'
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='noTelponKetua'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No telpon</FormLabel>
                  <FormControl>
                    <Input placeholder='08...' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='emailKetua'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='example@gmail.com' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='provinsiSekolah'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asal Provinsi</FormLabel>
                  <FormControl>
                    <Input placeholder='Jawa timur' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='asalSekolah'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asal Sekolah</FormLabel>
                  <FormControl>
                    <Input placeholder='SMA Konoha 1' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div
              className={`flex  md:flex-[1] h-[fit-content] md:p-4 md:justify-between md:flex-row 
                        
            `}
            >
              {selectedImage.scan ? (
                <ImagePreview
                  open={open}
                  setOpen={setOpen}
                  url={URL.createObjectURL(selectedImage.scan)}
                />
              ) : (
                <div className='flex items-center justify-between'>
                  <div className='p-3 bg-slate-200  justify-center items-center flex'>
                    <FaImage size={40} />
                  </div>
                </div>
              )}
            </div>
            <FormField
              control={form.control}
              name='scanKartuPelajarKetua'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kartu </FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      id='fileInput'
                      onBlur={field.onBlur}
                      name={field.name}
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        setSelectedImage({
                          ...selectedImage,
                          scan: e.target.files?.[0] as File,
                        });
                      }}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div
              className={`flex  md:flex-[1] h-[fit-content] md:p-4 md:justify-between md:flex-row 
                        
            `}
            >
              {selectedImage.foto ? (
                <ImagePreview
                  open={open}
                  setOpen={setOpen}
                  url={URL.createObjectURL(selectedImage.foto)}
                />
              ) : (
                <div className='inline-flex items-center justify-between'>
                  <div className='p-3 bg-slate-200  justify-center items-center flex'>
                    <FaImage className='text-2xl' />
                  </div>
                </div>
              )}
            </div>
            <FormField
              control={form.control}
              name='fotoKetua'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto Ketua</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      id='fileInput'
                      onBlur={field.onBlur}
                      name={field.name}
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        setSelectedImage({
                          ...selectedImage,
                          foto: e.target.files?.[0] as File,
                        });
                      }}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Lanjut</Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
}
