import { AdminLayout } from '@/components/admin/AdminLayout';
import ImagePreview from '@/components/admin/ImagePreview';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import api from '@/lib/axios-helper';
import { DetailUserData } from '@/types/admin';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import 'yet-another-react-lightbox/styles.css';

function Index() {
  const [dataUser, setDataUser] = React.useState<DetailUserData>();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { slug } = router.query;

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`admin/order/competition/${slug}`);
        setDataUser(res.data.data);
      } catch (err) {
        toast.error('oops, something went wrong');
      }
    }
    if (slug) {
      fetchData();
    }
  }, [slug]);

  return (
    <AdminLayout>
      <main>
        <section>
          <div className='layout p-2 space-y-4'>
            {dataUser ? (
              <>
                <p className='h1 text-center'>
                  Detail Peserta Lomba {dataUser.lomba.nama}
                </p>

                <div className='flex justify-between'>
                  <div>
                    <p>Order</p>
                    <p>Asal Sekolah: {dataUser.order.asalSekolah}</p>
                    <p>Provinsi Sekolah: {dataUser.order.provinsiSekolah}</p>
                    <p>Bukti Pembayaran</p>
                    <ImagePreview
                      open={open}
                      setOpen={setOpen}
                      url={dataUser.order.buktiTf}
                    />
                  </div>
                  <div>
                    <p className='h2'>
                      Status: <span className='text-red-600'>Pending</span>
                    </p>
                  </div>
                </div>

                <div className='p-4'>
                  <p className='h2'>Peserta</p>
                  <Accordion type='single' collapsible className='w-full'>
                    {dataUser.peserta.map((peserta, index) => {
                      return (
                        <AccordionItem key={index} value={`item-${index + 1}`}>
                          <AccordionTrigger className='h3'>
                            peserta {index + 1}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div>
                              <p className='h4'>NISN/NIK/NOMOR KARTU PELAJAR</p>
                              <Input disabled value={peserta.namaLengkap} />
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

                <div className='p-4'>
                  {
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    dataUser.mentor.length > 0 && (
                      <div>
                        <p className='h2'>Pembimbing</p>
                        <Accordion type='single' collapsible className='w-full'>
                          {dataUser.mentor.map((mentor, index) => {
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
                                    <p className='h4'>Nama Pembimbing</p>
                                    <Input disabled value={mentor.name} />
                                  </div>
                                  <div>
                                    <p className='h4'>Email Pembimbing</p>
                                    <Input disabled value={mentor.email} />
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
    </AdminLayout>
  );
}

export default Index;
