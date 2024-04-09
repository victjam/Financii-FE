import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTransactionStore } from '@/store/useTransactionStore';
import { formatCurrency } from '@/util/currency';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import { type Transaction } from '@/interfaces/transaction.interface';
import { AddTransactionDialog } from '../AddTransactionDialog';

export function useColumns(): Array<ColumnDef<Transaction, unknown>> {
  const { deleteTransaction } = useTransactionStore();

  return [
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
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Amount
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge
          className={`text-right font-medium ${row.original.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}
        >
          {formatCurrency(row.getValue('amount'))}
        </Badge>
      ),
    },
    {
      accessorKey: 'category_name',
      header: 'Category',
      cell: ({ row }) => (
        <Badge className="text-right font-medium">
          {row.getValue('category_name')}
        </Badge>
      ),
    },
    {
      accessorKey: 'id',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex flex-row justify-end">
          <AddTransactionDialog title="Edit" transaction={row.original} />
          <Button
            variant="ghost"
            onClick={() => deleteTransaction(row.getValue('id'))}
            className="text-red-500"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
}
