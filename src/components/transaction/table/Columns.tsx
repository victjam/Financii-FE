import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Transaction } from '@/interfaces/transaction.interface';
import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { ArrowUpDown } from 'lucide-react';

export const columns: Array<ColumnDef<Transaction>> = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const formattedDate = format(
        new Date(row.getValue('createdAt')),
        'yyyy-MM-dd'
      );
      return formattedDate;
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Amount
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Badge
          className={`text-right font-medium ${
            row.original.type === 'expense' ? 'text-red-500' : 'text-green-500'
          }`}
        >
          ${row.getValue('amount')}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'category_name',
    header: 'Category',
    cell: ({ row }) => {
      return (
        <Badge className="text-right font-medium">
          {row.getValue('category_name')}
        </Badge>
      );
    },
  },
];
