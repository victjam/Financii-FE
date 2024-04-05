import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DataTable } from "./table/DataTable";
import { columns } from "./table/Columns";
import { AddTransactionDialog } from "./AddTransactionDialog";
import { Transaction } from "@/interfaces/transaction.interface";
import { useApiDataFetcher } from "@/Hooks/useApiDataFetcher";
import { useEffect } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";

export const TransactionList = () => {
  const { setTransactions, transactions } = useTransactionStore();
  const { data: transactionsData } =
    useApiDataFetcher<Transaction[]>("/transactions");

  useEffect(() => {
    if (transactionsData) {
      setTransactions(transactionsData);
    }
  }, [transactionsData, setTransactions]);

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
