import { userService } from '../services/UserService';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserModel } from '../models/userModel';
import { Request } from 'express';
import { prepareServiceError } from '../../feature/prepareServiceError';
import { HTTP_STATUS } from '../../types';

dotenv.config();

class AuthService {
  private accessKey = process.env.JWT_ACCESS || 'access';
  private refreshKey = process.env.JWT_ACCESS || 'refresh';
  private userService = userService;

  public async login(req: Request) {
    const { login, password } = req.body;

    if (!password) {
      throw prepareServiceError(
        HTTP_STATUS.BAD_REQUEST_400,
        'password required'
      );
    }

    const user: UserModel = await this.userService.getByLogin(login);
    

    if (password !== user.password) {
      throw prepareServiceError(
        HTTP_STATUS.BAD_REQUEST_400,
        'wrong credentials'
      );
    }

    return this.jswSign(user);
  }

  private jswSign(data: UserModel) {
    return jwt.sign(
      { user_id: data.user_id, login: data.login, age: data.age },
      this.accessKey,
      {
        expiresIn: '2h',
      }
    );
  }
}

const authService = new AuthService();

export default authService;
