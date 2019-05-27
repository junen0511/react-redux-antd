import React, { createElement } from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

let routerDataCache;

const getRouterDataCache = () => {
    if (!routerDataCache) {
        routerDataCache = getRouterData();
    }
    return routerDataCache;
};

const dynamicWrapper = component => {
    // () => require('module')
    // transformed by babel-plugin-dynamic-import-node-sync
    if (component.toString().indexOf('.then(') < 0) {
        return props => {
            return createElement(component().default, {
                ...props,
                routerData: getRouterDataCache()
            });
        };
    }

    // () => import('module')
    return Loadable({
        loader: () => {
            return component().then(raw => {
                const Component = raw.view || raw.default;

                return props => {
                    return createElement(Component, {
                        ...props,
                        routerData: getRouterDataCache()
                    });
                };
            });
        },
        loading: () => {
            return <Spin size="large" className="global-spin" />;
        }
    });
};

export const getRouterData = () => {
    const routerConfig = {
        '/home': {
            name: 'Home',
            path: '/home',
            component: dynamicWrapper(() => import('../pages/Home'))
        },
        '/exception/403': {
            name: 'exception403',
            path: '/exception/403',
            component: dynamicWrapper(() => import('../pages/Exception/403'))
        },
        '/exception/404': {
            name: 'exception404',
            path: '/exception/404',
            component: dynamicWrapper(() => import('../pages/Exception/404'))
        },
        '/exception/500': {
            name: 'exception500',
            path: '/exception/500',
            component: dynamicWrapper(() => import('../pages/Exception/500'))
        }
    };

    return routerConfig;
};
