import { Response } from "express";
import Joi from "joi";

export default function validateParams(schema: Joi.ObjectSchema, data: any, response: Response, next: () => void) {
  const { error, value } = schema.validate(data);
  if (error) {
    response.status(406).json({
      message: error.message,
    });
  } else {
    next();
  }
}