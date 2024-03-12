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
import { Competition } from '@/types/competition';

interface Props<T extends Competition> {
  data: T;
}
export default function Cards<T extends Competition>({ data }: Props<T>) {
  const router = useRouter();
  return (
    <div className='md:w-[350px] md:h-[550px] h-[450px] w-[300px] shadow-lg rounded-lg overflow-hidden'>
      <Card className='h-full max-h-full p-0'>
        <CardHeader>
          <div>
            <Image src='/images/hero.jpg' alt='hero' width={400} height={300} />
          </div>
          <CardTitle>
            <p className='h3 font-bold'>{data.title}</p>
          </CardTitle>
        </CardHeader>
        <CardContent className='md:h-48 h-36 overflow-hidden text-pretty text-justify'>
          <p className=' text-gray-500'>{data.description}</p>
        </CardContent>
        <CardFooter>
          <ArrowButton
            variant='button'
            className='bg-gray-900 text-white'
            onClick={() =>
              // router.push(
              //   '/competition/registration?competition=bola-voli',
              //   '/competition/registration',
              // )
              router.push(`${data.path}`)
            }
            href='/'
          >
            Read More
          </ArrowButton>
        </CardFooter>
      </Card>
    </div>
  );
}
