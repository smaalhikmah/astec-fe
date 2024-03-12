import React, { useState } from 'react';
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
import { ACCEPTED_IMAGE_MIME_TYPES, badminton } from '@/lib/zod';
import { z } from 'zod';

import { Input } from '@/components/ui/input';

import { FaImage } from 'react-icons/fa6';
import {
  deleteImage,
  formFormat,
  formatCurrency,
  uploadImage,
} from '@/lib/utils';
import 'yet-another-react-lightbox/styles.css';
import ImagePreview from '@/components/form/ImagePreview';
import Alert from '@/components/button/Alert';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import api from '@/lib/axios-helper';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';

interface Player2Props {
  max: number;
  official: boolean;
  lomba: string;
  harga: string;
}
export default function Player2({ max, official, lomba, harga }: Player2Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof badminton>>({
    mode: 'onTouched',
    resolver: zodResolver(badminton),
    defaultValues: {
      lomba: lomba,
      provinsiSekolah: 'dsda',
      asalSekolah: 'dsadsa',
      anggota: [
        {
          nomorIdentitas: '2121',
          namaLengkap: 'dsadsa',
          noTelpon: '2321',
          email: 'ddas@asa.com',
          isKetua: true,
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
        },
        {
          nomorIdentitas: '2321321',
          namaLengkap: 'dasdas',
          noTelpon: '1232321',
          email: 'ddas@asa.com',
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
        },
      ],
      buktiTf: {
        file: null,
        url: '',
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'anggota',
    control: form.control,
    rules: {
      maxLength: max,
      minLength: 1,
    },
  });
  const pembimbing = useFieldArray({
    name: 'pembimbing',
    control: form.control,
    rules: {
      maxLength: 2,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  function onSubmit(data: z.infer<typeof badminton>) {
    const formData = formFormat(data);

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
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='md:w-1/2 w-full space-y-4'
        >
          <p className='h3 pt-4'>Data diri Ketua </p>
          <span>ketua otomatis menjadi pemain 1</span>
          <FormField
            control={form.control}
            name='anggota.0.nomorIdentitas'
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
            name='anggota.0.namaLengkap'
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
            name='anggota.0.email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='example@gmail.com...'
                    {...field}
                    value={field.value}
                    ref={field.ref}
                  />
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
          <p className='h3 pt-4'>Data diri Pemain </p>
          <span>Maksimal Pemain {max}</span>
          {fields.map((field, index) => (
            <div key={index}>
              <p className='h4'>Data diri Pemain {index + 1}</p>
              <FormField
                control={form.control}
                name={`anggota.${index}.nomorIdentitas`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NISN/NIK/NOMOR KARTU PELAJAR</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        disabled={index === 0}
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
                name={`anggota.${index}.namaLengkap`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        disabled={index === 0}
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
                name={`anggota.${index}.noTelpon`}
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
                name={`anggota.${index}.email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={index === 0}
                        placeholder='example@gmail.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <div
                  className={`flex justify-center items-center md:flex-[1] h-[fit-content]
                        
            `}
                ></div>
                <FormField
                  control={form.control}
                  name={`anggota.${index}.scanKartuPelajar`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scan kartu pelajar </FormLabel>
                      {form.getValues(
                        `anggota.${index}.scanKartuPelajar.file`,
                      ) ? (
                        <ImagePreview
                          open={open}
                          setOpen={setOpen}
                          url={URL.createObjectURL(
                            form.getValues(
                              `anggota.${index}.scanKartuPelajar.file`,
                            ) as File,
                          )}
                          onDelete={() =>
                            deleteImage(
                              `anggota.${index}.scanKartuPelajar`,
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
                        <Input
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
                            );
                          }}
                          ref={field.ref}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`anggota.${index}.foto`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Foto Formal </FormLabel>
                      {form.getValues(`anggota.${index}.foto.file`) ? (
                        <ImagePreview
                          open={open}
                          setOpen={setOpen}
                          url={URL.createObjectURL(
                            form.getValues(
                              `anggota.${index}.foto.file`,
                            ) as File,
                          )}
                          onDelete={() =>
                            deleteImage(`anggota.${index}.foto.file`, form)
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
                        <Input
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
                            );
                          }}
                          ref={field.ref}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`anggota.${index}.buktiFollow`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bukti Follow Instagram </FormLabel>
                      {form.getValues(`anggota.${index}.buktiFollow.file`) ? (
                        <ImagePreview
                          open={open}
                          setOpen={setOpen}
                          url={URL.createObjectURL(
                            form.getValues(
                              `anggota.${index}.buktiFollow.file`,
                            ) as File,
                          )}
                          onDelete={() =>
                            deleteImage(
                              `anggota.${index}.buktiFollow.file`,
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
                        <Input
                          type='file'
                          id='fileInput'
                          onBlur={field.onBlur}
                          name={field.name}
                          accept={ACCEPTED_IMAGE_MIME_TYPES.join(',')}
                          onChange={async (e) => {
                            uploadImage(
                              e.target.files?.[0] as File,
                              form,
                              field.name,
                            );
                          }}
                          ref={field.ref}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}

          <div className='flex justify-between'>
            {fields.length < max && (
              <Button
                onClick={() => {
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
                }}
              >
                tambah Pemain
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
          {official && (
            <>
              <p className='h3 pt-4'>Data diri Pembimbing </p>
              <span>Pembimbing maksimal 2</span>
              {pembimbing.fields.map((field, index) => (
                <div key={index}>
                  <p className='h3 pt-4'>Data diri Pembimbing {index + 1}</p>
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
                {pembimbing.fields.length < 2 && (
                  <Button
                    onClick={() => {
                      pembimbing.append({
                        nama: '',
                        email: '',
                      });
                    }}
                  >
                    tambah Pembimbing
                  </Button>
                )}
                <div className='flex space-x-4'></div>
                {
                  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                  pembimbing.fields.length > 1 && (
                    <div className='flex space-x-4'>
                      <Alert
                        onclick={() => pembimbing.remove(fields.length - 1)}
                      />
                    </div>
                  )
                }
              </div>
            </>
          )}

          <div>
            <p className='h3 pt-4'>Bukti Pembayaran</p>
            <div
              className={`flex justify-center items-center md:flex-[1] h-[fit-content]
                        
            `}
            ></div>
            <FormField
              control={form.control}
              name='buktiTf'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bukti pembayaran </FormLabel>
                  {form.getValues('buktiTf.file') ? (
                    <ImagePreview
                      open={open}
                      setOpen={setOpen}
                      url={URL.createObjectURL(
                        form.getValues('buktiTf.file') as File,
                      )}
                      onDelete={() => deleteImage('buktiTf', form)}
                    />
                  ) : (
                    <div className='flex items-center justify-between'>
                      <div className='p-3 bg-slate-200  justify-center items-center flex'>
                        <FaImage size={40} />
                      </div>
                    </div>
                  )}
                  <FormDescription>
                    Anda harus membayar sebersar {formatCurrency(Number(harga))}
                    <br></br>
                    Bank: BRI
                    <br></br>
                    No Rek: 030701131750500
                    <br></br>
                    A/N: Azita Zahwa Zahida Asmoro
                  </FormDescription>
                  <FormControl>
                    <Input
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
                        );
                      }}
                      ref={field.ref}
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
      <DevTool control={form.control} />
    </>
  );
}
