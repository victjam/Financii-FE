import { type Account } from '@/interfaces/account.interface';
import { create } from 'zustand';

export interface AccountStoreState {
  accounts: Account[];
  setAccounts: (accounts: Account[]) => void;
}

export const useAccountStore = create<AccountStoreState>((set) => ({
  accounts: [],
  setAccounts: (accounts) => {
    set({ accounts });
  },
}));
