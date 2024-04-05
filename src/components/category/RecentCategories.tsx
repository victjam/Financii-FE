import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddCategoryDialog } from "./AddCategoryDialog";
import { Category } from "@/interfaces/category.interface";
import { useTransactionStore } from "@/store/useTransactionStore";
import { categoryTotals } from "@/util/categories";

interface CategoriesItemProps {
  categories: Category[];
}

export const RecentCategories: React.FC<CategoriesItemProps> = ({
  categories,
}) => {
  const { transactions } = useTransactionStore();
  const totals = categoryTotals(transactions);
  console.log(totals);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Categories</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {categories.map((category) => {
          if (typeof category.id !== "undefined") {
            const totalAmount = totals[category.id] || 0;
            return (
              <div key={category.id} className="flex items-center gap-8">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>{category.title.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {category.title}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  ${totalAmount.toFixed(2)}
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
