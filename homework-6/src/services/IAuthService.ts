export type Tokens = {
  accessToken: string;
  refreshToken: string;
}

interface IAuthService {
  authenticate(id: string): Tokens;
  refreshTokens(token: string): void;
}

export default IAuthService;
