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
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";

export const CategoryForm = () => {
  const [title, setTitle] = useState("");

  const handleCategory = () => {
    console.log(title);
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Hey, what's up!</CardTitle>
        <CardDescription>
          Adding a new category?, let me help you with that.
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
          <DialogClose asChild>
            <Button
              disabled={!title}
              type="submit"
              onClick={handleCategory}
              className="w-full"
            >
              Add new category
            </Button>
          </DialogClose>
        </div>
      </CardContent>
    </Card>
  );
};
