import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import PageHeader from '../components/PageHeader';
import styles from './PageHeaderLayout.less';

const PageHeaderLayout = ({ children, wrapperClassName, top, headerTitle, headerRight, ...restProps }) => (
    <div className={wrapperClassName}>
        {top}
        <PageHeader key="pageheader" title={headerTitle} right={headerRight} {...restProps} linkElement={Link} />
        {children ? <Card className={styles.content}>{children}</Card> : null}
    </div>
);

export default PageHeaderLayout;
