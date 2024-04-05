import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { useTransactionStore } from "@/store/useTransactionStore";
import { makeApiRequest } from "@/core/makeApiRequest";
import { Transaction } from "@/interfaces/transaction.interface";
import useAuthStore from "@/core/store/useAuthStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useAlertMessageStore } from "@/store/useAlertMessageStore";

export const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const { addNewTransaction } = useTransactionStore();
  const { categories } = useCategoryStore();
  const { user } = useAuthStore();
  const { setAlert } = useAlertMessageStore();

  const handleTransaction = async () => {
    try {
      const response = await makeApiRequest("/transactions", "POST", {
        user_id: user?.id,
        title,
        amount,
        description,
        category_id: category,
        date: new Date().toISOString(),
      });
      addNewTransaction(response.data as Transaction);
    } catch (error) {
      setAlert({ enabled: true, message: "Ha ocurrido un error" });
    }
  };

  const handleChange = (value: string) => {
    setCategory(value);
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Hey, what's up!</CardTitle>
        <CardDescription>
          Adding a new transaction?, let me help you with that.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Title</Label>
            <Input
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              type="string"
              placeholder=""
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Description</Label>
            <Textarea
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Category</Label>
            <Select onValueChange={handleChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id as string}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Amount</Label>
            <Input
              id="amount"
              min="0"
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              required
            />
          </div>
          <DialogClose asChild>
            <Button
              disabled={!amount || !description || !title || !category}
              type="submit"
              onClick={handleTransaction}
              className="w-full"
            >
              Add new transaction
            </Button>
          </DialogClose>
        </div>
      </CardContent>
    </Card>
  );
};
