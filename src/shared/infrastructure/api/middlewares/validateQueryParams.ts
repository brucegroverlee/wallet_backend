import { Request, Response } from "express";
import Joi from "joi";

export default function validateQueryParams(schema: Joi.ObjectSchema) {
  return (request: Request, response: Response, next: () => void) => {
    const { error, value } = schema.validate(request.query);
    if (error) {
      response.status(406).json({
        message: error.message,
      });
    } else {
      request.query = value;
      next();
    }
  }
}