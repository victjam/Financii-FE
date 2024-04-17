import { toast } from 'sonner';
import { create } from 'zustand';

import { makeApiRequest } from '@/core/makeApiRequest';

import { type Category } from '@/interfaces/category.interface';

export interface CategoryStoreState {
  categories: Category[];
  getRecentCategories: () => Category[];
  setCategories: (categories: Category[]) => void;
  addNewCategory: (categories: Category) => void;
  deleteCategory: (id: string) => void;
  updateExistingCategory: (category: Category) => void;
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
  deleteCategory: async (id: string) => {
    try {
      await makeApiRequest(`/categories/${id}`, 'DELETE');
      const categories = get().categories;
      const updatedCategories = categories.filter(
        (category) => category.id !== id
      );
      set({ categories: updatedCategories });
    } catch (error: any) {
      toast.error(error.message as string);
    }
  },
  updateExistingCategory: (newCategory: Category) => {
    const categories = get().categories;
    const updatedCategories = categories.map((c) => {
      if (c.id === newCategory.id) {
        return newCategory;
      }
      return c;
    });
    set({ categories: updatedCategories });
  },
}));
