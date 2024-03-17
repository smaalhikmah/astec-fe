import Seo from '@/components/Seo';
import { AdminLayout } from '@/components/admin/AdminLayout';
import ImagePreview from '@/components/admin/ImagePreview';
import Alert from '@/components/button/Alert';
import adminWithAuth from '@/components/hoc/adminWithAuth';
import { approvedTalkshow } from '@/components/table/TalkshowDataColumn';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import api from '@/lib/axios-helper';
import { DetailTalkshow } from '@/types/admin';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import 'yet-another-react-lightbox/styles.css';

export default adminWithAuth(Index, 'all');
function Index() {
  const [dataUser, setDataUser] = React.useState<DetailTalkshow>();
  const router = useRouter();
  const { slug } = router.query;

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`admin/order/talkshow/${slug}`);
        setDataUser(res.data.data);
      } catch (err) {
        toast.error('Sesi anda Telah berakhir silahkan login kembali');
        setTimeout(() => {
          router.push('/auth/admin');
        }, 1000);
      }
    }
    if (slug) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <AdminLayout>
      <Seo templateTitle='Admin' />
      <main>
        <section>
          <div className='layout p-2 space-y-4'>
            {dataUser ? (
              <>
                <p className='h1 text-center'>Detail Peserta Talkshow</p>

                <div className='flex justify-between'>
                  <div>
                    <p className='h2'></p>
                  </div>
                  <div>
                    <p className='h2'>
                      Status:{' '}
                      <span className=''>
                        {dataUser.order.approved
                          ? 'Sudah disetujui'
                          : 'Belum disetujui'}
                      </span>
                    </p>

                    {!dataUser.order.approved && (
                      <Alert
                        onclick={() => approvedTalkshow(slug as string)}
                        placeholder='Setujui'
                        message='Tindakan ini tidak dapat dibatalkan,pastikan semua data sudah benar'
                        variant='default'
                        className='bg-green-500 hover:bg-green-600'
                      />
                    )}
                  </div>
                </div>
                <div className='space-y-4'>
                  <p className='h2'>Bukti Pembayaran</p>
                  <ImagePreview url={dataUser.order.buktiTf} />
                </div>
                <div>
                  <p className='h2'>Peserta</p>
                  <Accordion type='single' collapsible className='w-full'>
                    {dataUser.participants.map((peserta, index) => {
                      return (
                        <AccordionItem key={index} value={`item-${index + 1}`}>
                          <AccordionTrigger className='h3'>
                            peserta {index + 1}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div>
                              <p className='h4'>Nama Lengkap</p>
                              <Input disabled value={peserta.nama} />
                            </div>
                            <div>
                              <p className='h4'>Email</p>
                              <Input disabled value={peserta.gender} />
                            </div>
                            <div>
                              <p className='h4'>Email</p>
                              <Input disabled value={peserta.email} />
                            </div>
                            <div>
                              <p className='h4'>Email</p>
                              <Input disabled value={peserta.phone} />
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
    </AdminLayout>
  );
}
