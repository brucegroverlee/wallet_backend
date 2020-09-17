import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import createTransaction from '../../../application/createTransaction';
import TransactionsInterface from "../../../domain/transactionsInterface";

export default function createTransactionController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  const {
    categoryId,
    accountId,
    description,
    total,
    currency,
  } = request.body;
  createTransaction({
    categoryId,
    accountId,
    description,
    total,
    currency,
    user,
  })
  .then((transaction: TransactionsInterface) => {
    response.status(201);
    response.send(transaction);
  })
  .catch((error: any) => {
    /* tslint:disable:no-console */
    console.error(error);
    /* tslint:enable:no-console */
    response.status(500);
    response.end();
  })
}
