import { DollarSign, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

import { AccountDialog } from '@/components/account';
import { RecentCategories } from '@/components/category/RecentCategories';
import { AddTransactionDialog } from '@/components/transaction/AddTransactionDialog';
import { RecentTransactions } from '@/components/transaction/RecentTransactions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteDialogConfirmation } from '@/components/ui/delete-dialog-confirmation';

import { useAccountStore } from '@/store/useAccountStore';
import { useCategoryStore } from '@/store/useCategoryStore';
import { useTransactionStore } from '@/store/useTransactionStore';

import { deleteAccount } from '@/core/services/account';

import { formatCurrency } from '@/util/currency';

import { type Account } from '@/interfaces/account.interface';
import { type Category } from '@/interfaces/category.interface';
import { type Transaction } from '@/interfaces/transaction.interface';

import { useApiDataFetcher } from '@/Hooks/useApiDataFetcher';

export const Home = () => {
  const { getRecentTransactions, setTransactions } = useTransactionStore();
  const { setCategories, getRecentCategories } = useCategoryStore();
  const {
    accounts,
    setAccounts,
    deleteAccount: deleteAccountMutation,
  } = useAccountStore();
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

  const deleteAccountProcess = async (id: string) => {
    await deleteAccount(id);
    deleteAccountMutation(id);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {accounts.map((account) => (
            <Card className="group transition-all" key={account.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {account.name}
                </CardTitle>
                <DollarSign className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="transition-all">
                <div className="text-2xl font-bold">
                  {formatCurrency(account.balance ?? 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                </p>
                <div className="flex justify-end gap-2 opacity-0 transition-all animate-in group-hover:opacity-100">
                  <AccountDialog account={account} />
                  <DeleteDialogConfirmation
                    onCancel={() => console.log('cancel')}
                    onConfirm={async () =>
                      await deleteAccountProcess(account.id ?? '')
                    }
                  >
                    <Button variant="outline" size="xs">
                      <Trash2 className="size-4 text-red-500" />
                    </Button>
                  </DeleteDialogConfirmation>
                </div>
              </CardContent>
            </Card>
          ))}
          {accounts.length < 3 && <AccountDialog />}
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
