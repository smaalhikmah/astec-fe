import Layout from '@/components/layout/Layout';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { step2 } from '@/lib/zod';
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
import toast from 'react-hot-toast';

export default function StepTwo() {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const router = useRouter();
  const { stepTwo, setData } = useFormStore();
  const form = useForm<StepTwoData>({
    resolver: zodResolver(step2),
    defaultValues: {
      anggota: [
        {
          namaLengkap: stepTwo?.anggota[0].namaLengkap || '',
          noTelpon: stepTwo?.anggota[0].noTelpon || '',
          email: stepTwo?.anggota[0].email || '',
          scanKartuPelajar: stepTwo?.anggota[0].scanKartuPelajar || [],
          foto:
            stepTwo?.anggota[0].foto || (null as unknown as File | undefined),
        },
      ],
    },
  });
  function onSubmit(data: StepTwoData) {
    if (data.anggota.length < 12) {
      return toast.error('Pastikan semua data anggota terisi');
    }
    setData({ step: 2, data });
    router.push('/competition/registration/step-3');
  }

  const itemElements: JSX.Element[] = [];

  for (let i = 0; i < 11; i++) {
    itemElements.push(
      <AccordionItem key={i} value={`item-${i}`}>
        <AccordionTrigger
          className={`${form.formState.errors.anggota?.[i] !== undefined && 'text-red-500'}`}
        >
          Anggota {`${i + 1}`}
        </AccordionTrigger>
        <AccordionContent className='p-3'>
          <FormField
            control={form.control}
            name={`anggota.${i}.namaLengkap`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder='Nama...' {...field} />
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
            name={`anggota.${i}.noTelpon`}
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
            name={`anggota.${i}.email`}
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
            name={`anggota.${i}.scanKartuPelajar`}
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
            {stepTwo ? (
              <ImagePreview image={stepTwo?.anggota[0].scanKartuPelajar[0]} />
            ) : (
              <div className='inline-flex items-center justify-between'>
                <div className='p-3 bg-slate-200  justify-center items-center flex'>
                  sasa
                </div>
              </div>
            )}
          </div>
          <FormField
            control={form.control}
            name={`anggota.${i}.foto`}
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
                      setSelectedImage(e.target.files?.[0] || null);
                    }}
                    ref={field.ref}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                  {}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </AccordionContent>
      </AccordionItem>,
    );
  }

  return (
    <Layout header='sticky'>
      <div className='layout w-full flex justify-center items-center flex-col'>
        <div>
          <p className='h1 '>Daftar Anggota</p>
        </div>

        <div>{}</div>

        <Accordion type='single' collapsible className='w-3/4'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-2'
            >
              {itemElements}
              <Button type='submit'>Lanjut</Button>
            </form>
          </Form>
        </Accordion>
      </div>
    </Layout>
  );
}
