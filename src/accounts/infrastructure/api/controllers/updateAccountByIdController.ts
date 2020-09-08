import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import updateAccountById from '../../../application/updateAccountById';
import AccountsInterface from "../../../domain/accountsInterface";

export default function updateAccountByIdController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  const { accountId } = request.params;
  updateAccountById({
    data: request.body,
    accountId,
    user,
  })
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
