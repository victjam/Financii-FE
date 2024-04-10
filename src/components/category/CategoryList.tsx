import React, { useEffect } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useCategoryStore } from '@/store/useCategoryStore';
import { useTransactionStore } from '@/store/useTransactionStore';

import { categoryTotals } from '@/util/categories';
import { formatCurrency } from '@/util/currency';

import { type Category } from '@/interfaces/category.interface';

import { Button } from '../ui/button';

import { AddCategoryDialog } from './AddCategoryDialog';

import { useApiDataFetcher } from '@/Hooks/useApiDataFetcher';

export const CategoryList: React.FC = () => {
  const { transactions } = useTransactionStore();
  const { setCategories, categories, deleteCategory } = useCategoryStore();
  const { data: categoriesData } = useApiDataFetcher<Category[]>('/categories');
  const totals = categoryTotals(transactions);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData, setCategories]);

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
          <CardTitle>Categories</CardTitle>
          <CardDescription>Recent categories.</CardDescription>
        </div>
        <div className="w-2/12">
          <AddCategoryDialog />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {categories.map((category) => {
          if (typeof category.id !== 'undefined') {
            const totalAmount = totals[category.id] || 0;
            return (
              <div key={category.id} className="flex items-center gap-8">
                <Avatar className="hidden size-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>{category.title.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {category.title}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {formatCurrency(totalAmount)}
                </div>

                {category && (
                  <div className="flex flex-row justify-end gap-2">
                    <AddCategoryDialog title="Edit" category={category} />
                    <Button
                      size="sm"
                      onClick={() => deleteCategory(category.id ?? '')}
                      className="text-red-500"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            );
          }
        })}
        <AddCategoryDialog />
      </CardContent>
    </Card>
  );
};
