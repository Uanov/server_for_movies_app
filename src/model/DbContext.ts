import mongoose from 'mongoose';

export default class DbContext {
  connectAsync(url: string) {
    return mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }
}
