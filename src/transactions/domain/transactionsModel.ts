import TransactionsRepository from "../infrastructure/repository/transactionsRepository";

class TransactionsModel extends TransactionsRepository {
  public id: string;
  public userId: string;
  public categoryId: string;
  public accountId: string;
  public description: string;
  public total: number;
  public currency: string;
  public createdAt: string;
}

export default TransactionsModel;
