import { createActions } from 'redux-actions';

const actionTypes = {
  GET_DATA_START: 'GET_DATA_START',
  GET_DATA_SUCCESS: 'GET_DATA_SUCCESS',
  GET_DATA_FAILED: 'GET_DATA_FAILED'
};

const { getDataStart, getDataSuccess, getDataFailed } = createActions({
  [actionTypes.GET_DATA_START]: payload => payload,
  [actionTypes.GET_DATA_SUCCESS]: payload => payload,
  [actionTypes.GET_DATA_FAILED]: payload => payload
});

export { actionTypes, getDataStart, getDataSuccess, getDataFailed };
