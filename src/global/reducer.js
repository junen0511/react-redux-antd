import { COLLAPSED } from './actionTypes';

const initialState = {
    collapsed: false
};

export default (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case COLLAPSED:
            return { ...state, ...payload };
        default:
            return state;
    }
};
