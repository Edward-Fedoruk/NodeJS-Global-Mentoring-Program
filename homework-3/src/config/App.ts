import express from 'express';
import IApp from './IApp';
import IDatabase from './IDatabase';

class App implements IApp {
  private configApp(): void {
    throw new Error('Method not implemented.');
  }

  boot(): void {
    throw new Error('Method not implemented.');
  }
}

export default App;
