import { type Category } from '@/interfaces/category.interface';
import { create } from 'zustand';

export interface CategoryStoreState {
  categories: Category[];
  getRecentCategories: () => Category[];
  setCategories: (categories: Category[]) => void;
  addNewCategory: (categories: Category) => void;
  filterCategoriesById: (id: string) => Category | undefined;
}

export const useCategoryStore = create<CategoryStoreState>((set, get) => ({
  categories: [],
  getRecentCategories: () => {
    return get().categories.slice(-5);
  },
  setCategories: (categories: Category[]) => {
    set({ categories });
  },
  addNewCategory: (category: Category) => {
    set((state) => ({
      categories: [...state.categories, category],
    }));
  },
  filterCategoriesById: (id: string) => {
    return get().categories.find((category) => category.id === id);
  },
}));
