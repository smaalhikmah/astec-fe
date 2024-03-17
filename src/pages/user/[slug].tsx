import Seo from '@/components/Seo';
import ImagePreview from '@/components/admin/ImagePreview';
import Layout from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import api from '@/lib/axios-helper';
import { DetailUserTicket } from '@/types/type';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import 'yet-another-react-lightbox/styles.css';

function Index() {
  const [userTicket, setUserTicket] = React.useState<DetailUserTicket>();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { slug } = router.query;

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`competition/order/${slug}`);
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
                <p className='md:h1 h2 text-center'>
                  Detail Peserta Lomba {userTicket.lomba.nama}
                </p>

                <div className='flex justify-between'>
                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <p className='md:h1 h2'>Sekolah</p>
                      <p>Asal Sekolah: {userTicket.order.asalSekolah}</p>
                      <p>
                        Provinsi Sekolah: {userTicket.order.provinsiSekolah}
                      </p>
                    </div>

                    <div className='space-y-2'>
                      <p className='md:h1 h2'>Bukti Pembayaran</p>
                      <ImagePreview
                        open={open}
                        setOpen={setOpen}
                        url={userTicket.order.buktiTf}
                      />
                    </div>

                    <div className='space-y-2'>
                      <p className='md:h1 h2'>Surat Rekomendasi</p>
                      <ImagePreview
                        open={open}
                        setOpen={setOpen}
                        url={userTicket.order.suratRekomendasi}
                      />
                    </div>
                  </div>
                  <div>
                    <p className='md:h1 h2'>
                      Status:{' '}
                      {userTicket.order.approved ? (
                        <span className='text-green-600'>Disetujui</span>
                      ) : (
                        <span className='text-red-600'>Pending</span>
                      )}
                    </p>
                    {userTicket.order.approved && (
                      <div>
                        <Link
                          className='text-left underline'
                          href={userTicket.order.ticketURL}
                          target='_blank'
                          rel='noopener noreferrer'
                          locale={false}
                          download
                        >
                          Download Tiket
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p className='md:h1 h2'>Peserta</p>
                  <Accordion type='single' collapsible className='w-full'>
                    {userTicket.peserta.map((peserta, index) => {
                      return (
                        <AccordionItem key={index} value={`item-${index + 1}`}>
                          <AccordionTrigger className='h3'>
                            peserta {index + 1}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div>
                              <p className='h4'>NISN/NIK/NOMOR KARTU PELAJAR</p>
                              <Input disabled value={peserta.nomorIdentitas} />
                            </div>
                            <div>
                              <p className='h4'>Nama Lengkap</p>
                              <Input disabled value={peserta.namaLengkap} />
                            </div>
                            <div>
                              <p className='h4'>Email</p>
                              <Input disabled value={peserta.email} />
                            </div>
                            <div>
                              <p className='h4'>Foto Formal</p>
                              <ImagePreview
                                open={open}
                                setOpen={setOpen}
                                url={peserta.foto}
                              />
                            </div>
                            <div>
                              <p className='h4'>Scan Kartu Pelajar</p>
                              <ImagePreview
                                open={open}
                                setOpen={setOpen}
                                url={peserta.scanKartuPelajar}
                              />
                            </div>
                            <div>
                              <p className='h4'>Bukti Follow Instagram</p>
                              <ImagePreview
                                open={open}
                                setOpen={setOpen}
                                url={peserta.buktiFollow}
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>

                <div>
                  {
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    userTicket.mentor && userTicket.mentor.length > 0 && (
                      <div>
                        <p className='md:h1 h2'>Pembimbing</p>
                        <Accordion type='single' collapsible className='w-full'>
                          {userTicket.mentor.map((mentor, index) => {
                            return (
                              <AccordionItem
                                key={index}
                                value={`item-${index + 1}`}
                              >
                                <AccordionTrigger className='h3'>
                                  Pembimbing {index + 1}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div>
                                    <p className='h4'>Nomor Identitas</p>
                                    <Input
                                      disabled
                                      value={mentor.nomorIdentitas}
                                    />
                                  </div>
                                  <div>
                                    <p className='h4'>Nama Pembimbing</p>
                                    <Input disabled value={mentor.name} />
                                  </div>
                                  <div>
                                    <p className='h4'>Email Pembimbing</p>
                                    <Input disabled value={mentor.email} />
                                  </div>
                                  <div>
                                    <p className='h4'>Scan KTP</p>
                                    <ImagePreview
                                      open={open}
                                      setOpen={setOpen}
                                      url={mentor.scanKTP}
                                    />
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            );
                          })}
                        </Accordion>
                      </div>
                    )
                  }
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
