import React from "react";
import TransactionItem from "./TransactionItem";
import { Transaction } from "../../interfaces/transaction.interface";

interface TransactionsItemProps {
  transactions: Transaction[];
}

const TRANSACTIONS_EXAMPLE = [
  {
    id: "65b7ce24e1cc7aa971154956",
    title: "updated title",
    user_id: "65b7c9598de7aa48f6aff406",
    amount: "320.0",
    date: "2024-01-29T12:34:56.789000",
    description: "Just buy some things number 2",
  },
  {
    id: "65b7ce2ee1cc7aa971154957",
    title: "nmber 2",
    user_id: "65b7c9598de7aa48f6aff406",
    amount: "320.0",
    date: "2024-01-29T12:34:56.789000",
    description: "Just buy some things number 2",
  },
  {
    id: "65b7d26b76d941562ec55dd6",
    title: "Payment from Bill.com - XX-757246  (Victor Jose Manrique A)",
    user_id: "65b7c9598de7aa48f6aff406",
    amount: "7,012.17",
    date: "2023-12-26T00:00:00",
    description: "Payment from Bill.com - XX-757246  (Victor Jose Manrique A)",
  },
  {
    id: "65b7fe87d5493d4dd1ddc5e0",
    title: "Card charge (OLFABRAND FONTANAR)",
    user_id: "65b7c9598de7aa48f6aff406",
    amount: "-37.61",
    date: "2024-01-07T00:00:00",
    description: "Card charge (OLFABRAND FONTANAR)",
  },
  {
    id: "65b7fe87d5493d4dd1ddc5e1",
    title: "Card charge (CABA A ALPINA SOPO)",
    user_id: "65b7c9598de7aa48f6aff406",
    amount: "-11.37",
    date: "2024-01-07T00:00:00",
    description: "Card charge (CABA A ALPINA SOPO)",
  },
];

const TransactionList: React.FC<TransactionsItemProps> = ({ transactions }) => {
  return (
    <div className="mt-5 space-y-3">
      {TRANSACTIONS_EXAMPLE.map((transaction: Transaction) => (
        <TransactionItem transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionList;
