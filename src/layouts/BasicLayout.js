import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { pathToRegexp } from 'path-to-regexp';
import { Layout } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import NotFound from '../pages/Exception/404';
import { getRoutes } from '../utils/utils';
import Authorized from '../utils/Authorized';
import { getMenuData } from '../common/menus';
import GlobalHeader from '../components/GlobalHeader';
import SiderMenu from '../components/SiderMenu';
import logo from '../assets/logo.svg';
import styles from './BasicLayout.less';

const { Content, Header } = Layout;
const { AuthorizedRoute } = Authorized;

const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599,
    },
    'screen-xxl': {
        minWidth: 1600,
    },
};

const menuDataRender = (menuList = []) => {
    return menuList.map((item) => {
        const localItem = {
            ...item,
            children: item.children ? menuDataRender(item.children) : undefined,
        };
        return Authorized.check(item.authority, localItem, null);
    });
};

/**
 * 根据菜单获取重定向
 * @param {Object} menuData 菜单配置
 */
const getRedirectData = (menuData) => {
    const redirectData = [];
    menuData = menuDataRender(menuData);
    const getRedirect = (accordMenu) => {
        accordMenu.forEach((item) => {
            if (item && item.children) {
                if (item.children[0] && item.children[0].path) {
                    redirectData.push({
                        from: `${item.path}`,
                        to: `${item.children[0].path}`,
                    });
                }
                getRedirect(item.children);
            }
        });
    };

    getRedirect(menuData);
    return redirectData;
};

const BasicLayout = (props) => {
    const { dispatch, history, children, routerData, flatMenuData, location, match, collapsed } = props;
    const { pathname } = location;

    console.log(location, history);

    useEffect(() => {
        if (dispatch) {
            // dispatch({
            //     type: 'user/fetchCurrent',
            // });
        }
    }, [location]);

    const getPageTitle = () => {
        let title = 'ERP-HR';
        let currentMenuData = null;

        // match params path
        for (const key in flatMenuData) {
            if (pathToRegexp(key).test(pathname)) {
                currentMenuData = flatMenuData[key];
                break;
            }
        }

        if (currentMenuData && currentMenuData.name) {
            title = `${currentMenuData.name} - ERP-HR`;
        }
        return title;
    };

    const getBaseRedirect = () => {
        // According to the url parameter to redirect
        // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
        const urlParams = new URL(window.location.href);

        const redirect = urlParams.searchParams.get('redirect');
        // Remove the parameters in the url
        if (redirect) {
            urlParams.searchParams.delete('redirect');
            window.history.replaceState(null, 'redirect', urlParams.href);
        } else {
            // get the first authorized route path in routerData
            const authorizedPath = Object.keys(routerData).find(
                (item) => Authorized.check(routerData[item].authority, item) && item !== '/'
            );

            return authorizedPath;
        }

        return redirect;
    };

    const handleMenuCollapse = (collapsed) => {
        dispatch({ type: 'COLLAPSED/UPDATE', payload: { collapsed } });
    };

    const baseRedirect = getBaseRedirect();
    const redirectData = getRedirectData(getMenuData());

    const layout = (
        <Layout>
            <SiderMenu
                logo={logo}
                theme="light"
                fixSiderbar={true}
                Authorized={Authorized}
                menuData={getMenuData()}
                collapsed={collapsed}
                location={location}
                onCollapse={handleMenuCollapse}
            />
            <Layout
                className={styles.layoutMain}
                style={{ paddingLeft: collapsed ? 80 : 200 + 'px', paddingBottom: 20 }}>
                <Header className={styles.layoutHeader} style={{ width: `calc(100% - ${collapsed ? 80 : 200}px)` }}>
                    <GlobalHeader
                        // currentUser={currentUser}
                        collapsed={collapsed}
                        onCollapse={handleMenuCollapse}></GlobalHeader>
                </Header>
                <Content className={styles.layoutContainer}>
                    <Switch>
                        {redirectData.map((item) => (
                            <Redirect key={item.from} exact from={item.from} to={item.to} />
                        ))}
                        {getRoutes(match.path, routerData).map((item) => (
                            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
                        ))}
                        <Redirect exact from="/" to={baseRedirect} />
                        <Route render={NotFound} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );

    return (
        <DocumentTitle title={getPageTitle()}>
            <ContainerQuery query={query}>
                {(params) => <div className={classNames(params)}>{layout}</div>}
            </ContainerQuery>
        </DocumentTitle>
    );
};

const mapStateToProps = (state) => ({
    ...state.global,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
