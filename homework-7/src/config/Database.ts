import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import Env from './Env';

class Database {
  static async init(): Promise<Sequelize> {
    const env = new Env();

    const sequelize = new Sequelize({
      database: env.DB_NAME,
      dialect: 'postgres',
      username: env.DB_USER,
      logging: false,
      password: env.DB_PASS,
      models: [path.join(__dirname, '../models/')], // or [Player, Team],
    });

    await sequelize.authenticate();
    await sequelize.sync();
    return sequelize;
  }
}

export default Database;
