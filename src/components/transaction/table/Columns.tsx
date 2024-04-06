import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/interfaces/transaction.interface";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const formattedDate = format(
        new Date(row.getValue("createdAt")),
        "yyyy-MM-dd"
      );
      return formattedDate;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category_name",
    header: "Category",
    cell: ({ row }) => {
      return (
        <Badge className="text-right font-medium">
          {row.getValue("category_name")}
        </Badge>
      );
    },
  },
];
