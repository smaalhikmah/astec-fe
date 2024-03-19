import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import withAuth from '@/components/hoc/withAuth';
import useAuthStore from '@/store/useAuthStore';
import { Skeleton } from '@/components/ui/skeleton';
import Seo from '@/components/Seo';
import { Competition } from '@/types/competition';
import { CompetitionData } from '@/components/data/Competition';
import Link from 'next/link';
import { BookText } from 'lucide-react';

export default withAuth(Index, 'optional');
function Index() {
  const { user } = useAuthStore();
  const { query } = useRouter();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [competition, setCompetition] = useState<Competition>();

  useEffect(() => {
    if (query.slug) {
      const data = CompetitionData.find(
        (item) => item.path.split('/')[2] === query.slug,
      );
      if (!data) {
        router.push('/404');
      }
      setCompetition(data);
    }
  }, [query.slug, router]);
  return (
    <Layout>
      <Seo templateTitle={competition?.title} />
      <main>
        {competition && (
          <section className='mt-5'>
            <div className='layout'>
              <Image
                src={competition.image}
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
              <h1 className='mt-8 text-4xl font-bold'>{competition.title}</h1>

              <p className='text-sm text-gray-600 dark:text-gray-300'>
                {competition.gender}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                {competition.grade}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                {competition.participants > 1
                  ? `${competition.participants} Orang/Team`
                  : 'Individu'}
              </p>

              <hr className='mt-4 dark:border-gray-600' />

              <section className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8 grid'>
                <article className=' mx-auto w-full transition-colors space-y-2'>
                  <h1 className='mt-4'>Deskripsi</h1>
                  <p className='mt-2 text-sm text-gray-600 dark:text-gray-300 text-justify break-all'>
                    {competition.description}
                  </p>
                  <div className='grid md:grid-cols-3 gap-y-4 justify-center'>
                    {competition.images.map((image, index) => {
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

                  {/* <h1 className='mt-4'>Hadiah</h1>
                  <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                    {competition.prize}
                  </p> */}
                </article>

                <div className='py-4 text-justify'>
                  <div className='md:sticky top-36 md:flex md:flex-col space-y-2 '>
                    <div className='flex justify-center items-center'>
                      <BookText size={100} />
                    </div>

                    <div className='flex flex-col text-center space-y-4 md:space-y-0'>
                      <strong>Guide Book</strong>
                      <Button variant='default'>
                        <Link
                          href='/pdf/guidebook.pdf'
                          target='_blank'
                          rel='noopener noreferrer'
                          locale={false}
                          download
                        >
                          Download
                        </Link>
                      </Button>
                      <br />
                    </div>
                    <div>
                      <p className='h3'>Contact Person : </p>
                      {competition.contact.map((item, index) => {
                        return (
                          <p key={index} className='italic break-all'>
                            {item}
                          </p>
                        );
                      })}
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
                        router.push(`/competition/registration`);
                      }}
                    >
                      Daftar Lomba
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
