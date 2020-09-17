import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../../../index";
import TransactionsRepository from "../../repository/transactionsRepository";
import usersRepository from "../../../../users/infrastructure/repository/usersRepository";
import UsersModel from "../../../../users/domain/usersModel";
import signup from "../../../../users/application/signup";

chai.use(chaiHttp);

describe("Get a filtered list of Transactions test suit", () => {
  let requester: ChaiHttp.Agent;
  let user: UsersModel;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await TransactionsRepository.delete({ description: "[transactions::getList] description 1", });
    await TransactionsRepository.delete({ description: "[transactions::getList] description 2", });
    await usersRepository.delete({ name: "[transactions::getList] name", });
    token = await signup({
      name: "[transactions::getList] name",
      email: "transactions.getList@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[transactions::getList] name" }, });
    await TransactionsRepository.create({
      userId: user.id,
      categoryId: "6af47d90-df35-11ea-8500-597e701b6d41",
      accountId: "6af47d90-df35-11ea-8500-597e701b6d41",
      description: "[transactions::getList] description 1",
      total: 150,
      currency: "usd",
    });
    await TransactionsRepository.create({
      userId: user.id,
      categoryId: "6af47d90-df35-11ea-8500-597e701b6d42",
      accountId: "6af47d90-df35-11ea-8500-597e701b6d42",
      description: "[transactions::getList] description 2",
      total: 120,
      currency: "pen",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("GET /transactions", () => {
    test("It should get the list of transactions.", async (done) => {
      const res = await requester
      .get("/transactions")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.length).toEqual(2);
      done();
    });

    test("It should get the filtered list of transactions.", async (done) => {
      const res = await requester
      .get("/transactions?accountId=6af47d90-df35-11ea-8500-597e701b6d41")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.length).toEqual(1);
      done();
    });

    test("It should get the empty filtered list of transactions.", async (done) => {
      const res = await requester
      .get("/transactions?accountId=6af47d90-df35-11ea-8500-597e701b6d43")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.length).toEqual(0);
      done();
    });

    test("It shouldn\"t get the filtered list of transactions. There is not a token.", async (done) => {
      const res = await requester
      .get("/transactions")
      .set("Authorization", "Bearer");
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get the filtered list of transactions. There is not a header.", async (done) => {
      const res = await requester
      .get("/transactions");
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get the filtered list of transactions. The attribute is invalid", async (done) => {
      const res = await requester
      .get("/transactions?currencies=usd")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(406);
      done();
    });
  });
});