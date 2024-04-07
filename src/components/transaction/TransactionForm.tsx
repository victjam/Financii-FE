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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import { useTransactionStore } from '@/store/useTransactionStore';
import { makeApiRequest } from '@/core/makeApiRequest';
import { type Transaction } from '@/interfaces/transaction.interface';
import useAuthStore from '@/core/store/useAuthStore';
import { useCategoryStore } from '@/store/useCategoryStore';
import { useAlertMessageStore } from '@/store/useAlertMessageStore';
import { useAccountStore } from '@/store/useAccountStore';

export const TransactionForm: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const { addNewTransaction } = useTransactionStore();
  const { categories } = useCategoryStore();
  const { accounts } = useAccountStore();
  const { user } = useAuthStore();
  const { setAlert } = useAlertMessageStore();
  const [type, setType] = useState('');
  const [account, setAccount] = useState('');
  const handleTransaction = async (): Promise<void> => {
    try {
      const response = await makeApiRequest('/transactions', 'POST', {
        user_id: user?.id,
        title,
        amount,
        description,
        type,
        account_id: account,
        category_id: category,
        date: new Date().toISOString(),
      });
      addNewTransaction(response.data as Transaction);
    } catch (error) {
      setAlert({ enabled: true, message: 'Ha ocurrido un error' });
    }
  };

  const onClickHandler = (): void => {
    handleTransaction().catch((error) => {
      setAlert({
        message: error.message,
        enabled: true,
      });
    });
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Hey, what&apos;s up!</CardTitle>
        <CardDescription>
          Adding a new transaction?, let me help you with that.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <div className="flex w-full gap-2">
              <Button
                onClick={() => setType('income')}
                className={` w-full  hover:bg-green-700 ${
                  type === 'income'
                    ? 'border border-black bg-green-600'
                    : 'bg-green-500'
                }`}
              >
                Income
              </Button>
              <Button
                onClick={() => setType('expense')}
                className={` w-full  hover:bg-red-700 ${
                  type === 'expense'
                    ? 'border border-black bg-red-600'
                    : 'bg-red-500'
                }`}
              >
                Expense
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Title</Label>
            <Input
              id="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="string"
              placeholder=""
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Description</Label>
            <Textarea
              id="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Category</Label>
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Categories" />
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
            <Label htmlFor="email">Account</Label>
            <Select onValueChange={(value) => setAccount(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Accounts" />
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
            <Label htmlFor="email">Amount</Label>
            <Input
              id="amount"
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
              Add new transaction
            </Button>
          </DialogClose>
        </div>
      </CardContent>
    </Card>
  );
};
