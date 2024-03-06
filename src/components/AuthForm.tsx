/* eslint-disable unused-imports/no-unused-vars */
'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

import toast, { Toaster } from 'react-hot-toast';
import Button from './form/Button';
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

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore.useLogin();

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      img_url: '',
    },
    mode: 'onTouched',
  });

  // async function getImgUrl(files: FileList | null) {
  //   const formData = new FormData();

  //   if (files) {
  //     formData.append('img', files[0]);
  //     const res = await api.post('image/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Accept: 'application/json',
  //       },
  //     });
  //     form.setValue('img_url', res.data.img_url);
  //   }
  // }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    const form = new FormData();
    form.append('email', data.email);
    form.append('password', data.password);
    form.append('name', data.name);
    form.append('image_profile', data.img_url[0]);
    let tempToken: string;
    if (variant === 'REGISTER') {
      toast.promise(
        api
          .post(`auth/register`, form, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            setVariant('LOGIN');
          }),
        {
          ...DEFAULT_TOAST_MESSAGE,
          success: 'Account Successfully Created',
        },
      );
    }
    if (variant === 'LOGIN') {
      toast.promise(
        api
          .post(`auth/login`, data)
          .then((res) => {
            setIsLoading(false);
            const token = res.data.data.token;
            tempToken = token;
            localStorage.setItem('token', token);
            return api.get('auth/me');
          })
          .then((user) => {
            login({
              ...user.data,
              token: tempToken,
            });
            setIsLoading(false);
            return user.data;
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
    }
  };

  return (
    <div className=' sm:mx-auto sm:w-full sm:max-w-md'>
      <Toaster />
      <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            {variant === 'REGISTER' && (
              <>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder='naruto' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
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

            {variant === 'REGISTER' && (
              <FormField
                control={form.control}
                name='img_url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto Profil</FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div>
              <Button disabled={isLoading} fullWidth type='submit'>
                {variant === 'LOGIN' ? 'Sign in' : 'Register'}
              </Button>
            </div>
          </form>
        </Form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center '>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'></div>
          </div>
        </div>
        <div className='flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500 '>
          <div>
            {variant === 'LOGIN'
              ? 'New to Pose Palace?'
              : 'Already have an account?'}
          </div>
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
