import 'reflect-metadata';
import { config } from 'dotenv';
import { InversifyExpressServer } from 'inversify-express-utils';
import express from 'express';
import { Container } from 'inversify';
import TYPES from '../types';
import IUserRepository from '../data-access/IUserRepository';
import UserRepository from '../data-access/UserRepository';
import IUserService from '../services/IUserService';
import UserService from '../services/UserService';
import Database from './Database';

import '../controllers/User.controller';

config();

class App {
  static async boot(): Promise<void> {
    await Database.init();

    const container = new Container();
    container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
    container.bind<IUserService>(TYPES.UserService).to(UserService);

    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(express.json());
    });

    server
      .build()
      .listen(3000, () => console.log('server runs on port 3000s'));
  }
}

export default App;
