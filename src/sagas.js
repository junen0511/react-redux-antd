import { all } from 'redux-saga/effects';

import { actions as homeSagas } from './pages/Home';

export default function* rootSaga() {
    yield all([homeSagas()]);
}
