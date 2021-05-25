import {
  BaseHttpController, controller, httpPost,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import TYPES from '../config/types';
import IAuthService from '../services/IAuthService';
import validate from '../middlewares/validate';
import authSchema from '../validation-schemas/auth';

@controller('/auth')
class AuthController extends BaseHttpController {
  private authService: IAuthService

  constructor(
    @inject(TYPES.AuthService) authService: IAuthService,
  ) {
    super();
    this.authService = authService;
  }

  @httpPost('/refresh-token')
  async refresh(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (refreshToken) {
        const tokens = this.authService.refreshTokens(refreshToken);
        res.json(tokens);
      } else {
        res.status(401).json({ error: 'token is not provided' });
      }
    } catch (err) {
      res.status(400).send('can not be authorized');
    }
  }

  @httpPost('/login', validate(authSchema, 'body'))
  async login(req: Request, res: Response): Promise<void> {
    try {
      const tokens = this.authService.authenticate(req.body.login);
      res.json(tokens);
    } catch (err) {
      res.status(400).send('can not be authorized');
    }
  }
}

export default AuthController;
