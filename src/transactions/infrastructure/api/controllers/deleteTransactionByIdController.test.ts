import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../../../index";
import TransactionsRepository from "../../repository/transactionsRepository";
import TransactionsModel from "../../../domain/transactionsModel";
import UsersRepository from "../../../../users/infrastructure/repository/usersRepository";
import UsersModel from "../../../../users/domain/usersModel";
import signup from "../../../../users/application/signup";

chai.use(chaiHttp);

describe("Delete Category by id test suit", () => {
  let requester: ChaiHttp.Agent;
  let user: UsersModel;
  let transaction: TransactionsModel;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await TransactionsRepository.delete({ description: "[transactions::deleteById] description", });
    await UsersRepository.delete({ name: "[transactions::deleteById] name", });
    token = await signup({
      name: "[transactions::deleteById] name",
      email: "transactions.deleteById@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[transactions::deleteById] name" }, });
    transaction = await TransactionsModel.create({
      userId: user.id,
      categoryId: "6af47d90-df35-11ea-8500-597e701b6d4e",
      accountId: "6af47d90-df35-11ea-8500-597e701b6d4e",
      description: "[transactions::deleteById] description",
      total: 150,
      currency: "usd",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("DELETE /transactions", () => {
    test("It should get a transaction.", async (done) => {
      const res = await requester
      .delete(`/transactions/${transaction.id}`)
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(204);
      done();
    });

    test("It shouldn\"t get a transaction. There is not a token.", async (done) => {
      const res = await requester
      .delete(`/transactions/${transaction.id}`)
      .set("Authorization", `Bearer`);
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get a transaction. There is not a header.", async (done) => {
      const res = await requester
      .delete(`/transactions/${transaction.id}`);
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get a transaction. There is not a valid id.", async (done) => {
      const res = await requester
      .delete(`/transactions/6af47d90-df35-11ea-8500-597e701b6d4e`)
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(404);
      done();
    });
  });

});