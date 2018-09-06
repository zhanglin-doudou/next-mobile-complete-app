import { handleAction } from 'redux-actions';
import { getDataSuccess } from '../../actions/home/someData';

const initState = [];

const someDataReducer = handleAction(getDataSuccess, (state, { payload }) => payload, initState);

export { someDataReducer };
