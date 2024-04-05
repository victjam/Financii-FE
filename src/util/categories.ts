import { Transaction } from "@/interfaces/transaction.interface";

interface CategoryTotals {
  [key: string]: number;
}

export const categoryTotals = (transactions: Transaction[]): CategoryTotals => {
  return transactions.reduce((acc: CategoryTotals, transaction) => {
    const amount = parseFloat(transaction.amount);
    const categoryId = transaction.category_id;
    if (!isNaN(amount)) {
      if (acc[categoryId]) {
        acc[categoryId] += amount;
      } else {
        acc[categoryId] = amount;
      }
    }
    return acc;
  }, {} as CategoryTotals);
};
