import { createActions } from 'redux-actions';

const actionTypes = {
  SET_NAV: 'SET_NAV'
};

const { setNav } = createActions({ [actionTypes.SET_NAV]: payload => payload });

export { actionTypes, setNav };
