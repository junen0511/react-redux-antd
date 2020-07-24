import React, { PureComponent } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPostList } from '../actions';
import styles from './index.less';

class PostList extends PureComponent {
    state = {
        typeId: 0,
        current: 1,
        pageSize: 10
    };
    componentDidMount() {
        this.filterPostList();
    }

    filterPostList = () => {
        const { dispatch } = this.props;
        const { typeId, current, pageSize } = this.state;
        dispatch(getPostList({ typeId, current, pageSize }));
    };

    render() {
        const { postList } = this.props;

        const columns = [
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                render: text => <a>{text}</a>
            },
            {
                title: '作者',
                dataIndex: 'ower',
                key: 'ower'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => <Link to={`/detail?id=${record.id}`}>查看</Link>
            }
        ];

        return (
            <div className={styles.postList}>
                <Button type="primary">新建</Button>
                <Table columns={columns} dataSource={postList} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.postList
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);
