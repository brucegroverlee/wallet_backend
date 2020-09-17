import TransactionsModel from '../domain/transactionsModel';
import UserModel from '../../users/domain/usersModel';

interface IDeleteTransactionByIdPayload {
  transactionId: string;
  user: UserModel;
}

/**
 * Returns true if found the object. Otherwise, returns false.
 * @param payload
 */
async function deleteTransactionById(payload: IDeleteTransactionByIdPayload): Promise<boolean> {
  try {
    const query = {
      userId: payload.user.id,
      id: payload.transactionId,
    };
    const transaction = await TransactionsModel.findOne({
      where: query,
    });
    if (transaction !== null) {
      await transaction.destroy();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

export default deleteTransactionById;
