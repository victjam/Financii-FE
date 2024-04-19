import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DeleteDialogConfirmation } from '@/components/ui/delete-dialog-confirmation';

import { useTransactionStore } from '@/store/useTransactionStore';

import { formatCurrency } from '@/util/currency';

import { type Transaction } from '@/interfaces/transaction.interface';

import { AddTransactionDialog } from '../AddTransactionDialog';

export function useColumns(): Array<ColumnDef<Transaction, unknown>> {
  const { deleteTransaction } = useTransactionStore();

  return [
    {
      accessorKey: 'title',
      header: 'Titulo',
    },
    {
      accessorKey: 'description',
      header: 'Descripcion',
    },
    {
      accessorKey: 'createdAt',
      header: 'Fecha',
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
          Monto
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
      header: 'Categoria',
      cell: ({ row }) => (
        <Badge className="text-right font-medium">
          {row.getValue('category_name')}
        </Badge>
      ),
    },
    {
      accessorKey: 'id',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex flex-row justify-end gap-2">
          <AddTransactionDialog title="Edit" transaction={row.original} />
          <DeleteDialogConfirmation
            onCancel={() => console.log('cancel')}
            onConfirm={() => deleteTransaction(row.getValue('id'))}
          >
            <Button variant="outline" size="xs">
              <Trash2 className="size-4 text-red-500" />
            </Button>
          </DeleteDialogConfirmation>
        </div>
      ),
    },
  ];
}
