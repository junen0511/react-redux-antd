import { put, call, takeEvery } from 'redux-saga/effects';
import { GET_DASHBOARD_DATA, SET_DASHBOARD_DATA } from './actionTypes';
import { fetchDashboardData } from './service';

function* getDashboardData(action) {
    const {
        payload: { query },
    } = action;

    try {
        const { data } = yield call(fetchDashboardData, query);
        yield put({
            type: SET_DASHBOARD_DATA,
            payload: data,
        });
    } catch (error) {
        console.log(error);
    }
}

export default function* watchDashboardActions() {
    yield takeEvery(GET_DASHBOARD_DATA, getDashboardData);
}
