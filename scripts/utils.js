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
        const filename = error.file && error.file.split('!').pop();

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        });
    };
};
