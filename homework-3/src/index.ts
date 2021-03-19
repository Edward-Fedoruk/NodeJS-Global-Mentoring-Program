import Data from './config/Database';

const sequelize = new Sequelize({
  database: 'user',
  dialect: 'postgres',
  username: 'postgres',
  password: 'postgres',
});
sequelize.addModels([Users]);
