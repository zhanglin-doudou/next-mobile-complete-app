import { all, fork } from 'redux-saga/effects';
import watchLoadDataSaga from './someData';
import es6promise from 'es6-promise';
es6promise.polyfill();

export default function* homeRoot() {
  yield all([fork(watchLoadDataSaga)]);
}
