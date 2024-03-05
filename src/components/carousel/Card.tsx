import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import ArrowButton from '../button/ArrowButton';
import { useRouter } from 'next/router';
export default function Cards() {
  const router = useRouter();
  return (
    <div className='w-[350px] h-[550px]shadow-lg rounded-lg '>
      <Card className='h-full bg-white'>
        <CardHeader>
          <Image src='/images/hero.jpg' alt='hero' width={400} height={300} />
          <CardTitle>
            <p className='text-3xl font-bold'>Judul</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-lg text-gray-500'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </CardContent>
        <CardFooter>
          <ArrowButton
            variant='button'
            className='bg-gray-900 text-white'
            onClick={() =>
              router.push(
                '/competition/registration?competition=bola-voli',
                '/competition/registration',
              )
            }
            href='/'
          >
            Register
          </ArrowButton>
        </CardFooter>
      </Card>
    </div>
  );
}
