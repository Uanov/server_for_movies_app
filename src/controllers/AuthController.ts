import express, {request} from 'express';
import bodyParser from 'body-parser';
import MoviesDataContext from '../model/MoviesDbContext';

export default class AuthController {
  path = '/auth';

  router = express.Router();

  constructor(private moviesDataContext: MoviesDataContext) {
    this.router.use(bodyParser.json());
    this.router.get(`${this.path}/allMovies`, this.getAllMovies);
    this.router.post(`${this.path}/putNewMovie`, this.putNewMovie);
  }

  getAllMovies = async (req: express.Request, res: express.Response) => {
    const movies = await this.moviesDataContext.getAll();
    res.send(movies);
  }

  putNewMovie = async (req: express.Request, res: express.Response) => {
    const movies = await this.moviesDataContext.putNewMovie(req.body);
  }
}
