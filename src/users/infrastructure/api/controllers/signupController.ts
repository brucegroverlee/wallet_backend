import { Response } from "express";
import signup from "../../../application/signup";

export default function signupController(request: any, response: Response) {
  signup(request.body)
  .then((token: any) => {
    if (token) {
      response.status(201);
      response.send({
        token,
      });
    } else {
      response.status(409);
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
