'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const utils = require('./utils');
const config = require('../config');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    bail: true,
    devtool: config.prod.productionSourceMap ? config.prod.devtool : false,
    output: {
        path: config.prod.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.env[process.env.ENV_CONFIG]
        }),
        // extract css into its own file
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            allChunk: false
        }),
        // Compress extracted CSS.
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.prod.productionSourceMap
                ? { safe: true, map: { inline: false } }
                : { safe: true }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            inject: true,
            favicon: config.favicon,
            template: config.template,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    chunks: 'all',
                    name: 'vendors',
                    priority: 100,
                    test: /(react|react-dom|react-dom-router|babel-polyfill|redux)/
                },
                'async-commons': {
                    chunks: 'async',
                    name: 'async-commons',
                    minChunks: 2,
                    priority: 90
                },
                commons: {
                    chunks: 'all',
                    name: 'commons',
                    minChunks: 2,
                    priority: 80
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false
                    }
                },
                sourceMap: config.prod.productionSourceMap,
                parallel: true
            })
        ]
    }
});

module.exports = webpackConfig;
