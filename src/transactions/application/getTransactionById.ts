import TransactionsModel from '../domain/transactionsModel';
import TransactionsInterface from "../domain/transactionsInterface";
import UserModel from '../../users/domain/usersModel';

interface IGetTransactionByIdPayload {
  transactionId: string;
  user: UserModel;
}

async function getTransactionById(payload: IGetTransactionByIdPayload): Promise<TransactionsInterface|null> {
  try {
    const transaction = await TransactionsModel.findById(payload.transactionId) as TransactionsModel;
    if (transaction !== null && transaction.userId === payload.user.id) {
      return transaction.toJSON() as TransactionsInterface;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export default getTransactionById;
