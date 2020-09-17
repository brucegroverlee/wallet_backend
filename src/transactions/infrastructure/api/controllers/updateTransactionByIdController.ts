import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import updateTransactionById from '../../../application/updateTransactionById';
import TransactionsInterface from "../../../domain/transactionsInterface";

export default function updateTransactionByIdController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  const { transactionId } = request.params;
  updateTransactionById({
    data: request.body,
    transactionId,
    user,
  })
  .then((transaction: TransactionsInterface) => {
    if (transaction !== null) {
      response.status(202);
      response.send(transaction);
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
