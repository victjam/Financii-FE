import { type Account } from '@/interfaces/account.interface';
import { create } from 'zustand';

export interface AccountStoreState {
  accounts: Account[];
  setAccounts: (accounts: Account[]) => void;
  addNewAccount: (accounts: Account) => void;
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
}));
