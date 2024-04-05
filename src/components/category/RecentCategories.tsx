import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddCategoryDialog } from "./AddCategoryDialog";
import { Category } from "@/interfaces/category.interface";
import { useTransactionStore } from "@/store/useTransactionStore";

interface CategoriesItemProps {
  categories: Category[];
}

export const RecentCategories: React.FC<CategoriesItemProps> = ({
  categories,
}) => {
  const { transactions } = useTransactionStore();

  // Calculate the total amount for each category
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const amount = parseFloat(transaction.amount); // Parse the amount string into a number
    const categoryId = transaction.category_id; // Use the correct ID field name
    if (!isNaN(amount)) {
      if (acc[categoryId]) {
        acc[categoryId] += amount;
      } else {
        acc[categoryId] = amount;
      }
    }
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Categories</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {categories.map((category) => {
          const totalAmount = categoryTotals[category.id] || 0; // Get the total amount for each category
          return (
            <div key={category.id} className="flex items-center gap-8">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>F</AvatarFallback>
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
        })}
        <AddCategoryDialog />
      </CardContent>
    </Card>
  );
};
