import AccountsModel from '../domain/accountsModel';
import UserModel from '../../users/domain/usersModel';

interface IDeleteAccountByIdPayload {
  accountId: string;
  user: UserModel;
}

/**
 * Returns true if found the object. Otherwise, returns false.
 * @param payload
 */
async function deleteAccountById(payload: IDeleteAccountByIdPayload): Promise<boolean> {
  try {
    const query = {
      userId: payload.user.id,
      id: payload.accountId,
    };
    const account = await AccountsModel.findOne({
      where: query,
    });
    if (account !== null) {
      await account.destroy();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

export default deleteAccountById;
