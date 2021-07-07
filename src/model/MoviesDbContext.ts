import mongoose from 'mongoose';
import movie from './entity/Movie';

const movieSchema = new mongoose.Schema<movie>({
  Title: String,
  Plot: String,
  Poster: String,
  imdbUrl: String,
  imdbID: String,
  imdbRating: String,
});

export default class MoviesDataContext {
  model: mongoose.Model<movie>;

  constructor() {
    this.model = mongoose.model<movie>('All-movie', movieSchema);
  }

  getAll() {
    return this.model.find();
  }

  putNewMovie(movie: any) {
    return this.model.create(movie);
  }
}
