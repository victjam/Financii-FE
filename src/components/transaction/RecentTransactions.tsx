import { format } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { formatCurrency } from '@/util/currency';

import { type Transaction } from '../../interfaces/transaction.interface';

interface TransactionsItemProps {
  transactions: Transaction[];
}
export const RecentTransactions: React.FC<TransactionsItemProps> = ({
  transactions,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transacciones</CardTitle>
          <CardDescription>
            Transacciones recientes de tu tienda.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <a
            href=""
            onClick={() => {
              navigate('/transaction-list');
            }}
          >
            Ver Todas
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="flex w-full items-center justify-center">
            <p className="text-gray-700">Sin resultados</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead className="hidden md:table-cell">
                  Descripción
                </TableHead>
                <TableHead className="hidden md:table-cell">Fecha</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Categoría</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <p>{transaction.title}</p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <p>{transaction.description}</p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <p>
                      {transaction.createdAt
                        ? format(new Date(transaction.createdAt), 'yyyy-MM-dd')
                        : 'N/A'}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {formatCurrency(transaction.amount)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge color="success">{transaction.category_name}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
