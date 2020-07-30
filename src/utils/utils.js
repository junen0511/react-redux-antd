import { parse, stringify } from 'qs';

/**
 * /path/1024/id => ['/path','/path/1024,'/path/1024/id']
 * @param  url
 */
export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => {
      return `/${urllist.slice(0, index + 1).join('/')}`;
  });
}

export function getPageQuery() {
    return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
    const search = stringify(query);
    if (search.length) {
        return `${path}?${search}`;
    }
    return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
    return reg.test(path);
}

export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(routePath => routePath.indexOf(path) === 0 && routePath !== path);
  routes = routes.map(item => item.replace(path, ''));
  const renderRoutes = routes.map(item => ({
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`
  }));
  return renderRoutes;
}
