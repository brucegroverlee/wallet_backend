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
    await TransactionsRepository.destroy({ where: {
      description: [
        "[transactions::getList] description 1",
        "[transactions::getList] description 2",
        "[transactions::getList] description 3",
        "[transactions::getList] description 4",
        "[transactions::getList] description 5",
        "[transactions::getList] description 6",
        "[transactions::getList] description 7",
        "[transactions::getList] description 8",
        "[transactions::getList] description 9",
        "[transactions::getList] description 10",
        "[transactions::getList] description 11",
        "[transactions::getList] description 12",
        "[transactions::getList] description 13",
        "[transactions::getList] description 14",
        "[transactions::getList] description 15",
      ],
    }, });
    await usersRepository.delete({ name: "[transactions::getList] name", });
    token = await signup({
      name: "[transactions::getList] name",
      email: "transactions.getList@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[transactions::getList] name" }, });
    await TransactionsRepository.bulkCreate([
      {
        userId: user.id,
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d41",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d41",
        description: "[transactions::getList] description 1",
        total: 150,
        currency: "usd",
      },
      {
        userId: user.id,
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d41",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d41",
        description: "[transactions::getList] description 2",
        total: 150,
        currency: "usd",
      },
      {
        userId: user.id,
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d41",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d41",
        description: "[transactions::getList] description 3",
        total: 150,
        currency: "usd",
      },
      {
        userId: user.id,
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d41",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d41",
        description: "[transactions::getList] description 4",
        total: 150,
        currency: "usd",
      },
      {
        userId: user.id,
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d41",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d41",
        description: "[transactions::getList] description 5",
        total: 150,
        currency: "usd",
      },
      {
        userId: user.id,
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d41",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d41",
        description: "[transactions::getList] description 6",
        total: 150,
        currency: "usd",
      },
      {
        userId: user.id,
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d41",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d41",
        description: "[transactions::getList] description 7",
        total: 150,
        currency: "usd",
      },
      {
        userId: user.id,
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d41",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d41",
        description: "[transactions::getList] description 8",
        total: 150,
        currency: "usd",
      },
      {
        userId: user.id,
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d41",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d41",
        description: "[transactions::getList] description 9",
        total: 150,
        currency: "usd",
      },
      {
        userId: user.id,
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d41",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d41",
        description: "[transactions::getList] description 10",
        total: 150,
        currency: "usd",
      },
      {
        userId: user.id,
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d41",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d41",
        description: "[transactions::getList] description 11",
        total: 150,
        currency: "usd",
      },
      {
        userId: user.id,
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d41",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d41",
        description: "[transactions::getList] description 12",
        total: 150,
        currency: "usd",
      },
      {
        userId: user.id,
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d42",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d42",
        description: "[transactions::getList] description 13",
        total: 120,
        currency: "pen",
      },
      {
        userId: user.id,
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d42",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d42",
        description: "[transactions::getList] description 14",
        total: 120,
        currency: "pen",
      },
      {
        userId: user.id,
        categoryId: "6af47d90-df35-11ea-8500-597e701b6d42",
        accountId: "6af47d90-df35-11ea-8500-597e701b6d42",
        description: "[transactions::getList] description 15",
        total: 120,
        currency: "pen",
      },
    ]);
    await TransactionsRepository.update({ createdAt: '2020-02-25' }, {
      where: {
        description: [
          "[transactions::getList] description 10",
          "[transactions::getList] description 11",
          "[transactions::getList] description 12",
          "[transactions::getList] description 13",
          "[transactions::getList] description 14",
        ],
      },
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
      expect(res.body.data.length).toEqual(10);
      expect(res.body.pagination.page).toEqual(1);
      expect(res.body.pagination.perPage).toEqual(10);
      expect(res.body.pagination.pages).toEqual(2);
      expect(res.body.pagination.total).toEqual(15);
      done();
    });

    test("It should get the list of transactions at the page 2 and 5 per pages.", async (done) => {
      const res = await requester
      .get("/transactions?page=2&perPage=5")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.data.length).toEqual(5);
      expect(res.body.pagination.page).toEqual(2);
      expect(res.body.pagination.perPage).toEqual(5);
      expect(res.body.pagination.pages).toEqual(3);
      expect(res.body.pagination.total).toEqual(15);
      done();
    });

    test("It should get the filtered list of transactions.", async (done) => {
      const res = await requester
      .get("/transactions?accountId=6af47d90-df35-11ea-8500-597e701b6d41")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.data.length).toEqual(10);
      expect(res.body.pagination.page).toEqual(1);
      expect(res.body.pagination.perPage).toEqual(10);
      expect(res.body.pagination.pages).toEqual(2);
      expect(res.body.pagination.total).toEqual(12);
      done();
    });

    test("It should get the empty filtered list of transactions.", async (done) => {
      const res = await requester
      .get("/transactions?accountId=6af47d90-df35-11ea-8500-597e701b6d43")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.data.length).toEqual(0);
      expect(res.body.pagination.page).toEqual(0);
      expect(res.body.pagination.perPage).toEqual(10);
      expect(res.body.pagination.pages).toEqual(0);
      expect(res.body.pagination.total).toEqual(0);
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

    test("It should get the filtered list of transactions by range of time.", async (done) => {
      const res = await requester
      .get("/transactions?since=2020-01-30&until=2020-06-30")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.data.length).toEqual(5);
      expect(res.body.pagination.page).toEqual(1);
      expect(res.body.pagination.perPage).toEqual(10);
      expect(res.body.pagination.pages).toEqual(1);
      expect(res.body.pagination.total).toEqual(5);
      done();
    });

    test("It should get the filtered list of transactions by range of time and attribute.", async (done) => {
      const res = await requester
      .get("/transactions?accountId=6af47d90-df35-11ea-8500-597e701b6d41&since=2020-01-30&until=2020-06-30")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.data.length).toEqual(3);
      expect(res.body.pagination.page).toEqual(1);
      expect(res.body.pagination.perPage).toEqual(10);
      expect(res.body.pagination.pages).toEqual(1);
      expect(res.body.pagination.total).toEqual(3);
      done();
    });

    test("It shouldn\"t get the filtered list of transactions. The attribute since and until is invalid", async (done) => {
      const res = await requester
      .get("/transactions?since=2020-01-30")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(406);
      done();
    });
  });
});