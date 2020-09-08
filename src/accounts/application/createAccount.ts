import AccountsModel from '../domain/accountsModel';
import AccountsInterface from "../domain/accountsInterface";
import UserModel from '../../users/domain/usersModel';

interface ICreateAccountPayload {
  name: string;
  total: number;
  currency: string;
  user: UserModel;
}

async function createAccount(payload: ICreateAccountPayload): Promise<AccountsInterface> {
  try {
    const { name, total, currency, user } = payload;
    const account = await AccountsModel.create({
      userId: user.id,
      name,
      total,
      currency,
    });
    return account.toJSON() as AccountsInterface;
  } catch (error) {
    throw error;
  }
}

export default createAccount;
