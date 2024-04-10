import { create } from 'zustand';

import { makeApiRequest } from '@/core/makeApiRequest';

import { type Transaction } from '@/interfaces/transaction.interface';

export interface TransactionStoreState {
  transactions: Transaction[];
  getRecentTransactions: () => Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  addNewTransaction: (transaction: Transaction) => void;
  getTotal: () => number;
  deleteTransaction: (id: string) => void;
  updateExistingTransaction: (transaction: Transaction) => void;
}

export const useTransactionStore = create<TransactionStoreState>(
  (set, get) => ({
    transactions: [],
    getRecentTransactions: () => {
      return get().transactions.slice(-5);
    },
    setTransactions: (transactions: Transaction[]) => {
      set({ transactions });
    },
    getTotal: () => {
      return get().transactions.reduce((total, transaction) => {
        const amount = parseFloat(transaction.amount);
        return total + amount;
      }, 0);
    },
    deleteTransaction: async (id: string) => {
      try {
        await makeApiRequest(`/transactions/${id}`, 'DELETE');
        const transactions = get().transactions;
        const updatedTransactions = transactions.filter(
          (transaction) => transaction.id !== id
        );
        set({ transactions: updatedTransactions });
      } catch (error) {
        console.log(error);
      }
    },
    updateExistingTransaction: (newTransaction: Transaction) => {
      const transactions = get().transactions;
      const updatedTransactions = transactions.map((t) => {
        if (t.id === newTransaction.id) {
          return newTransaction;
        }
        return t;
      });
      console.log(updatedTransactions);
      set({ transactions: updatedTransactions });
    },
    addNewTransaction: (transaction: Transaction) => {
      set((state) => ({
        transactions: [...state.transactions, transaction],
      }));
    },
  })
);
