import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import CategoriesInterface from "../../../domain/categoriesInterface";
import getCategories from "../../../application/getCategories";

/**
 * This controller doesn't allow filter the query
 */
export default function getCategoriesController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  getCategories({ query: request.query, user })
  .then((categories: CategoriesInterface[]) => {
    response.status(202);
    response.send(categories);
  })
  .catch((error: any) => {
    /* tslint:disable:no-console */
    console.error(error);
    /* tslint:enable:no-console */
    response.status(500);
    response.end();
  })
}
