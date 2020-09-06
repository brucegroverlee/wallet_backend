import { Request, Response } from "express";
import login from "../../../application/login";

export default function loginController(request: Request, response: Response) {
  const { email, password } = request.body;
  login({ email, password })
  .then((token: string|null) => {
    if (token) {
      response.status(202);
      response.send({
        token,
      });
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
