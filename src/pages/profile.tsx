import Seo from '@/components/Seo';
import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import DataTable from '@/components/table/DataTable';
import { TicketDataColumn } from '@/components/table/ProfileCompetition';
import { ProfileTalkshowDataColumn } from '@/components/table/ProfileTalkshow';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import api from '@/lib/axios-helper';
import { TalkShowProfile, UserTicket } from '@/types/type';
import React from 'react';
import toast from 'react-hot-toast';

export default withAuth(Profile, 'all');
function Profile() {
  const [ticketData, setTicketData] = React.useState<UserTicket[]>([]);
  const [talkshowData, setTalkshowData] = React.useState<TalkShowProfile[]>([]);

  async function fetchData() {
    try {
      const res = await api.get(`competition/order`);
      const res2 = await api.get(`talkshow/order`);

      setTicketData(res.data.data);
      setTalkshowData(res2.data.data);
    } catch (err) {
      toast.error('oops, something went wrong');
    }
  }
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Seo templateTitle='Profile' />
      <main>
        <section>
          <div className='layout'>
            <h1>Ticket</h1>
            <div>
              <Tabs defaultValue='competition' className=''>
                <TabsList>
                  <TabsTrigger value='competition'>Kompetisi</TabsTrigger>
                  <TabsTrigger value='Talkshow'>Talkshow</TabsTrigger>
                </TabsList>
                <TabsContent value='competition'>
                  <DataTable
                    columns={TicketDataColumn}
                    data={ticketData ? ticketData : []}
                  />
                </TabsContent>
                <TabsContent value='Talkshow'>
                  <DataTable
                    columns={ProfileTalkshowDataColumn}
                    data={talkshowData ? talkshowData : []}
                    search='nama'
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
