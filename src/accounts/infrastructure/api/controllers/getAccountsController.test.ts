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
    await AccountsRepository.delete({ name: "[accounts::getList] name 1", });
    await AccountsRepository.delete({ name: "[accounts::getList] name 2", });
    await usersRepository.delete({ name: "[accounts::getList] name", });
    token = await signup({
      name: "[accounts::getList] name",
      email: "accounts.getList@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[accounts::getList] name" }, });
    await AccountsRepository.create({
      userId: user.id,
      name: "[accounts::getList] name 1",
      total: 0.0,
      currency: "usd",
    });
    await AccountsRepository.create({
      userId: user.id,
      name: "[accounts::getList] name 2",
      total: 0.0,
      currency: "pen",
    });
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
      expect(res.body.length).toEqual(2);
      done();
    });

    test("It should get the filtered list of accounts.", async (done) => {
      const res = await requester
      .get("/accounts?currency=usd")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.length).toEqual(1);
      done();
    });

    test("It should get the empty filtered list of accounts.", async (done) => {
      const res = await requester
      .get("/accounts?currency=arg")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.length).toEqual(0);
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