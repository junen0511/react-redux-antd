'use strict';

const path = require('path');
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

module.exports = (assetsPublicPath) => ({
    clientLogLevel: 'silent',
    hot: true,
    contentBase: assetsPublicPath, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || '0.0.0.0',
    port: PORT || 3000,
    open: true,
    historyApiFallback: {
        rewrites: [{ from: /.*/, to: path.posix.join(assetsPublicPath, 'index.html') }],
    },
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    proxy: {
        '/api': {
            target: 'http://api.annajunen.top',
            changeOrigin: true,
        },
    },
    // watchContentBase: true,
    // watchOptions: {
    //     ignored: /node_modules/,
    // },
});
