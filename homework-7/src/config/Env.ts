import { injectable } from 'inversify';
import IEnv from './IEnv';

@injectable()
class Env implements IEnv {
  DB_NAME = process.env.DB_NAME || 'postgre';

  DB_USER = process.env.DB_USER || 'postgre';

  DB_PASS = process.env.DB_PASS || 'postgre';

  ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'accessSecret';

  REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refreshSecret';
}

export default Env;
