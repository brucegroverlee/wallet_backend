import { Request, Response } from "express";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required(),
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

export default function verifySignupParams(request: Request, response: Response, next: () => void) {
  const { error, value } = schema.validate(request.body);
  if (error) {
    response.status(406).json({
      message: error.message,
    });
  } else {
    next();
  }
}
