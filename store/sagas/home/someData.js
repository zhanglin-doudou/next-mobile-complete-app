import { put, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import proxyFetch from '../../../api/proxyFetch';

import { actionTypes, getDataSuccess, getDataFailed } from '../../actions/home/someData';

es6promise.polyfill();

function* loadDataSaga(action) {
  try {
    const { settings, params } = (action && action.payload) || {};
    // const data = yield proxyFetch.get('/users', params, settings);
    const res = yield fetch('https://api.douban.com/v2/movie/us_box');
    const data = yield res.json();
    yield put(getDataSuccess(data.subjects || []));
  } catch (err) {
    yield put(getDataFailed(err));
  }
}

export default function* watchLoadDataSaga() {
  yield takeLatest(actionTypes.GET_DATA_START, loadDataSaga);
}
