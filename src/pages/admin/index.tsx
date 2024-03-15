import Seo from '@/components/Seo';
import { AdminLayout } from '@/components/admin/AdminLayout';
import adminWithAuth from '@/components/hoc/adminWithAuth';
import DataTable from '@/components/table/DataTable';
import { UserDataColumn } from '@/components/table/UserDataColumn';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import api from '@/lib/axios-helper';
import useAdminStore from '@/store/useAdminStore';
import { UserData } from '@/types/admin';
import { ApiReturn } from '@/types/api';
import { selectCompetition } from '@/types/type';
import { useRouter } from 'next/router';
import * as React from 'react';
import toast from 'react-hot-toast';

export default adminWithAuth(Index, 'all');
function Index() {
  const [dataUser, setDataUser] = React.useState<UserData[]>([]);
  const [allCompetition, setAllCompetition] =
    React.useState<selectCompetition[]>();

  const router = useRouter();
  const { logout } = useAdminStore();

  async function getCompetitions() {
    try {
      const res = await api.get<ApiReturn<selectCompetition[]>>('homepage/all');
      setAllCompetition(res.data.data);
    } catch (err) {
      logout();
      toast.error('Opps, sepertinya ada yang tidak beres');
    }
  }
  React.useEffect(() => {
    getCompetitions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`admin/order/competition?limit=1000`);
        setDataUser(res.data.data);
      } catch (err) {
        toast.error('Sesi anda Telah berakhir silahkan login kembali');
        setTimeout(() => {
          router.push('/auth/admin');
        }, 1000);
      }
    }
    fetchData();
  }, [router]);
  return (
    <AdminLayout>
      <Seo templateTitle='Admin' />
      <main>
        <section className='mt-5'>
          <div className='layout'>
            <h1 className='mt-8 mb-7 text-4xl font-bold'>Dashboard</h1>
            <Tabs defaultValue='e7760d1a-594d-4185-83e6-515fa0abde5a'>
              <TabsList>
                {allCompetition?.map((value) => {
                  return (
                    <TabsTrigger key={value.id} value={value.id}>
                      {value.lomba}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              {allCompetition?.map((value) => {
                return (
                  <TabsContent key={value.id} value={value.id}>
                    <div className='w-full'>
                      <DataTable
                        data={
                          dataUser
                            ? dataUser.filter((values) => {
                                return values.lomba.id === value.id;
                              })
                            : []
                        }
                        columns={UserDataColumn}
                      />
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>
      </main>
    </AdminLayout>
  );
}
