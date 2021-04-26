import 'reflect-metadata';
import { config } from 'dotenv';
import express, { Request } from 'express';
import morgan from 'morgan';
import Inversify from './Inversify';
import Database from './Database';

config();

class App {
  static async boot(): Promise<void> {
    await Database.init();

    Inversify
      .init()
      .setConfig((app) => {
        morgan.token('body', (req: Request) => JSON.stringify(req.body));
        morgan.token('params', (req: Request) => JSON.stringify(req.params));
        morgan.token('query', (req: Request) => JSON.stringify(req.query));

        app.use(morgan(':method body :body body length :req[content-length] params :params query :query'));
        app.use(express.json());
      })
      .build()
      .listen(3000, () => console.log('server runs on port 3000s'));

    process.on('uncaughtException', (error) => {
      console.log(error.message);
    });
  }
}

export default App;
