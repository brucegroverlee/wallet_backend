import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import me, { IMePayload } from '../../../application/me';

export default function meController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  me({ user })
  .then((session: IMePayload) => {
    if (session) {
      response.status(202);
      response.send(session);
    } else {
      response.status(401);
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
