import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import { parseRequestQueryAndPagination } from "../../../../shared/infrastructure/api/utils/parseRequestQueryAndPagination";
import getCategories, { IGetCategoriesResult } from "../../../application/getCategories";

export default function getCategoriesController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  const { query, page, perPage } = parseRequestQueryAndPagination(request.query);
  getCategories({ query, page, perPage, user })
  .then((result: IGetCategoriesResult) => {
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
