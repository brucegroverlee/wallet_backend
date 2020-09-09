import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import updateCategoryGroupById from '../../../application/updateCategoryGroupById';
import CategoryGroupsInterface from "../../../domain/categoryGroupsInterface";

export default function updateCategoryGroupByIdController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  const { categoryGroupId } = request.params;
  updateCategoryGroupById({
    data: request.body,
    categoryGroupId,
    user,
  })
  .then((categoryGroup: CategoryGroupsInterface) => {
    if (categoryGroup !== null) {
      response.status(202);
      response.send(categoryGroup);
    } else {
      response.status(404);
      response.end();
    }
  })
  .catch((error: any) => {
    /* tslint:disable:no-console */
    console.error(error);
    /* tslint:enable:no-console */
    response.status(500);
    response.end();
  })
}
