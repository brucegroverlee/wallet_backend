import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../../../index";
import AccountsRepository from "../../repository/accountsRepository";
import AccountsModel from "../../../domain/accountsModel";
import usersRepository from "../../../../users/infrastructure/repository/usersRepository";
import UsersModel from "../../../../users/domain/usersModel";
import signup from "../../../../users/application/signup";

chai.use(chaiHttp);

describe("Get Account by id test suit", () => {
  let requester: ChaiHttp.Agent;
  let user: UsersModel;
  let account: AccountsModel;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await AccountsRepository.delete({ name: "[accounts::getById] name", });
    await usersRepository.delete({ name: "[accounts::getById] name", });
    token = await signup({
      name: "[accounts::getById] name",
      email: "accounts.getById@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[accounts::getById] name" }, });
    account = await AccountsModel.create({
      userId: user.id,
      name: "[accounts::getById] name",
      total: 0.0,
      currency: "usd",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("GET /accounts", () => {
    test("It should get an Account.", async (done) => {
      const res = await requester
      .get(`/accounts/${account.id}`)
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.object).toEqual("account");
      done();
    });

    test("It shouldn\"t get an account. There is not a token.", async (done) => {
      const res = await requester
      .get(`/accounts/${account.id}`)
      .set("Authorization", `Bearer`);
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get an account. There is not a header.", async (done) => {
      const res = await requester
      .get(`/accounts/${account.id}`);
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get an Account. There is not a valid id.", async (done) => {
      const res = await requester
      .get(`/accounts/6af47d90-df35-11ea-8500-597e701b6d4e`)
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(404);
      done();
    });
  });

});