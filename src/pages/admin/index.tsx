import { AdminLayout } from '@/components/admin/AdminLayout';
import DataTable from '@/components/table/DataTable';
import { UserDataColumn } from '@/components/table/UserDataColumn';
import api from '@/lib/axios-helper';
import { UserData } from '@/types/admin';
import * as React from 'react';
import toast from 'react-hot-toast';

export default function Index() {
  const [dataUser, setDataUser] = React.useState<UserData[]>([]);

  async function fetchData() {
    try {
      const res = await api.get(`admin/order/competition?limit=1000`);
      setDataUser(res.data.data);
    } catch (err) {
      toast.error('oops, something went wrong');
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <AdminLayout>
      <main>
        <section className='mt-5'>
          <div className='layout'>
            <h1 className='mt-8 text-4xl font-bold'>Dashboard</h1>
            <div>
              <DataTable
                data={dataUser ? dataUser : []}
                columns={UserDataColumn}
              />
            </div>
          </div>
        </section>
      </main>
    </AdminLayout>
  );
}
