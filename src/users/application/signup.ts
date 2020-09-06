import pipe from "p-pipe";
import UsersModel from "../domain/usersModel";

function whenTheUserDoesntExist(...funcs: ((payload: any) => Promise<any>)[]) {
  return async (payload: any) => {
    try {
      const user = await UsersModel.findOne({ where: { email: payload.email }});
      if (user) {
        return null;
      } else {
        const result = await pipe(
          ...funcs,
        )(payload);
        return result;
      }
    } catch (error) {
      throw error;
    }
  };
}

async function getHashedPassword(payload: any) {
  try {
    const password = await UsersModel.getHashedPassword(payload.password);
    return {
      ...payload,
      password,
    };
  } catch (error) {
    throw error;
  }
}

async function saveUser(payload: any) {
  try {
    const user = await UsersModel.create({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    });
    return {
      ...payload,
      user,
    };
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param {object} payload
 * @returns {Promise<string>} if it is valid, returns the token. Otherwise, retuns null.
 */
async function createToken(payload: any) {
  try {
    const { user, } = payload;
    if (user) {
      const token = user.createToken();
      return token;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param {object} payload
 * @param {string} payload.name
 * @param {string} payload.email
 * @param {string} payload.password
 * @returns {Promise<string | null>} returns the token if the auth was correct. Otherwise, retuns null.
 */
async function signup(payload: any) {
  try {
    const result = await pipe(
      whenTheUserDoesntExist(
        getHashedPassword,
        saveUser,
        createToken,
      ),
    )(payload);
    return result;
  } catch (error) {
    throw error;
  }
}

export default signup;
