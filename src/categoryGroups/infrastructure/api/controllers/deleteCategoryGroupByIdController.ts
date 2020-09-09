import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import deleteCategoryGroupById from '../../../application/deleteCategoryGroupById';

export default function deleteCategoryGroupByIdController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  const { categoryGroupId } = request.params;
  deleteCategoryGroupById({ categoryGroupId, user })
  .then((isDeleted: boolean) => {
    if (isDeleted) {
      response.status(204);
      response.end();
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
