import { Request, Response } from "express";

export default function verifySignupParams(request: Request, response: Response, next: () => void) {
  const {
    name,
    email,
    password,
  } = request.body;
  if (
    name && typeof name === 'string' && name !== ''
    && email && typeof email === 'string' && email !== ''
    && password && typeof password === 'string' && password !== ''
  ) {
    next();
  } else {
    response.status(406).end();
  }
}
