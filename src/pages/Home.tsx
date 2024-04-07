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
                <p className="text-xs text-muted-foreground">{account.type}</p>
              </CardContent>
            </Card>
          ))}
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cash</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credit Card</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card> */}
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
