import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../../../index";
import CategoriesRepository from "../../repository/categoriesRepository";
import UsersRepository from "../../../../users/infrastructure/repository/usersRepository";
import signup from "../../../../users/application/signup";

chai.use(chaiHttp);

describe("Create Category test suit", () => {
  let requester: ChaiHttp.Agent;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await CategoriesRepository.delete({ name: "[categories::create] name", });
    await UsersRepository.delete({ name: "[categories::create] name", });
    token = await signup({
      name: "[categories::create] name",
      email: "categories.create@email.com",
      password: "password",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("POST /categories", () => {
    test("It should create a category.", async (done) => {
      const res = await requester
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        categoryGroupId: "6af47d90-df35-11ea-8500-597e701b6d4e",
        name: "[categories::create] name",
        description: "description",
        isRecurrent: false,
        budget: 700,
        currency: "usd",
      });
      expect(res.status).toEqual(201);
      expect(res.body.object).toEqual("category");
      done();
    });

    test("It shouldn\"t create a category. There is not a token.", async (done) => {
      const res = await requester
      .post("/categories")
      .set("Authorization", `Bearer`)
      .send({
        categoryGroupId: "6af47d90-df35-11ea-8500-597e701b6d4e",
        name: "[categories::create] name",
        description: "description",
        isRecurrent: false,
        budget: 700,
        currency: "usd",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t create a category. There is not a header.", async (done) => {
      const res = await requester
      .post("/categories")
      .send({
        categoryGroupId: "6af47d90-df35-11ea-8500-597e701b6d4e",
        name: "[categories::create] name",
        description: "description",
        isRecurrent: false,
        budget: 700,
        currency: "usd",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t create a category. There is not an attribute.", async (done) => {
      const res = await requester
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "[categories::create] name",
        description: "description",
        isRecurrent: false,
        budget: 700,
        currency: "usd",
      });
      expect(res.status).toEqual(406);
      done();
    });
  });

});