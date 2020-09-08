import { Request, Response } from "express";
import Joi from "joi";
import validateParams from "./validateParams";

export default function validateBodyParams(schema: Joi.ObjectSchema) {
  return (request: Request, response: Response, next: () => void) => {
    validateParams(schema, request.body, response, next);
  }
}