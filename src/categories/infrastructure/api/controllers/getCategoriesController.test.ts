import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../../../index";
import CategoriesRepository from "../../repository/categoriesRepository";
import usersRepository from "../../../../users/infrastructure/repository/usersRepository";
import UsersModel from "../../../../users/domain/usersModel";
import signup from "../../../../users/application/signup";

chai.use(chaiHttp);

describe("Get a filtered list of Categories test suit", () => {
  let requester: ChaiHttp.Agent;
  let user: UsersModel;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await CategoriesRepository.delete({ name: "[categories::getList] name 1", });
    await CategoriesRepository.delete({ name: "[categories::getList] name 2", });
    await usersRepository.delete({ name: "[categories::getList] name", });
    token = await signup({
      name: "[categories::getList] name",
      email: "categories.getList@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[categories::getList] name" }, });
    await CategoriesRepository.create({
      userId: user.id,
      name: "[categories::getList] name 1",
      description: "description",
      categoryGroupId: "6af47d90-df35-11ea-8500-597e701b6d41",
      isRecurrent: false,
      budget: 500,
      currency: "usd",
    });
    await CategoriesRepository.create({
      userId: user.id,
      name: "[categories::getList] name 2",
      description: "description",
      categoryGroupId: "6af47d90-df35-11ea-8500-597e701b6d42",
      isRecurrent: false,
      budget: 1000,
      currency: "pen",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("GET /categories", () => {
    test("It should get the list of categories.", async (done) => {
      const res = await requester
      .get("/categories")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.length).toEqual(2);
      done();
    });

    test("It should get the filtered list of categories.", async (done) => {
      const res = await requester
      .get("/categories?categoryGroupId=6af47d90-df35-11ea-8500-597e701b6d41")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.length).toEqual(1);
      done();
    });

    test("It should get the empty filtered list of categories.", async (done) => {
      const res = await requester
      .get("/categories?categoryGroupId=6af47d90-df35-11ea-8500-597e701b6d43")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.length).toEqual(0);
      done();
    });

    test("It shouldn\"t get the filtered list of categories. There is not a token.", async (done) => {
      const res = await requester
      .get("/categories")
      .set("Authorization", "Bearer");
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get the filtered list of categories. There is not a header.", async (done) => {
      const res = await requester
      .get("/categories");
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get the filtered list of categories. The attribute is invalid", async (done) => {
      const res = await requester
      .get("/categories?currencies=usd")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(406);
      done();
    });
  });
});