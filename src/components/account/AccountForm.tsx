import { DialogClose } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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
  const [accountData, setAccountData] = useState({
    name: '',
    balance: 0,
    type: '',
  });

  const { upsertAccount } = useAccountStore();

  useEffect(() => {
    if (account) {
      setAccountData({
        name: account.name,
        balance: account.balance ?? 0,
        type: account.type,
      });
    }
  }, [account]);

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setAccountData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async () => {
    const fn = account ? updateAccount : createAccount;
    const data = account ? { ...accountData, id: account.id } : accountData;
    const response = await fn(data);
    if (response) {
      upsertAccount(response);
      toast.success(account ? 'Cuenta actualizada' : 'Cuenta creada');
    }
  };

  const { name, type, balance } = accountData;

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">¡Hola, ¿qué tal!</CardTitle>
        <CardDescription>
          {account
            ? '¿Actualizando la cuenta?'
            : '¿Agregando una nueva cuenta?'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={name}
              onChange={handleChange('name')}
              type="text"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Tipo</Label>
            <Input
              id="type"
              value={type}
              onChange={handleChange('type')}
              type="text"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="balance">Saldo Inicial</Label>
            <Input
              id="balance"
              value={balance}
              onChange={handleChange('balance')}
              type="number"
              disabled={!!account}
              required
            />
          </div>
          <DialogClose asChild>
            <Button
              disabled={!name || !type}
              type="submit"
              onClick={handleSubmit}
              className="w-full"
            >
              {account ? 'Actualizar Cuenta' : 'Crear Cuenta'}
            </Button>
          </DialogClose>
        </div>
      </CardContent>
    </Card>
  );
};
