import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { AddCategoryDialog } from './AddCategoryDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCategoryStore } from '@/store/useCategoryStore';
import { useApiDataFetcher } from '@/Hooks/useApiDataFetcher';
import { type Category } from '@/interfaces/category.interface';
import { categoryTotals } from '@/util/categories';
import { useTransactionStore } from '@/store/useTransactionStore';
import { formatCurrency } from '@/util/currency';

export const CategoryList: React.FC = () => {
  const { transactions } = useTransactionStore();
  const { setCategories, categories } = useCategoryStore();
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
              </div>
            );
          }
        })}
        <AddCategoryDialog />
      </CardContent>
    </Card>
  );
};
