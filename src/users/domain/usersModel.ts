import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../../config/constants";
import UsersRepository from "../infrastructure/repository/usersRepository";

class UsersModel extends UsersRepository {
  public name: string;
  public email: string;
  public password: string;

  static async getHashedPassword(password: string): Promise<string> {
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
  async verifyPassword(password: string): Promise<boolean> {
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
  createToken(): string {
    const token = jwt.sign({
      userId: this.id,
    }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return token;
  }
}

export default UsersModel;
