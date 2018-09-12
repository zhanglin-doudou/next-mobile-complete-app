import { put, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import proxyFetch from '../../../api/proxyFetch';

import { actionTypes, getDataSuccess, getDataFailed } from '../../actions/home/someData';

es6promise.polyfill();

function* loadDataSaga(action) {
  try {
    const { isServer, params } = (action && action.payload) || {};
    const res = yield proxyFetch.get('https://jsonplaceholder.typicode.com/users', params, isServer);
    if (res.ok) {
      const data = yield res.json();
      yield put(getDataSuccess(data));
    } else {
      yield put(getDataFailed(res));
    }
  } catch (err) {
    yield put(getDataFailed(err));
  }
}

export default function* watchLoadDataSaga() {
  yield takeLatest(actionTypes.GET_DATA_START, loadDataSaga);
}
