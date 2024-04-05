import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AddCategoryDialog } from "./AddCategoryDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const CategoryList = () => {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
          <CardTitle>Categories</CardTitle>
          <CardDescription>Recent categories.</CardDescription>
        </div>
        <div className="w-2/12">
          <AddCategoryDialog />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-8">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Food</p>
          </div>
          <div className="ml-auto font-medium">$1,999.00</div>
        </div>
        <div className="flex items-center gap-8">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Fathers</p>
          </div>
          <div className="ml-auto font-medium">$39.00</div>
        </div>
        <div className="flex items-center gap-8">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Food</p>
          </div>
          <div className="ml-auto font-medium">$1,999.00</div>
        </div>
        <div className="flex items-center gap-8">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Fathers</p>
          </div>
          <div className="ml-auto font-medium">$39.00</div>
        </div>
        <div className="flex items-center gap-8">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Food</p>
          </div>
          <div className="ml-auto font-medium">$1,999.00</div>
        </div>
        <div className="flex items-center gap-8">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Fathers</p>
          </div>
          <div className="ml-auto font-medium">$39.00</div>
        </div>
      </CardContent>
    </Card>
  );
};
