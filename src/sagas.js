import { all } from 'redux-saga/effects';

import { actions as globalSagas } from './global';
import { actions as dashboardSagas } from './pages/Dashboard';
import { actions as listSagas } from './pages/List';

export default function* rootSaga() {
    yield all([globalSagas()]);
    yield all([dashboardSagas()]);
    yield all([listSagas()]);
}
