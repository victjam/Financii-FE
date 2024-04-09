import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CategoryForm } from './CategoryForm';
import { type Category } from '@/interfaces/category.interface';

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
        <Button size="sm" className="ml-auto w-full gap-1">
          {title ? 'Update' : 'New category'}
        </Button>
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
