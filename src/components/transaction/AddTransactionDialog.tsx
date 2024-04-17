import { Pencil, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { type Transaction } from '@/interfaces/transaction.interface';

import { TransactionForm } from './TransactionForm';

interface AddTransactionDialogProps {
  title?: string;
  transaction?: Transaction;
}

export const AddTransactionDialog = ({
  title,
  transaction,
}: AddTransactionDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {title ? (
          <Button size="xs" variant="outline">
            <Pencil className="size-4 text-yellow-500" />
          </Button>
        ) : (
          <Button className="ml-auto gap-1">
            Agregar transacción <Plus className="size-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva transacción</DialogTitle>
          <DialogDescription asChild>
            <TransactionForm transaction={transaction ?? undefined} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
