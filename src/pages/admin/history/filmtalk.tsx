import Seo from '@/components/Seo';
import { AdminLayout } from '@/components/admin/AdminLayout';
import adminWithAuth from '@/components/hoc/adminWithAuth';
import DataTable from '@/components/table/DataTable';
import { TalkShowDataColumn } from '@/components/table/TalkshowDataColumn';
import api from '@/lib/axios-helper';
import useAdminStore from '@/store/useAdminStore';
import { TalkShow } from '@/types/admin';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';

export default adminWithAuth(Index, 'all');
function Index() {
  const [dataUser, setDataUser] = React.useState<TalkShow[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const router = useRouter();
  const { logout } = useAdminStore();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(
          `admin/history/talkshow?page=${page}&limit=10`,
        );
        setDataUser(res.data.data);
      } catch (err) {
        toast.error('Sesi anda Telah berakhir silahkan login kembali');
        logout();
        setTimeout(() => {
          router.push('/auth/admin');
        }, 1000);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, router]);

  function nextPage() {
    setPage(page + 1);
  }
  function prevPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }
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
                search='nama'
                nextPage={nextPage}
                prevPage={prevPage}
                page={page}
              />
            </div>
          </div>
        </section>
      </main>
    </AdminLayout>
  );
}
