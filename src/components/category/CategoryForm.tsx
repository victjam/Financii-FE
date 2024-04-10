import { DialogClose } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAlertMessageStore } from '@/store/useAlertMessageStore';
import { useCategoryStore } from '@/store/useCategoryStore';

import { makeApiRequest } from '@/core/makeApiRequest';

import { type Category } from '@/interfaces/category.interface';

interface CategoryFormProps {
  category?: Category;
}

export const CategoryForm = ({ category }: CategoryFormProps) => {
  const [title, setTitle] = useState('');
  const { setAlert } = useAlertMessageStore();
  const { addNewCategory, updateExistingCategory } = useCategoryStore();

  const handleCategory = async () => {
    const method = category ? 'PUT' : 'POST';
    const url = category ? `/categories/${category.id}` : '/categories';
    try {
      const response = await makeApiRequest(url, method, {
        title,
      });
      if (category) {
        updateExistingCategory(response.data as Category);
      } else {
        addNewCategory(response.data as Category);
      }
    } catch (error) {
      setAlert({ enabled: true, message: 'Ha ocurrido un error' });
    }
  };

  useEffect(() => {
    if (category) {
      setTitle(category.title);
    }
  }, [category]);

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Hey, what&apos;s up!</CardTitle>
        <CardDescription>
          Adding a new category?, let me help you with that.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Title</Label>
            <Input
              value={title}
              id="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
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
              {category ? 'Update' : 'Create'}
            </Button>
          </DialogClose>
        </div>
      </CardContent>
    </Card>
  );
};
