'use strict';

const fs = require('fs');
const path = require('path');
const getDevServer = require('./devServer');
const env = require('./env');
const theme = require('./theme');

const appDirectory = fs.realpathSync(process.cwd());
const resolve = relativePath => path.resolve(appDirectory, relativePath);

const defaultOpt = {
    public: resolve('public'),
    template: resolve('public/index.html'),
    favicon: resolve('public/favicon.ico'),
    main: resolve('src/index.js'),
    packageJson: resolve('package.json'),
    src: resolve('src'),
    styles: resolve('src/styles'),
    nodeModules: resolve('node_modules'),
    start: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        devtool: 'eval'
    },
    prod: {
        index: resolve('dist/index.html'),
        assetsRoot: resolve('dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    }
};

const devServer = getDevServer(defaultOpt.start.assetsPublicPath);

module.exports = { devServer, env, theme, ...defaultOpt };
