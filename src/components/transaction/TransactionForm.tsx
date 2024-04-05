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

export const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleTransaction = () => {
    console.log(amount, description, title, category);
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
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="food">Food</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Amount</Label>
            <Input
              id="amount"
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
