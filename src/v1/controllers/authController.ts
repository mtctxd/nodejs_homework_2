import { Request, Response } from 'express';
import ErrorCatchable from '../../decorators/ErrorCatchable';
import { ErrorCatchableTypes, HTTP_STATUS } from '../../types';
import authService from '../services/authService';

class AuthController {
  private authService = authService;

    // public async register(req: Request, res: Response) {
    //   const user: UserModel = await userService.create(req.body);
    // }

  @ErrorCatchable({ type: ErrorCatchableTypes.AUTH })
  public async login(req: Request, res: Response) {
    const token = await this.authService.login(req);

    res.status(HTTP_STATUS.OK_200).send(token);
    return {
      code: HTTP_STATUS.OK_200,
    };
  }

  @ErrorCatchable({ type: ErrorCatchableTypes.AUTH })
  public async register(req: Request, res: Response) {
    const user = await this.authService.register(req);

    res.status(HTTP_STATUS.CREATED_201).send(user);
    return {
      code: HTTP_STATUS.CREATED_201,
    };
  }
}

const authController = new AuthController();

export default authController;
