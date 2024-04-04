import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AddCategoryDialog } from "./AddCategoryDialog";

export const RecentCategories = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Categories</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Food</p>
          </div>
          <div className="ml-auto font-medium">$1,999.00</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Fathers</p>
          </div>
          <div className="ml-auto font-medium">$39.00</div>
        </div>
        <AddCategoryDialog />
      </CardContent>
    </Card>
  );
};
