import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';
import { UserData } from '@/types/admin';
import Link from 'next/link';
import api from '@/lib/axios-helper';
import toast from 'react-hot-toast';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import Alert from '../button/Alert';

async function approved(id: string) {
  toast.promise(
    api
      .put(`admin/order/competition/${id}`, {
        approve: true,
      })
      .then((res) => {
        if (res.data.code === 200) {
          window.location.reload();
        }
      }),
    {
      ...DEFAULT_TOAST_MESSAGE,
      success: 'Berhasil menyetujui peserta',
    },
  );
}

export const UserDataColumn: ColumnDef<UserData>[] = [
  {
    header: 'No',
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: 'asalSekolah',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Asal Sekolah
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'provinsiSekolah',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Provinsi Sekolah
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'approved',
    header: 'Approved',
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
          <Link href={`/admin/ticket/${row.original.id}`}>
            <Button variant='default' size='sm'>
              Detail
            </Button>
          </Link>
          {/* <Button
            variant='destructive'
            size='sm'
            onClick={() => {
              approved(row.original.id);
            }}
          >
            Setujui
          </Button> */}
          <Alert
            onclick={() => approved(row.original.id)}
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
