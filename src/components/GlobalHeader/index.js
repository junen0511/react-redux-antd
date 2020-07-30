import React, { PureComponent } from 'react';
import { Menu, Spin, Dropdown, Avatar, Row, Col } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, ExportOutlined, DownOutlined } from '@ant-design/icons';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';

export default class GlobalHeader extends PureComponent {
    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }

    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    };
    /* eslint-disable*/
    @Debounce(600)
    triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }
    render() {
        const { currentUser = {}, collapsed, onMenuClick, children } = this.props;
        const userMenu = (
            <Menu className={styles.menu} onClick={onMenuClick}>
                <Menu.Item key="personal">
                    <UserOutlined />
                    个人中心
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <ExportOutlined />
                    退出登录
                </Menu.Item>
            </Menu>
        );

        const companyMenu = (
            <Menu>
                <Menu.Item disabled>{currentUser.companyName}</Menu.Item>
            </Menu>
        );

        const moreMenu = (
            <Menu className={styles.menu}>
                <Menu.Item key="personal">
                    <a href="http://www.molbase.cn/common/question/detail/4959.html" target="_blank">
                        帮助中心
                    </a>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className={styles.header}>
                <Row>
                    <Col span={6}>
                        <span className={styles.trigger} onClick={this.toggle}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {})}
                        </span>
                    </Col>
                    <Col span={8}> {children}</Col>
                    <Col span={10}>
                        <div className={styles.userControl}>
                            {/* <Dropdown overlay={companyMenu}>
                                <span className={styles.companyName}>
                                    {currentUser.companyName} <DownOutlined />
                                </span>
                            </Dropdown> */}
                            {!currentUser.name ? (
                                <Dropdown overlay={userMenu}>
                                    <span className={styles.account}>
                                        <Avatar
                                            size={32}
                                            className={styles.avatar}
                                            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                                        />
                                    </span>
                                </Dropdown>
                            ) : (
                                <Spin size="small" style={{ marginLeft: 8 }} />
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
