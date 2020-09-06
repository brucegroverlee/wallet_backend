import { Request, Response } from "express";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string()
    .email()
    .min(2)
    .max(50)
    .required(),
  password: Joi.string()
    .min(4)
    .max(50)
    .required(),
});

export default function verifyLoginParams(request: Request, response: Response, next: () => void) {
  const { error, value } = schema.validate(request.body);
  if (error) {
    response.status(406).json({
      message: error.message,
    });
  } else {
    next();
  }
}
