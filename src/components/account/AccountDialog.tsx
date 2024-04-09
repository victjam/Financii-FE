import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AccountForm } from './AccountForm';
import { type Account } from '@/interfaces/account.interface';

interface AccountDialogProps {
  account?: Account;
}

export const AccountDialog = ({ account }: AccountDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {account ? (
          <Button size="xs">Edit</Button>
        ) : (
          <Button className="h-full w-28 text-2xl">+</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{account ? 'Update' : 'Add'} account</DialogTitle>
          <DialogDescription asChild>
            <AccountForm account={account} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
