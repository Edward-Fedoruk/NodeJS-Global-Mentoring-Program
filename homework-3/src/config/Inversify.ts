import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import TYPES from '../types';
import IUserRepository from '../data-access/IUserRepository';
import UserRepository from '../data-access/UserRepository';
import IUserService from '../services/IUserService';
import UserService from '../services/UserService';

import '../controllers/User.controller';

class Inversify {
  static init(): InversifyExpressServer {
    const container = new Container();
    container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
    container.bind<IUserService>(TYPES.UserService).to(UserService);

    const server = new InversifyExpressServer(container);

    return server;
  }
}

export default Inversify;
