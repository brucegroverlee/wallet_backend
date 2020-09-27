import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import { parseRequestQueryParams } from "../../../../shared/infrastructure/api/utils/parseRequestQueryParams";
import getAccounts, { IGetAccountsResult } from "../../../application/getAccounts";

export default function getAccountsController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  const { query, page, perPage } = parseRequestQueryParams(request.query);
  getAccounts({ query, page, perPage, user })
  .then((result: IGetAccountsResult) => {
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
