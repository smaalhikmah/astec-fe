import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import React from 'react';
import { format, parseISO } from 'date-fns';

export default function Index() {
  return (
    <Layout>
      <main>
        <section className=''>
          <div className='layout'>
            <Image
              src='/images/hero.jpg'
              alt='Competition Banner'
              height={300}
              width={1200}
              className='rounded-lg'
            />
            <h1 className='mt-8 text-4xl font-bold'>Lomba futsal</h1>
            <time dateTime='2020-12-12' className='text-sm text-slate-600'>
              {format(parseISO('2020-12-12'), 'LLLL d, yyyy')}
            </time>
            <hr className='mt-4 dark:border-gray-600' />

            <section className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8'>
              <article className=' mx-auto w-full transition-colors dark:prose-invert'>
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

              <aside className='py-4'>
                <div className='md:sticky top-36 hidden md:flex md:flex-col'>
                  <Image
                    src='/images/hero.jpg'
                    alt='Competition Banner'
                    height={200}
                    width={200}
                    className='rounded-lg'
                  />
                  <p>
                    <strong>Penyelenggara</strong>

                    <br />
                    <span className='text-sm text-gray-600 dark:text-gray-300'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quos quidem, voluptas, quibusdam, doloremque, voluptates
                      exercitationem delectus nemo quae quia quod fuga
                      dignissimos repellendus. Quisquam, quos, voluptate, quod,
                      nesciunt consequuntur.
                    </span>
                  </p>
                  <div className='flex items-center justify-center py-8'></div>
                </div>
              </aside>
            </section>

            <div className='mt-8 flex flex-col items-start gap-4 md:flex-row-reverse md:justify-between'></div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
