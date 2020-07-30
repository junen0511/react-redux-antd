import { put, call, takeEvery } from 'redux-saga/effects';
import { COLLAPSED, UPDATE_COLLAPSED } from './actionTypes';

function* updateLayoutCollapsed({ payload }) {
    yield put({
        type: COLLAPSED,
        payload,
    });
}

export default function* watchGlobalActions() {
    yield takeEvery(UPDATE_COLLAPSED, updateLayoutCollapsed);
}
