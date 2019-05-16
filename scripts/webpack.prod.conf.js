'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
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
        new webpack.optimize.ModuleConcatenationPlugin(),
        //  represents bundle content as convenient interactive zoomable treemap
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 5,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                'vendors-core': {
                    test: /(react|react-dom|react-router-dom|redux|react-redux|react-router-redux|redux-thunk|history|prop-types|axios)/,
                    chunks: 'initial',
                    name: 'vendors-core',
                    priority: 40
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendors',
                    priority: 0
                },
                'async-commons': {
                    chunks: 'async',
                    minChunks: 2,
                    name: 'async-commons',
                    priority: -10
                },
                commons: {
                    chunks: 'all',
                    minChunks: 2,
                    name: 'commons',
                    priority: -20
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
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
