import { combineReducers } from 'redux';
import { someDataReducer as someData } from './someData';

export default combineReducers({ someData });
