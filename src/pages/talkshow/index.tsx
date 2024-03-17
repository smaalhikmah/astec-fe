import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import Seo from '@/components/Seo';
import useAuthStore from '@/store/useAuthStore';
import { CompetitionData } from '@/components/data/Competition';
import { Skeleton } from '@/components/ui/skeleton';

export default function Index() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const data = CompetitionData.find((item) => item.path === '/talkshow');

  return (
    <Layout header='sticky'>
      <Seo templateTitle='Talkshow' />
      <main>
        <section className=''>
          <div className='layout'>
            <Image
              src='/images/film.webp'
              alt='Competition Banner'
              height={300}
              width={1200}
              className='rounded-lg'
              onLoad={() => setLoading(false)}
            />
            {loading && (
              <div className='flex items-center justify-center h-[300px]'>
                <Skeleton className='w-full h-full' />
              </div>
            )}
            <h1 className='mt-8 text-4xl font-bold'>Film Talk</h1>
            <span className='text-sm text-slate-400'>
              The Soul of Cinematography
            </span>
            <hr className='mt-4 dark:border-gray-600' />

            <section className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8 grid'>
              <article className=' mx-auto w-full transition-colors '>
                <h1 className='mt-4'>Deskripsi</h1>
                <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'></p>
                <div className='grid md:grid-cols-3 gap-y-4 md:gap-y-0 justify-center'>
                  {data?.images.map((image, index) => {
                    return (
                      <Image
                        key={index}
                        src={image}
                        alt='Competition Banner'
                        height={300}
                        width={300}
                        className='rounded-lg'
                      />
                    );
                  })}
                </div>
              </article>

              <div className='py-4 text-justify'>
                <div className='md:sticky top-36 md:flex md:flex-col space-y-2 '>
                  <div>
                    <p className='h3'>Contact Person : </p>

                    <p className='italic break-all'>almi: +6281331102142</p>
                  </div>

                  {!user && (
                    <p className='italic text-red-700 font-bold animate-pulse'>
                      Login untuk mendaftar
                    </p>
                  )}
                  <Button
                    disabled={!user}
                    variant='default'
                    onClick={() => {
                      router.push('talkshow/registration');
                    }}
                  >
                    Daftar Film Talk
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </Layout>
  );
}
