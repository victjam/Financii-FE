import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecentTransactions } from '@/components/transaction/RecentTransactions';
import { AddTransactionDialog } from '@/components/transaction/AddTransactionDialog';
import { RecentCategories } from '@/components/category/RecentCategories';
import { useApiDataFetcher } from '@/Hooks/useApiDataFetcher';
import { type Transaction } from '@/interfaces/transaction.interface';
import { useTransactionStore } from '@/store/useTransactionStore';
import { useEffect } from 'react';
import { type Category } from '@/interfaces/category.interface';
import { useCategoryStore } from '@/store/useCategoryStore';
import { useAccountStore } from '@/store/useAccountStore';
import { type Account } from '@/interfaces/account.interface';
import { Button } from '@/components/ui/button';

export const Home = () => {
  const { getRecentTransactions, setTransactions } = useTransactionStore();
  const { setCategories, getRecentCategories } = useCategoryStore();
  const { accounts, setAccounts } = useAccountStore();
  const { data: transactionsData } =
    useApiDataFetcher<Transaction[]>('/transactions');
  const { data: categoriesData } = useApiDataFetcher<Category[]>('/categories');
  const { data: accountData } = useApiDataFetcher<Account[]>('/accounts');

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData, setCategories]);

  useEffect(() => {
    if (transactionsData) {
      setTransactions(transactionsData);
    }
  }, [transactionsData, setTransactions]);

  useEffect(() => {
    if (accountData) {
      setAccounts(accountData);
    }
  }, [accountData, setAccounts]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {accounts.map((account) => (
            <Card key={account.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {account.name}
                </CardTitle>
                <DollarSign className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{account.balance}</div>
                <p className="text-xs text-muted-foreground">
                  {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                </p>
              </CardContent>
            </Card>
          ))}
          {accounts.length < 3 && (
            <Button className="h-full w-28 text-2xl">+</Button>
          )}
        </div>
        <div className="w-2/12">
          <AddTransactionDialog />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <RecentTransactions transactions={getRecentTransactions() || []} />
          <RecentCategories categories={getRecentCategories() || []} />
        </div>
      </main>
    </div>
  );
};
