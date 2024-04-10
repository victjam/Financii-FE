import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type User } from '@/interfaces/user.interface';

export interface AuthStoreState {
  user: User | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User) => void;
}

const useAuthStore = create(
  persist<AuthStoreState>(
    (set) => ({
      isAuthenticated: true,
      user: null,
      setUser: (user: User) => {
        set({ user });
      },
      setIsAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
