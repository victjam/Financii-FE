import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DialogClose } from '@radix-ui/react-dialog';
import { makeApiRequest } from '@/core/makeApiRequest';
import { useAlertMessageStore } from '@/store/useAlertMessageStore';
import { useAccountStore } from '@/store/useAccountStore';
import { type Account } from '@/interfaces/account.interface';

export const AccountForm: React.FC = () => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [type, setType] = useState('');
  const { setAlert } = useAlertMessageStore();
  const { addNewAccount } = useAccountStore();

  const handleAccount = async () => {
    try {
      const response = await makeApiRequest('/accounts', 'POST', {
        name,
        type,
        balance,
      });
      addNewAccount(response.data as Account);
    } catch (error) {
      setAlert({ enabled: true, message: 'Ha ocurrido un error' });
    }
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Hey, what&apos;s up!</CardTitle>
        <CardDescription>
          Adding a new account?, let me help you with that.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Title</Label>
            <Input
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
              onClick={handleAccount}
              className="w-full"
            >
              Add new account
            </Button>
          </DialogClose>
        </div>
      </CardContent>
    </Card>
  );
};
