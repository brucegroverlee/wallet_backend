import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import createCategoryGroup from '../../../application/createCategoryGroup';
import CategoryGroupsInterface from "../../../domain/categoryGroupsInterface";

export default function createCategoryGroupController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  const { type, name, description, } = request.body;
  createCategoryGroup({ type, name, description, user, })
  .then((createCategory: CategoryGroupsInterface) => {
    response.status(201);
    response.send(createCategory);
  })
  .catch((error: any) => {
    /* tslint:disable:no-console */
    console.error(error);
    /* tslint:enable:no-console */
    response.status(500);
    response.end();
  })
}
