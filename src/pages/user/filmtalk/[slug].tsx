import Seo from '@/components/Seo';
import ImagePreview from '@/components/admin/ImagePreview';
import Layout from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/axios-helper';
import { DetailTalkShowProfile } from '@/types/type';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import 'yet-another-react-lightbox/styles.css';

function Index() {
  const [userTicket, setUserTicket] = React.useState<DetailTalkShowProfile>();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { slug } = router.query;

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`talkshow/order/${slug}`);
        setUserTicket(res.data.data);
      } catch (err) {
        toast.error('oops, something went wrong');
      }
    }
    if (slug) {
      fetchData();
    }
  }, [slug]);
  return (
    <Layout>
      <Seo templateTitle='Ticket' />
      <main>
        <section>
          <div className='layout p-2 space-y-4'>
            {userTicket ? (
              <>
                <p className='h1 text-center'>Detail Peserta Film Talk</p>

                <div className='flex justify-between'>
                  <div className='space-y-4'>
                    <div>
                      <p className='h2'>Detail </p>
                      {/* <p>Asal Sekolah: {userTicket.order.asalSekolah}</p>
                      <p>Provinsi Sekolah: {userTicket.order.provinsiSekolah}</p> */}
                    </div>

                    <div>
                      <p className='h2'>Bukti Pembayaran</p>
                      <ImagePreview
                        open={open}
                        setOpen={setOpen}
                        url={userTicket.order.buktiTf}
                      />
                    </div>
                  </div>
                  <div className='flex space-x-4'>
                    <p className='h2'>
                      Status:{' '}
                      <span>
                        {userTicket.order.approved ? 'Disetujui' : 'Pending'}
                      </span>
                    </p>
                    {userTicket.order.ticketURL && (
                      <Button variant='link'>
                        <Link
                          href={userTicket.order.ticketURL}
                          target='_blank'
                          rel='noopener noreferrer'
                          locale={false}
                          download
                        >
                          Download Tiket
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <p className='h2'>Peserta</p>
                  <Accordion type='single' collapsible className='w-full'>
                    {userTicket.participants.map((peserta, index) => {
                      return (
                        <AccordionItem key={index} value={`item-${index + 1}`}>
                          <AccordionTrigger className='h3'>
                            peserta {index + 1}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div>
                              <p className='h4'>Nama Lengkap</p>
                              <Input disabled value={peserta.name} />
                            </div>
                            <div>
                              <p className='h4'>Email</p>
                              <Input disabled value={peserta.email} />
                            </div>
                            <div>
                              <p className='h4'>Nomor Telepon</p>
                              <Input disabled value={peserta.nomorTelepon} />
                            </div>
                            <div>
                              <p className='h4'>Jenis Kelamin</p>
                              <Input disabled value={peserta.gender} />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              </>
            ) : (
              <p>loading</p>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Index;
