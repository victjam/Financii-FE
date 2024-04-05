export interface Transaction {
  id?: string;
  user_id?: string;
  title: string;
  amount: string;
  date: string;
  category_name: string;
  category_id: string;
  description: string;
}
