import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import CategoryGroupsInterface from "../../../domain/categoryGroupsInterface";
import getCategoryGroups from "../../../application/getCategoryGroups";

/**
 * This controller doesn't allow filter the query
 */
export default function getCategoryGroupsController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  getCategoryGroups({ query: {}, user })
  .then((accounts: CategoryGroupsInterface[]) => {
    response.status(202);
    response.send(accounts);
  })
  .catch((error: any) => {
    /* tslint:disable:no-console */
    console.error(error);
    /* tslint:enable:no-console */
    response.status(500);
    response.end();
  })
}
