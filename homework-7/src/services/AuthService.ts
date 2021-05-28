import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import IEnv from '../config/IEnv';
import TYPES from '../config/types';
import IAuthService, { Tokens } from './IAuthService';

@injectable()
class AuthService implements IAuthService {
  private env: IEnv;

  constructor(@inject(TYPES.Env) env: IEnv) {
    this.env = env;
  }

  authenticate(id: string): Tokens {
    const accessToken = jwt.sign({ id }, this.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
    const refreshToken = jwt.sign({ id }, this.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' });

    return { accessToken, refreshToken };
  }

  refreshTokens(token: string): Tokens {
    const decoded = jwt.verify(token, this.env.REFRESH_TOKEN_SECRET);

    return this.authenticate(decoded as string);
  }
}

export default AuthService;
