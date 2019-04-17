import React, { createElement } from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

const dynamicWrapper = component => {
    // () => import('module')
    return Loadable({
        loader: () => {
            return component().then(raw => {
                const Component = raw.view || raw.default;
                return props =>
                    createElement(Component, {
                        ...props
                    });
            });
        },
        loading: () => {
            return <Spin size="large" className="global-spin" />;
        }
    });
};

export default [
    {
        name: 'demo',
        path: '/demo',
        component: dynamicWrapper(() => import('./pages/Demo'))
    },
    {
        name: 'home',
        path: '/home',
        exact: true,
        component: dynamicWrapper(() => import('./pages/Home'))
    },
    {
        name: 'detail',
        path: '/detail',
        // authority: ['junen'], // test authority
        component: dynamicWrapper(() => import('./pages/Detail'))
    },
    {
        name: 'exception',
        path: '/exception/403',
        component: dynamicWrapper(() => import('./pages/Exception/403'))
    },
    {
        name: 'exception',
        path: '/exception/404',
        component: dynamicWrapper(() => import('./pages/Exception/404'))
    },
    {
        name: 'exception',
        path: '/exception/500',
        component: dynamicWrapper(() => import('./pages/Exception/500'))
    }
];
