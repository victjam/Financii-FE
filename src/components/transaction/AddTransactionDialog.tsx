import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TransactionForm } from './TransactionForm';
import { type Transaction } from '@/interfaces/transaction.interface';

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
        <Button size="sm" className="ml-auto gap-1">
          {title ?? 'Add transaction'}
          {!title && <Plus className="size-4" />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New transaction</DialogTitle>
          <DialogDescription asChild>
            <TransactionForm transaction={transaction ?? undefined} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
