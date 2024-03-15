/* eslint-disable unused-imports/no-unused-vars */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import toast, { Toaster } from 'react-hot-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import api from '@/lib/axios-helper';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import { Button } from './ui/button';
import useAdminStore from '@/store/useAdminStore';

type Variant = 'LOGIN' | 'REGISTER';

const AdminAuthForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const login = useAdminStore.useLogin();

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onTouched',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    let tempToken: string;
    toast.promise(
      api
        .post(`admin/auth`, data)
        .then((res) => {
          setIsLoading(false);
          const token = res.data.data.token;
          tempToken = token;
          localStorage.setItem('adminToken', token);
          return token;
        })
        .then((user) => {
          login(user);
          // setIsLoading(false);
          // return user.data;
        }),
      // .then((user) => {
      //   if (user.role === 'User') return router.push('/');
      //   return router.push('/admin');
      // }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Successfully logged in',
      },
    );
  };

  return (
    <div className=' sm:mx-auto sm:w-full sm:max-w-md'>
      <Toaster />
      <div className='px-4 bg-card py-8 border shadow sm:px-10 rounded-lg'>
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='username'
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
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='****' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button disabled={isLoading} className='w-full' type='submit'>
                LOGIN
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminAuthForm;
