import TransactionsModel from '../domain/transactionsModel';
import TransactionsInterface from "../domain/transactionsInterface";
import UserModel from '../../users/domain/usersModel';

interface IData {
  categoryId?: string;
  accountId?: string;
  description?: string;
  total?: number;
  currency?: string;
  createdAt?: string;
}

interface IUpdateTransactionByIdPayload {
  data: IData;
  transactionId: string;
  user: UserModel;
}

async function updateTransactionById(payload: IUpdateTransactionByIdPayload): Promise<TransactionsInterface|null> {
  try {
    const query = {
      userId: payload.user.id,
      id: payload.transactionId,
    };
    const result = await TransactionsModel.update(payload.data, {
      where: query,
    });
    const rowsUpdated = result[0];
    if (rowsUpdated > 0) {
      const transaction = await TransactionsModel.findById(payload.transactionId);
      return transaction.toJSON() as TransactionsInterface;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export default updateTransactionById;
