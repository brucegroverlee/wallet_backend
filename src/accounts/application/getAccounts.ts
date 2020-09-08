import AccountsModel from '../domain/accountsModel';
import AccountsInterface from "../domain/accountsInterface";
import UserModel from '../../users/domain/usersModel';

interface IGetAccountsPayload {
  query: any;
  user: UserModel;
}

async function getAccounts(payload: IGetAccountsPayload): Promise<AccountsInterface[]> {
  try {
    const query = {
      userId: payload.user.id,
      ...payload.query,
    };
    const accounts = await AccountsModel.find(query);
    return accounts as unknown as AccountsInterface[];
  } catch (error) {
    throw error;
  }
}

export default getAccounts;
