import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../../../index";
import CategoriesRepository from "../../repository/categoriesRepository";
import CategoriesModel from "../../../domain/categoriesModel";
import usersRepository from "../../../../users/infrastructure/repository/usersRepository";
import UsersModel from "../../../../users/domain/usersModel";
import signup from "../../../../users/application/signup";

chai.use(chaiHttp);

describe("Get Category by id test suit", () => {
  let requester: ChaiHttp.Agent;
  let user: UsersModel;
  let category: CategoriesModel;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await CategoriesRepository.delete({ name: "[categories::getById] name", });
    await usersRepository.delete({ name: "[categories::getById] name", });
    token = await signup({
      name: "[categories::getById] name",
      email: "categories.getById@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[categories::getById] name" }, });
    category = await CategoriesModel.create({
      userId: user.id,
      name: "[categories::getById] name",
      description: "description",
      categoryGroupId: "6af47d90-df35-11ea-8500-597e701b6d4e",
      isRecurrent: false,
      budget: 500,
      currency: "usd",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("GET /categories", () => {
    test("It should get a category.", async (done) => {
      const res = await requester
      .get(`/categories/${category.id}`)
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.object).toEqual("category");
      done();
    });

    test("It shouldn\"t get a category. There is not a token.", async (done) => {
      const res = await requester
      .get(`/categories/${category.id}`)
      .set("Authorization", `Bearer`);
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get a category. There is not a header.", async (done) => {
      const res = await requester
      .get(`/categories/${category.id}`);
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get a category. There is not a valid id.", async (done) => {
      const res = await requester
      .get(`/categories/6af47d90-df35-11ea-8500-597e701b6d4e`)
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(404);
      done();
    });
  });

});