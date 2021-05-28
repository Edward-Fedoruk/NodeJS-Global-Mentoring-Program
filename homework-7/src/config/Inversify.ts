import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import TYPES from './types';
import IUserRepository from '../data-access/IUserRepository';
import UserRepository from '../data-access/UserRepository';
import IUserService from '../services/IUserService';
import UserService from '../services/UserService';
import IGroupService from '../services/IGroupService';
import GroupService from '../services/GroupService';
import IGroupRepository from '../data-access/IGroupRepository';
import GroupRepository from '../data-access/GroupRepository';
import IAuthService from '../services/IAuthService';
import AuthService from '../services/AuthService';
import IEnv from './IEnv';
import Env from './Env';

import '../controllers/User.controller';
import '../controllers/Group.controller';
import '../controllers/Auth.controller';

class Inversify {
  static init(): InversifyExpressServer {
    const container = new Container();
    container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
    container.bind<IUserService>(TYPES.UserService).to(UserService);
    container.bind<IGroupRepository>(TYPES.GroupRepository).to(GroupRepository);
    container.bind<IGroupService>(TYPES.GroupService).to(GroupService);
    container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
    container.bind<IEnv>(TYPES.AuthService).to(Env);

    const server = new InversifyExpressServer(container);

    return server;
  }
}

export default Inversify;
