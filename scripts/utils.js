const path = require('path');
const fs = require('fs');
const packageConfig = require('../package.json');
const config = require('../config');

exports.resolve = relativePath => {
    const appDirectory = fs.realpathSync(process.cwd());
    return path.resolve(appDirectory, relativePath);
};

exports.assetsPath = _path => {
    const assetsSubDirectory =
        process.env.NODE_ENV === 'production' ? config.prod.assetsSubDirectory : config.start.assetsSubDirectory;

    return path.posix.join(assetsSubDirectory, _path);
};

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier');

    return (severity, errors) => {
        if (severity !== 'error') return;

        const error = errors[0];

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: error.file || '',
            icon: path.join(__dirname, 'logo.png')
        });
    };
};
