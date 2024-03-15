import Seo from '@/components/Seo';
import { AdminLayout } from '@/components/admin/AdminLayout';
import adminWithAuth from '@/components/hoc/adminWithAuth';
import DataTable from '@/components/table/DataTable';
import { TalkShowDataColumn } from '@/components/table/TalkshowDataColumn';
import api from '@/lib/axios-helper';
import { TalkShow } from '@/types/admin';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';

export default adminWithAuth(Index, 'all');
function Index() {
  const [dataUser, setDataUser] = React.useState<TalkShow[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`admin/order/talkshow?limit=1000`);
        setDataUser(res.data.data);
      } catch (err) {
        toast.error('Sesi anda Telah berakhir silahkan login kembali');
        setTimeout(() => {
          router.push('/admin/login');
        }, 1000);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AdminLayout>
      <Seo templateTitle='Admin' />
      <main>
        <section className='mt-5'>
          <div className='layout'>
            <h1 className='mt-8 text-4xl font-bold'>Dashboard</h1>
            <div>
              <DataTable
                data={dataUser ? dataUser : []}
                columns={TalkShowDataColumn}
              />
            </div>
          </div>
        </section>
      </main>
    </AdminLayout>
  );
}
