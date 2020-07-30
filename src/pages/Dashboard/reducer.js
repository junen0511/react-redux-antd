import { SET_DASHBOARD_DATA } from './actionTypes';

const initialState = {
    dashboardData: [],
    total: 0,
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_DASHBOARD_DATA:
            const { list: dashboardData, total } = payload;
            return { ...state, dashboardData, total };
        default:
            return state;
    }
};
