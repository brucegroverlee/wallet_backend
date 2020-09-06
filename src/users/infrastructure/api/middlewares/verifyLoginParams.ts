import { Request, Response } from "express";

export default function verifyLoginParams(request: Request, response: Response, next: () => void) {
  const { email, password } = request.body;
  if (
    email && typeof email === 'string' && email !== ''
    && password && typeof password === 'string' && password !== '') {
    next()
  } else {
    response.status(400).end();
  }
}
