'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const address = require('address');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');
const utils = require('./utils');
const packageConfig = require('../package.json');

const startWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devServer: config.devServer,
    devtool: config.start.devtool,
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

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.devServer.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            startWebpackConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            startWebpackConfig.plugins.push(
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages: [
                            `You can now view ${chalk.bold(packageConfig.name)} in the browser.`,
                            `${chalk.bold('Local:')}            http://${address.ip('lo')}:${chalk.bold(port)}`,
                            `${chalk.bold('On Your Network:')}  http://${address.ip()}:${chalk.bold(port)}/`
                        ]
                    },
                    onErrors: config.start.notifyOnErrors ? utils.createNotifierCallback() : undefined
                })
            );

            resolve(startWebpackConfig);
        }
    });
});
