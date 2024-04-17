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

import { type AccountComponentProps } from './account.interface';
import { AccountForm } from './AccountForm';

export const AccountDialog = ({ account }: AccountComponentProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {account ? (
          <Button size="xs" variant="outline">
            <Pencil className="size-4 text-yellow-500" />
          </Button>
        ) : (
          <Button className="h-full w-28 text-2xl">
            <Plus />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{account ? 'Actualizar' : 'Agregar'} cuenta</DialogTitle>
          <DialogDescription asChild>
            <AccountForm account={account} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
