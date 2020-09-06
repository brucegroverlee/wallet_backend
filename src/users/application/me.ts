import pipe from "p-pipe";
import UsersModel from "../domain/usersModel";

export interface IMePayload {
  user: UsersModel|any;
  token?: string;
}

/**
 *
 * @param {object} payload
 * @returns {Promise<object>} returns the payload with the user object.
 */
async function refreshToken(payload: IMePayload): Promise<IMePayload> {
  try {
    const { user } = payload;
    const token = user.createToken();
    return {
      ...payload,
      token,
    };
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param {object} payload
 * @returns {Promise<object>} returns the payload with the user object.
 */
async function removePassword(payload: IMePayload): Promise<IMePayload> {
  try {
    const { user } = payload;
    const newUser: any = {
      ...user.toJSON(),
    };
    delete newUser.password;
    return {
      ...payload,
      user: newUser,
    };
  } catch (error) {
    throw error;
  }
}

/**
 * @param {object} payload
 * @property {object} payload.user
 * @returns {Promise<object>} returns the user object and the new token. Otherwise, returns null
 * @property {object} user
 * @property {string} token
 */
export default async function me(payload: IMePayload): Promise<IMePayload> {
  try {
    const result = await pipe(
      refreshToken,
      removePassword,
    )(payload);
    return result;
  } catch (error) {
    throw error;
  }
}
