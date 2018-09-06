import { combineReducers } from 'redux';
import globalStore from './global';
import homeStore from './home';

export default combineReducers({ globalStore, homeStore });
