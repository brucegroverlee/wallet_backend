import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import { parseRequestQueryParams } from "../../../../shared/infrastructure/api/utils/parseRequestQueryParams";
import getTransactions, { IGetTransactionsResult } from "../../../application/getTransactions";

export default function getTransactionsController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  const { query, page, perPage, since, until } = parseRequestQueryParams(request.query);
  getTransactions({ query, page, perPage, since, until, user })
  .then((result: IGetTransactionsResult) => {
    response.status(202);
    response.send(result);
  })
  .catch((error: any) => {
    /* tslint:disable:no-console */
    console.error(error);
    /* tslint:enable:no-console */
    response.status(500);
    response.end();
  })
}
