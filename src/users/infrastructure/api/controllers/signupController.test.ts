import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

import chai from "chai";
import chaiHttp from "chai-http";

import server from "../../../../index";
import usersRepository from "../../repository/usersRepository";

chai.use(chaiHttp);

describe("Signup test suit", () => {
  let requester: ChaiHttp.Agent;

  beforeAll( async (done) => {
    requester = chai.request(server).keepOpen();
    await usersRepository.delete({ name: "[users::signup] name" });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("POST /signup", () => {
    test("It should returns the token session.", async (done) => {
      const res = await requester
      .post("/signup").send({
        name: "[users::signup] name",
        email: "signup@email.com",
        password: "password",
      });
      expect(res.status).toEqual(201);
      expect(typeof res.body.token).toEqual("string");
      done();
    });

    test("It shouldn\"t returns the token session. There is another user with the same email.", async (done) => {
      const res = await requester
      .post("/signup").send({
        name: "[users::signup] name",
        email: "signup@email.com",
        password: "password",
      });
      expect(res.status).toEqual(409);
      done();
    });

    test("It shouldn\"t returns the token session. there isn\"t password attribute.", async (done) => {
      const res = await requester
      .post("/signup").send({
        name: "[users::signup] name",
        email: "signup@email.com",
      });
      expect(res.status).toEqual(406);
      done();
    });

    test("It shouldn\"t returns the token session. there isn\"t email attribute.", async (done) => {
      const res = await requester
      .post("/signup").send({
        name: "[users::signup] name",
      });
      expect(res.status).toEqual(406);
      done();
    });
  });

});