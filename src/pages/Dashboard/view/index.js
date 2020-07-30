import React from 'react';
import { connect } from 'react-redux';
import { GET_DASHBOARD_DATA } from '../actionTypes';
import styles from './index.less';

const Dashboard = ({ props }) => {
    return (
        <div>
            <h3>Hello Dashboard</h3>
        </div>
    );
};

const mapStateToProps = (state) => ({
    ...state.dashboard,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
