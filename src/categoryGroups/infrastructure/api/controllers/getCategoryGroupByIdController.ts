import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import getCategoryGroupById from '../../../application/getCategoryGroupById';
import CategoryGroupsInterface from "../../../domain/categoryGroupsInterface";

export default function getCategoryGroupByIdController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  const { categoryGroupId } = request.params;
  getCategoryGroupById({ categoryGroupId, user })
  .then((account: CategoryGroupsInterface) => {
    if (account !== null) {
      response.status(202);
      response.send(account);
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
