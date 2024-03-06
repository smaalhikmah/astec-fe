import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  SortingState,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from '@tanstack/react-table';

import React from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface Props<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  onFilterChange?: (filter: never) => void;
  onDeleted?: () => void;
  addData?: () => void;
  search?: string;
}
export default function RabDataTable<TData, TValue>({
  data,
  columns,
  onFilterChange,
  onDeleted,
  addData,
  search,
}: Props<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      sorting,
      columnVisibility,
      rowSelection,
    },
  });
  React.useEffect(() => {
    if (onFilterChange) {
      onFilterChange(table.getFilteredSelectedRowModel().rowsById as never);
    }
  }, [onFilterChange, rowSelection, table]);
  return (
    <div className='w-full'>
      <div className='flex items-center py-4 justify-between'>
        <Input
          placeholder='Filter nama...'
          value={
            (table.getColumn(search ?? 'name')?.getFilterValue() as string) ??
            ''
          }
          onChange={(event) =>
            table
              .getColumn(search ?? 'name')
              ?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <div className='space-x-2'>
          <Button variant='outline' className='ml-auto bg-black text-white'>
            Import csv
          </Button>

          <Button variant='outline' className='ml-auto'>
            Export csv
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='ml-auto'>
                Kolom
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: boolean) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={addData} variant='outline' className='ml-auto'>
            Tambah data
          </Button>
        </div>
      </div>
      <div className=''>
        <Table>
          <TableHeader className='bg-pinktable'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className='text-center text-blue-700'
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={Number(row.id) % 2 === 0 ? 'bg-gray-300' : ''}
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex-1 text-sm text-muted-foreground'>
        {table.getFilteredSelectedRowModel().rows.length} dari{' '}
        {table.getFilteredRowModel().rows.length} baris dipilih.
      </div>
      <div>
        <Accordion type='single' collapsible className='w-44'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Aksi ceklist</AccordionTrigger>
            <AccordionContent>
              <button onClick={onDeleted}>Hapus</button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
