import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import IAuthService, { Tokens } from './IAuthService';

@injectable()
class AuthService implements IAuthService {
  authenticate(id: string): Tokens {
    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET ?? 'secret', { expiresIn: '1m' });
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET ?? 'secretrefresh', { expiresIn: '5m' });

    return { accessToken, refreshToken };
  }

  refreshTokens(token: string): Tokens {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET ?? 'secretrefresh');

    return this.authenticate(decoded as string);
  }
}

export default AuthService;
