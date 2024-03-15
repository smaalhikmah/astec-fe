import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import Link from 'next/link';
import { TalkShow } from '@/types/admin';
import Alert from '../button/Alert';
import api from '@/lib/axios-helper';
import toast from 'react-hot-toast';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';

export async function approvedTalkshow(id: string) {
  toast.promise(
    api
      .put(`admin/order/talkshow/${id}`, {
        approve: true,
      })
      .then((res) => {
        if (res.data.code === 200) {
          window.location.reload();
        }
      })
      .catch(() => {
        toast.error('Sesi anda Telah berakhir silahkan login kembali');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }),
    {
      ...DEFAULT_TOAST_MESSAGE,
      success: 'Berhasil menyetujui peserta',
    },
  );
}

export const TalkShowDataColumn: ColumnDef<TalkShow>[] = [
  {
    header: 'No',
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: 'nama',
    header: 'Nama',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },

  {
    id: 'approved',
    header: 'Status',
    cell: ({ row }) => {
      return <div>{row.original.approved ? 'Approved' : 'Pending'}</div>;
    },
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <div className='space-x-4'>
          <Link href={`/admin/talkshow/${row.original.id}`}>
            <Button variant='default' size='sm'>
              Detail
            </Button>
          </Link>

          <Alert
            onclick={() => approvedTalkshow(row.original.id)}
            placeholder='Setujui'
            message='Tindakan ini tidak dapat dibatalkan,pastikan semua data sudah benar'
            variant='default'
            className='bg-green-500 hover:bg-green-600'
          />
        </div>
      );
    },
  },
];
