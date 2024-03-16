import Seo from '@/components/Seo';
import Layout from '@/components/layout/Layout';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import React from 'react';

function Index() {
  const [loading, setLoading] = React.useState(true);
  return (
    <Layout header='home'>
      <Seo templateTitle='About us' />
      <main>
        <section className='min-h-screen md:h-screen w-full hero relative overflow-hidden'>
          <div className='layout flex justify-center'>
            <div className='mt-20 text-center space-y-4'>
              <p className='h1'>About Us</p>
              <div className='w-full'>
                <div>
                  <Image
                    src='/images/posterlomba.webp'
                    width={350}
                    height={350}
                    alt='aboutus'
                    onLoad={() => setLoading(false)}
                  />
                </div>

                {loading && (
                  <div className='flex items-center justify-center h-96 w-72'>
                    <Skeleton className='w-full h-full' />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Index;
