import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UsersRepository from "../infrastructure/repository/usersRepository";

dotenv.config({
  path: path.resolve(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

class UsersModel extends UsersRepository {
  public name: string;
  public email: string;
  private password: string;

  static async getHashedPassword(password: string) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }

  static verify(token: string) {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      return decodedToken;
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @param {string} password
   * @returns {boolean} returns true if the password is correct. Otherwise, returns false.
   */
  async verifyPassword(password: string) {
    try {
      const isValid = await bcrypt.compare(password, this.password);
      if (isValid) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description create a JWT access token
   */
  createToken() {
    const token = jwt.sign({
      userId: this.id,
    }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return token;
  }
}

export default UsersModel;
