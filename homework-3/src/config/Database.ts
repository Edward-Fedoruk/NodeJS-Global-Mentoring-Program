import { Sequelize } from 'sequelize-typescript';
import path from 'path';

class Database {
  static async init(): Promise<Sequelize> {
    const sequelize = new Sequelize({
      database: process.env.DB_NAME,
      dialect: 'postgres',
      username: process.env.DB_USER,
      logging: process.env.NODE_ENV === 'dev',
      password: process.env.DB_PASS,
      models: [path.join(__dirname, '../models/')], // or [Player, Team],
    });

    await sequelize.authenticate();
    await sequelize.sync();
    return sequelize;
  }
}

export default Database;
