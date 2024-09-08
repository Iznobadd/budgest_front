export interface Transaction {
  id: string;
  amount: string;
  description: string;
  transactionType: string;
  createdAt: string;
  category: {
    name: string;
  };
}

export type Transactions = Transaction[];
