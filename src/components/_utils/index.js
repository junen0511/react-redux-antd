import { pathToRegexp } from 'path-to-regexp';

/**
 * Recursively flatten the data
 * [{key:string,children:[{key:string}]] => [{key:string},{key:string}]
 * @param  menu
 */
export const getFlatMenus = (menu) =>
    menu.reduce((menus, item) => {
        menus.push(item);
        if (item.children) {
            return menus.concat(getFlatMenus(item.children));
        }
        return menus;
    }, []);

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [{key:'abc'},{key:'abc_11'},{key:'abc_11_info'}]
 * @param  paths: ['abc', 'abc_11', 'abc_11_info']
 */
export const getMenuMatchKeys = (flatMenus, paths) =>
    paths.reduce(
        (matchKeys, path) =>
            matchKeys.concat(flatMenus.filter((item) => pathToRegexp(item.path).test(path)).map((item) => item.key)),
        []
    );

// conversion Path
// 转化路径
export const conversionPath = (path) => {
    if (path && path.indexOf('http') === 0) {
        return path;
    } else {
        return `/${path || ''}`.replace(/\/+/g, '/');
    }
};
