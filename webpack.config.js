const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Vue = require('vue');

const environment = process.env.NODE_ENV;

module.exports = {
    mode: environment,
    entry: ['webpack-hot-middleware/client', './src/resources/js/app.js'],
    output: {
        filename: 'js/build.js',
        path: path.resolve(__dirname, 'src/public')
    },
    resolve: {
        alias: {
            'vue$': path.resolve(__dirname, 'node_modules/vue/dist/vue.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: environment === 'development' ? [
                    'style-loader',
                    'css-loader', 'sass-loader'
                ] : [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/app.css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([
            {
                from: './src/resources/img/',
                to: 'img',
                test: /([^/]+)\/(.+)\.(png|svg|jpg)$/,
                force: true
            }
        ])
    ]
};