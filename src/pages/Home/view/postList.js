import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GET_POST_LIST } from '../actionTypes';
import styles from './postList.less';

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
        dispatch({
            type: GET_POST_LIST,
            payload: {
                queryForm: { typeId, current, pageSize }
            }
        });
    };

    render() {
        const { postList } = this.props;
        return (
            <div className={styles.postList}>
                {postList.map(({ title, ower, description, id, create_time }) => (
                    <div className={styles.listItem} key={id}>
                        <Link to={`/detail?id=${id}`}>
                            {title} - {ower}
                        </Link>
                    </div>
                ))}
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
