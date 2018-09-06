import { handleAction } from 'redux-actions';
import { setNavTitle } from '../../actions/global/nav';

const initState = { navTitle: 'Home' };

const navReducer = handleAction(setNavTitle, (state, { payload }) => ({ ...state, navTitle: payload }), initState);

export { navReducer };
