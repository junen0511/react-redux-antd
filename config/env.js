'use strict';

module.exports = {
    start: {
        NODE_ENV: '"development"',
        ENV_HOST: '"dev"',
        BASE_API: '"/api"'
    },
    test_ta: {
        NODE_ENV: '"production"',
        ENV_HOST: '"ta"',
        BASE_API: '"http://apidev.molbase.cn"'
    },
    test_taa: {
        NODE_ENV: '"production"',
        ENV_HOST: '"ta"',
        BASE_API: '"http://tc.api.saas.molbase.org"'
    },
    prod: {
        NODE_ENV: '"production"',
        ENV_HOST: '""',
        BASE_API: '"http://api.saas.molbase.org"'
    }
};
