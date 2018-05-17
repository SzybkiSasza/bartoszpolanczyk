import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as lusca from 'lusca';
import { join as pathJoin } from 'path';

export class App {
  constructor(port: string, mongoURI: string) {
    this.port = port ? Number(port) : 8080;
    this.mongoURI = mongoURI;
  }

  private app: express.Express;

  public port: number;
  public mongoURI: string;

  async listen() {
    const app = express();
    this.app = app;

    // Express configuration
    app.use(compression());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(lusca({
      xframe: 'SAMEORIGIN',
      xssProtection: true,
    }));

    console.log(pathJoin(__dirname, '../website'));

    app.use('/',
      express.static(pathJoin(__dirname, '../dist/website'), { index: 'index.html', maxAge: 31557600000 }));

    await new Promise((resolve) => {
      app.listen(this.port, resolve);
    });

    return this;
  }
}
