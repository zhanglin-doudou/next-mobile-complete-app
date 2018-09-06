import { all, fork } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';
import homeRoot from './home';
es6promise.polyfill();

export default function* rootSaga() {
  yield all([fork(homeRoot)]);
}
