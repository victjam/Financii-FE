export interface Transaction {
  id?: string;
  title: string;
  user_id?: string;
  amount: string;
  description: string;
  type: 'income' | 'expense';
  account_id: string;
  category_id: string;
  category_name?: string;
  createdAt?: string;
  updatedAt?: string;
}
