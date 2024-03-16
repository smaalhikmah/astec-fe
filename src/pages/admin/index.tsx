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
  const [select, setSelect] = React.useState<string>('Basket Putra');
  const [page, setPage] = React.useState<number>(1);
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

  function nextPage() {
    setPage(page + 1);
  }
  function prevPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  React.useEffect(() => {
    async function fetchData(id: string) {
      try {
        const res = await api.get(
          `admin/order/competition?id=${id}&page=${page}`,
        );
        setDataUser(res.data.data);
      } catch (err) {
        toast.error('Sesi anda Telah berakhir silahkan login kembali');
        setTimeout(() => {
          router.push('/auth/admin');
        }, 1000);
      }
    }
    if (allCompetition) {
      if (select) {
        allCompetition.filter((value) => {
          if (value.lomba === select) {
            fetchData(value.id);
          }
        });
      }
    }
  }, [allCompetition, page, router, select]);

  return (
    <AdminLayout>
      <Seo templateTitle='Admin' />
      <main>
        <section className='mt-5'>
          <div className='layout '>
            <h1 className='mt-8 mb-7 text-4xl font-bold'>Dashboard</h1>
            <Tabs
              defaultValue='Basket Putra'
              className='overflow-x-auto w-full'
            >
              <TabsList className='flex justify-start w-full overflow-x-auto'>
                {allCompetition?.map((value) => {
                  return (
                    <TabsTrigger
                      key={value.id}
                      value={value.lomba}
                      onClick={() => {
                        setSelect(value.lomba);
                        setPage(1);
                      }}
                    >
                      {value.lomba}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              {allCompetition?.map((value) => {
                return (
                  <TabsContent key={value.id} value={value.lomba}>
                    <div>
                      <DataTable
                        data={
                          dataUser && dataUser.length > 0
                            ? dataUser.filter((values) => {
                                return values.lomba.id === value.id;
                              })
                            : []
                        }
                        columns={UserDataColumn}
                        nextPage={nextPage}
                        prevPage={prevPage}
                        page={page}
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
