import AccountsModel from '../domain/accountsModel';
import AccountsInterface from "../domain/accountsInterface";
import UserModel from '../../users/domain/usersModel';

interface IData {
  name?: string;
  total?: number;
  currency?: string;
}

interface IUpdateAccountByIdPayload {
  data: IData;
  accountId: string;
  user: UserModel;
}

async function updateAccountById(payload: IUpdateAccountByIdPayload): Promise<AccountsInterface|null> {
  try {
    const query = {
      userId: payload.user.id,
      id: payload.accountId,
    };
    const result = await AccountsModel.update(payload.data, {
      where: query,
    });
    const rowsUpdated = result[0];
    if (rowsUpdated > 0) {
      const account = await AccountsModel.findById(payload.accountId);
      return account.toJSON() as AccountsInterface;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export default updateAccountById;
