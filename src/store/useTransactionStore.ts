import { Transaction } from "@/interfaces/transaction.interface";
import { create } from "zustand";

export interface TransactionStoreState {
  transactions: Transaction[];
  getRecentTransactions: () => Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  addNewTransaction: (transaction: Transaction) => void;
  getTotal: () => number;
}

const useAuthStore = create<TransactionStoreState>((set, get) => ({
  transactions: [],
  getRecentTransactions: () => {
    return get().transactions.slice(-2);
  },
  setTransactions: (transactions: Transaction[]) => set({ transactions }),
  getTotal: () => {
    return get().transactions.reduce((total, transaction) => {
      const amount = parseFloat(transaction.amount);
      return total + amount;
    }, 0);
  },
  addNewTransaction: (transaction: Transaction) => {
    set((state) => ({
      transactions: [...state.transactions, transaction],
    }));
  },
}));

export default useAuthStore;
