import { Request } from "express";
import UsersModel from "../../../../users/domain/usersModel";

interface IAuthenticateRequest extends Request {
  user: UsersModel;
}

export default IAuthenticateRequest;
