import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentTransactions } from "@/components/transaction/RecentTransactions";
import { AddTransactionDialog } from "@/components/transaction/AddTransactionDialog";
import { RecentCategories } from "@/components/category/RecentCategories";
import { useApiDataFetcher } from "@/Hooks/useApiDataFetcher";

const TRANSACTIONS_EXAMPLE = [
  {
    id: "65b7ce24e1cc7aa971154956",
    title: "updated title",
    user_id: "65b7c9598de7aa48f6aff406",
    amount: "320.0",
    date: "2024-01-29T12:34:56.789000",
    description: "Just buy some things number 2",
  },
  {
    id: "65b7ce2ee1cc7aa971154957",
    title: "nmber 2",
    user_id: "65b7c9598de7aa48f6aff406",
    amount: "320.0",
    date: "2024-01-29T12:34:56.789000",
    description: "Just buy some things number 2",
  },
  {
    id: "65b7d26b76d941562ec55dd6",
    title: "Payment from Bill.com - XX-757246  (Victor Jose Manrique A)",
    user_id: "65b7c9598de7aa48f6aff406",
    amount: "7,012.17",
    date: "2023-12-26T00:00:00",
    description: "Payment from Bill.com - XX-757246  (Victor Jose Manrique A)",
  },
  {
    id: "65b7fe87d5493d4dd1ddc5e0",
    title: "Card charge (OLFABRAND FONTANAR)",
    user_id: "65b7c9598de7aa48f6aff406",
    amount: "-37.61",
    date: "2024-01-07T00:00:00",
    description: "Card charge (OLFABRAND FONTANAR)",
  },
  {
    id: "65b7fe87d5493d4dd1ddc5e1",
    title: "Card charge (CABA A ALPINA SOPO)",
    user_id: "65b7c9598de7aa48f6aff406",
    amount: "-11.37",
    date: "2024-01-07T00:00:00",
    description: "Card charge (CABA A ALPINA SOPO)",
  },
];

export const Home = () => {
  const { data, error, isLoading } = useApiDataFetcher(
    "http://localhost:8000/api/transactions"
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month {data?.toString()}
              </p>
            </CardContent>
          </Card>
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
          <RecentTransactions transactions={TRANSACTIONS_EXAMPLE} />
          <RecentCategories />
        </div>
      </main>
    </div>
  );
};
