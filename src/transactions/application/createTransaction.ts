import TransactionsModel from '../domain/transactionsModel';
import TransactionsInterface from "../domain/transactionsInterface";
import AccountsModel from "../../accounts/domain/accountsModel";
import UserModel from '../../users/domain/usersModel';

interface ICreateAccountPayload {
  categoryId: string;
  accountId: string;
  description: string;
  total: number;
  currency: string;
  user: UserModel;
}

async function createTransaction(payload: ICreateAccountPayload): Promise<TransactionsInterface> {
  try {
    const {
      categoryId,
      accountId,
      description,
      total,
      currency,
      user,
    } = payload;
    const transaction = await TransactionsModel.create({
      userId: user.id,
      categoryId,
      accountId,
      description,
      total,
      currency,
    });
    const account = await AccountsModel.findById(accountId) as AccountsModel;
    await account.updateTotal(total);
    return transaction.toJSON() as TransactionsInterface;
  } catch (error) {
    throw error;
  }
}

export default createTransaction;
