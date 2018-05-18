const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { resolve: pathResolve } = require('path');

const mainDir = pathResolve(__dirname, '..');

module.exports = {
  entry: pathResolve(mainDir, 'src/server/server.ts'),
  target: 'node',

  node: {
    __dirname: false,
    __filename: false,
  },

  output: {
    filename: 'server.js',
    path: pathResolve(mainDir, 'dist/server'),
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [
      new TsconfigPathsPlugin({ configFile: pathResolve(mainDir, 'config/tsconfig-server.json') }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: pathResolve(mainDir, 'config/tsconfig-server.json'),
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
};
