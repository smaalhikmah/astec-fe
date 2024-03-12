import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import DataTable from '@/components/table/DataTable';
import { TicketDataColumn } from '@/components/table/TicketDataColumn';
import api from '@/lib/axios-helper';
import { UserTicket } from '@/types/type';
import React from 'react';
import toast from 'react-hot-toast';

export default withAuth(Profile, 'all');
function Profile() {
  const [ticketData, setTicketData] = React.useState<UserTicket[]>([]);

  async function fetchData() {
    try {
      const res = await api.get(`competition/order`);
      setTicketData(res.data.data);
    } catch (err) {
      toast.error('oops, something went wrong');
    }
  }
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <Layout>
      <main>
        <section>
          <div className='layout'>
            <h1>Ticket</h1>
            <div>
              <DataTable
                columns={TicketDataColumn}
                data={ticketData ? ticketData : []}
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
