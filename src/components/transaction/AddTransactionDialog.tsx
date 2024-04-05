import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TransactionForm } from "./TransactionForm";

export const AddTransactionDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto gap-1">
          Add Transaction
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New transaction</DialogTitle>
          <DialogDescription asChild>
            <TransactionForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
