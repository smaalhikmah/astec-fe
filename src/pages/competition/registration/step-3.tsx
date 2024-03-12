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
import { ACCEPTED_IMAGE_MIME_TYPES, step3, badminton } from '@/lib/zod';
import useFormStore from '@/store/useFormStore';
import { useRouter } from 'next/router';
import { StepThreeData } from '@/types/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { FaImage } from 'react-icons/fa';
import 'yet-another-react-lightbox/styles.css';
import ImagePreview from '@/components/form/ImagePreview';
import { deleteImage, formFormat, uploadImage } from '@/lib/utils';
import Alert from '@/components/button/Alert';
import { z } from 'zod';
import api from '@/lib/axios-helper';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';

export default function StepThree() {
  // const [selectedImage, setSelectedImage] = useState({
  //   scan: null as File | null,
  //   foto: null as File | null,
  // });
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { stepOne, stepTwo, stepThree, setData } = useFormStore();
  const form = useForm<StepThreeData>({
    resolver: zodResolver(step3),
    defaultValues: {
      pembimbing: [
        {
          nama: stepThree?.pembimbing[0]?.nama || '',
          email: stepThree?.pembimbing[0]?.email || '',
        },
        {
          nama: stepThree?.pembimbing[1]?.nama || '',
          email: stepThree?.pembimbing[1]?.email || '',
        },
      ],
      buktiTf: stepThree?.buktiTf || {
        file: null as File | null,
        url: '',
      },
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'pembimbing',
    control: form.control,
    rules: {
      maxLength: 2,
    },
  });
  function onSubmit(data: StepThreeData) {
    setData({ step: 3, data });
    const allData = { ...stepOne, ...stepTwo, ...data };
    const newData: z.infer<typeof badminton> = {
      lomba: allData.lomba as string,
      asalSekolah: allData.asalSekolah as string,
      buktiTf: allData.buktiTf,
      provinsiSekolah: allData.provinsiSekolah as string,
      pembimbing: allData.pembimbing,
      anggota: [
        {
          namaLengkap: allData.namaLengkapKetua as string,
          noTelpon: allData.noTelponKetua as string,
          email: allData.emailKetua as string,
          nomorIdentitas: allData.nomorIdentitasKetua as string,
          scanKartuPelajar: allData.scanKartuPelajarKetua as z.infer<
            typeof badminton
          >['anggota'][0]['scanKartuPelajar'],
          foto: allData.fotoKetua as z.infer<
            typeof badminton
          >['anggota'][0]['foto'],
          buktiFollow: allData.buktiFollow as z.infer<
            typeof badminton
          >['anggota'][0]['buktiFollow'],
          isKetua: true,
        },
        ...(allData.anggota as z.infer<typeof badminton>['anggota']),
      ],
    };
    const formData = formFormat(newData);
    toast.promise(
      api.post('competition/participate', formData).then(() => {
        setTimeout(() => {
          router.push('/success');
        }, 2000);
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Yayy Berhasil mendaftar',
      },
    );

    // router.push('/competition/registration/step-2');
  }
  useEffect(() => {
    if (form.formState.validatingFields.pembimbing) {
      if (form.formState.validatingFields.pembimbing.length > 2) {
        toast.error('sasa');
      }
    }
  }, [form.formState]);

  useEffect(() => {
    if (!stepOne || !stepTwo) {
      toast.custom(' 😔 Data sebelumnya belum lengkap');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout header='sticky'>
      <div className='layout w-full flex justify-center items-center flex-col'>
        <div>
          <p className='h1 '>Daftar Pembimbing</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-1/3 space-y-2'
          >
            {fields.map((field, index) => (
              <div key={index}>
                <p className='h3 pt-4'>Data diri pembimbing {index + 1}</p>
                <FormField
                  control={form.control}
                  name={`pembimbing.${index}.nama`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Pembimbing {index + 1}</FormLabel>
                      <FormDescription />
                      <FormControl>
                        <Input placeholder='Nama...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`pembimbing.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Pembimbing {index + 1}</FormLabel>
                      <FormDescription />
                      <FormControl>
                        <Input placeholder='Nama...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <div className='flex justify-between'>
              {fields.length < 2 && (
                <Button
                  onClick={() => {
                    append({
                      nama: '',
                      email: '',
                    });
                  }}
                >
                  tambah pembimbing
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

            <div
              className={`flex pt-4 md:flex-[1] h-[fit-content] md:p-4 md:justify-between md:flex-row 
                        
            `}
            ></div>
            <FormField
              control={form.control}
              name='buktiTf'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto Kartu Pelajar </FormLabel>
                  {form.getValues('buktiTf.file') ? (
                    <ImagePreview
                      open={open}
                      setOpen={setOpen}
                      url={URL.createObjectURL(
                        form.getValues('buktiTf.file') as File,
                      )}
                      onDelete={() => deleteImage('buktiTf.file', form)}
                    />
                  ) : (
                    <div className='flex items-center justify-between'>
                      <div className='p-3 bg-slate-200  justify-center items-center flex'>
                        <FaImage size={40} />
                      </div>
                    </div>
                  )}
                  <FormControl>
                    <Input
                      type='file'
                      id='fileInput'
                      accept={ACCEPTED_IMAGE_MIME_TYPES.join(',')}
                      onBlur={field.onBlur}
                      name={field.name}
                      onChange={async (e) => {
                        field.onChange({
                          file: e.target.files?.[0] as File,
                          url: await uploadImage(e.target.files?.[0] as File),
                        });
                      }}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex space-x-4'>
              <Button
                onClick={() => {
                  router.push('/competition/registration/step-2');
                }}
              >
                Kembali
              </Button>

              <Button type='submit'>Lanjut</Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
}
