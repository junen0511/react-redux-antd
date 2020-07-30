import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { GET_LIST_DATA } from '../actionTypes';
import styles from './index.less';

const List = ({ props }) => {
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return <Table dataSource={dataSource} columns={columns} />;
};

const mapStateToProps = (state) => ({
    ...state.listData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(List);
