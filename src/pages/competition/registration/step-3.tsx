import Layout from '@/components/layout/Layout';
import React, { useEffect } from 'react';
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
import { step3 } from '@/lib/zod';
import useFormStore from '@/store/useFormStore';
import { useRouter } from 'next/router';
import { StepThreeData } from '@/types/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

export default function StepThree() {
  // const [selectedImage, setSelectedImage] = useState({
  //   scan: null as File | null,
  //   foto: null as File | null,
  // });

  const router = useRouter();
  const { stepOne, stepTwo, setData } = useFormStore();
  const form = useForm<StepThreeData>({
    resolver: zodResolver(step3),
    defaultValues: {
      pembimbing: [
        {
          nama: '',
          email: '',
        },
      ],
    },
  });
  const { fields, append } = useFieldArray({
    name: 'pembimbing',
    control: form.control,
    rules: {
      maxLength: 2,
    },
  });
  function onSubmit(data: StepThreeData) {
    setData({ step: 3, data });
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
  });

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
            <div className='flex space-x-4'>
              <Button
                onClick={() => {
                  router.push('/competition/registration/step-2');
                }}
              >
                Kembali
              </Button>
              <Button
                onClick={() => {
                  append({ nama: '', email: '' });
                }}
              >
                tambah
              </Button>

              <Button type='submit'>Lanjut</Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
}
