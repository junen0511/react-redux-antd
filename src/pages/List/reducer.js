import { SET_LIST_DATA } from './actionTypes';

const initialState = {
    dashboardData: [],
    total: 0,
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_LIST_DATA:
            const { list: dashboardData, total } = payload;
            return { ...state, dashboardData, total };
        default:
            return state;
    }
};
