import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';

import { actionTypes, getDataSuccess, getDataFailed } from '../../actions/home/someData';

es6promise.polyfill();

function* loadDataSaga() {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users');
    const data = yield res.json();
    yield put(getDataSuccess(data));
  } catch (err) {
    yield put(getDataFailed(err));
  }
}

export default function* watchLoadDataSaga() {
  yield takeLatest(actionTypes.GET_DATA_START, loadDataSaga);
}
