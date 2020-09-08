import AccountsModel from '../domain/accountsModel';
import AccountsInterface from "../domain/accountsInterface";
import UserModel from '../../users/domain/usersModel';

interface IGetAccountByIdPayload {
  accountId: string;
  user: UserModel;
}

async function getAccountById(payload: IGetAccountByIdPayload): Promise<AccountsInterface|null> {
  try {
    const account = await AccountsModel.findById(payload.accountId) as AccountsModel;
    if (account !== null && account.userId === payload.user.id) {
      return account.toJSON() as AccountsInterface;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export default getAccountById;
