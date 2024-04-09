import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { DataTable } from './table/DataTable';
import { AddTransactionDialog } from './AddTransactionDialog';
import { type Transaction } from '@/interfaces/transaction.interface';
import { useApiDataFetcher } from '@/Hooks/useApiDataFetcher';
import { useEffect } from 'react';
import { useTransactionStore } from '@/store/useTransactionStore';
import { useCategoryStore } from '@/store/useCategoryStore';
import { makeApiRequest } from '@/core/makeApiRequest';
import { useColumns } from './table/Columns';
import { useAccountStore } from '@/store/useAccountStore';
import { type Account } from '@/interfaces/account.interface';

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
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Recent transactions.</CardDescription>
        </div>
        <AddTransactionDialog />
      </CardHeader>
      <CardContent>
        <DataTable data={transactions} columns={columns} />
      </CardContent>
    </Card>
  );
};
