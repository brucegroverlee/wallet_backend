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

describe("Get CategoryGroups by id test suit", () => {
  let requester: ChaiHttp.Agent;
  let user: UsersModel;
  let categoryGroup: CategoryGroupsModel;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await CategoryGroupsRepository.delete({ name: "[categoryGroups::getById] name", });
    await usersRepository.delete({ name: "[categoryGroups::getById] name", });
    token = await signup({
      name: "[categoryGroups::getById] name",
      email: "categoryGroups.getById@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[categoryGroups::getById] name" }, });
    categoryGroup = await CategoryGroupsModel.create({
      userId: user.id,
      type: "income",
      name: "[categoryGroups::getById] name",
      description: "description",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("GET /category-groups", () => {
    test("It should get an categoryGroup.", async (done) => {
      const res = await requester
      .get(`/category-groups/${categoryGroup.id}`)
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.object).toEqual("categoryGroup");
      done();
    });

    test("It shouldn\"t get an categoryGroup. There is not a token.", async (done) => {
      const res = await requester
      .get(`/category-groups/${categoryGroup.id}`)
      .set("Authorization", `Bearer`);
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get an categoryGroup. There is not a header.", async (done) => {
      const res = await requester
      .get(`/category-groups/${categoryGroup.id}`);
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get an categoryGroup. There is not a valid id.", async (done) => {
      const res = await requester
      .get(`/category-groups/6af47d90-df35-11ea-8500-597e701b6d4e`)
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(404);
      done();
    });
  });

});