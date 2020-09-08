import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import getAccountById from '../../../application/getAccountById';
import AccountsInterface from "../../../domain/accountsInterface";

export default function getAccountByIdController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  const { accountId } = request.params;
  getAccountById({ accountId, user })
  .then((account: AccountsInterface) => {
    if (account !== null) {
      response.status(202);
      response.send(account);
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
