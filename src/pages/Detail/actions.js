import { GET_POST_INFO } from './actionTypes';
import { fetchPostInfo } from './service';

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
