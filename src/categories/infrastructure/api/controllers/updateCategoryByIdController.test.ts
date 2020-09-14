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

describe("Update Category by id test suit", () => {
  let requester: ChaiHttp.Agent;
  let user: UsersModel;
  let category: CategoriesModel;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await CategoriesRepository.delete({ name: "[categories::updateById] name", });
    await usersRepository.delete({ name: "[categories::updateById] name", });
    token = await signup({
      name: "[categories::updateById] name",
      email: "categories.updateById@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[categories::updateById] name" }, });
    category = await CategoriesModel.create({
      userId: user.id,
      name: "[categories::updateById] name",
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

  describe("PUT /categories", () => {
    test("It should update a CategoryGroup.", async (done) => {
      const res = await requester
      .put(`/categories/${category.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "[categories::updateById] name 2",
        currency: "pen",
      });
      expect(res.status).toEqual(202);
      expect(res.body.object).toEqual("category");
      expect(res.body.name).toEqual("[categories::updateById] name 2");
      expect(res.body.currency).toEqual("pen");
      done();
    });


    test("It shouldn\"t update a category. There is not a token.", async (done) => {
      const res = await requester
      .put(`/categories/${category.id}`)
      .set("Authorization", `Bearer`)
      .send({
        name: "[categories::updateById] name 3",
        description: "description",
        categoryGroupId: "6af47d90-df35-11ea-8500-597e701b6d4e",
        isRecurrent: false,
        budget: 500,
        currency: "eur",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t update a category. There is not a header.", async (done) => {
      const res = await requester
      .put(`/categories/${category.id}`)
      .send({
        name: "[categories::updateById] name 3",
        description: "description",
        categoryGroupId: "6af47d90-df35-11ea-8500-597e701b6d4e",
        isRecurrent: false,
        budget: 500,
        currency: "eur",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t update an category. There is not a valid id.", async (done) => {
      const res = await requester
      .put(`/categories/6af47d90-df35-11ea-8500-597e701b6d4e`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "[categories::updateById] name 3",
        description: "description",
        categoryGroupId: "6af47d90-df35-11ea-8500-597e701b6d4e",
        isRecurrent: false,
        budget: 500,
        currency: "eur",
      });
      expect(res.status).toEqual(404);
      done();
    });

    test("It shouldn\"t update a category. There is a different attribute.", async (done) => {
      const res = await requester
      .put(`/categories/${category.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "[categories::updateById] name",
        descriptions: "description 3",
      });
      expect(res.status).toEqual(406);
      done();
    });
  });
});