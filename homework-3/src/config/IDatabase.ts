import { Sequelize } from 'sequelize-typescript';

interface IDatabase {
  init(): Sequelize
}

export default IDatabase;
