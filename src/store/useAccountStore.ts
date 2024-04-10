import { create } from 'zustand';

import { type Account } from '@/interfaces/account.interface';

export interface AccountStoreState {
  accounts: Account[];
  setAccounts: (accounts: Account[]) => void;
  upsertAccount: (account: Account) => void;
  deleteAccount: (accountId: string) => void;
}

export const useAccountStore = create<AccountStoreState>((set, get) => ({
  accounts: [],
  setAccounts: (accounts) => {
    set({ accounts });
  },
  upsertAccount: (account: Account) => {
    const exists = get().accounts.some((acc) => acc.id === account.id);
    set((state) => ({
      accounts: exists
        ? state.accounts.map((acc) => (acc.id === account.id ? account : acc))
        : [...state.accounts, account],
    }));
  },
  deleteAccount: async (accountId: string) => {
    set((state) => ({
      accounts: state.accounts.filter((acc) => acc.id !== accountId),
    }));
  },
}));
