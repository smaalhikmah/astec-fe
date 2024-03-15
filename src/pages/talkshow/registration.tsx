import React from 'react';
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

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FaImage } from 'react-icons/fa6';
import { deleteImage, formatCurrency } from '@/lib/utils';
import 'yet-another-react-lightbox/styles.css';
import Layout from '@/components/layout/Layout';
import ImagePreview from '@/components/form/ImagePreview';
import Alert from '@/components/button/Alert';
import toast from 'react-hot-toast';
import api from '@/lib/axios-helper';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import Seo from '@/components/Seo';
import { DevTool } from '@hookform/devtools';
import { useRouter } from 'next/router';
import InputImage from '@/components/button/InputImage';

export default withAuth(Registration, 'optional');
function Registration() {
  const router = useRouter();

  const form = useForm<z.infer<typeof talkshows>>({
    mode: 'onTouched',
    resolver: zodResolver(talkshows),
    defaultValues: {
      data_diri: [
        {
          nama: '',
          email: '',
          nomorTelepon: '',
          jenisKelamin: '',
          kodePromo: '',
        },
      ],
      bukti_tf: {
        file: null,
        url: '',
      },
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
    const form = new FormData();
    form.append('bukti', data.bukti_tf.file as File);
    form.append('data_diri', JSON.stringify(data.data_diri));

    toast.promise(
      api
        .post(`talkshow/join`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          setTimeout(() => {
            router.push('/success');
          }, 2000);
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Yayyy kamu berhasil memesan tiket talkshow',
      },
    );
  }

  // useEffect(() => {
  //   if (form.formState.isSubmitSuccessful) {
  //     form.reset();
  //   }
  // }, [form]);

  return (
    <Layout header='sticky'>
      <Seo templateTitle='Pendaftaran Talkshow' />
      <div className='layout flex justify-center items-center flex-col'>
        <div>
          <p className='h2'>Form pendaftaran talkshow</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='md:w-1/2 w-full space-y-4'
          >
            {fields.map((field, index) => (
              <div key={index}>
                <p className='h3 pt-4'>Data diri pendaftar {index + 1}</p>

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
                  name={`data_diri.${index}.nomorTelepon`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>No telpon</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='08...'
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
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
                            <SelectValue placeholder='Pilih jenis Kelamin' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='male'>Laki-laki</SelectItem>
                          <SelectItem value='female'>Perempuan</SelectItem>
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
                      nomorTelepon: '',
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
                    <Alert onclick={() => remove(fields.length - 1)} />
                  </div>
                )
              }
            </div>

            <div>
              <p className='h3 pt-4'>Bukti Pembayaran</p>
              <div
                className={`flex justify-center items-center md:flex-[1] h-[fit-content]
                        
            `}
              ></div>
              <FormField
                control={form.control}
                name='bukti_tf'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bukti pembayaran </FormLabel>
                    {form.getValues('bukti_tf.file') ? (
                      <ImagePreview
                        url={URL.createObjectURL(
                          form.getValues('bukti_tf.file') as File,
                        )}
                        onDelete={() => deleteImage('bukti_tf', form)}
                      />
                    ) : (
                      <div className='flex items-center justify-between'>
                        <div className='p-3 bg-slate-200  justify-center items-center flex'>
                          <FaImage size={40} />
                        </div>
                      </div>
                    )}
                    <FormDescription>
                      Anda harus membayar sebersar{' '}
                      {formatCurrency(100000 * fields.length)}
                      <br></br>
                      Bank: BRI
                      <br></br>
                      No Rek: 030701131750500
                      <br></br>
                      A/N: Azita Zahwa Zahida Asmoro
                    </FormDescription>
                    <FormControl>
                      <InputImage
                        form={form}
                        field={{
                          ...field,
                          name: 'bukti_tf',
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={form.formState.isSubmitting} type='submit'>
              Lanjut
            </Button>
          </form>
        </Form>
      </div>
      <DevTool control={form.control} />
    </Layout>
  );
}
