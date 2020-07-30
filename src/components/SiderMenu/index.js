import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './index.less';
import { urlToList } from 'utils/utils';
import { getFlatMenus, getMenuMatchKeys, conversionPath } from '../_utils';

const { Sider } = Layout;
const { SubMenu } = Menu;

let firstMount = true;

const getIcon = (icon) => {
    if (typeof icon === 'string') {
        if (icon.indexOf('http') === 0) {
            return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
        }
    }

    return null;
};

export default class SiderMenu extends Component {
    constructor(props) {
        super(props);
        const flatMenus = getFlatMenus(props.menuData) || [];
        const { pathname } = props.location;
        this.state = {
            pathname,
            flatMenus,
            openKeys: getMenuMatchKeys(flatMenus, urlToList(pathname)),
        };
    }

    componentDidMount() {
        firstMount = false;
    }

    static getDerivedStateFromProps(props, state) {
        const { pathname } = props.location;

        if (pathname !== state.pathname) {
            const flatMenus = getFlatMenus(props.menuData);
            return {
                pathname,
                flatMenus,
                openKeys: getMenuMatchKeys(flatMenus, urlToList(pathname)),
            };
        }
        return null;
    }

    /**
     * 判断是否是http链接.返回 Link 或 a
     * Judge whether it is http link.return a or Link
     * @memberof SiderMenu
     */
    getMenuItemPath = (item) => {
        const itemPath = conversionPath(item.path);
        const icon = getIcon(item.icon);
        const { target, name } = item;
        // Is it a http link
        if (/^https?:\/\//.test(itemPath)) {
            return (
                <a href={itemPath} target={target}>
                    {icon}
                    <span>{name}</span>
                </a>
            );
        }
        const { location } = this.props;
        return (
            <Link to={itemPath} target={target} replace={itemPath === location.pathname}>
                {icon}
                <span>{name}</span>
            </Link>
        );
    };

    /**
     * get SubMenu or Item
     */
    getSubMenuOrItem = (item) => {
        if (item.async || (item.children && item.children.length > 0)) {
            const childrenItems = this.getNavMenuItems(item.children);
            // 当无子菜单时就不展示菜单
            if (childrenItems) {
                return (
                    <SubMenu
                        className="mo-sub-menu"
                        title={
                            item.icon ? (
                                <span>
                                    {getIcon(item.icon)}
                                    <span>{item.name}</span>
                                </span>
                            ) : (
                                item.name
                            )
                        }
                        key={item.key}>
                        {childrenItems}
                    </SubMenu>
                );
            }
            return null;
        } else {
            return <Menu.Item key={item.key}>{this.getMenuItemPath(item)}</Menu.Item>;
        }
    };

    /**
     * 获得菜单子节点
     * @memberof SiderMenu
     */
    getNavMenuItems = (menusData) => {
        if (!menusData) {
            return [];
        }
        return menusData
            .filter((item) => item.name && !item.hideInMenu)
            .map((item) => {
                // make dom
                const ItemDom = this.getSubMenuOrItem(item);
                return this.checkPermissionItem(item.authority, ItemDom);
            })
            .filter((item) => item);
    };

    // Get the currently selected menu
    getSelectedMenuKeys = () => {
        const { pathname } = this.props.location;
        const { flatMenus } = this.state;
        return getMenuMatchKeys(flatMenus, urlToList(pathname));
    };

    // permission to check
    checkPermissionItem = (authority, ItemDom) => {
        const { Authorized } = this.props;
        if (Authorized && Authorized.check) {
            const { check } = Authorized;
            return check(authority, ItemDom);
        }
        return ItemDom;
    };

    isMainMenu = (key) => {
        const { menuData } = this.props;
        return menuData.some((item) => key && (item.key === key || item.path === key));
    };

    handleOpenChange = (openKeys) => {
        const lastOpenKey = openKeys[openKeys.length - 1];
        const moreThanOne = openKeys.filter((openKey) => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
        });
    };

    render() {
        const { logo, menuData, collapsed, onCollapse, fixSiderbar, theme } = this.props;
        const { openKeys } = this.state;

        const siderClassName = classNames(styles.sider, {
            [styles.fixSiderBar]: fixSiderbar,
            [styles.light]: theme === 'light',
        });
        // Don't show popup menu when it is been collapsed
        const menuProps = collapsed
            ? {}
            : {
                  openKeys,
              };
        // if pathname can't match, use the nearest parent's key
        let selectedKeys = this.getSelectedMenuKeys();
        if (!selectedKeys.length) {
            selectedKeys = [openKeys[openKeys.length - 1]];
        }
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onCollapse={(collapse) => {
                    if (firstMount) {
                        onCollapse(collapse);
                    }
                }}
                width={200}
                className={siderClassName}>
                <div className={styles.logo} key="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                        <span>HR人事管理</span>
                    </Link>
                </div>
                <Menu
                    key="Menu"
                    theme={theme}
                    mode="inline"
                    {...menuProps}
                    onOpenChange={this.handleOpenChange}
                    selectedKeys={selectedKeys}
                    style={{ padding: '16px 0', width: '100%' }}>
                    {this.getNavMenuItems(menuData)}
                </Menu>
            </Sider>
        );
    }
}
