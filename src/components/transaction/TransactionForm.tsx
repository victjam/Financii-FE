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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useAccountStore } from '@/store/useAccountStore';
import { useCategoryStore } from '@/store/useCategoryStore';
import { useTransactionStore } from '@/store/useTransactionStore';

import { makeApiRequest } from '@/core/makeApiRequest';
import useAuthStore from '@/core/store/useAuthStore';

import { type Account } from '@/interfaces/account.interface';
import { type Transaction } from '@/interfaces/transaction.interface';

interface TransactionFormProps {
  transaction?: Transaction;
}

export const TransactionForm = ({ transaction }: TransactionFormProps) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const { addNewTransaction, updateExistingTransaction } =
    useTransactionStore();
  const { setAccounts: updateAccounts } = useAccountStore();
  const { categories } = useCategoryStore();
  const { accounts } = useAccountStore();
  const { user } = useAuthStore();
  const [type, setType] = useState('');
  const [account, setAccount] = useState('');

  const handleTransaction = async (): Promise<void> => {
    const method = transaction ? 'PUT' : 'POST';
    const url = transaction
      ? `/transactions/${transaction.id}`
      : '/transactions';
    try {
      const response = await makeApiRequest(url, method, {
        user_id: user?.id,
        title,
        amount,
        description,
        type,
        account_id: account,
        category_id: category,
      });
      if (transaction) {
        updateExistingTransaction(response.data as Transaction);
      } else {
        addNewTransaction(response.data as Transaction);
      }
      toast.success('¡Transacción agregada exitosamente!');
      updateAccountsData();
      await updateAccountsData();
    } catch (error: any) {
      toast.error(error.message as string);
    }
  };

  const updateAccountsData = async (): Promise<void> => {
    const accountResponse = await makeApiRequest('/accounts', 'GET');
    updateAccounts(accountResponse.data as Account[]);
  };

  const onClickHandler = (): void => {
    handleTransaction().catch(() => {
      toast.error('Se produjo un error');
    });
  };

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount);
      setDescription(transaction.description);
      setTitle(transaction.title);
      setCategory(transaction.category_id);
      setType(transaction.type);
      setAccount(transaction.account_id);
    }
  }, [transaction]);

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">¡Hola, ¿qué tal?! </CardTitle>
        <CardDescription>
          ¿Agregando una nueva transacción? ¡Déjame ayudarte con eso!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Tipo</Label>
            <div className="flex w-full gap-2">
              <Button
                onClick={() => setType('income')}
                className={`w-full hover:bg-green-700 ${
                  type === 'income'
                    ? 'border border-black bg-green-600'
                    : 'bg-green-500'
                }`}
              >
                Ingreso
              </Button>
              <Button
                onClick={() => setType('expense')}
                className={`w-full hover:bg-red-700 ${
                  type === 'expense'
                    ? 'border border-black bg-red-600'
                    : 'bg-red-500'
                }`}
              >
                Egreso
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="string"
              placeholder=""
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Categoría</Label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Categorías" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id ?? ''}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Cuenta</Label>
            <Select
              value={account}
              onValueChange={(value) => setAccount(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Cuentas" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id ?? ''}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Monto</Label>
            <Input
              id="amount"
              value={amount}
              min="0"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              type="number"
              required
            />
          </div>
          <DialogClose asChild>
            <Button
              disabled={
                amount === '' ||
                description === '' ||
                title === '' ||
                category === '' ||
                type === ''
              }
              type="submit"
              onClick={onClickHandler}
              className="w-full"
            >
              {transaction ? 'Actualizar' : 'Agregar'}
            </Button>
          </DialogClose>
        </div>
      </CardContent>
    </Card>
  );
};
