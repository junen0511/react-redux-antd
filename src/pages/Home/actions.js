import { GET_POST_LIST, GET_POST_INFO } from './actionTypes';
import { fetchPostList, fetchPostInfo } from './service';

export const getPostList = queryForm => {
    return async dispatch => {
        try {
            const { status, data } = await fetchPostList(queryForm);
            if (status) {
                const { list, total } = data;
                dispatch({
                    type: GET_POST_LIST,
                    payload: {
                        total,
                        list
                    }
                });
            }
        } catch (error) {
            throw new Error(error);
        }
    };
};

export const getPostInfo = queryForm => {
    return async dispatch => {
        try {
            const { status, data } = await fetchPostInfo(queryForm);
            if (status) {
                dispatch({
                    type: GET_POST_INFO,
                    payload: data
                });
            }
        } catch (error) {
            throw new Error(error);
        }
    };
};
