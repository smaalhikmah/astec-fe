import Layout from '@/components/layout/Layout';
import React, { useState } from 'react';
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
import { talkshow } from '@/lib/zod';
import ImagePreview from '@/components/form/ImagePreview';
import withAuth from '@/components/hoc/withAuth';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default withAuth(Registration, 'optional');
function Registration() {
  const [selectedImage, setSelectedImage] = useState({
    scan: null as File | null,
    foto: null as File | null,
  });

  const form = useForm<z.infer<typeof talkshow>>({
    mode: 'onTouched',
    resolver: zodResolver(talkshow),
    defaultValues: {
      nama: '',
      email: '',
      nomor: '',
      jenisKelamin: '',
      metode: '',
      kodePromo: '',
      jumlahTiket: 1,
      bukti: '',
    },
  });
  function onSubmit(data: z.infer<typeof talkshow>) {
    // eslint-disable-next-line no-console
    console.log(data);
    // router.push('/competition/registration/step-2');
  }

  return (
    <Layout header='sticky'>
      <div className='layout w-full flex justify-center items-center flex-col'>
        <div>
          <p className='h1 '>Form pendaftaran talkshow</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-1/3 space-y-2'
          >
            <FormField
              control={form.control}
              name='nama'
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='nomor'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No telpon</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='08...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
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
              name='jenisKelamin'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>jenis Kelamin</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Pilih jenis kelamin' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='laki-laki'>Laki-Laki</SelectItem>
                      <SelectItem value='perempuan'>Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='kodePromo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode promo</FormLabel>
                  <FormControl>
                    <Input placeholder='SMA Konoha 1' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='jumlahTiket'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah tiket</FormLabel>
                  <FormDescription>
                    Jumlah tiket minimal 1 tiket
                  </FormDescription>
                  <FormControl>
                    <Input type='number' placeholder='1..' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='metode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metode Pembayaran</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Pilih jenis kelamin' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='laki-laki'>Laki-Laki</SelectItem>
                      <SelectItem value='perempuan'>Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div
              className={`flex  md:flex-[1] h-[fit-content] md:p-4 md:justify-between md:flex-row 
                        
            `}
            >
              {selectedImage.scan ? (
                <ImagePreview image={selectedImage?.scan} />
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
              name='bukti'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bukti pembayaran </FormLabel>
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
