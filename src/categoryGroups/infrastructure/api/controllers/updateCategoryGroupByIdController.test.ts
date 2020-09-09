import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../../../index";
import CategoryGroupsRepository from "../../repository/categoryGroupsRepository";
import CategoryGroupsModel from "../../../domain/categoryGroupsModel";
import usersRepository from "../../../../users/infrastructure/repository/usersRepository";
import UsersModel from "../../../../users/domain/usersModel";
import signup from "../../../../users/application/signup";

chai.use(chaiHttp);

describe("Update CategoryGroup by id test suit", () => {
  let requester: ChaiHttp.Agent;
  let user: UsersModel;
  let categoryGroup: CategoryGroupsModel;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await CategoryGroupsRepository.delete({ name: "[categoryGroups::updateById] name", });
    await usersRepository.delete({ name: "[categoryGroups::updateById] name", });
    token = await signup({
      name: "[categoryGroups::updateById] name",
      email: "categoryGroups.updateById@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[categoryGroups::updateById] name" }, });
    categoryGroup = await CategoryGroupsModel.create({
      userId: user.id,
      name: "[categoryGroups::updateById] name",
      description: "description",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("PUT /categoryGroups", () => {
    test("It should update a CategoryGroup.", async (done) => {
      const res = await requester
      .put(`/category-groups/${categoryGroup.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "[categoryGroups::updateById] name",
        description: "description 2",
      });
      expect(res.status).toEqual(202);
      expect(res.body.object).toEqual("categoryGroup");
      expect(res.body.description).toEqual("description 2");
      done();
    });


    test("It shouldn\"t update a categoryGroup. There is not a token.", async (done) => {
      const res = await requester
      .put(`/category-groups/${categoryGroup.id}`)
      .set("Authorization", `Bearer`)
      .send({
        name: "[categoryGroups::updateById] name",
        description: "description",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t update a categoryGroup. There is not a header.", async (done) => {
      const res = await requester
      .put(`/category-groups/${categoryGroup.id}`)
      .send({
        name: "[categoryGroups::updateById] name",
        description: "description",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t update an categoryGroup. There is not a valid id.", async (done) => {
      const res = await requester
      .put(`/category-groups/6af47d90-df35-11ea-8500-597e701b6d4e`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "[categoryGroups::updateById] name",
        description: "description 2",
      });
      expect(res.status).toEqual(404);
      done();
    });

    test("It shouldn\"t update a categoryGroup. There is a different attribute.", async (done) => {
      const res = await requester
      .put(`/category-groups/${categoryGroup.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "[categoryGroups::updateById] name",
        descriptions: "description 3",
      });
      expect(res.status).toEqual(406);
      done();
    });
  });
});