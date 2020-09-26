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
    await CategoryGroupsRepository.destroy({ where: {
      name: [
        "[categoryGroups::getList] name 1",
        "[categoryGroups::getList] name 2",
        "[categoryGroups::getList] name 3",
        "[categoryGroups::getList] name 4",
        "[categoryGroups::getList] name 5",
        "[categoryGroups::getList] name 6",
        "[categoryGroups::getList] name 7",
        "[categoryGroups::getList] name 8",
        "[categoryGroups::getList] name 9",
        "[categoryGroups::getList] name 10",
        "[categoryGroups::getList] name 11",
        "[categoryGroups::getList] name 12",
        "[categoryGroups::getList] name 13",
        "[categoryGroups::getList] name 14",
        "[categoryGroups::getList] name 15",
      ],
    }, });
    await usersRepository.delete({ name: "[categoryGroups::getList] name", });
    token = await signup({
      name: "[categoryGroups::getList] name",
      email: "categoryGroups.getList@email.com",
      password: "password",
    });
    user = await UsersModel.findOne({ where : { name: "[categoryGroups::getList] name" }, });
    await CategoryGroupsRepository.bulkCreate([
      { userId: user.id, name: "[categoryGroups::getList] name 1", description: "description 1", },
      { userId: user.id, name: "[categoryGroups::getList] name 2", description: "description 2", },
      { userId: user.id, name: "[categoryGroups::getList] name 3", description: "description 3", },
      { userId: user.id, name: "[categoryGroups::getList] name 4", description: "description 4", },
      { userId: user.id, name: "[categoryGroups::getList] name 5", description: "description 5", },
      { userId: user.id, name: "[categoryGroups::getList] name 6", description: "description 6", },
      { userId: user.id, name: "[categoryGroups::getList] name 7", description: "description 7", },
      { userId: user.id, name: "[categoryGroups::getList] name 8", description: "description 8", },
      { userId: user.id, name: "[categoryGroups::getList] name 9", description: "description 9", },
      { userId: user.id, name: "[categoryGroups::getList] name 10", description: "description 10", },
      { userId: user.id, name: "[categoryGroups::getList] name 11", description: "description 11", },
      { userId: user.id, name: "[categoryGroups::getList] name 12", description: "description 12", },
      { userId: user.id, name: "[categoryGroups::getList] name 13", description: "description 13", },
      { userId: user.id, name: "[categoryGroups::getList] name 14", description: "description 14", },
      { userId: user.id, name: "[categoryGroups::getList] name 15", description: "description 15", },
    ]);
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
      expect(res.body.data.length).toEqual(10);
      expect(res.body.pagination.page).toEqual(1);
      expect(res.body.pagination.perPage).toEqual(10);
      expect(res.body.pagination.pages).toEqual(2);
      expect(res.body.pagination.total).toEqual(15);
      done();
    });

    test("It should get the list of categoryGroups at the page 2 and 5 per pages.", async (done) => {
      const res = await requester
      .get("/category-groups?page=2&perPage=5")
      .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(202);
      expect(res.body.data.length).toEqual(5);
      expect(res.body.pagination.page).toEqual(2);
      expect(res.body.pagination.perPage).toEqual(5);
      expect(res.body.pagination.pages).toEqual(3);
      expect(res.body.pagination.total).toEqual(15);
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