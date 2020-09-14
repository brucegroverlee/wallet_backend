import { Request, Response } from "express";
import IAuthenticateRequest from "../../../../shared/infrastructure/api/controllers/IAuthenticateRequest";
import createCategory from '../../../application/createCategory';
import CategoriesInterface from "../../../domain/categoriesInterface";

export default function createCategoryController(request: Request, response: Response) {
  const { user } = request as IAuthenticateRequest;
  const {
    categoryGroupId,
    name,
    description,
    isRecurrent,
    budget,
    currency,
  } = request.body;
  createCategory({
    categoryGroupId,
    name,
    description,
    isRecurrent,
    budget,
    currency,
    user,
  })
  .then((category: CategoriesInterface) => {
    response.status(201);
    response.send(category);
  })
  .catch((error: any) => {
    /* tslint:disable:no-console */
    console.error(error);
    /* tslint:enable:no-console */
    response.status(500);
    response.end();
  })
}
