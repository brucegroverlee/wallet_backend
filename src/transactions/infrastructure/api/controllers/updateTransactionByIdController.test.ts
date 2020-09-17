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
import usersRepository from "../../../../users/infrastructure/repository/usersRepository";
import UsersModel from "../../../../users/domain/usersModel";
import signup from "../../../../users/application/signup";

chai.use(chaiHttp);

describe("Update Transaction by id test suit", () => {
  let requester: ChaiHttp.Agent;
  let user: UsersModel;
  let transaction: TransactionsModel;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await TransactionsRepository.delete({ description: "[transactions::updateById] description", });
    await usersRepository.delete({ name: "[transactions::updateById] name", });
    token = await signup({
      name: "[transactions::updateById] name",
      email: "transactions.updateById@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[transactions::updateById] name" }, });
    transaction = await TransactionsModel.create({
      userId: user.id,
      categoryId: "6af47d90-df35-11ea-8500-597e701b6d4e",
      accountId: "6af47d90-df35-11ea-8500-597e701b6d4e",
      description: "[transactions::updateById] description",
      total: 150,
      currency: "usd",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("PUT /transactions", () => {
    test("It should update a TransactionGroup.", async (done) => {
      const res = await requester
      .put(`/transactions/${transaction.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        total: 150,
        currency: "pen",
      });
      expect(res.status).toEqual(202);
      expect(res.body.object).toEqual("transaction");
      expect(res.body.currency).toEqual("pen");
      done();
    });


    test("It shouldn\"t update a transaction. There is not a token.", async (done) => {
      const res = await requester
      .put(`/transactions/${transaction.id}`)
      .set("Authorization", `Bearer`)
      .send({
        total: 150,
        currency: "pen",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t update a transaction. There is not a header.", async (done) => {
      const res = await requester
      .put(`/transactions/${transaction.id}`)
      .send({
        total: 150,
        currency: "pen",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t update an transaction. There is not a valid id.", async (done) => {
      const res = await requester
      .put(`/transactions/6af47d90-df35-11ea-8500-597e701b6d4e`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        total: 150,
        currency: "pen",
      });
      expect(res.status).toEqual(404);
      done();
    });

    test("It shouldn\"t update a transaction. There is a different attribute.", async (done) => {
      const res = await requester
      .put(`/transactions/${transaction.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        total: 150,
        currencies: "pen",
      });
      expect(res.status).toEqual(406);
      done();
    });
  });
});