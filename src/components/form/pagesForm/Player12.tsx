import React from 'react';
import { useForm } from 'react-hook-form';
import { FaImage } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useFormStore from '@/store/useFormStore';
import { useRouter } from 'next/router';
import { StepOneData } from '@/types/form';
import ImagePreview from '@/components/form/ImagePreview';
import Seo from '@/components/Seo';
import 'yet-another-react-lightbox/styles.css';

import { DevTool } from '@hookform/devtools';
import { step1 } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteImage } from '@/lib/utils';
import InputImage from '@/components/button/InputImage';
interface Player12Props {
  lomba: string;
  harga: string;
}
export default function Player12({ lomba, harga }: Player12Props) {
  const router = useRouter();
  const { stepOne, setData } = useFormStore();

  const form = useForm<StepOneData>({
    mode: 'onTouched',
    resolver: zodResolver(step1),
    defaultValues: {
      harga: harga,
      lomba: stepOne?.lomba || lomba,
      nomorIdentitasKetua: '212121',
      namaLengkapKetua: stepOne?.namaLengkapKetua || 'sasasa',
      noTelponKetua: stepOne?.noTelponKetua || '232312',
      emailKetua: stepOne?.emailKetua || 'dasdas@sasa.com',
      provinsiSekolah: stepOne?.provinsiSekolah || 'dsdas',
      asalSekolah: stepOne?.asalSekolah || 'dasdsa',
      scanKartuPelajarKetua: stepOne?.scanKartuPelajarKetua || {
        file: null as File | null,
        url: '',
      },
      fotoKetua: stepOne?.fotoKetua || {
        file: null as File | null,
        url: '',
      },
      buktiFollow: stepOne?.buktiFollow || {
        file: null as File | null,
        url: '',
      },
    },
  });
  function onSubmit(data: StepOneData) {
    setData({ step: 1, data });
    router.push('/competition/registration/step-2');
  }
  // useEffect(() => {
  //   if (stepOne) {
  //     setSelectedImage({
  //       scan: stepOne.scanKartuPelajarKetua?.[0] as File,
  //       foto: stepOne.fotoKetua?.[0] as File,
  //     });
  //     form.setValue('scanKartuPelajarKetua', stepOne.scanKartuPelajarKetua);
  //     form.setValue('fotoKetua', stepOne.fotoKetua);
  //   }
  // }, [form, stepOne]);

  return (
    <>
      <Seo templateTitle='Pendaftaran' />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='md:w-1/2 w-full space-y-2'
        >
          <p className='h3 pt-4'>Data diri Ketua </p>
          <span>ketua otomatis menjadi pemain 1</span>
          <FormField
            control={form.control}
            name='nomorIdentitasKetua'
            render={({ field }) => (
              <FormItem>
                <FormLabel>NISN/NIK/NOMOR KARTU PELAJAR</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='NISN/NIK/NOMOR KARTU PELAJAR...'
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='namaLengkapKetua'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder='Nama...' {...field} value={field.value} />
                </FormControl>

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

                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className={`flex  md:flex-[1] h-[fit-content] md:justify-between md:flex-row 
                        
            `}
          ></div>
          <FormField
            control={form.control}
            name='scanKartuPelajarKetua'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kartu </FormLabel>
                {form.getValues('scanKartuPelajarKetua.file') ? (
                  <ImagePreview
                    url={URL.createObjectURL(
                      form.getValues('scanKartuPelajarKetua.file') as File,
                    )}
                    onDelete={() => deleteImage('scanKartuPelajarKetua', form)}
                  />
                ) : (
                  <div className='flex items-center justify-between'>
                    <div className='p-3 bg-slate-200  justify-center items-center flex'>
                      <FaImage size={40} />
                    </div>
                  </div>
                )}
                <FormControl>
                  <InputImage
                    form={form}
                    field={{
                      ...field,
                      name: 'scanKartuPelajarKetua',
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div
            className={`flex  md:flex-[1] h-[fit-content] md:justify-between md:flex-row 
                        
            `}
          ></div>
          <FormField
            control={form.control}
            name='fotoKetua'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foto Formal </FormLabel>
                {form.getValues('fotoKetua.file') ? (
                  <ImagePreview
                    url={URL.createObjectURL(
                      form.getValues('fotoKetua.file') as File,
                    )}
                    onDelete={() => deleteImage('fotoKetua', form)}
                  />
                ) : (
                  <div className='flex items-center justify-between'>
                    <div className='p-3 bg-slate-200  justify-center items-center flex'>
                      <FaImage size={40} />
                    </div>
                  </div>
                )}
                <FormControl>
                  <InputImage
                    form={form}
                    field={{
                      ...field,
                      name: 'fotoKetua',
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className={`flex  md:flex-[1] h-[fit-content] md:justify-between md:flex-row 
                        
            `}
          ></div>
          <FormField
            control={form.control}
            name='buktiFollow'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bukti Follow Instagram </FormLabel>
                {form.getValues('buktiFollow.file') ? (
                  <ImagePreview
                    url={URL.createObjectURL(
                      form.getValues('buktiFollow.file') as File,
                    )}
                    onDelete={() => deleteImage('buktiFollow', form)}
                  />
                ) : (
                  <div className='flex items-center justify-between'>
                    <div className='p-3 bg-slate-200  justify-center items-center flex'>
                      <FaImage size={40} />
                    </div>
                  </div>
                )}
                <FormControl>
                  <InputImage
                    form={form}
                    field={{
                      ...field,
                      name: 'buktiFollow',
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Lanjut</Button>
        </form>
      </Form>
      <DevTool control={form.control} />
    </>
  );
}
