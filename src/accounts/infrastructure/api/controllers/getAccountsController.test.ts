import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../../../index";
import AccountsRepository from "../../repository/accountsRepository";
import usersRepository from "../../../../users/infrastructure/repository/usersRepository";
import UsersModel from "../../../../users/domain/usersModel";
import signup from "../../../../users/application/signup";

chai.use(chaiHttp);

describe("Get a filtered list of Accounts test suit", () => {
  let requester: ChaiHttp.Agent;
  let user: UsersModel;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await AccountsRepository.destroy({ where: {
      name: [
        "[accounts::getList] name 1",
        "[accounts::getList] name 2",
        "[accounts::getList] name 3",
        "[accounts::getList] name 4",
        "[accounts::getList] name 5",
        "[accounts::getList] name 6",
        "[accounts::getList] name 7",
        "[accounts::getList] name 8",
        "[accounts::getList] name 9",
        "[accounts::getList] name 10",
        "[accounts::getList] name 11",
        "[accounts::getList] name 12",
        "[accounts::getList] name 13",
        "[accounts::getList] name 14",
        "[accounts::getList] name 15",
      ],
    }, });
    await usersRepository.delete({ name: "[accounts::getList] name", });
    token = await signup({
      name: "[accounts::getList] name",
      email: "accounts.getList@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[accounts::getList] name" }, });
    await AccountsRepository.bulkCreate([
      { userId: user.id, name: "[accounts::getList] name 1", total: 0.0, currency: "usd", },
      { userId: user.id, name: "[accounts::getList] name 2", total: 0.0, currency: "pen", },
      { userId: user.id, name: "[accounts::getList] name 3", total: 0.0, currency: "pen", },
      { userId: user.id, name: "[accounts::getList] name 4", total: 0.0, currency: "pen", },
      { userId: user.id, name: "[accounts::getList] name 5", total: 0.0, currency: "pen", },
      { userId: user.id, name: "[accounts::getList] name 6", total: 0.0, currency: "usd", },
      { userId: user.id, name: "[accounts::getList] name 7", total: 0.0, currency: "pen", },
      { userId: user.id, name: "[accounts::getList] name 8", total: 0.0, currency: "pen", },
      { userId: user.id, name: "[accounts::getList] name 9", total: 0.0, currency: "pen", },
      { userId: user.id, name: "[accounts::getList] name 10", total: 0.0, currency: "pen", },
      { userId: user.id, name: "[accounts::getList] name 11", total: 0.0, currency: "usd", },
      { userId: user.id, name: "[accounts::getList] name 12", total: 0.0, currency: "pen", },
      { userId: user.id, name: "[accounts::getList] name 13", total: 0.0, currency: "pen", },
      { userId: user.id, name: "[accounts::getList] name 14", total: 0.0, currency: "pen", },
      { userId: user.id, name: "[accounts::getList] name 15", total: 0.0, currency: "pen", },
    ]);
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("GET /accounts", () => {
    test("It should get the list of accounts.", async (done) => {
      const res = await requester
      .get("/accounts")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.data.length).toEqual(10);
      expect(res.body.pagination.page).toEqual(1);
      expect(res.body.pagination.perPage).toEqual(10);
      expect(res.body.pagination.pages).toEqual(2);
      expect(res.body.pagination.total).toEqual(15);
      done();
    });

    test("It should get the list of accounts at the page 2 and 5 per pages.", async (done) => {
      const res = await requester
      .get("/accounts?page=2&perPage=5")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.data.length).toEqual(5);
      expect(res.body.pagination.page).toEqual(2);
      expect(res.body.pagination.perPage).toEqual(5);
      expect(res.body.pagination.pages).toEqual(3);
      expect(res.body.pagination.total).toEqual(15);
      done();
    });

    test("It should get the filtered list of accounts.", async (done) => {
      const res = await requester
      .get("/accounts?currency=usd")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.data.length).toEqual(3);
      expect(res.body.pagination.page).toEqual(1);
      expect(res.body.pagination.perPage).toEqual(10);
      expect(res.body.pagination.pages).toEqual(1);
      expect(res.body.pagination.total).toEqual(3);
      done();
    });

    test("It should get the empty filtered list of accounts.", async (done) => {
      const res = await requester
      .get("/accounts?currency=arg")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.data.length).toEqual(0);
      expect(res.body.pagination.page).toEqual(0);
      expect(res.body.pagination.perPage).toEqual(10);
      expect(res.body.pagination.pages).toEqual(0);
      expect(res.body.pagination.total).toEqual(0);
      done();
    });

    test("It shouldn\"t get an account. There is not a token.", async (done) => {
      const res = await requester
      .get("/accounts")
      .set("Authorization", "Bearer");
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get an account. There is not a header.", async (done) => {
      const res = await requester
      .get("/accounts");
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get the filtered list of accounts. The attribute is invalid", async (done) => {
      const res = await requester
      .get("/accounts?currencies=usd")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(406);
      done();
    });
  });
});