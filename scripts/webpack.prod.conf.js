'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseWebpackConfig = require('./webpack.base.conf');
const utils = require('./utils');
const config = require('../config');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
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
        //  represents bundle content as convenient interactive zoomable treemap
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                vendors: {
                    chunks: 'all',
                    name: 'vendors',
                    priority: 0,
                    test: /(react|react-dom|react-dom-router|moment|redux|lodash)/
                },
                'async-commons': {
                    chunks: 'async',
                    name: 'async-commons',
                    minChunks: 2,
                    priority: -10
                },
                commons: {
                    chunks: 'all',
                    name: 'commons',
                    minChunks: 2,
                    priority: -20
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true
                    }
                },
                parallel: true,
                sourceMap: config.prod.productionSourceMap
            })
        ]
    }
});

module.exports = webpackConfig;
