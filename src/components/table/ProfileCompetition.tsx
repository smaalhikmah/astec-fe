import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { UserTicket } from '@/types/type';
import Link from 'next/link';

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
        <div className='md:space-x-4 space-x-0 space-y-2 md:space-y-0 '>
          <Link href={`/user/${row.original.id}`}>
            <Button variant='default' size='sm'>
              Detail
            </Button>
          </Link>
          {row.original.approved ? (
            <Button>
              <Link
                href={row.original?.ticketURL}
                target='_blank'
                rel='noopener noreferrer'
                locale={false}
                download
              >
                Download Tiket
              </Link>
            </Button>
          ) : (
            <span>Pending</span>
          )}
        </div>
      );
    },
  },
];
