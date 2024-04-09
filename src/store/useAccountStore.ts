import { makeApiRequest } from '@/core/makeApiRequest';
import { type Account } from '@/interfaces/account.interface';
import { create } from 'zustand';

export interface AccountStoreState {
  accounts: Account[];
  setAccounts: (accounts: Account[]) => void;
  addNewAccount: (accounts: Account) => void;
  updateExistingAccount: (account: Account) => void;
  deleteAccount: (accountId: string) => void;
}

export const useAccountStore = create<AccountStoreState>((set) => ({
  accounts: [],
  setAccounts: (accounts) => {
    set({ accounts });
  },
  addNewAccount: (account: Account) => {
    set((state) => ({
      accounts: [...state.accounts, account],
    }));
  },
  updateExistingAccount: (account: Account) => {
    set((state) => ({
      accounts: state.accounts.map((acc) =>
        acc.id === account.id ? account : acc
      ),
    }));
  },
  deleteAccount: async (accountId: string) => {
    try {
      await makeApiRequest(`/accounts/${accountId}`, 'DELETE');
      set((state) => ({
        accounts: state.accounts.filter((acc) => acc.id !== accountId),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
