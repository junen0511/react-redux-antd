import React, { createElement } from 'react';
import Loadable from 'react-loadable';
import { pathToRegexp } from 'path-to-regexp';
import PageLoding from 'components/PageLoading';
import { getFlatMenuData } from './menus';

let routerDataCache;
const getRouterDataCache = () => {
    if (!routerDataCache) {
        routerDataCache = getRouterData();
    }
    return routerDataCache;
};

let flatMenuDataCache;
const getFlatMenuDataCache = () => {
    if (!flatMenuDataCache) {
        flatMenuDataCache = getFlatMenuData();
    }
    return flatMenuDataCache;
};

export const dynamicWrapper = (component) => {
    // () => require('module')
    // transformed by babel-plugin-dynamic-import-node-sync
    if (component.toString().indexOf('.then(') < 0) {
        return (props) => {
            return createElement(component().default, {
                ...props,
                routerData: getRouterDataCache(),
                flatMenuData: getFlatMenuDataCache(),
            });
        };
    }

    // () => import('module')
    return Loadable({
        loader: () => {
            return component().then((raw) => {
                const Component = raw.view || raw.default;
                return (props) => {
                    return createElement(Component, {
                        ...props,
                        routerData: getRouterDataCache(),
                        flatMenuData: getFlatMenuDataCache(),
                    });
                };
            });
        },
        loading: (props) => {
            if (props.error) {
                return (
                    <div>
                        Error! <button onClick={props.retry}>Retry</button>
                    </div>
                );
            } else {
                return <PageLoding />;
            }
        },
    });
};

function findMenuKey(menuData, path) {
    const menuKey = Object.keys(menuData).find((key) => pathToRegexp(path).test(key));
    if (menuKey == null) {
        if (path === '/') {
            return null;
        }
        const lastIdx = path.lastIndexOf('/');
        if (lastIdx < 0) {
            return null;
        }
        if (lastIdx === 0) {
            return findMenuKey(menuData, '/');
        }
        // 如果没有，使用上一层的配置
        return findMenuKey(menuData, path.substr(0, lastIdx));
    }
    return menuKey;
}

export const getRouterData = () => {
    const routerConfig = {
        '/': {
            component: dynamicWrapper(() => import('../layouts/BasicLayout')),
        },
        '/dashboard': {
            component: dynamicWrapper(() => import('../pages/Dashboard')),
        },
        '/list/info': {
            component: dynamicWrapper(() => import('../pages/List')),
        },
        '/exception/403': {
            component: dynamicWrapper(() => import('../pages/Exception/403')),
        },
        '/exception/404': {
            component: dynamicWrapper(() => import('../pages/Exception/404')),
        },
        '/exception/500': {
            component: dynamicWrapper(() => import('../pages/Exception/500')),
        },
    };

    const menuData = getFlatMenuData();
    const routerData = {};

    Object.keys(routerConfig).forEach((path) => {
        let menuKey = Object.keys(menuData).find((key) => pathToRegexp(path).test(`${key}`));

        if (!menuKey) {
            menuKey = findMenuKey(menuData, path);
        }

        let menuItem = {};

        if (menuKey) {
            menuItem = menuData[menuKey];
        }

        let router = routerConfig[path];

        router = {
            ...router,
            name: router.name || menuItem.name,
            authority: router.authority,
            hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
        };
        routerData[path] = router;
    });

    return routerData;
};
