import Layout from '@/components/layout/Layout';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

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
import { StepTwoData } from '@/types/form';
import ImagePreview from '@/components/form/ImagePreview';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FaImage } from 'react-icons/fa';
import { deleteImage } from '@/lib/utils';
import 'yet-another-react-lightbox/styles.css';
import { step2 } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@/components/button/Alert';
import InputImage from '@/components/button/InputImage';
import Seo from '@/components/Seo';
import toast from 'react-hot-toast';
import { DevTool } from '@hookform/devtools';

export default function StepTwo() {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { stepTwo, setData } = useFormStore();
  const form = useForm<StepTwoData>({
    resolver: zodResolver(step2),
    defaultValues: {
      anggota: [
        ...(stepTwo?.anggota || [
          {
            isKetua: false,
            nomorIdentitas: stepTwo?.anggota[0].nomorIdentitas || '',
            namaLengkap: stepTwo?.anggota[0].namaLengkap || '',
            noTelpon: stepTwo?.anggota[0].noTelpon || '',
            email: stepTwo?.anggota[0].email || '',
            scanKartuPelajar: stepTwo?.anggota[0].scanKartuPelajar || {
              file: null as File | null,
              url: '',
            },
            foto: stepTwo?.anggota[0].foto || {
              file: null as File | null,
              url: '',
            },
            buktiFollow: stepTwo?.anggota[0].buktiFollow || {
              file: null as File | null,
              url: '',
            },
          },
        ]),
      ],
    },
    mode: 'all',
  });
  const { fields, append, remove } = useFieldArray({
    name: 'anggota',
    control: form.control,
    rules: {
      maxLength: 11,
    },
  });

  function addAnggota() {
    if (form.getValues('anggota').length > 10) {
      return toast.error('Maksimal 11 anggota hihi');
    }
    append({
      isKetua: false,
      nomorIdentitas: '',
      namaLengkap: '',
      noTelpon: '',
      email: '',
      scanKartuPelajar: {
        file: null,
        url: '',
      },
      foto: {
        file: null,
        url: '',
      },
      buktiFollow: {
        file: null,
        url: '',
      },
    });
  }

  function onSubmit(data: StepTwoData) {
    if (data.anggota.length < 11) {
      return toast.error('Pastikan semua data anggota terisi');
    }
    setData({ step: 2, data });
    router.push('/competition/registration/step-3');
  }

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  return (
    <>
      {!loading && (
        <Layout header='sticky'>
          <Seo templateTitle='step-2' />
          <div className='layout min-h-screen flex items-center flex-col'>
            <div>
              <p className='h1 '>Daftar Anggota</p>
            </div>
            <p>{form.getValues('anggota').length}</p>

            <Accordion type='single' collapsible className='w-3/4 h-screen'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='w-full space-y-8 flex flex-col justify-between relative '
                >
                  {fields.map((field, i) => (
                    <div
                      key={i}
                      className='flex flex-row-reverse justify-between items-center'
                    >
                      <AccordionItem
                        className='w-full'
                        key={i}
                        value={`item-${i}`}
                      >
                        <AccordionTrigger
                          className={`${form.formState.errors.anggota?.[i] !== undefined && 'text-red-500'} relative`}
                        >
                          <>
                            <div>
                              {' '}
                              Anggota {`${i + 1}`}
                              {i === 0 ? (
                                <div className='absolute top-3 -right-24 flex flex-col text-white '>
                                  <Button
                                    type='button'
                                    variant='ghost'
                                    onClick={() => addAnggota()}
                                  >
                                    Tambah
                                  </Button>
                                </div>
                              ) : (
                                <div className='absolute top-3 -right-24 flex flex-col space-y-2 '>
                                  <Button
                                    type='button'
                                    variant='ghost'
                                    onClick={() => addAnggota()}
                                  >
                                    Tambah
                                  </Button>
                                  <Alert
                                    onclick={() => remove(i)}
                                    placeholder='Hapus'
                                    message='Tindakan ini tidak dapat dibatalkan,pastikan anda yakin'
                                    variant='default'
                                    className='bg-red-500 hover:bg-red-600'
                                  />
                                </div>
                              )}
                            </div>
                          </>
                        </AccordionTrigger>
                        <AccordionContent className='p-3'>
                          <FormField
                            control={form.control}
                            name={`anggota.${i}.nomorIdentitas`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  NISN/NIK/NOMOR KARTU PELAJAR
                                </FormLabel>
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
                            name={`anggota.${i}.namaLengkap`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nama Lengkap</FormLabel>
                                <FormControl>
                                  <Input placeholder='Nama...' {...field} />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`anggota.${i}.noTelpon`}
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
                            name={`anggota.${i}.email`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='example@gmail.com'
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div
                            className={`flex pt-4 md:flex-[1] h-[fit-content] md:p-4 md:justify-between md:flex-row 
                        
            `}
                          ></div>
                          <FormField
                            control={form.control}
                            name={`anggota.${i}.scanKartuPelajar`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Foto Kartu Pelajar </FormLabel>
                                {form.getValues(
                                  `anggota.${i}.scanKartuPelajar.file`,
                                ) ? (
                                  <ImagePreview
                                    url={URL.createObjectURL(
                                      form.getValues(
                                        `anggota.${i}.scanKartuPelajar.file`,
                                      ) as File,
                                    )}
                                    onDelete={() =>
                                      deleteImage(
                                        `anggota.${i}.scanKartuPelajar`,
                                        form,
                                      )
                                    }
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
                                      name: `anggota.${i}.scanKartuPelajar`,
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <div
                            className={`flex pt-4 md:flex-[1] h-[fit-content] md:p-4 md:justify-between md:flex-row 
                        
            `}
                          ></div>
                          <FormField
                            control={form.control}
                            name={`anggota.${i}.foto`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Foto Formal </FormLabel>
                                {form.getValues(`anggota.${i}.foto.file`) ? (
                                  <ImagePreview
                                    url={URL.createObjectURL(
                                      form.getValues(
                                        `anggota.${i}.foto.file`,
                                      ) as File,
                                    )}
                                    onDelete={() =>
                                      deleteImage(`anggota.${i}.foto`, form)
                                    }
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
                                      name: `anggota.${i}.foto`,
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <div
                            className={`flex pt-4 md:flex-[1] h-[fit-content] md:p-4 md:justify-between md:flex-row 
                        
            `}
                          ></div>
                          <FormField
                            control={form.control}
                            name={`anggota.${i}.buktiFollow`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bukti Follow Instagram </FormLabel>
                                {form.getValues(
                                  `anggota.${i}.buktiFollow.file`,
                                ) ? (
                                  <ImagePreview
                                    url={URL.createObjectURL(
                                      form.getValues(
                                        `anggota.${i}.buktiFollow.file`,
                                      ) as File,
                                    )}
                                    onDelete={() =>
                                      deleteImage(
                                        `anggota.${i}.buktiFollow.file`,
                                        form,
                                      )
                                    }
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
                                      name: `anggota.${i}.buktiFollow`,
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  ))}

                  <div
                    className='
              flex justify-between items-center space-x-2 
              '
                  >
                    {stepTwo ? (
                      <Button
                        type='button'
                        onClick={() => router.push('/competition/registration')}
                      >
                        Kembali
                      </Button>
                    ) : (
                      <Alert
                        onclick={() => router.push('/competition/registration')}
                        message='Datanya belum disimpan nanti hilang, yakin ingin kembali?'
                        placeholder='Kembali'
                      />
                    )}

                    <Button type='submit'>Lanjut</Button>
                  </div>
                </form>
              </Form>
            </Accordion>
          </div>
          <DevTool control={form.control} />
        </Layout>
      )}
    </>
  );
}
