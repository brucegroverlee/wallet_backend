import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import getCategoryById from '../../../application/getCategoryById';
import CategoriesInterface from "../../../domain/categoriesInterface";

export default function getCategoryByIdController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  const { categoryId } = request.params;
  getCategoryById({ categoryId, user })
  .then((category: CategoriesInterface) => {
    if (category !== null) {
      response.status(202);
      response.send(category);
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
