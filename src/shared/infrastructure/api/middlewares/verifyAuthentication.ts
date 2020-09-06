import "module-alias/register";
import pipe from "p-pipe";
import usersModel from "../../../../users/domain/usersModel";

import { Request, Response } from "express";

interface IAuthenticationPayload {
  request: Request;
  response: Response;
  next: () => void;
  token: string;
  userId: string;
  user: any;
}

async function pipeline(request: Request, response: Response, next: () => void) {
  try {
    const payload = await pipe(
      getToken,
      verifyToken,
      verifyUser,
    )({ request, response, next, token: null, userId: null, user: null, });
    return payload;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {object} payload
 * @returns {object} add the payload with the token.
 */
async function getToken(payload: IAuthenticationPayload) {
  const { request, response } = payload;
  let scheme = null;
  let token = null;
  if (request.headers && request.headers.authorization) {
    const parts = request.headers.authorization.split(" ");
    if (parts.length === 2) {
      scheme = parts[0];
      token = parts[1];
    }
  }
  return {
    ...payload,
    token,
  };
}

async function verifyToken(payload: IAuthenticationPayload) {
  try {
    const { token } = payload;
    let userId = null;
    if (token) {
      const decodedToken: any = await usersModel.verify(token);
      userId = decodedToken.userId;
    }
    return {
      ...payload,
      userId,
    };
  } catch (error) {
    throw error;
  }
}

async function verifyUser(payload: IAuthenticationPayload) {
  try {
    const { userId } = payload;
    let user = null;
    if (userId) {
      user = await usersModel.findById(userId);
    }
    return {
      ...payload,
      user,
    };
  } catch (error) {
    throw error;
  }
}

export default function verifyAuthentication(request: any, response: Response, next: () => void) {
  pipeline(request, response, next)
  .then((payload: any) => {
    const { user } = payload;
    if (user) {
      request.user = user;
      next();
    } else {
      response.status(401);
      response.end();
    }
  })
  .catch((error: any) => {
    response.status(401);
    response.end();
  });
}
