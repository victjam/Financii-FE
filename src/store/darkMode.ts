import { create } from "zustand";

type DarkModeStore = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};

export const useDarkModeStore = create<DarkModeStore>((set) => ({
  darkMode: false,
  setDarkMode: (darkMode) => set({ darkMode }),
}));
