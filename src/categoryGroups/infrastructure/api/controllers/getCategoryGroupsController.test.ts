import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../../../index";
import CategoryGroupsRepository from "../../repository/categoryGroupsRepository";
import usersRepository from "../../../../users/infrastructure/repository/usersRepository";
import UsersModel from "../../../../users/domain/usersModel";
import signup from "../../../../users/application/signup";

chai.use(chaiHttp);

describe("Get a filtered list of CategoryGroups test suit", () => {
  let requester: ChaiHttp.Agent;
  let user: UsersModel;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await CategoryGroupsRepository.delete({ name: "[categoryGroups::getList] name 1", });
    await CategoryGroupsRepository.delete({ name: "[categoryGroups::getList] name 2", });
    await usersRepository.delete({ name: "[categoryGroups::getList] name", });
    token = await signup({
      name: "[categoryGroups::getList] name",
      email: "categoryGroups.getList@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[categoryGroups::getList] name" }, });
    await CategoryGroupsRepository.create({
      userId: user.id,
      name: "[categoryGroups::getList] name 1",
      description: "description 1",
    });
    await CategoryGroupsRepository.create({
      userId: user.id,
      name: "[categoryGroups::getList] name 2",
      description: "description 2",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("GET /category-groups", () => {
    test("It should get the list of categoryGroups.", async (done) => {
      const res = await requester
      .get("/category-groups")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.length).toEqual(2);
      done();
    });

    test("It shouldn\"t get an account. There is not a token.", async (done) => {
      const res = await requester
      .get("/category-groups")
      .set("Authorization", "Bearer");
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t get an account. There is not a header.", async (done) => {
      const res = await requester
      .get("/category-groups");
      expect(res.status).toEqual(401);
      done();
    });
  });
});