import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import deleteTransactionById from '../../../application/deleteTransactionById';

export default function deleteTransactionByIdController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  const { transactionId } = request.params;
  deleteTransactionById({ transactionId, user })
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
