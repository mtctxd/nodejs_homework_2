import { userService } from "../services/UserService";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/userModel";
import { Request } from "express";
import { prepareServiceError } from "../../feature/prepareServiceError";
import { HTTP_STATUS } from "../../types";
import { userValidator } from "../middlewares/validator/Validator";

dotenv.config();

class AuthService {
  private accessKey = process.env.JWT_ACCESS || "access";
  private refreshKey = process.env.JWT_ACCESS || "refresh";
  private userService = userService;
  private validator = userValidator;

  public async login(req: Request) {
    await this.validator.validateRequestBody(req.body, "login", false);
    const { login, password } = req.body;

    const user: UserModel = await this.userService.getByLogin(login);

    console.log(await user.validatePassword(password));

    const isPasswordValid = await user.validatePassword(password);
    
    if (!isPasswordValid) {
      throw prepareServiceError(
        HTTP_STATUS.BAD_REQUEST_400,
        "wrong credentials"
      );
    }

    const token = this.generaeAccessJWT(user);

    return token;
  }

  public async register(req: Request) {
    const user = await this.userService.create(req.body);

    const token = this.generaeAccessJWT(user);
    return token;
  }

  private generaeAccessJWT(data: UserModel) {
    return jwt.sign(
      { user_id: data.user_id, login: data.login, age: data.age },
      this.accessKey,
      {
        expiresIn: "1h",
      }
    );
  }
  
  private generaeRefreshJWT(data: UserModel) {
    return jwt.sign(
      { user_id: data.user_id, login: data.login, age: data.age },
      this.refreshKey,
      {
        expiresIn: "24h",
      }
    );
  }
}

const authService = new AuthService();

export default authService;
