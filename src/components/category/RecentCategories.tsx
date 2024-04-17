import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useTransactionStore } from '@/store/useTransactionStore';

import { categoryTotals } from '@/util/categories';
import { formatCurrency } from '@/util/currency';

import { type Category } from '@/interfaces/category.interface';

import { AddCategoryDialog } from './AddCategoryDialog';

interface CategoriesItemProps {
  categories: Category[];
}

export const RecentCategories: React.FC<CategoriesItemProps> = ({
  categories,
}) => {
  const { transactions } = useTransactionStore();
  const totals = categoryTotals(transactions);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias recientes</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {categories.map((category) => {
          const totalAmount = totals[category.id ?? ''] ?? 0;
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
        })}
        <AddCategoryDialog />
      </CardContent>
    </Card>
  );
};
