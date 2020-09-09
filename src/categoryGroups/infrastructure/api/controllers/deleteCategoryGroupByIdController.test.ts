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
import UsersRepository from "../../../../users/infrastructure/repository/usersRepository";
import UsersModel from "../../../../users/domain/usersModel";
import signup from "../../../../users/application/signup";

chai.use(chaiHttp);

describe("Delete CategoryGroup by id test suit", () => {
  let requester: ChaiHttp.Agent;
  let user: UsersModel;
  let categoryGroup: CategoryGroupsModel;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await CategoryGroupsRepository.delete({ name: "[categoryGroups::deleteById] name", });
    await UsersRepository.delete({ name: "[categoryGroups::deleteById] name", });
    token = await signup({
      name: "[categoryGroups::deleteById] name",
      email: "categoryGroups.deleteById@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[categoryGroups::deleteById] name" }, });
    categoryGroup = await CategoryGroupsModel.create({
      userId: user.id,
      name: "[categoryGroups::deleteById] name",
      description: "description",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("DELETE /category-groups", () => {
    test("It should get an categoryGroup.", async (done) => {
      const res = await requester
      .delete(`/category-groups/${categoryGroup.id}`)
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(204);
      done();
    });

    test("It shouldn\"t get an categoryGroup. There is not a token.", async (done) => {
      const res = await requester
      .delete(`/category-groups/${categoryGroup.id}`)
      .set("Authorization", `Bearer`);
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get an categoryGroup. There is not a header.", async (done) => {
      const res = await requester
      .delete(`/category-groups/${categoryGroup.id}`);
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get an categoryGroup. There is not a valid id.", async (done) => {
      const res = await requester
      .delete(`/category-groups/6af47d90-df35-11ea-8500-597e701b6d4e`)
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(404);
      done();
    });
  });

});