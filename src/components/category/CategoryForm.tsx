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
import { makeApiRequest } from "@/core/makeApiRequest";
import useAuthStore from "@/core/store/useAuthStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Category } from "@/interfaces/category.interface";

export const CategoryForm = () => {
  const [title, setTitle] = useState("");
  const { user } = useAuthStore();
  const { addNewCategory } = useCategoryStore();

  const handleCategory = async () => {
    try {
      const response = await makeApiRequest("/categories", "POST", {
        title,
        user_id: user?.id,
      });
      addNewCategory(response.data as Category);
    } catch (error) {
      console.log(error);
    }
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
