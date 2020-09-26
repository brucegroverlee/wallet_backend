import { Request, Response } from "express";
import Joi from "joi";

export default function validateBodyParams(schema: Joi.ObjectSchema) {
  return (request: Request, response: Response, next: () => void) => {
    const { error, value } = schema.validate(request.body);
    if (error) {
      response.status(406).json({
        message: error.message,
      });
    } else {
      request.body = value;
      next();
    }
  }
}