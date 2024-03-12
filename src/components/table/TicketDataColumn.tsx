import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { UserTicket } from '@/types/type';

export const TicketDataColumn: ColumnDef<UserTicket>[] = [
  {
    header: 'No',
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: 'namaKetua',
    header: 'Nama Ketua',
  },
  {
    accessorKey: 'asalSekolah',
    header: 'Asal Sekolah',
  },
  {
    accessorKey: 'provinsiSekolah',
    header: 'Provinsi Sekolah',
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
          {row.original.approved ? (
            <Button>Download tiket</Button>
          ) : (
            <span> Menunggu Persetujuan</span>
          )}
        </div>
      );
    },
  },
];
