import { DialogClose } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAccountStore } from '@/store/useAccountStore';

import { createAccount, updateAccount } from '@/core/services/account';

import { type AccountComponentProps } from './account.interface';

export const AccountForm = ({ account }: AccountComponentProps) => {
  const MESSAGE = !account ? 'Adding a new account?' : 'Updating the account?';
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [type, setType] = useState('');
  const { upsertAccount } = useAccountStore();

  useEffect(() => {
    if (account) {
      setName(account.name);
      setBalance(account.balance ?? 0);
      setType(account.type);
    }
  }, [account]);

  const handleAccountProcess = async () => {
    let accountResponse;
    if (!account) {
      accountResponse = await createAccount({ name, balance, type });
    } else {
      accountResponse = await updateAccount({ id: account.id, name, type });
    }
    if (!accountResponse) return;
    upsertAccount(accountResponse);
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Hey, what&apos;s up!</CardTitle>
        <CardDescription>{MESSAGE}, let me help you with that.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Title</Label>
            <Input
              value={name}
              id="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="string"
              placeholder=""
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Input
              value={type}
              id="type"
              onChange={(e) => {
                setType(e.target.value);
              }}
              type="string"
              placeholder=""
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Balance inicial</Label>
            <Input
              id="type"
              disabled={!!account}
              value={balance}
              onChange={(e) => {
                setBalance(parseInt(e.target.value, 10));
              }}
              type="number"
              placeholder=""
              required
            />
          </div>
          <DialogClose asChild>
            <Button
              disabled={!name || !type}
              type="submit"
              onClick={handleAccountProcess}
              className="w-full"
            >
              {!account ? 'Create account' : 'Update account'}
            </Button>
          </DialogClose>
        </div>
      </CardContent>
    </Card>
  );
};
