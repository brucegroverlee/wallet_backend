interface TransactionsInterface {
  id: string;
  userId: string;
  categoryId: string;
  accountId: string;
  description: string;
  total: number;
  currency: string;
  createdAt: string;
}

export default TransactionsInterface;
