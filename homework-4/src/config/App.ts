import 'reflect-metadata';
import { config } from 'dotenv';
import express from 'express';
import Inversify from './Inversify';
import Database from './Database';

config();

class App {
  static async boot(): Promise<void> {
    await Database.init();
    const server = Inversify.init();

    server
      .setConfig((app) => app.use(express.json()))
      .build()
      .listen(3000, () => console.log('server runs on port 3000s'));
  }
}

export default App;
