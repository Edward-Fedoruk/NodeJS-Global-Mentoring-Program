import { IEnvironment, IEnvVariables } from './IEnvironment';

class Environment implements IEnvironment {
  getVariables(): IEnvVariables {
    if (
      process.env.DB_NAME
      && process.env.DB_USER
      && process.env.DB_PASS
    ) {
      return {
        dbName: process.env.DB_NAME,
        dbUsername: process.env.DB_USER,
        dbPassword: process.env.DB_PASS,
      };
    }

    throw new Error('Env variables was not set');
  }
}

export default Environment;
