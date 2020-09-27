import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../../../index";
import CategoryGroupsRepository from "../../repository/categoryGroupsRepository";
import UsersRepository from "../../../../users/infrastructure/repository/usersRepository";
import signup from "../../../../users/application/signup";

chai.use(chaiHttp);

describe("Create CategoryGroup test suit", () => {
  let requester: ChaiHttp.Agent;
  let token: string;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    await CategoryGroupsRepository.delete({ name: "[categoryGroups::create] name", });
    await UsersRepository.delete({ name: "[categoryGroups::create] name", });
    token = await signup({
      name: "[categoryGroups::create] name",
      email: "categoryGroups.create@email.com",
      password: "password",
    });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("POST /category-groups", () => {
    test("It should create a categoryGroup.", async (done) => {
      const res = await requester
      .post("/category-groups")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "income",
        name: "[categoryGroups::create] name",
        description: "description",
      });
      expect(res.status).toEqual(201);
      expect(res.body.object).toEqual("categoryGroup");
      done();
    });

    test("It shouldn\"t create a categoryGroup. There is not a token.", async (done) => {
      const res = await requester
      .post("/category-groups")
      .set("Authorization", `Bearer`)
      .send({
        type: "income",
        name: "[categoryGroups::create] name",
        description: "description",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t create a categoryGroup. There is not a header.", async (done) => {
      const res = await requester
      .post("/category-groups")
      .send({
        type: "income",
        name: "[categoryGroups::create] name",
        description: "description",
      });
      expect(res.status).toEqual(401);
      done();
    });

    test("It shouldn\"t create a categoryGroup. There is not an attribute.", async (done) => {
      const res = await requester
      .post("/category-groups")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "income",
        name: "[categoryGroups::create] name",
      });
      expect(res.status).toEqual(406);
      done();
    });
  });

});