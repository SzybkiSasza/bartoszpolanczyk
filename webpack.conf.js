const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/website/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist/website"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                options: {
                    configFileName: 'tsconfig-client.json'
                }
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Client main',
            template: 'src/website/index.html'
        })
    ]
};
