import React from "react";
import { Transaction } from "../../interfaces/transaction.interface";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const formattedDate = new Date(transaction.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedAmount = `$${parseFloat(transaction.amount).toFixed(2)}`;

  return (
    <div className="flex flex-row justify-between items-center border-b-2 border-slate-100 pb-2">
      <div className="flex flex-row items-center space-x-3">
        <div className="rounded-md bg-blue-300 h-8 w-8"></div>
        <div className="flex flex-col">
          <div className="font-semibold">{transaction.title}</div>
          <div className="text-xs text-gray-500">{transaction.description}</div>
          <div className="text-xs text-gray-500">{formattedDate}</div>
        </div>
      </div>
      <div
        className={`font-semibold ${
          parseFloat(transaction.amount) >= 0
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {parseFloat(transaction.amount) >= 0 ? "+" : ""}
        {formattedAmount}
      </div>
    </div>
  );
};

export default TransactionItem;
