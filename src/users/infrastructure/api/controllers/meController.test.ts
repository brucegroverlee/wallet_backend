import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

import chai from "chai";
import chaiHttp from "chai-http";

import server from "../../../../index";
import usersRepository from "../../repository/usersRepository";
import signup from "../../../application/signup";

chai.use(chaiHttp);

describe("Me test suit", () => {
  let requester: ChaiHttp.Agent;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await usersRepository.delete({ name: "[users::me] name", });
    token = await signup({
      name: "[users::me] name",
      email: "me@email.com",
      password: "password",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("GET /me", () => {
    test("It should returns the session.", async (done) => {
      const res = await requester
      .get("/me")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(typeof res.body.token).toEqual("string");
      expect(res.body.user.object).toEqual("user");
      done();
    });

    test("It shouldn\"t returns the session. There is not a valid token.", async (done) => {
      const res = await requester
      .get("/me")
      .set("Authorization", `Bearer ${token}0`);
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t returns the token session. There is not a token.", async (done) => {
      const res = await requester
      .get("/me")
      .set("Authorization", `Bearer`);
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t returns the token session. There is not a header.", async (done) => {
      const res = await requester
      .get("/me");
      expect(res.status).toEqual(401);
      done();
    });
  });

});