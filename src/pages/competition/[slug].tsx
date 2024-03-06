import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import withAuth from '@/components/hoc/withAuth';
import useAuthStore from '@/store/useAuthStore';
import { Skeleton } from '@/components/ui/skeleton';
import Seo from '@/components/Seo';

export default withAuth(Index, 'optional');
function Index() {
  const { user } = useAuthStore();
  const { query } = useRouter();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  return (
    <Layout>
      <Seo templateTitle={query.slug?.toString()} />
      <main>
        <section className='mt-5'>
          <div className='layout'>
            <Image
              src='/images/hero.jpg'
              alt='Competition Banner'
              height={300}
              width={1200}
              className='rounded-lg'
              onLoadingComplete={() => setLoading(false)}
            />
            {loading && (
              <div className='flex items-center justify-center h-[300px]'>
                <Skeleton className='w-full h-full' />
              </div>
            )}
            <h1 className='mt-8 text-4xl font-bold'>Lomba futsal</h1>
            <time dateTime='2020-12-12' className='text-sm text-slate-600'>
              {format(parseISO('2020-12-12'), 'LLLL d, yyyy')}
            </time>
            <hr className='mt-4 dark:border-gray-600' />

            <section className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8 grid'>
              <article className=' mx-auto w-full transition-colors dark:prose-invert text-justify'>
                <h1 className='mt-4'>Deskripsi</h1>
                <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                  quidem, voluptas, quibusdam, doloremque, voluptates
                  exercitationem delectus nemo quae quia quod fuga dignissimos
                  repellendus. Quisquam, quos, voluptate, quod, nesciunt
                  consequuntur. lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Quos quidem, voluptas, quibusdam,
                  doloremque, voluptates exercitationem delectus nemo quae quia
                  quod fuga dignissimos repellendus. Quisquam, quos, voluptate,
                  quod, nesciunt consequuntur.
                </p>

                <h1 className='mt-4'>Hadiah</h1>
                <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                  quidem, voluptas, quibusdam, doloremque, voluptates
                  exercitationem delectus nemo quae quia quod fuga dignissimos
                  repellendus. Quisquam, quos, voluptate, quod, nesciunt
                  consequuntur. Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Quos quidem, voluptas, quibusdam,
                  doloremque, voluptates exercitationem delectus nemo quae quia
                  quod fuga dignissimos repellendus. Quisquam, quos, voluptate,
                  quod, nesciunt consequuntur.
                </p>
              </article>

              <div className='py-4 text-justify'>
                <div className='md:sticky top-36 md:flex md:flex-col space-y-2 '>
                  <div className='flex justify-center items-center'>
                    <Image
                      src='/images/hero.jpg'
                      alt='Competition Banner'
                      height={200}
                      width={200}
                      className='rounded-lg'
                    />
                  </div>

                  <div className='flex flex-col text-center'>
                    <strong>Guide Book</strong>
                    <Button variant='default'>Download</Button>
                    <br />
                    <span className='text-sm text-gray-600 dark:text-gray-300 text-justify'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quos quidem, voluptas, quibusdam, doloremque, voluptates
                      exercitationem delectus nemo quae quia quod fuga
                      dignissimos repellendus. Quisquam, quos, voluptate, quod,
                      nesciunt consequuntur.
                    </span>
                  </div>

                  <p className='italic'>contact person : 99786696986</p>
                  {!user && (
                    <p className='italic text-red-700 font-bold animate-pulse'>
                      Login untuk mendaftar
                    </p>
                  )}
                  <Button
                    disabled={!user}
                    variant='default'
                    onClick={() => {
                      router.push(
                        '/competition/registration?competition=bola-voli',
                        '/competition/registration',
                      );
                    }}
                  >
                    Daftar Lomba
                  </Button>

                  <div className='flex items-center justify-center py-8'></div>
                </div>
              </div>
            </section>

            <div className='mt-8 flex flex-col items-start gap-4 md:flex-row-reverse md:justify-between'></div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
