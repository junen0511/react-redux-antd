'use strict';

const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');
const utils = require('./utils');
const prodMode = process.env.NODE_ENV === 'production';

module.exports = {
    entry: ['@babel/polyfill', config.main],
    output: {
        path: config.prod.assetsRoot,
        filename: '[name].js',
        publicPath: prodMode ? config.prod.assetsPublicPath : config.start.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@src': utils.resolve('src'),
            assets: utils.resolve('src/assets'),
            components: utils.resolve('src/components'),
            layouts: utils.resolve('src/layouts'),
            styles: utils.resolve('src/styles'),
            utils: utils.resolve('src/utils')
        }
    },
    plugins: [new WebpackBar()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: config.nodeModules,
                loader: 'babel-loader',
                include: config.src
            },
            // Modular loader components styles
            {
                test: /\.(css|less)$/,
                exclude: config.nodeModules,
                include: config.src,
                use: [
                    {
                        loader: prodMode ? MiniCssExtractPlugin.loader : 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[local]___[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')()]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            // Customize antd themes
            {
                test: /\.(css|less)$/,
                exclude: config.src,
                use: [
                    {
                        loader: prodMode ? MiniCssExtractPlugin.loader : 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: config.theme,
                            javascriptEnabled: true,
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    }
};
