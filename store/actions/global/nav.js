import { createActions } from 'redux-actions';

const actionTypes = {
  SET_NAV_TITLE: 'SET_NAV_TITLE'
};

const { setNavTitle } = createActions({ [actionTypes.SET_NAV_TITLE]: payload => payload });

export { actionTypes, setNavTitle };
