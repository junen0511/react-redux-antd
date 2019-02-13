import { GET_POST_INFO } from './actionTypes';

const initialState = {
    postInfo: {}
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_POST_INFO:
            return { ...state, postInfo: payload };
        default:
            return state;
    }
};
