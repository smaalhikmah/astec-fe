import Layout from '@/components/layout/Layout';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { talkshows } from '@/lib/zod';
import withAuth from '@/components/hoc/withAuth';
import { z } from 'zod';

import { DevTool } from '@hookform/devtools';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ImagePreview from '@/components/form/ImagePreview';
import { FaImage } from 'react-icons/fa6';
import { formatCurrency } from '@/lib/utils';

export default withAuth(Registration, 'optional');
function Registration() {
  const [selectedImage, setSelectedImage] = useState({
    scan: null as File | null,
    foto: null as File | null,
  });

  const form = useForm<z.infer<typeof talkshows>>({
    mode: 'onTouched',
    resolver: zodResolver(talkshows),
    defaultValues: {
      data_diri: [
        {
          nama: '',
          email: '',
          nomor: '',
          jenisKelamin: '',
          kodePromo: '',
        },
      ],
      bukti_tf: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'data_diri',
    control: form.control,
    rules: {
      maxLength: 3,
      minLength: 1,
    },
  });
  function onSubmit(data: z.infer<typeof talkshows>) {
    // eslint-disable-next-line no-console
    console.log(data);
    // router.push('/competition/registration/step-2');
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form]);
  return (
    <Layout header='sticky'>
      <div className='layout flex justify-center items-center flex-col'>
        <div>
          <p className='h1 '>Form pendaftaran talkshow</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='md:w-1/3 w-full space-y-4'
          >
            {fields.map((field, index) => (
              <div key={index}>
                <p className='h3'>Data diri pendaftar {index + 1}</p>
                <FormField
                  control={form.control}
                  name={`data_diri.${index}.nama`}
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
                  name={`data_diri.${index}.nomor`}
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
                  name={`data_diri.${index}.email`}
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
                  name={`data_diri.${index}.jenisKelamin`}
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
                  name={`data_diri.${index}.kodePromo`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode promo</FormLabel>
                      <FormDescription>
                        Masukkan kode promo jika ada
                      </FormDescription>
                      <FormControl>
                        <Input placeholder='xxxx' {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <div className='flex justify-between'>
              {fields.length < 3 && (
                <Button
                  onClick={() => {
                    append({
                      nama: '',
                      email: '',
                      nomor: '',
                      jenisKelamin: '',
                      kodePromo: '',
                    });
                  }}
                >
                  tambah tiket
                </Button>
              )}
              <div className='flex space-x-4'></div>
              {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                fields.length > 1 && (
                  <div className='flex space-x-4'>
                    <Button
                      variant='destructive'
                      onClick={() => {
                        remove(fields.length - 1);
                      }}
                    >
                      hapus
                    </Button>
                  </div>
                )
              }
            </div>

            <div>
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
                name='bukti_tf'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bukti pembayaran </FormLabel>
                    <FormDescription>
                      Anda harus membayar sebersar{' '}
                      {formatCurrency(100000 * fields.length)}
                      <br></br>
                      Bank: BRI No
                      <br></br>
                      Rek: 030701131750500
                      <br></br>
                      A/N: Azita Zahwa Zahida Asmoro
                    </FormDescription>
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
            </div>

            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              type='submit'
            >
              Lanjut
            </Button>
          </form>
        </Form>
      </div>
      <DevTool control={form.control} />
    </Layout>
  );
}
