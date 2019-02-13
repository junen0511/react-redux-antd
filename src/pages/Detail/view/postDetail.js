import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getPostInfo } from '../actions';
import styles from './postDetail.less';
import { getPageQuery } from '@src/utils/utils';

class PostDetail extends PureComponent {
    componentDidMount() {
        const { id } = getPageQuery();
        const { dispatch } = this.props;
        dispatch(getPostInfo({ id }));
    }

    render() {
        const { postInfo } = this.props;
        return (
            <div className={styles.postInfo}>
                <h3 className={styles.infoTitle}>{postInfo.title}</h3>
                <p className={styles.infoContent}>{postInfo.description}</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.postDetail
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail);
