'use strict';

module.exports = {
    start: {
        NODE_ENV: '"development"',
        ENV_HOST: '"dev"',
        BASE_API: '"/papi"'
    },
    test_tb: {
        NODE_ENV: '"production"',
        ENV_HOST: '"tb"',
        BASE_API: '"http://tb.api.molbase.cn"'
    },
    prod: {
        NODE_ENV: '"production"',
        ENV_HOST: '""',
        BASE_API: '"http://api.molbase.cn"'
    }
};
