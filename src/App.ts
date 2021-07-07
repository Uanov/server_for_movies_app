import express from 'express';
import AuthController from './controllers/AuthController';
import DbContext from './model/DbContext';
import MoviesDataContext from './model/MoviesDbContext';

export default class App {
  app: express.Application

  dbContext: DbContext;

  constructor() {
    this.app = express();
    this.dbContext = new DbContext();
  }

  initialize() {
    const context = new MoviesDataContext();
    const controller = new AuthController(context);
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      // eslint-disable-next-line max-len
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
    this.app.use(express.json())
    this.app.use('/', controller.router);
  }

  async listen(ip: string, port: number) {
    await this.dbContext.connectAsync('mongodb://localhost:27017/movies-db');
    this.app.listen(port, ip, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening on the port ${ip}:${port}`);
    });
  }
}
