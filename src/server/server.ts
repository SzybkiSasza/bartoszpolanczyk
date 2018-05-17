import { App } from 'server/app';

const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

class Server {
  constructor(port: string, mongoURI: string) {
    this.app = new App(port, mongoURI);
    this.app.listen().then(() => {
      console.log(`App initialized at port ${this.app.port}!`);
    }).catch((err: Error) => {
      console.log('App failure!');
      console.log(err);
    });
  }

  public app: App;
}

export default new Server(port, mongoURI);
