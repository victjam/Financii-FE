import { Pencil, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { type Category } from '@/interfaces/category.interface';

import { CategoryForm } from './CategoryForm';

interface AddCategoryDialogProps {
  title?: string;
  category?: Category;
}

export const AddCategoryDialog = ({
  title,
  category,
}: AddCategoryDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {title ? (
          <Button size="xs" variant="outline">
            <Pencil className="size-4 text-yellow-500" />
          </Button>
        ) : (
          <Button className="ml-auto gap-1">
            Add category <Plus className="size-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ? 'Update it' : 'New category'}</DialogTitle>
          <DialogDescription asChild>
            <CategoryForm category={category ?? undefined} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
