import { put, call, takeEvery } from 'redux-saga/effects';
import { GET_POST_LIST, PUT_POST_LIST, GET_POST_INFO, PUT_POST_INFO } from './actionTypes';
import { fetchPostList, fetchPostInfo } from './service';

function* getPostList(action) {
    const {
        payload: { queryForm }
    } = action;

    try {
        const { data } = yield call(fetchPostList, queryForm);
        yield put({
            type: PUT_POST_LIST,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}

function* getPostInfo(action) {
    const {
        payload: { queryForm }
    } = action;

    try {
        const { data } = yield call(fetchPostInfo, queryForm);
        yield put({
            type: PUT_POST_INFO,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}

export default function* homeSagas() {
    yield takeEvery(GET_POST_LIST, getPostList);
    yield takeEvery(GET_POST_INFO, getPostInfo);
}
