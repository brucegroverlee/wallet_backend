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
import signup from "../../../../users/application/signup";

chai.use(chaiHttp);

describe("Create Account test suit", () => {
  let requester: ChaiHttp.Agent;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await AccountsRepository.delete({ name: "[accounts::create] name", });
    await usersRepository.delete({ name: "[accounts::create] name", });
    token = await signup({
      name: "[accounts::create] name",
      email: "accounts.create@email.com",
      password: "password",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("POST /accounts", () => {
    test("It should create an account.", async (done) => {
      const res = await requester
      .post("/accounts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "[accounts::create] name",
        total: 0.0,
        currency: "usd",
      });
      expect(res.status).toEqual(201);
      expect(res.body.object).toEqual("account");
      done();
    });

    test("It shouldn\"t create an account. There is not a token.", async (done) => {
      const res = await requester
      .post("/accounts")
      .set("Authorization", `Bearer`)
      .send({
        name: "[accounts::create] name",
        total: 0.0,
        currency: "usd",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t create an account. There is not a header.", async (done) => {
      const res = await requester
      .post("/accounts")
      .send({
        name: "[accounts::create] name",
        total: 0.0,
        currency: "usd",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t create an account. There is not an attribute.", async (done) => {
      const res = await requester
      .post("/accounts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "[accounts::create] name",
        total: 0.0,
      });
      expect(res.status).toEqual(406);
      done();
    });
  });

});