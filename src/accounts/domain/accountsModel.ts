import AccountsRepository from "../infrastructure/repository/accountsRepository";

class AccountsModel extends AccountsRepository {
  public id: string;
  public userId: string;
  public name: string;
  public total: number;
  public currency: string;

  /**
   * Update the value of the total of the account
   * @param amount
   */
  async updateTotal(amount: number): Promise<this> {
    try {
      let newTotal = this.total;
      newTotal+= amount;
      this.total = newTotal;
      return await this.save();
    } catch (error) {
      throw error;
    }
  }
}

export default AccountsModel;
