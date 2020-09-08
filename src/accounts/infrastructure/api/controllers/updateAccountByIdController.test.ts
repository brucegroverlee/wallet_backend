import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../../../index";
import accountsRepository from "../../repository/accountsRepository";
import AccountsModel from "../../../domain/accountsModel";
import usersRepository from "../../../../users/infrastructure/repository/usersRepository";
import UsersModel from "../../../../users/domain/usersModel";
import signup from "../../../../users/application/signup";

chai.use(chaiHttp);

describe("Update Account by id test suit", () => {
  let requester: ChaiHttp.Agent;
  let user: UsersModel;
  let account: AccountsModel;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await accountsRepository.delete({ name: "[accounts::updateById] name", });
    await usersRepository.delete({ name: "[accounts::updateById] name", });
    token = await signup({
      name: "[accounts::updateById] name",
      email: "accounts.updateById@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[accounts::updateById] name" }, });
    account = await AccountsModel.create({
      userId: user.id,
      name: "[accounts::updateById] name",
      total: 0.0,
      currency: "usd",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("PUT /accounts", () => {
    test("It should update an Account.", async (done) => {
      const res = await requester
      .put(`/accounts/${account.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "[accounts::updateById] name",
        total: 0.0,
        currency: "pen",
      });
      expect(res.status).toEqual(202);
      expect(res.body.object).toEqual("account");
      expect(res.body.currency).toEqual("pen");
      done();
    });

    test("It shouldn\"t update an Account. There is not an attribute.", async (done) => {
      const res = await requester
      .put(`/accounts/${account.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "[accounts::updateById] name",
        total: 100.50,
      });
      expect(res.status).toEqual(202);
      expect(res.body.object).toEqual("account");
      expect(res.body.currency).toEqual("pen");
      expect(res.body.total).toEqual(100.50);
      done();
    });

    test("It shouldn\"t update an account. There is not a token.", async (done) => {
      const res = await requester
      .put(`/accounts/${account.id}`)
      .set("Authorization", `Bearer`)
      .send({
        name: "[accounts::updateById] name",
        total: 0.0,
        currency: "pen",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t update an account. There is not a header.", async (done) => {
      const res = await requester
      .put(`/accounts/${account.id}`)
      .send({
        name: "[accounts::updateById] name",
        total: 0.0,
        currency: "pen",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t update an Account. There is not a valid id.", async (done) => {
      const res = await requester
      .put(`/accounts/6af47d90-df35-11ea-8500-597e701b6d4e`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "[accounts::updateById] name",
        total: 0.0,
        currency: "pen",
      });
      expect(res.status).toEqual(404);
      done();
    });

    test("It shouldn\"t update an Account. There is a different attribute.", async (done) => {
      const res = await requester
      .put(`/accounts/${account.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "[accounts::updateById] name",
        total: 0.0,
        currency: "pen",
        rate: 3.45,
      });
      expect(res.status).toEqual(406);
      done();
    });
  });
});