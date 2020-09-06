import UsersModel from "../domain/usersModel";

interface PayloadLoginInterface {
  email: string;
  password: string;
}

/**
 * 
 * @param {object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 * @returns {string | null} returns the token if the auth was correct. Otherwise, retuns null.
 */
async function login(payload: PayloadLoginInterface): Promise<string|null> {
  try {
    const { email, password, } = payload;
    const user = await UsersModel.findOne({ where: {
      email,
    }, });
    const isCorrect = await user.verifyPassword(password);
    if (isCorrect) {
      return user.createToken();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export default login;
