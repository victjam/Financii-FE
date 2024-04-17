import { useEffect } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useAccountStore } from '@/store/useAccountStore';
import { useCategoryStore } from '@/store/useCategoryStore';
import { useTransactionStore } from '@/store/useTransactionStore';

import { makeApiRequest } from '@/core/makeApiRequest';

import { type Account } from '@/interfaces/account.interface';
import { type Transaction } from '@/interfaces/transaction.interface';

import { AddTransactionDialog } from './AddTransactionDialog';
import { useColumns } from './table/Columns';
import { DataTable } from './table/DataTable';

import { useApiDataFetcher } from '@/Hooks/useApiDataFetcher';

interface TransactionResponse {
  data: Transaction[];
}

export const TransactionList = () => {
  const columns = useColumns();
  const { setTransactions, transactions } = useTransactionStore();
  const { accounts, setAccounts } = useAccountStore();
  const { categories, setCategories } = useCategoryStore();
  const { data: transactionsData } =
    useApiDataFetcher<Transaction[]>('/transactions');

  useEffect(() => {
    if (transactionsData) {
      setTransactions(transactionsData);
    }
  }, [transactionsData, setTransactions]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response: TransactionResponse = await makeApiRequest(
        '/categories',
        'GET'
      );
      setCategories(response.data);
    };

    const fetchAccounts = async () => {
      const { data } = await makeApiRequest<Account[]>('/accounts', 'GET');
      setAccounts(data);
    };
    if (categories.length === 0) {
      fetchCategories();
    }
    if (accounts.length === 0) {
      fetchAccounts();
    }
  }, []);

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transacciones</CardTitle>
          <CardDescription>Transacciones recientes.</CardDescription>
        </div>
        <AddTransactionDialog />
      </CardHeader>
      <CardContent>
        <DataTable data={transactions} columns={columns} />
      </CardContent>
    </Card>
  );
};
