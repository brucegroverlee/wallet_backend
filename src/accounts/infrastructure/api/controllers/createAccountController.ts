import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import createAccount from '../../../application/createAccount';
import AccountsInterface from "../../../domain/accountsInterface";

export default function createAccountController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  const { name, total, currency, } = request.body;
  createAccount({ name, total, currency, user, })
  .then((account: AccountsInterface) => {
    response.status(201);
    response.send(account);
  })
  .catch((error: any) => {
    /* tslint:disable:no-console */
    console.error(error);
    /* tslint:enable:no-console */
    response.status(500);
    response.end();
  })
}
