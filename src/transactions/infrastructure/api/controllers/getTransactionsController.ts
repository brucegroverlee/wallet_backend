import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import TransactionsInterface from "../../../domain/transactionsInterface";
import getTransactions from "../../../application/getTransactions";

/**
 * This controller doesn't allow filter the query
 */
export default function getTransactionsController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  getTransactions({ query: request.query, user })
  .then((transactions: TransactionsInterface[]) => {
    response.status(202);
    response.send(transactions);
  })
  .catch((error: any) => {
    /* tslint:disable:no-console */
    console.error(error);
    /* tslint:enable:no-console */
    response.status(500);
    response.end();
  })
}
