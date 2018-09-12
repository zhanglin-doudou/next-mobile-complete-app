import { all, fork } from 'redux-saga/effects';
import homeRoot from './home';
import es6promise from 'es6-promise';
es6promise.polyfill();

export default function* rootSaga() {
  yield all([fork(homeRoot)]);
}
