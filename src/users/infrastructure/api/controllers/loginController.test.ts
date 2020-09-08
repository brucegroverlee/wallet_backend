import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

import chai from "chai";
import chaiHttp from "chai-http";

import server from "../../../../index";
import usersRepository from "../../repository/usersRepository";
import signup from "../../../application/signup";

chai.use(chaiHttp);

describe("Login test suit", () => {
  let requester: ChaiHttp.Agent;

  beforeAll( async (done) => {
    requester = chai.request(server).keepOpen();
    await usersRepository.delete({ name: "[users::login] name", });
    await signup({
      name: "[users::login] name",
      email: "login@email.com",
      password: "password",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("POST /login", () => {
    test("It should returns the token session.", async (done) => {
      const res = await requester
      .post("/login").send({
        email: "login@email.com",
        password: "password",
      });
      expect(res.status).toEqual(202);
      expect(typeof res.body.token).toEqual("string");
      done();
    });

    test("It shouldn\"t returns the token session because the password is incorrect.", async (done) => {
      const res = await requester
      .post("/login").send({
        email: "login@email.com",
        password: "12345679",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t returns the token session. there isn\"t password attribute.", async (done) => {
      const res = await requester
      .post("/login").send({
        email: "login@email.com",
      });
      expect(res.status).toEqual(406);
      done();
    });

    test("It shouldn\"t returns the token session. there isn\"t email attribute.", async (done) => {
      const res = await requester
      .post("/login").send({
        password: "12345679",
      });
      expect(res.status).toEqual(406);
      done();
    });
  });

});