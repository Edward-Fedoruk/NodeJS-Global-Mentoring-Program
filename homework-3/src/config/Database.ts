import { Sequelize } from 'sequelize-typescript';
import IDatabase from './IDatabase';
import { IEnvironment } from './IEnvironment';

class Database implements IDatabase {
  private envVariables: IEnvironment

  private sequelize: Sequelize;

  constructor(envVariables: IEnvironment) {
    this.envVariables = envVariables;
  }

  init(): Sequelize {
    const {
      dbName,
      dbPassword,
      dbUsername,
    } = this.envVariables.getVariables();

    if (!sequelize) {
      this.sequelize = new Sequelize({
        database: dbName,
        dialect: 'postgres',
        username: dbUsername,
        password: dbPassword,
        models: [`${__dirname}../models/`], // or [Player, Team],
      });
    }

    return sequelize;
  }
}

export default Database;
