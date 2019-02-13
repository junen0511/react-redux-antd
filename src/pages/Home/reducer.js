import { GET_POST_LIST, GET_POST_INFO } from './actionTypes';

const initialState = {
    postList: [],
    total: 0,
    postInfo: {}
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_POST_LIST:
            const { list: postList, total } = payload;
            return { ...state, postList, total };
        case GET_POST_INFO:
            return { ...state, postInfo: payload };
        default:
            return state;
    }
};
