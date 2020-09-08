import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import AccountsInterface from "../../../domain/accountsInterface";
import getAccounts from "../../../application/getAccounts";

export default function getAccountsController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  getAccounts({ query: request.query, user })
  .then((accounts: AccountsInterface[]) => {
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
