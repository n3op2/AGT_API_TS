import express from 'express';
import { Request, Response } from 'express';
import * as http from 'http';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  public config() {};
  public routes() {
    this.app.get('/', (req: Request, res: Response) => {
    });
  }
}

