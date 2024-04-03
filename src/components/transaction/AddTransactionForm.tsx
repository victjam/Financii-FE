import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddTransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col space-y-5 w-3/12">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">Add new transaction</h1>
        </div>
        <div>
          <div className="space-y-2">
            <div>
              <label className="text-xs font-light">Title</label>
              <Input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                name="title"
                id="title"
              />
            </div>
            <div>
              <label className="text-xs font-light">Amount</label>
              <Input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                name="amount"
                id="amount"
              />
            </div>
            <div>
              <label className="text-xs font-light">Description</label>
              <Input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                name="description"
                id="description"
              />
            </div>
            <div className="mt-1">
              <Button onClick={() => console.log("added")}>
                Add Transaction
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionForm;
