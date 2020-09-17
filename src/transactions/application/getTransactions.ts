import TransactionsModel from '../domain/transactionsModel';
import TransactionsInterface from "../domain/transactionsInterface";
import UserModel from '../../users/domain/usersModel';

interface IGetTransactionsPayload {
  query: any;
  user: UserModel;
}

async function getTransactions(payload: IGetTransactionsPayload): Promise<TransactionsInterface[]> {
  try {
    const query = {
      userId: payload.user.id,
      ...payload.query,
    };
    const transactions = await TransactionsModel.find(query);
    return transactions as unknown as TransactionsInterface[];
  } catch (error) {
    throw error;
  }
}

export default getTransactions;
