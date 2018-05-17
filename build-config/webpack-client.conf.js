const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { resolve: pathResolve } = require('path');

const mainDir = pathResolve(__dirname, '..');

module.exports = {
    entry: pathResolve(mainDir, 'src/website/index.tsx'),

    output: {
        filename: 'bundle.js',
        path:  pathResolve(mainDir, 'dist/website')
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        plugins: [
            new TsconfigPathsPlugin({ configFile: pathResolve(mainDir, 'build-config/tsconfig-client.json') })
        ]
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: pathResolve(mainDir, 'build-config/tsconfig-client.json')
                }
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Client main',
            template: 'src/website/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};
