import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../../../index";
import TransactionsRepository from "../../repository/transactionsRepository";
import AccountsModel from "../../../../accounts/domain/accountsModel";
import UsersModel from "../../../../users/domain/usersModel";
import signup from "../../../../users/application/signup";

chai.use(chaiHttp);

describe("Create Transaction test suit", () => {
  let requester: ChaiHttp.Agent;
  let user: UsersModel;
  let token: string;
  let account: AccountsModel;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await TransactionsRepository.delete({ description: "[transactions::create] description", });
    await AccountsModel.delete({ name: "[transactions::create] name", });
    await UsersModel.delete({ name: "[transactions::create] name", });
    token = await signup({
      name: "[transactions::create] name",
      email: "transactions.create@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[transactions::create] name" }, });
    account = await AccountsModel.create({
      userId: user.id,
      name: "[transactions::create] name",
      total: 0.0,
      currency: "usd",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("POST /transactions", () => {
    test("It should create a transaction.", async (done) => {
      const res = await requester
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d4e",
        accountId: account.id,
        description: "[transactions::create] description",
        total: 150,
        currency: "usd",
      });
      expect(res.status).toEqual(201);
      expect(res.body.object).toEqual("transaction");
      account = await AccountsModel.findById(account.id) as AccountsModel;
      expect(account.total).toEqual(150);
      done();
    });

    test("It shouldn\"t create a transaction. There is not a token.", async (done) => {
      const res = await requester
      .post("/transactions")
      .set("Authorization", `Bearer`)
      .send({
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d4e",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d4e",
        description: "[transactions::create] description",
        total: 150,
        currency: "usd",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t create a transaction. There is not a header.", async (done) => {
      const res = await requester
      .post("/transactions")
      .send({
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d4e",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d4e",
        description: "[transactions::create] description",
        total: 150,
        currency: "usd",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t create a transaction. There is not an attribute.", async (done) => {
      const res = await requester
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d4e",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d4e",
        description: "[transactions::create] description",
        currency: "usd",
      });
      expect(res.status).toEqual(406);
      done();
    });
  });

});