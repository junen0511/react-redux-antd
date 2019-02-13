'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devServer: config.devServer,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.env.start
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            inject: true,
            template: config.template
        })
    ]
});
