import AccountsRepository from "../infrastructure/repository/accountsRepository";

class AccountsModel extends AccountsRepository {
  public id: string;
  public userId: string;
  public name: string;
  public total: number;
  public currency: string;
}

export default AccountsModel;
