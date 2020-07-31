'use strict';

module.exports = {
    start: {
        NODE_ENV: '"development"',
        ENV_HOST: '"dev"',
        BASE_API: '"/api"',
    },
    test: {
        NODE_ENV: '"production"',
        ENV_HOST: '"ta"',
        BASE_API: '""',
    },
    prod: {
        NODE_ENV: '"production"',
        ENV_HOST: '""',
        BASE_API: '""',
    },
};
